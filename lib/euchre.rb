module Euchre
  #individual cards with img data
  class Card
    attr_accessor :suit, :value, :b64_img

    def initialize(suit,value)
      @suit = suit
      @value = value
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
    attr_accessor :hand, :username, :id

    def initialize(id,username)
      @hand = []
      @username = username
      @id = id

    end

    def add_cards(cards)
      @hand.concat(cards)
    end

  end

  #round will hold data for each round such as next player and when round is finished
  #also will hold functions to update round information based on player input
  class Round
    attr_accessor :current_player, :turn, :trump, :turnup

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
      send_all_cards

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

      #set turnup card and send to players
      @turnup = @deck.deal_card
      ActionCable.server.broadcast(@channel,{ "img" => @turnup.b64_img, "element" => "turnup-card", "show" => "#turnup" })
      #declare a counter to keep track of how many times players have passed
      @pass_count = 0
      pickup_or_pass
    end


    def pickup_or_pass
      if @pass_count < 4
        if @current_player.id == 0
          @pass_count += 1
          next_player
          if @status == "start"
            cycle_to_human
          end

        else
          @status = "pickup_or_pass"
          ActionCable.server.broadcast(@channel,{ "element" => "#game-telop", "gameupdate" => "Player #{@turn + 1}, Pass or Pickup?" })

        end
      elsif @pass_count == 4
        #hide turnup card and show buttons for picking trump
        ActionCable.server.broadcast(@channel,{ "hide" => "#turnup", "show" => "#trump-selection" })


      end


    end




    def turn
      if @current_player.id != 0

      else

      end
    end

    def cycle_to_human
      while @current_player.id == 0
        if @status == "pickup_or_pass"
          pickup_or_pass
        end
      end

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

    def send_all_cards
      #player 1 cards
      @player1.hand.each_with_index do |card, i|
        ActionCable.server.broadcast(@channel,{ "img" => card.b64_img, "element" => "p1-card#{i}", "show" => "#hand" })
      end

      #player2~4 cards require check to see if CPU or not
      [@player2,@player3,@player4].zip([2,3,4]).each do |player,n|
        if player != 0
          player.hand.each_with_index do |card, i|
            ActionCable.server.broadcast(@channel,{ "img" => card.b64_img, "element" => "p#{n}-card#{i}", "show" => "#hand" })
          end
        end
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
      @player1 = Player.new(user.id,user.username)
      if room.player2_id == 0
        @player2 = Player.new(0,"Computer 1")
      else
        user = User.find(room.player2_id)
        @player2 = Player.new(user.id,user.username)
      end

      if room.player3_id == 0
        @player3 = Player.new(0,"Computer 2")
      else
        user = User.find(room.player3_id)
        @player3 = Player.new(user.id,user.username)
      end

      if room.player4_id == 0
        @player4 = Player.new(0,"Computer 3")
      else
        user = User.find(room.player4_id)
        @player4 = Player.new(user.id,user.username)
      end
    end

    def start_game
      @round = Round.new(@player1,@player2,@player3,@player4,0,@channel,@status)
    end
  end

  def game_control(user_input)

  end

end
