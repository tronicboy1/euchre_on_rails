import React, { useContext, useEffect } from "react";

import ActionCableContext from "../Helpers/ActionCableContext";

const ChatBox = () => {
    const context = useContext(ActionCableContext);

    console.log(context.roomChannel);

    // useEffect(() => {
    //     context.roomChannel.send({message: 'test1'})
    // },[]);

    return (
        <div>
            <p>messages:</p>
            {context.chatBox.map(message => (<p>{message}</p>))}
            <p>Room ID: {context.roomId}</p>
            <p>User ID: {context.userId}</p>
            <p>Username: {context.username}</p>
            <p>{typeof context.roomChannel}</p>
        </div>
    );
};

export default ChatBox;
