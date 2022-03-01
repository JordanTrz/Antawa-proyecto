const initialState = {
  cars: [],
  cars_offers: [],
};

function carReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CARS_OFFERS":
      return { ...state, cars_offers: action.payload };
    case "SET_CARS":
      return { ...state, cars: action.payload };
    default:
      return state;
  }
}

export { carReducer };
