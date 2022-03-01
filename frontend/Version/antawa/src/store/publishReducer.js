const initialState = {
  cars_published: [],
};

function publishReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_PUBLISH_CARS":
      return { ...state, cars_published: action.payload };
    default:
      return state;
  }
}

export { publishReducer };
