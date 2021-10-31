#keep information on proceedings of all rounds and score
class Game
  attr_accessor :player1, :player2, :player3, :player4, :round, :status

  def initialize(room_id)
    @status = "start"
    @channel = "chat_#{room_id}"
    room = Room.find(room_id)
    user = User.find(room.player1_id)
    @player1 = Player.new(user.id, user.username, 1)
    if room.player2_id == 0
      @player2 = Player.new(0, "Computer 1", 2)
    else
      user = User.find(room.player2_id)
      @player2 = Player.new(user.id, user.username, 2)
    end

    if room.player3_id == 0
      @player3 = Player.new(0, "Computer 2", 3)
    else
      user = User.find(room.player3_id)
      @player3 = Player.new(user.id, user.username, 3)
    end

    if room.player4_id == 0
      @player4 = Player.new(0, "Computer 3", 4)
    else
      user = User.find(room.player4_id)
      @player4 = Player.new(user.id, user.username, 4)
    end
  end

  def start_game
    @round = Round.new(@player1, @player2, @player3, @player4, 0, @channel, @status)
  end

  #this function is used to resend cards if a player refreshes the page midgame or disconnects NOT NEEDED WITH REACT UPDATE
  def resend_gui(dic)
    player_index = dic["playerNo"][1].to_i - 1
    puts player_index
    player = @round.player_list[player_index]
    @round.resend_player_cards(player)
  end

  #resend telop info and current player info on websocket reconnect
  def reconnect()
    puts "reconnect in game"
    puts @status
    puts @round.status
    if @round.status != "start"
      ActionCable.server.broadcast(@channel, { "type": "GAME_TELOP",
                                               "gameupdate": "reconnected, #{@round.status} #{@round.current_player.player_no}" })
    end
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
