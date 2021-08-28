module Euchre
  #individual cards with img data
  class Card
    attr_accessor :suit, :value, :b64_img, :id

    def initialize(suit,value)
      @suit = suit
      @value = value
      @id = [suit,value]
      path = "./app/assets/images/cards/cards_sm/#{suit},#{value}.png"
      img = File.open(path,"rb")
      @b64_img = Base64.strict_encode64(img.read)
    end

    def inspect
      "(#{suit},#{value})"
    end

    def to_s
        suit_str = {0 => "Spades", 1 => "Clubs", 2 => "Diamonds", 3 => "Hearts"}
        value_str = {0 => "Ace", 8 => "Nine", 9 => "Ten", 10 => "Jack", 11 => "Queen", 12 => "King"}
        return "#{value_str[@value]} of #{suit_str[@suit]}"
    end

  end




  #generate euchre deck here with shuffle function
  class Deck
    attr_accessor :cards

    def initialize
      @cards = []
      suits = (0..3).to_a
      #only include ace, 9s,10s,Jacks,Queens, and kings
      values = [0,8,9,10,11,12]
      suits.each do |suit|
        values.each do |value|
          card = Card.new(suit,value)
          @cards.push(card)
        end
      end
      @cards.shuffle!
    end

    def shuffle
      @cards.shuffle!
    end

    def deal_card
      return @cards.pop
    end

  end









  #player object will hold player cards and player score
  class Player
    attr_accessor :hand, :username, :id, :player_no, :tricks, :trump_cards, :non_trump_cards, :score

    def initialize(id,username,player_no)
      @hand = []
      @username = username
      @id = id
      @player_no = player_no
      @tricks = 0
      @score = 0
      #for computer ai
      @trump_cards = []
      @non_trump_cards = []

    end

    def add_cards(cards)
      @hand.concat(cards)
    end

  end








  #round will hold data for each round such as next player and when round is finished
  #also will hold functions to update round information based on player input
  class Round
    attr_accessor :current_player, :turn, :trump, :turnup, :status, :dealer

    def initialize(player1,player2,player3,player4,turn,channel,status)
      @status = status
      @channel = channel
      @player1 = player1
      @player2 = player2
      @player3 = player3
      @player4 = player4
      @player_list = [@player1,@player2,@player3,@player4]
      @turn = turn
      @deck = Deck.new
      @dealer = @player_list[@turn]
      @trump = nil
      @round_count = 0
      #record the player who ordered trump for keeping score
      @ordered_player = nil
      @loner = nil
      #broadcast dealer to players
      ActionCable.server.broadcast(@channel,{ "element" => "#p#{@turn + 1}-dealer", "gameupdate" => "●" })
      sleep(0.1)
      next_player
      deal_cards


    end

    #function to deal hands to players
    def deal_cards
      i = 0
      while @player4.hand.length != 5 do
        i += 1
        if i.odd?
          [2,3,2,3].each do |n|
            cards = []
            n.times {cards.push(@deck.deal_card)}
            @current_player.add_cards(cards)
            next_player
          end
        else
          [3,2,3,2].each do |n|
            cards = []
            n.times {cards.push(@deck.deal_card)}
            @current_player.add_cards(cards)
            next_player
          end
        end
      end

      send_all_cards


      #set turnup card and send to players
      @turnup = @deck.deal_card
      ActionCable.server.broadcast(@channel,{ "img" => @turnup.b64_img, "element" => "turnup-card", "show" => "#turnup" })
      sleep(0.1)
      #declare a counter to keep track of how many times players have passed
      @pass_count = 0
      pickup_or_pass
    end

    def computer_pickup_check
      #count how many cards computer has of turnup card suit
      same_suit_count = 0
      has_bower = false
      left_bower_id = {0 => [1,10], 1 => [0,10], 2 => [3,10], 3 => [2,10]}[@turnup.suit]
      @current_player.hand.each do |card|
        if card.suit == @turnup.suit
          same_suit_count += 1
        elsif card.suit == @turnup.suit && card.value == 10
          has_bower = true
        elsif card.id == left_bower_id
          has_bower = true
        end
      end
      if @dealer == @current_player
        same_suit_count += 1
      end
      if same_suit_count >= 3 && has_bower
        return true
      else
        return false
      end
    end


    def pickup_or_pass
      if @pass_count < 4
        @pass_count += 1
        #action for computer
        #computer will pass for the time being
        if @current_player.id == 0
          if @status == "start"
            @status = "pickup_or_pass"
          end
          if computer_pickup_check()
            @trump = @turnup.suit
            trump_list_gen()
            order_symbol_set()
            pickup_or_pass_shared_code()
          else
            next_player()
            pickup_or_pass()
          end
        else
          @status = "pickup_or_pass"
          ActionCable.server.broadcast(@channel,{ "element" => "#game-telop",
            "gameupdate" => "Player #{@turn + 1}, Pass or Pickup?",
            "show" => "#pickup-yesno", "hide" => "#loner-selection" })
          sleep(0.1)
        end
      else
        @status = "call_trump"
        ActionCable.server.broadcast(@channel,{ "hide" => "#pickup-yesno" })
        sleep(0.1)
        call_trump()
      end
    end

    #function to handle user input after for pass or pickup
    def pickup_or_pass_input(input)
      if input["command"]
        #set trump and card values
        set_trump(input)
        order_symbol_set()
        pickup_or_pass_shared_code()
      else
        next_player()
        if @pass_count == 4
          @status = "call_trump"
          ActionCable.server.broadcast(@channel,{ "hide" => "#pickup-yesno" })
          sleep(0.1)
          call_trump()
        else
          pickup_or_pass()
        end
      end
    end

    def pickup_or_pass_shared_code
      @status = "throw_away_card"
      #must pass in card as an array bc using concat
      @dealer.add_cards([@turnup])
      ActionCable.server.broadcast(@channel,{ "img" => @turnup.b64_img,
        "element" => "p#{@dealer.player_no}-pickupcard", "show" => "#p#{@dealer.player_no}-pickupcard", "hide" => "#turnup" })
      sleep(0.1)
      ActionCable.server.broadcast(@channel,{ "element" => "#game-telop",
        "gameupdate" => "Player #{@dealer.player_no}, choose card to throw away", })
      sleep(0.1)

      #automatically throw_away_card for computers
      if @dealer.id == 0
        @dealer.hand.pop
        throw_away_shared_code()
      end
    end

    def throw_away_card(input)
      @dealer.hand.delete_at input["command"]
      resend_player_cards(@dealer)
      sleep(0.1)
      ActionCable.server.broadcast(@channel,{ "hide" => "#p#{@dealer.player_no}-pickupcard" })
      sleep(0.1)
      #setup for turn start
      throw_away_shared_code()
    end

    def throw_away_shared_code
      ActionCable.server.broadcast(@channel,{ "hide" => "#pickup-yesno" })
      sleep(0.1)
      ActionCable.server.broadcast(@channel,{ "hide" => "#turnup" })
      sleep(0.1)
      #check for loner
      if @current_player.id != 0
        ActionCable.server.broadcast(@channel,{ "hide" => "#trump-selection", "show" => "#loner-selection", "element" => "#game-telop",
          "gameupdate" => "Player #{@turn + 1}, go alone?" })
        @status = "loner_check"
      #if computer start round
      else
        setup_turn()
        next_player()
        turn()
      end
    end

    def computer_call_trump
      # count cards per suit
      suits_count = [0,0,0,0]
      @current_player.hand.each do |card|
        suits_count[card.suit] += 1
      end
      if suits_count.max >= 3
        call_suit = suits_count.index(suits_count.max).to_i
        #check if player has bower
        has_bower = false
        left_bower_id = {0 => [1,10], 1 => [0,10], 2 => [3,10], 3 => [2,10]}[call_suit]
        @current_player.hand.each do |card|
          if card.suit == call_suit && card.value == 10
            has_bower = true
          elsif card.id == left_bower_id
            has_bower = true
          end
        end
        if has_bower
          return call_suit
        else
          return false
        end
      else
        return false
      end
      return false
    end

    def call_trump
      if @pass_count == 4
        #hide turnup card and show buttons for picking trump
        ActionCable.server.broadcast(@channel,{ "hide" => "#turnup", "show" => "#trump-selection" })
        sleep(0.1)
        @turnup = nil
      end

      if @pass_count <= 8
        #action for computer
        #computer will pass for the time being
        if @current_player.id == 0
          @pass_count += 1
          #run computer check here to call trump if
          possible_suit = computer_call_trump()
          if possible_suit
            @trump = possible_suit
            trump_list_gen()
            order_symbol_set()
            trump_str = {0 => "Spades", 1 => "Clubs", 2 => "Diamonds", 3 => "Hearts"}[@trump]
            ActionCable.server.broadcast(@channel,{ "element" => "#game-telop",
              "gameupdate" => "Player #{@current_player.player_no} called #{trump_str} trump!", "hide" => "#trump-selection" })
            sleep(2)
            setup_turn()
            next_player()
            turn()
          else
            next_player()
            call_trump()
          end
        else
          @pass_count += 1
          ActionCable.server.broadcast(@channel,{ "element" => "#game-telop",
            "gameupdate" => "Player #{@turn + 1}, call trump or pass?",
            "show" => "#trump-selection" })
        end
      else
        #change dealer and start new round if no players call trump
        start_new_round()
      end
    end

    def call_trump_input(input)
      if input["command"] == false
        next_player()
        call_trump()

      else
        ActionCable.server.broadcast(@channel,{ "hide" => "#trump-selection", "show" => "#loner-selection", "element" => "#game-telop",
          "gameupdate" => "Player #{@turn + 1}, go alone?" })
        @status = "loner_check"
        set_trump(input)
        order_symbol_set()
      end
    end

    def loner_check_input(input)
      #for non computer players only
      if input["command"]
        @loner = {1 => 3, 2 => 4, 3 => 1, 4 => 2}[@current_player.player_no]
        ActionCable.server.broadcast(@channel,{ "element" => "#game-telop",
          "gameupdate" => "Player #{@turn + 1} is going alone!", "hide" => "#loner-selection" })
        sleep(1.5)
      else
        ActionCable.server.broadcast(@channel,{ "hide" => "#loner-selection" })
        sleep(0.1)
      end
      setup_turn()
      next_player()
      turn()
    end

    def setup_turn
      @count = 0
      @status = "turn"
      @ordered_player = @current_player.player_no
      #set current_player and turn to dealer
      @current_player = @dealer
      @turn = @dealer.player_no - 1
      @cards_played =[]
    end




    def turn
      #count will stop when all players give one card
      @count += 1
      if @count <= 4
        if @current_player.id != 0
          #check if player should be skipped for loner
          if @current_player.player_no == @loner
            next_player()
            turn()
          else
            ActionCable.server.broadcast(@channel,{ "element" => "#game-telop",
              "gameupdate" => "Player #{@turn + 1}, choose a card to play." })
            sleep(0.1)
          end
        else
          #check if player should be skipped for loner
          if @current_player.player_no == @loner
            next_player()
            turn()
          else
            card = computer_card_ai()
            turn_shared_code(card)
          end
        end
      else
        @status = "trick_check"
        trick_check()
      end
    end

    def turn_input(input)
      def after_check(input,card)
        puts "card retrieved"
        #hide card played
        ActionCable.server.broadcast(@channel,{ "hide" => "#p#{current_player.player_no}-card#{input["command"]}" })
        sleep(0.1)
        #set card played to nil
        @current_player.hand[input["command"]] = nil
        turn_shared_code(card)
      end
      #check if user is playing correct card if they can follow suit
      card = @current_player.hand[input["command"]]
      if @count == 1
        after_check(input,card)
      else
        if can_follow_suit()
          if @first_card_suit == @trump && is_trump(card)
            after_check(input,card)
          elsif card.suit == @first_card_suit && !is_trump(card)
            after_check(input,card)
          else
            ActionCable.server.broadcast(@channel,{ "element" => "#game-telop", "gameupdate" => "Player #{@turn + 1}, you can't lie to me." })
            sleep(0.1)
            @status = "turn"
          end
        else
          after_check(input,card)
        end
      end
    end

    def turn_shared_code(card)
      #save first card played to check that other players follow suit
      if @count == 1
        #use is trump function to avoiding problems with jacks
        if is_trump(card)
          @first_card_suit = @trump
        else
          @first_card_suit = card.suit
        end
      end
      #add card played to cards_played list in order played
      @cards_played.push([card,current_player])
      ActionCable.server.broadcast(@channel,{ "element" => "#game-telop",
        "gameupdate" => "Player #{@turn + 1} played the #{card.to_s}" })
      sleep(0.1)
      #send player's card to board
      ActionCable.server.broadcast(@channel,{ "img" => card.b64_img,
        "element" => "p#{@current_player.player_no}-played-card", "show" => "#p#{@current_player.player_no}-played-card" })
      sleep(1.5)
      #set status back to turn to avoid multiple input while waiting
      @status = "turn"
      next_player()
      turn()
    end







    def trick_check
      hantei_suit = @cards_played[0][0].suit
      highest = -1
      winner = nil
      if @first_card_suit == @trump
        @cards_played.each do |card,player|
          if is_trump(card)
            val = @trump_list.find_index(card.id)
            if val > highest
              highest = val
              winner = player
            end
          end
        end
      else
        value_dic = {0 => 12, 12 => 11, 11 => 10, 10 => 9, 9 => 8, 8 => 7}
        trump_played = false
        @cards_played.each do |card,player|
          if is_trump(card) and !trump_played
            trump_played = true
            highest = @trump_list.find_index(card.id)
            winner = player
          elsif trump_played
            if is_trump(card)
              val = @trump_list.find_index(card.id)
              if val > highest
                highest = val
                winner = player
              end
            end
          elsif card.suit == hantei_suit
            val = value_dic[card.value]
            if val > highest
              highest = val
              winner = player
            end
          end
        end
      end

      #send winner to telop
      ActionCable.server.broadcast(@channel,{ "element" => "#game-telop",
        "gameupdate" => "Player #{winner.player_no} won the trick!" })
      sleep(0.1)
      #add trick to player
      winner.tricks += 1
      #update tricks on screen
      ActionCable.server.broadcast(@channel,{ "element" => "#p#{winner.player_no}-tricks",
        "gameupdate" => winner.tricks })
      sleep(2)
      #clear table
      ActionCable.server.broadcast(@channel,{ "clearboard" => true })
      sleep(0.1)
      #check how many rounds have been played
      @round_count += 1
      #continue if not 5
      if @round_count < 5
        @count = 0
        @status = "turn"
        @cards_played = []
        @current_player = winner
        @first_card_suit = nil
        @turn = winner.player_no - 1
        turn()
      else
        round_end()
      end
    end


    def round_end
      #add up team tricks
      team1_tricks = @player1.tricks + @player3.tricks
      team2_tricks = @player2.tricks + @player4.tricks
      #compare which team has more tricks
      if team1_tricks > team2_tricks
        if @loner == 1 || @loner == 3
          ind = {1 => 3, 2 => 4, 3 => 1, 4 => 2}[@loner] - 1
          player = @player_list[ind]
          if team1_tricks == 5
            @player1.score += 4
            @player3.score += 4
            new_update("#{player.username} won a loner!")
          else
            @player1.score += 1
            @player3.score += 1
          end
        elsif @ordered_player == @player1.player_no || @ordered_player == @player3.player_no
          if team1_tricks == 5
            @player1.score += 2
            @player3.score += 2
            new_update("#{@player1.username} and #{@player3.username} won a hand!")
          else
            @player1.score += 1
            @player3.score += 1
            new_update("#{@player1.username} and #{@player3.username} won a hand!")
          end
        else
          @player1.score += 2
          @player3.score += 2
          ActionCable.server.broadcast(@channel,{ "element" => "#game-telop",
            "gameupdate" => "Player 2 and 4 were Euchred!" })
          sleep(0.1)
          new_update("#{@player2.username} and #{@player4.username} were Euchred!")
        end
      else
        if @ordered_player == @player2.player_no || @ordered_player == @player4.player_no
          if @loner == 2 || @loner == 4
            ind = {1 => 3, 2 => 4, 3 => 1, 4 => 2}[@loner] - 1
            player = @player_list[ind]
            if team2_tricks == 5
              @player2.score += 4
              @player4.score += 4
              new_update("#{player.username} won a loner!")
            else
              @player2.score += 1
              @player4.score += 1
            end
          elsif team2_tricks == 5
            @player2.score += 2
            @player4.score += 2
            new_update("#{@player2.username} and #{@player4.username} won a hand!")

          else
            @player2.score += 1
            @player4.score += 1
            new_update("#{@player2.username} and #{@player4.username} won a hand!")
          end
        else
          @player2.score += 2
          @player4.score += 2
          ActionCable.server.broadcast(@channel,{ "element" => "#game-telop",
            "gameupdate" => "Players 1 and 3 were Euchred!" })
          sleep(0.1)
          new_update("#{@player1.username} and #{@player3.username} were Euchred!")
        end
      end

      #add win to players and send to board
      @player_list.each do |player|
        ActionCable.server.broadcast(@channel,{ "element" => "#p#{player.player_no}-score", "gameupdate" => player.score })
        sleep(0.1)
      end
      #deal new cards and start another round
      if @player1.score >= 10
        #end game here
        new_update("#{@player1.username} and #{@player3.username} won a game!")
        ActionCable.server.broadcast(@channel,{ "element" => "#game-telop", "gameupdate" => "Player 1 and Player 3 won the game!" })
      elsif @player2.score >= 10
        new_update("#{@player2.username} and #{@player4.username} won a game!")
        ActionCable.server.broadcast(@channel,{ "element" => "#game-telop", "gameupdate" => "Player 2 and Player 4 won the game!" })
      else
        #start new round here
        start_new_round()
      end
    end

    def start_new_round
      @deck = Deck.new
      #reset player cards
      (0..3).each do |i|
        @player_list[i].hand.clear
        @player_list[i].tricks = 0
      end
      @dealer = {@player1 => @player2, @player2 => @player3, @player3 => @player4, @player4 => @player1}[@dealer]
      @turn = @dealer.player_no - 1
      @round_count = 0
      @orderer_player = nil
      @loner = nil
      #send clear status bar command
      ActionCable.server.broadcast(@channel,{ "clearbar" => true })
      sleep(0.1)
      #broadcast dealer to players
      ActionCable.server.broadcast(@channel,{ "element" => "#p#{@turn + 1}-dealer", "gameupdate" => "●" })
      sleep(0.1)
      next_player()
      deal_cards()
    end



    def computer_card_ai
      def choose_card
        #play best card if first card
        if @first_card_suit.nil?
          return best_card()

        #use best trump if in hand
        elsif @first_card_suit == @trump and !@current_player.trump_cards.empty?
          return best_card()
        #check if can follow suit
        else
          if can_follow_suit()
            @current_player.hand.each do |card|
              if card.suit == @first_card_suit
                @current_player.hand.delete(card)
                return card
              end
            end
          else
            worst = worst_card()
            if worst.nil?
              return best_card()
            else
              return worst
            end
          end
        end
      end

      def best_card
        if !@current_player.trump_cards.empty?
          best = @current_player.trump_cards[0]
          card = @current_player.hand.delete(best)
          return card
        else
          best = @current_player.non_trump_cards[0]
          card = @current_player.hand.delete(best)
          return card
        end
      end

      def worst_card
        worst = @current_player.non_trump_cards[-1]
        card = @current_player.hand.delete(worst)
        return card
      end

      def generate_best_card_lists
        @current_player.trump_cards = []
        @current_player.non_trump_cards = []
        value_list = [8,9,10,11,12,0]
        @current_player.hand.each do |card|
          if is_trump(card)
            @current_player.trump_cards.push(card)
          else
            @current_player.non_trump_cards.push(card)
          end
        end
        @current_player.trump_cards.sort_by{|card| card.value}
        @current_player.non_trump_cards.sort_by{|card| {0 => 10, 12 => 9, 11 => 8, 10 => 7, 9 => 6, 8 => 5}[card.value]}
      end

      generate_best_card_lists()


      return choose_card()
    end

    #check if player can follow suit or not
    def can_follow_suit
      @current_player.hand.each do |card|
        #check if card has been replaced by nil and skip if so
        if !card.nil?
          #if not a jack and of same suit okay
          if card.suit == @first_card_suit && card.value != 10
            return true
          elsif card.suit == @first_card_suit && card.value == 10
            if @first_card_suit == @trump and is_trump(card)
              return true
            elsif !is_trump(card) && card.suit == @first_card_suit
              return true
            end
          end
        end
      end
      return false
    end

    def next_player
      if @turn == 3
        @turn = 0
        @current_player = @player_list[@turn]
      else
        @turn += 1
        @current_player = @player_list[@turn]
      end
    end

    def set_trump(input)
      if !@turnup.nil?
        @trump = @turnup.suit
      else
        #set to user trump call here
        @trump = input["command"]
      end
      trump_list_gen
    end



    def is_trump(card)
      if card.suit == @trump
        return true
      elsif card.value == 10
        if @trump == 0 && card.suit == 1
          return true
        elsif @trump == 1 && card.suit == 0
          return true
        elsif @trump == 2 && card.suit == 3
          return true
        elsif @trump == 3 && card.suit == 2
          return true
        end
      end
      return false
    end

    def order_symbol_set
      symbol_dic = {0=>"♠",1=>"♣",2=>"♦",3=>"♥"}
      symbol = symbol_dic[@trump]
      ActionCable.server.broadcast(@channel,{ "element" => "#p#{@current_player.player_no}-order", "gameupdate" => symbol })
      sleep(0.1)
    end

    def trump_list_gen
      if @trump == 0
        @trump_list = [[0,8],[0,9],[0,11],[0,12],[0,0],[1,10],[0,10]]
      elsif @trump == 1
        @trump_list = [[1,8],[1,9],[1,11],[1,12],[1,0],[0,10],[1,10]]
      elsif @trump == 2
        @trump_list = [[2,8],[2,9],[2,11],[2,12],[2,0],[3,10],[2,10]]
      elsif @trump == 3
        @trump_list = [[3,8],[3,9],[3,11],[3,12],[3,0],[2,10],[3,10]]
      end
    end

    def send_all_cards
      #must check if player is cpu or not
      @player_list.each do |player|
        if player.id != 0
          player.hand.each_with_index do |card, i|
            ActionCable.server.broadcast(@channel,{ "img" => card.b64_img, "element" => "p#{player.player_no}-card#{i}", "show" => "#hand" })
            sleep(0.1)
          end
        end
      end
    end

    #resends player cards after pickup and throw away
    def resend_player_cards(player)
      player.hand.each_with_index do |card, i|
        ActionCable.server.broadcast(@channel,{ "img" => card.b64_img, "element" => "p#{player.player_no}-card#{i}", "show" => "#hand", "hide" => "p#{player.player_no}-pickupcard" })
        sleep(0.1)
      end
    end

    def new_update(text)
      update = Gameupdates.new(text: text)
      update.save
    end
  end








  #keep information on proceedings of all rounds and score
  class Game
    attr_accessor :player1, :player2, :player3, :player4, :round, :status

    def initialize(room_id)
      @status = "start"
      @channel = "chat_#{room_id}"
      room = Room.find(room_id)
      user = User.find(room.player1_id)
      @player1 = Player.new(user.id,user.username,1)
      if room.player2_id == 0
        @player2 = Player.new(0,"Computer 1",2)
      else
        user = User.find(room.player2_id)
        @player2 = Player.new(user.id,user.username,2)
      end

      if room.player3_id == 0
        @player3 = Player.new(0,"Computer 2",3)
      else
        user = User.find(room.player3_id)
        @player3 = Player.new(user.id,user.username,3)
      end

      if room.player4_id == 0
        @player4 = Player.new(0,"Computer 3",4)
      else
        user = User.find(room.player4_id)
        @player4 = Player.new(user.id,user.username,4)
      end
    end

    def start_game
      @round = Round.new(@player1,@player2,@player3,@player4,0,@channel,@status)
    end

    def game_control(user_input)
      if user_input["id"] == @round.current_player.id
        if @round.status == "pickup_or_pass"
          @round.pickup_or_pass_input(user_input)
        elsif @round.status == "throw_away_card" && user_input["id"] == @round.dealer.id
          @round.status = "executing"
          @round.throw_away_card(user_input)
        elsif @round.status == "call_trump"
          @round.call_trump_input(user_input)
        elsif @round.status == "loner_check"
          @round.loner_check_input(user_input)
        elsif @round.status == "turn"
          @round.status = "executing"
          @round.turn_input(user_input)
        else
          puts "still cycling"
        end
      elsif @round.status == "throw_away_card" && user_input["id"] == @round.dealer.id
        @round.status = "executing"
        @round.throw_away_card(user_input)
      else
        puts "wrong player #{user_input}"
      end
    end
  end
end
