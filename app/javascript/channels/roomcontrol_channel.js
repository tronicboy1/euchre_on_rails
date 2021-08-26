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
          console.log("img received")
	        var img_element = document.getElementById(data.element);
	        var img_base64_content = data.img;
	        img_element.src = "data:image/png;base64," + img_base64_content;
          $(data.show).show()
          $(data.hide).hide()


        } else if (typeof data.message !== 'undefined') {
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

        if (typeof data.gameupdate !== 'undefined') {
          $(data.element).empty()
          $(data.element).append(data.gameupdate)
          $(data.hide).hide()
          $(data.show).show()
        } else if (typeof data.hide !== 'undefined') {
          $(data.hide).hide()
          $(data.show).show()
        }
      }

    });


    //universal functions
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
    });
    $('#toggle-onlinebar').on('click', function() {
      $('#onlinebar').toggle();
    });
    $('#start-game').on('click', function() {
      $('#start-game').hide();
    });

    $('#pickup-yes').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: true, id: userid });
    });
    $('#pickup-no').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: false, id: userid });
    });
    $('#trump-selection0').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 0, id: userid });
    });
    $('#trump-selection1').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 1, id: userid });
    });
    $('#trump-selection2').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 2, id: userid });
    });
    $('#trump-selection3').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 3, id: userid });
    });
    $('#trump-selection4').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: false, id: userid });
    });

    //player1 functions
    $('#p1-card0').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 0, id: userid });
    });
    $('#p1-card1').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 1, id: userid });
    });
    $('#p1-card2').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 2, id: userid });
    });
    $('#p1-card3').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 3, id: userid });
    });
    $('#p1-card4').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 4, id: userid });
    });
    $('#p1-pickupcard').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 5, id: userid });
    });

    //player2 functions
    $('#p2-card0').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 0, id: userid });
    });
    $('#p2-card1').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 1, id: userid });
    });
    $('#p2-card2').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 2, id: userid });
    });
    $('#p2-card3').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 3, id: userid });
    });
    $('#p2-card4').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 4, id: userid });
    });
    $('#p2-pickupcard').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 5, id: userid });
    });

    //player3 functions
    $('#p3-card0').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 0, id: userid });
    });
    $('#p3-card1').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 1, id: userid });
    });
    $('#p3-card2').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 2, id: userid });
    });
    $('#p3-card3').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 3, id: userid });
    });
    $('#p3-card4').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 4, id: userid });
    });
    $('#p3-pickupcard').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 5, id: userid });
    });

    //player4 functions
    $('#p4-card0').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 0, id: userid });
    });
    $('#p4-card1').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 1, id: userid });
    });
    $('#p4-card2').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 2, id: userid });
    });
    $('#p4-card3').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 3, id: userid });
    });
    $('#p4-card4').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 4, id: userid });
    });
    $('#p4-pickupcard').on('click', function() {
      let userid = $("#user-id").data('user-id');
      roomChannel.send({ type: "gamecontrol", command: 5, id: userid });
    });

})
