import consumer from "./consumer"


// turbolinks の読み込みが終わった後にidを取得しないと，エラーが出ます。
document.addEventListener('turbolinks:load', () => {

    // js.erb 内で使用できるように変数を定義しておく
    window.messageContainer = document.getElementById('chatbox')
    // 以下のプログラムが他のページで動作しないようにしておく
    if (messageContainer === null) {
        return
    }

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
	        var img_element = document.getElementById("p1-guiimg");
	        var img_base64_content = data.img;
	        img_element.src = "data:image/png;base64," + img_base64_content;

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
      }

    });

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
})
