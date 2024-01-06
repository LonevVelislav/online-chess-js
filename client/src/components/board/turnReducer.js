const turnReducer = (state, action) => {
    switch (action.type) {
        case "get-turn":
            return action.payload;
        case "change-turn":
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export default turnReducer;
