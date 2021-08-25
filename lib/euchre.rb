module Euchre
  #individual cards with img data
  class Card
    attr_accessor :suit, :value, :b64_img

    def initialize(suit,value)
      @suit = suit
      @value = value
      path = "./app/assets/images/cards/#{suit},#{value}.png"
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

    end

  end

  #player object will hold player cards and player score
  class Player

    def initialize

    end

  end

  #round will hold data for each round such as next player and when round is finished
  #also will hold functions to update round information based on player input
  class Round

    def initialize

    end

  end

  #keep information on proceedings of all rounds and score
  class Game

    def initialize

    end

  end

end
