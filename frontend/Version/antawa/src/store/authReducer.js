const initialState = {
  isLogin: false,
  userData: {},
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, userData: action.payload };
    case "SET_LOGIN":
      return { ...state, isLogin: action.payload };
    default:
      return state;
  }
}

export { authReducer };
