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
      suit_str = {0 => "Spades", 1 => "Clubs", 2 => "Diamonds", 3 => "Hearts"}[suit]
      "(#{value},#{suit})"
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
    attr_accessor :hand, :username, :id, :player_no

    def initialize(id,username,player_no)
      @hand = []
      @username = username
      @id = id
      @player_no = player_no

    end

    def add_cards(cards)
      @hand.concat(cards)
    end

  end








  #round will hold data for each round such as next player and when round is finished
  #also will hold functions to update round information based on player input
  class Round
    attr_accessor :current_player, :turn, :trump, :turnup, :status

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
      #broadcast dealer to players
      ActionCable.server.broadcast(@channel,{ "element" => "#p#{@turn + 1}-dealer", "gameupdate" => "●" })
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
      sleep(0.1)

      #set turnup card and send to players
      @turnup = @deck.deal_card
      ActionCable.server.broadcast(@channel,{ "img" => @turnup.b64_img, "element" => "turnup-card", "show" => "#turnup" })
      sleep(0.1)
      #declare a counter to keep track of how many times players have passed
      @pass_count = 0
      pickup_or_pass
    end


    def pickup_or_pass
      if @pass_count < 4
        #action for computer
        #computer will pass for the time being
        if @current_player.id == 0
          @pass_count += 1
          next_player
          if @status == "start"
            @status = "pickup_or_pass"
            cycle_to_human
          end
        else
          @pass_count += 1
          @status = "pickup_or_pass"
          ActionCable.server.broadcast(@channel,{ "element" => "#game-telop",
            "gameupdate" => "Player #{@turn + 1}, Pass or Pickup?",
            "show" => "#pickup-yesno" })
        end
      else
        @status = "call_trump"

        call_trump
      end
    end

    #function to handle user input after for pass or pickup
    def pickup_or_pass_input(input)
      if input["command"]
        @status = "throw_away_card"
        #set trump and card values
        set_trump(input)
        order_symbol_set()
        #must pass in card as an array bc using concat
        @current_player.add_cards([@turnup])
        ActionCable.server.broadcast(@channel,{ "img" => @turnup.b64_img,
          "element" => "p#{@current_player.player_no}-pickupcard", "show" => "#p#{@current_player.player_no}-pickupcard", "hide" => "#turnup" })
        sleep(0.1)
        ActionCable.server.broadcast(@channel,{ "element" => "#game-telop",
          "gameupdate" => "Player #{@turn + 1}, choose card to throw away", })
      else
        next_player
        if @pass_count == 4
          @status = "call_trump"
          ActionCable.server.broadcast(@channel,{ "hide" => "#pickup-yesno" })
          call_trump()
        else
          pickup_or_pass()
        end
        cycle_to_human()
      end
    end

    def throw_away_card(input)
      @current_player.hand.delete_at input["command"]
      resend_player_cards()
      sleep(0.1)
      ActionCable.server.broadcast(@channel,{ "hide" => "#p#{current_player.player_no}-pickupcard" })
      sleep(0.1)
      @status = "turn"
      next_player()
      turn()
      cycle_to_human()
    end

    def call_trump
      if @pass_count == 4
        #hide turnup card and show buttons for picking trump
        ActionCable.server.broadcast(@channel,{ "hide" => "#turnup", "show" => "#trump-selection" })
        @turnup = nil
      end

      if @pass_count <= 8
        #action for computer
        #computer will pass for the time being
        if @current_player.id == 0
          @pass_count += 1
          next_player
        else
          @pass_count += 1
          ActionCable.server.broadcast(@channel,{ "element" => "#game-telop",
            "gameupdate" => "Player #{@turn + 1}, call trump or pass?",
            "show" => "#trump-selection" })
        end
      else
        #change dealer and start new round if no players call trump
        @status = "new_round"
        byebug
      end
    end

    def call_trump_input(input)
      if input["command"] == false
        next_player
        call_trump
        cycle_to_human
      else
        set_trump(input)
        ActionCable.server.broadcast(@channel,{ "hide" => "#p#{current_player.player_no}-pickupcard" })
        sleep(0.1)
        @status = "turn"
        next_player
        turn
        cycle_to_human
      end
    end





    def turn
      byebug
      if @current_player.id != 0

      else

      end
    end

    def cycle_to_human
      #use this function to handle actions loop will carry out
      def action
        if @status == "pickup_or_pass"
          pickup_or_pass
        elsif @status == "call_trump"
          call_trump
        elsif @status == "turn"
          turn
        end
      end

      while @current_player.id == 0
        action()
      end
      #pass on to next player action
      action()
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
        @trump = nil
      end
      trump_list_gen
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
          end
        end
      end
    end

    #resends player cards after pickup and throw away
    def resend_player_cards
      @current_player.hand.each_with_index do |card, i|
        ActionCable.server.broadcast(@channel,{ "img" => card.b64_img, "element" => "p#{current_player.player_no}-card#{i}", "show" => "#hand" })
      end
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
        elsif @round.status == "throw_away_card"
          @round.throw_away_card(user_input)
        elsif @round.status == "call_trump"
          @round.call_trump_input(user_input)
        end

      else
        puts "wrong player #{user_input}"
      end
    end

  end



end
