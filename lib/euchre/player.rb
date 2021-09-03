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