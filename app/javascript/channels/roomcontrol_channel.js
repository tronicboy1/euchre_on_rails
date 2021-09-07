import consumer from "./consumer"





document.addEventListener('turbolinks:load', () => {


    window.messageContainer = document.getElementById('chatbox')

    if (messageContainer === null) {
        return
    }

    //hide hand until cards are dealt
    $('#hand').hide();
    $('#turnup').hide();
    $('#pickup-yesno').hide();
    $('#trump-selection').hide();
    $('#loner-selection').hide();

    //universal functions for when data received
    function clearBar() {
      $('#trump-selection').hide()
      $('#p1-dealer').empty()
      $('#p2-dealer').empty()
      $('#p3-dealer').empty()
      $('#p4-dealer').empty()
      $('#p1-order').empty()
      $('#p2-order').empty()
      $('#p3-order').empty()
      $('#p4-order').empty()
      $('#p1-tricks').empty()
      $('#p2-tricks').empty()
      $('#p3-tricks').empty()
      $('#p4-tricks').empty()
    }
    
    function clearBoard() {
      $('#p1-played-card').attr('src', '/assets/blank_white_card.png')
      $('#p2-played-card').attr('src', '/assets/blank_white_card.png')
      $('#p3-played-card').attr('src', '/assets/blank_white_card.png')
      $('#p4-played-card').attr('src', '/assets/blank_white_card.png')
    }
    
    function showImage(data) {
      console.log("img received")
      var img_element = document.getElementById(data.element);
      var img_base64_content = data.img;
      img_element.src = "data:image/png;base64," + img_base64_content;
      $('#' + data.element).show('normal');
      $(data.show).show('normal');
      $(data.hide).hide('normal');
    }
    
    function chatBoxUpdate(data) {
      console.log("message received")
      $('#chatbox').val($('#chatbox').val() + data.message + '\n');
      $('#chatbox').scrollTop($('#chatbox')[0].scrollHeight);
      if (typeof data.online !== 'undefined') {
        $(data.online).empty();
        $(data.online).append("Online");
        $(data.online).attr('class', 'text-success');
      } else if (typeof data.disconnected !== 'undefined') {
        $(data.disconnected).empty("Offline");
        $(data.disconnected).append("Offline");
        $(data.disconnected).attr('class', 'text-danger');
      }
    }

    //universal functions used for sending commands
    function sendCommand(input) {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: input, id: userid });
      var btn = $(this);
      btn.prop('disabled', true);
      setTimeout(function() {
        btn.prop('disabled', false) }, 1000);
    }

    function sendCardClick(card) {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: card, id: userid });
    }


    //setup activecable connection
    const roomChannel = consumer.subscriptions.create({ channel: "RoomcontrolChannel", room_id: $("#room-id").data('room-id'), username: $("#username").data('username'), user_id: $("#user-id").data('user-id') }, {
      connected() {
        let userid = "#" + $("#user-id").data('user-id') + "-status";
        $(userid).empty();
        $(userid).append("Online");
        $(userid).attr('class', 'text-success')
        console.log('connected');
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        // Called when there's incoming data on the websocket for this channel

        if (typeof data.img !== 'undefined') {
          showImage(data);


        } else if (typeof data.message !== 'undefined') {
          chatBoxUpdate(data);
        }

        if (typeof data.gameupdate !== 'undefined') {
          $(data.element).empty()
          $(data.element).append(data.gameupdate)
          $(data.hide).hide('normal')
          $(data.show).show('normal')
        }
        if (typeof data.hide !== 'undefined') {
          $(data.hide).hide('normal')
          $(data.show).show('normal')
        }
        if (typeof data.clearbar !== 'undefined') {
          clearBar();
        }
        if (typeof data.clearboard !== 'undefined') {
          clearBoard();
      }

      }

    });


    //universal operations
    $('#submitchat').on('click', function() {
      let userid = "#" + $("#user-id").data('user-id') + "-status";
      let text = $('#chatinput').val();
      let username = $("#username").data('username');
      roomChannel.send({ type: "chat", message: username + " : " + text, online: userid });
      $('#chatinput').val('');
    });

    $('#chatinput').keypress(function(e) {
      var code = e.keyCode || e.which;
      if (code == 13) {
        let text = $('#chatinput').val();
        let userid = "#" + $("#user-id").data('user-id') + "-status";
        let username = $("#username").data('username');
        $('#chatinput').val('');
        roomChannel.send({ type: "chat", message: username + " : " + text, online: userid });
        }
    });

    $('#leave-room').on('click', function() {
      roomChannel.unsubscribe();
    });

    $('#start-game').on('click', function() {
      roomChannel.send({ type: "gamecontrol", command: "start-game" });
    });

    $('#toggle-chat').on('click', function() {
      $('#chat-group').toggle();
      var btn = $(this);
      btn.prop('disabled', true);
      setTimeout(function() {
        btn.prop('disabled', false) }, 300);
    });
    $('#toggle-onlinebar').on('click', function() {
      $('#onlinebar').toggle();
    });
    $('#start-game').on('click', function() {
      $('#start-game').hide();
    });

    
    $('#pickup-yes').on('click', function() {
      sendCommand(true);
    });
    $('#pickup-no').on('click', function() {
      sendCommand(false);
    });
    $('#trump-selection0').on('click', function() {
      sendCommand(0);
    });
    $('#trump-selection1').on('click', function() {
      sendCommand(1);
    });
    $('#trump-selection2').on('click', function() {
      sendCommand(2);
    });
    $('#trump-selection3').on('click', function() {
      sendCommand(3);
    });
    $('#trump-selection4').on('click', function() {
      sendCommand(false);
    });
    $('#loner-selection0').on('click', function() {
      sendCommand(true);
    });
    $('#loner-selection1').on('click', function() {
      sendCommand(false);
    });
    $('#reload-gui').on('click', function() {
      let player_no = $("#player-no").data('player-no');
      console.log(player_no);
      roomChannel.send({ type: "gamecontrol", command: "reload_gui", player_no: player_no });
      var btn = $(this);
      btn.prop('disabled', true);
      setTimeout(function() {
        btn.prop('disabled', false) }, 3000);
    });

    
    //player1 operations
    $('#p1-card0').on('click', function() {
      sendCardClick(0);
    });
    $('#p1-card1').on('click', function() {
      sendCardClick(1);
    });
    $('#p1-card2').on('click', function() {
      sendCardClick(2);
    });
    $('#p1-card3').on('click', function() {
      sendCardClick(3);
    });
    $('#p1-card4').on('click', function() {
      sendCardClick(4);
    });
    $('#p1-pickupcard').on('click', function() {
      sendCardClick(5);
    });

    //player2 operations
    $('#p2-card0').on('click', function() {
      sendCardClick(0);
    });
    $('#p2-card1').on('click', function() {
      sendCardClick(1);
    });
    $('#p2-card2').on('click', function() {
      sendCardClick(2);
    });
    $('#p2-card3').on('click', function() {
      sendCardClick(3);
    });
    $('#p2-card4').on('click', function() {
      sendCardClick(4);
    });
    $('#p2-pickupcard').on('click', function() {
      sendCardClick(5);
    });

    //player3 operations
    $('#p3-card0').on('click', function() {
      sendCardClick(0);
    });
    $('#p3-card1').on('click', function() {
      sendCardClick(1);
    });
    $('#p3-card2').on('click', function() {
      sendCardClick(2);
    });
    $('#p3-card3').on('click', function() {
      sendCardClick(3);
    });
    $('#p3-card4').on('click', function() {
      sendCardClick(4);
    });
    $('#p3-pickupcard').on('click', function() {
      sendCardClick(5);
    });

    //player4 operations
    $('#p4-card0').on('click', function() {
      sendCardClick(0);
    });
    $('#p4-card1').on('click', function() {
      sendCardClick(1);
    });
    $('#p4-card2').on('click', function() {
      sendCardClick(2);
    });
    $('#p4-card3').on('click', function() {
      sendCardClick(3);
    });
    $('#p4-card4').on('click', function() {
      sendCardClick(4);
    });
    $('#p4-pickupcard').on('click', function() {
      sendCardClick(5);
    });

})
