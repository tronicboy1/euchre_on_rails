const gameReducer = (prev, action) => {
    if (action.type === "CHANGE_INTERFACE") {
        console.log(action);
        return {...prev, interfaceState: action.state}
    }
};

export default gameReducer;