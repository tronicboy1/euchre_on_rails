import React from "react";

const ActionCableContext = React.createContext({
    roomId: 0,
    userId: 0,
    username: 'default',
    roomChannel: {},
    chatBox: []
})

export default ActionCableContext;