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
        $(userid).append("Online");
        $(userid).attr('class', 'text-success')
        console.log('connected');
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        // Called when there's incoming data on the websocket for this channel
        $('#chatbox').append(data.message);
        $(data.online).empty();
        $(data.online).append("Online");
        $(data.online).attr('class', 'text-success');
        $(data.disconnected).empty();
        $(data.disconnected).append("Disconnected");
        $(data.disconnected).attr('class', 'text-danger');
      }

    });

    $('#submitchat').on('click', function() {
      let userid = "#" + $("#user-id").data('user-id') + "-status";
      roomChannel.send({ message: "test message\n", online: userid });
    });

    $('#leave-room').on('click', function() {
      roomChannel.unsubscribe();
    });
})
