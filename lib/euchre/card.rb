#individual cards with img data
class Card
    attr_accessor :suit, :value, :b64_img, :id, :url

    def initialize(suit,value)
      @suit = suit
      @value = value
      @id = [suit,value]
      path = "./app/assets/images/cards/cards_sm/#{suit},#{value}.png"
      img = File.open(path,"rb")
      @b64_img = Base64.strict_encode64(img.read)
      @url = "/images/cards/cards_md/#{suit},#{value}.png"
    end

    def inspect
      "(#{suit},#{value})"
    end

    def to_s
        suit_str = {0 => "Spades", 1 => "Clubs", 2 => "Diamonds", 3 => "Hearts"}
        value_str = {0 => "Ace", 1 => "Two", 2 => "Three", 3 => "Four", 8 => "Nine", 9 => "Ten", 10 => "Jack", 11 => "Queen", 12 => "King"}
        return "#{value_str[@value]} of #{suit_str[@suit]}"
    end

  end
