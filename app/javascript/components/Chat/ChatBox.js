import React, { useContext } from "react";

import ActionCableContext from "../Helpers/ActionCableContext";

const ChatBox = () => {
    const context = useContext(ActionCableContext);
    return (
        <div>
            <p>messages:</p>
            {context.chatBox.map(message => (<p>{message}</p>))}
            <p>Room ID: {context.roomId}</p>
            <p>User ID: {context.userId}</p>
            <p>Username: {context.username}</p>
        </div>
    );
};

export default ChatBox;
