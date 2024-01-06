const boardReducer = (state, action) => {
    switch (action.type) {
        case "get-board":
            return [...action.payload];
        case "change-board":
            state = action.payload;
            return [...state];
        default:
            return state;
    }
};

export default boardReducer;
