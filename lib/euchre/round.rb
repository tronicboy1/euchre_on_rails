#round will hold data for each round such as next player and when round is finished
#also will hold functions to update round information based on player input
class Round
  attr_accessor :current_player, :turn, :trump, :turnup, :status, :dealer, :player_list, :cards_played, :current_game_telop

  def initialize(player1,player2,player3,player4,turn,channel,status)
    @status = status

    @channel = channel
    @player1 = player1
    @player2 = player2
    @player3 = player3
    @player4 = player4
    @player_list = [@player1,@player2,@player3,@player4]
    @turn = rand(0..3)
    @deck = Deck.new
    @dealer = @player_list[@turn]
    @trump = nil
    @round_count = 0
    @current_game_telop = "START"
    @cards_played = []
    #record the player who ordered trump for keeping score
    @ordered_player = nil
    @loner = nil
    #broadcast dealer to players
    ActionCable.server.broadcast(@channel,{ "type" => "DEALER", "gameupdate" => @dealer.username.capitalize, "status" => @status })
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
    ActionCable.server.broadcast(@channel,{ "img" => @turnup.url, "kitty" => true })
    sleep(0.1)
    #declare a counter to keep track of how many times players have passed
    @pass_count = 0
    pickup_or_pass
  end

  def computer_pickup_check
    #count how many cards computer has of turnup card suit
    same_suit_count = 0
    #set has bower to true if comp is dealer and the kitty is a bower
    has_bower = @turnup.value == 10 && @dealer == @current_player
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
          ActionCable.server.broadcast(@channel,{ "status" => @status })
          sleep(0.1)
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
        @current_game_telop = "#{@current_player.username.capitalize}, pass or pickup?"
        ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP",
          "gameupdate" => @current_game_telop, "status" => @status })
        sleep(0.1)
      end
    else
      @status = "call_trump"
      ActionCable.server.broadcast(@channel,{ "status" => @status })
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
        ActionCable.server.broadcast(@channel,{ "status" => @status })
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
    ActionCable.server.broadcast(@channel,{ "img" => @turnup.url,
      "pickupcard" => true, "interfaceState" => false, "status" => @status })
    sleep(0.1)
    @current_game_telop = "#{@dealer.username.capitalize}, choose card to throw away"
    ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP",
      "gameupdate" => @current_game_telop })
    sleep(0.1)

    #automatically throw_away_card for computers
    if @dealer.id == 0
      @dealer.hand.each_with_index do |card,i|
        if card.suit != @trump && card.value != 10
          @dealer.hand.delete_at(i)
          break
        end
      end
      throw_away_shared_code()
    end
  end

  def throw_away_card(input)
    @dealer.hand.delete_at input["command"]
    resend_dealer_cards(@dealer)
    sleep(0.1)
    #setup for turn start
    throw_away_shared_code()
  end

  def throw_away_shared_code
    #check for loner
    if @current_player.id != 0
      @status = "loner_check"
      @current_game_telop = "#{@current_player.username.capitalize}, go alone?"
      ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP",
        "gameupdate" => @current_game_telop, "interfaceState" => "LONER_YESNO", "status" => @status })
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
      #must set turnup to nil because it is referenced in set trump
      @turnup_suit = @turnup.suit
      @turnup = nil
    end

    if @pass_count < 8
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
          @current_game_telop = "#{@current_player.username.capitalize} called #{trump_str} trump!"
          ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP",
            "gameupdate" => @current_game_telop, "interfaceState" => false })
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
        @current_game_telop = "#{@current_player.username.capitalize}, call trump or pass?"
        ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP",
          "gameupdate" => @current_game_telop,
          "interfaceState" => "CALL_SUIT" })
      end
    else
      #change dealer and start new round if no players call trump
      start_new_round()
    end
  end

  def call_trump_input(input)
    #check if player is trying to set trump to the suit of turned down kitty
    if input["command"] == @turnup_suit
      @current_game_telop = "You cannot call kitty suit as trump!"
      ActionCable.server.broadcast(@channel, {"type" => "GAME_TELOP",
        "gameupdate" => @current_game_telop})
    elsif input["command"] == false
      next_player()
      call_trump()
    else
      @status = "loner_check"
      @current_game_telop = "#{@current_player.username.capitalize}, go alone?"
      ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP", "gameupdate" => @current_game_telop, "interfaceState" => "LONER_YESNO", "status" => @status })
      set_trump(input)
      order_symbol_set()
    end
  end

  def loner_check_input(input)
    #for non computer players only
    if input["command"]
      @loner = {1 => 3, 2 => 4, 3 => 1, 4 => 2}[@current_player.player_no]
      @current_game_telop = "#{@current_player.username.capitalize} is going alone!"
      ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP",
        "gameupdate" => @current_game_telop })
      sleep(1.5)
    end
    setup_turn()
    next_player()
    turn()
  end

  def setup_turn
    @count = 0
    @status = "turn"
    ActionCable.server.broadcast(@channel,{ "status" => @status })
    sleep(0.1)
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
          @current_game_telop = "#{@current_player.username.capitalize}, choose a card to play."
          ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP",
            "gameupdate" => @current_game_telop })
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
      ActionCable.server.broadcast(@channel,{ "status" => @status })
      sleep(0.1)
      trick_check()
    end
  end

  def turn_input(input)
    def after_check(input,card)
      puts "card retrieved"
      #hide card played
      ActionCable.server.broadcast(@channel,{ "hideCard" => true, "cardNo" => input["command"], "playerNo" => "p#{@current_player.player_no}" })
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
          @status = "turn"
          @current_game_telop = "#{@current_player.username.capitalize}, you can't lie to me."
          ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP", "gameupdate" => @current_game_telop, "status" => @status })
          sleep(0.1)
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
    @current_game_telop = "#{@current_player.username.capitalize} played the #{card.to_s}"
    ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP",
      "gameupdate" => @current_game_telop })
    sleep(0.1)
    #send player's card to board
    ActionCable.server.broadcast(@channel,{ "img" => card.url,
      "playedCard" => "p#{@current_player.player_no}" })
    sleep(1.5)
    #set status back to turn to avoid multiple input while waiting
    @status = "turn"
    ActionCable.server.broadcast(@channel,{ "status" => @status })
    sleep(0.1)
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
    @current_game_telop = "#{winner.username} won the trick!"
    ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP",
      "gameupdate" => @current_game_telop })
    sleep(0.1)
    #add trick to player
    winner.tricks += 1
    #update tricks on screen
    team1_tricks = @player1.tricks + @player3.tricks
    team2_tricks = @player2.tricks + @player4.tricks
    ActionCable.server.broadcast(@channel,{ "type" => "TRICKS",
      "gameupdate" => "tricks", "team1Tricks" => team1_tricks, "team2Tricks" => team2_tricks })
    sleep(2)
    #check how many rounds have been played
    @round_count += 1
    #continue if not 5
    if @round_count < 5
      @count = 0
      @status = "turn"
      ActionCable.server.broadcast(@channel,{ "status" => @status, "clearBoard" => true })
      sleep(0.1)
      @cards_played = []
      @current_player = winner
      @first_card_suit = nil
      @turnup = nil
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
        @current_game_telop = "#{@player2.username.capitalize} and #{@player4.username} were Euchred!"
        ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP",
          "gameupdate" => @current_game_telop })
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
        @current_game_telop = "#{@player1.username} and #{@player3.username} were Euchred!"
        ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP",
          "gameupdate" => @current_game_telop })
        sleep(0.1)
        new_update("#{@player1.username} and #{@player3.username} were Euchred!")
      end
    end

    #add win to players and send to board
    @player_list.each do |player|
      #set score to 10 if greater than 10
      if player.score > 10
        player.score = 10
      end
      ActionCable.server.broadcast(@channel,{ "type" => "SCORE", "gameupdate" => player.score, "team1Score" => @player1.score, "team2Score" => @player2.score })
      sleep(0.1)
    end
    #deal new cards and start another round
    if @player1.score >= 10
      #end game here
      new_update("#{@player1.username} and #{@player3.username} won a game!")
      @current_game_telop = "#{@player1.username} and #{@player3.username} won the game!"
      ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP", "gameupdate" => @current_game_telop })
    elsif @player2.score >= 10
      new_update("#{@player2.username} and #{@player4.username} won a game!")
      @current_game_telop = "#{@player2.username} and #{@player4.username} won the game!"
      ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP", "gameupdate" => @current_game_telop })
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
    @cards_played = []
    #clear hand command for react
    ActionCable.server.broadcast(@channel,{ "clear" => true })
    sleep(0.1)
    #broadcast dealer to players
    ActionCable.server.broadcast(@channel,{ "type" => "DEALER", "gameupdate" => @dealer.username })
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
          #play trump if not empty
          if !@current_player.trump_cards.empty?
            return best_card()
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
          if @current_player.trump_cards.empty?
            @current_player.trump_cards.push(card)
          else
            trump_values = {10 => 6, 0 => 5, 12 => 4, 11 => 3, 9 => 2, 8 => 1}
            first_card_value = @current_player.trump_cards[0].value
            hantei = trump_values[card.value] <=> trump_values[first_card_value]
            if hantei == -1
              @current_player.trump_cards.push(card)
            else
              @current_player.trump_cards.unshift(card)
            end
          end
        else
          if @current_player.non_trump_cards.empty?
            @current_player.non_trump_cards.push(card)
          else
            non_trump_values = {0 => 6, 12 => 5, 11 => 4, 10 => 3, 9 => 2, 8 => 1}
            first_card_value = @current_player.non_trump_cards[0].value
            hantei = non_trump_values[card.value] <=> non_trump_values[first_card_value]
            if hantei == -1
              @current_player.non_trump_cards.push(card)
            else
              @current_player.non_trump_cards.unshift(card)
            end
          end
          #@current_player.non_trump_cards.push(card)
        end
      end

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
    #send current player no to react
    if @status != "start"
      ActionCable.server.broadcast(@channel,{ "currentPlayer" => "p#{@current_player.player_no}" })
      sleep(0.1)
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
    ActionCable.server.broadcast(@channel,{ "type" => "ORDER_TRUMP", "player" => @current_player.username.capitalize, "gameupdate" => symbol })
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
          ActionCable.server.broadcast(@channel,{ "img" => card.url, "playerNo" => "p#{player.player_no}", "cardNo" => i })
          sleep(0.1)
        end
      end
    end
  end

  def resend_played_cards
    @cards_played.each do |card,player|
      ActionCable.server.broadcast(@channel,{ "img" => card.url,
        "playedCard" => "p#{player.player_no}" })
    end
  end

  def resend_dealer_cards(player)
    ActionCable.server.broadcast(@channel,{ "clearHand" => true, "playerNo" => "p#{player.player_no}", "status" => @status })
    sleep(0.1)
    player.hand.each_with_index do |card, i|
      if !card.nil?
        ActionCable.server.broadcast(@channel,{ "img" => card.url, "playerNo" => "p#{player.player_no}", "cardNo" => i })
        sleep(0.1)
      end
    end
  end

  #resends player cards after pickup and throw away
  def resend_player_cards(player)
    #clear hand command for react
    ActionCable.server.broadcast(@channel,{ "clearHand" => true, "playerNo" => "p#{player.player_no}", "status" => @status })
    sleep(0.1)
    player.hand.each_with_index do |card, i|
      if !card.nil?
        ActionCable.server.broadcast(@channel,{ "img" => card.url, "playerNo" => "p#{player.player_no}", "cardNo" => i })
        sleep(0.1)
      end
    end
    resend_played_cards()
    if @status == "pickup_or_pass"
      ActionCable.server.broadcast(@channel,{ "img" => @turnup.url, "kitty" => true })
      sleep(0.1)
    end
    ActionCable.server.broadcast(@channel,{ "type" => "DEALER", "gameupdate" => @dealer.username.capitalize, "status" => @status })
    sleep(0.1)
    ActionCable.server.broadcast(@channel,{ "type" => "SCORE", "gameupdate" => player.score, "team1Score" => @player1.score, "team2Score" => @player2.score })
    sleep(0.1)
    team1_tricks = @player1.tricks + @player3.tricks
    team2_tricks = @player2.tricks + @player4.tricks
    ActionCable.server.broadcast(@channel,{ "type" => "TRICKS", "gameupdate" => "tricks", "team1Tricks" => team1_tricks, "team2Tricks" => team2_tricks })
    ActionCable.server.broadcast(@channel,{ "type" => "GAME_TELOP", "gameupdate" => "Game Restored" })
    order_symbol_set()
  end

  def new_update(text)
    update = Gameupdates.new(text: text)
    update.save
  end
end
