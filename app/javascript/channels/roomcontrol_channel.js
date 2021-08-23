import consumer from "./consumer"


// turbolinks の読み込みが終わった後にidを取得しないと，エラーが出ます。
document.addEventListener('turbolinks:load', () => {

    // js.erb 内で使用できるように変数を定義しておく
    window.messageContainer = document.getElementById('chatbox')

    // 以下のプログラムが他のページで動作しないようにしておく
    if (messageContainer === null) {
        return
    }

    const roomChannel = consumer.subscriptions.create({ channel: "RoomcontrolChannel", room_id: $("#room-id").data('room-id') }, {
      connected() {
        // Called when the subscription is ready for use on the server
        $('#chatbox').append("connected \n")
        $('#chatbox').append($("#username").data('username'))
        console.log('connected')
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        // Called when there's incoming data on the websocket for this channel
        $('#chatbox').append(data)
      }

    });

    $('#submitchat').on('click', function() {
      $('#chatbox').append("submit button clicked" + "\n")
      roomChannel.send({ message: "test message" })
    });
})
