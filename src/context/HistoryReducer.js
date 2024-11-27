const HistoryReducer = (state, action) => {
  switch (action.type) {
    case "ADD_HISTORY":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default HistoryReducer;
