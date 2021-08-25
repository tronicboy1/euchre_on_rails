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
    attr_accessor :hand, :username

    def initialize(id,username)
      @hand = []
      @username = username
      @id = id

    end

    def add_card(card)
      @hand.push(card)
    end

  end

  #round will hold data for each round such as next player and when round is finished
  #also will hold functions to update round information based on player input
  class Round

    def initialize(params = {})
      @player1 = params.fetch(:player1)
      @player2 = params.fetch(:player2)
      @player3 = params.fetch(:player3)
      @player4 = params.fetch(:player4)
      @player_list = [@player1,@player2,@player3,@player4]
      @turn = params.fetch(:turn, 0)
      @deck = Deck.new
      @dealer = @player_list[@turn]
      deal_cards


    end

    #function to deal hands to players
    def deal_cards
      while @player1.hand.length != 5 do
        @player_list.each do |player|
          card = @deck.deal_card
          player.add_card(card)
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

  end

  #keep information on proceedings of all rounds and score
  class Game

    def initialize(room_id)
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

    end
  end

end
