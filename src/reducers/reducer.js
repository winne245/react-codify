export const initialState = {
  isSignIn: false,
  isLoading: true,
  isDarkMode: false,
  user: {
    firstName: ''
  },
};

export const ACTION_TYPE = {
  USER: "USER",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  START_LOADING: "START_LOADING",
  FINISH_LOADING: "FINISH_LOADING",
  SWITCH_DARK_MODE: "SWITCH_DARK_MODE",
};

const reducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ACTION_TYPE.USER:
      return {
        ...state,
        user: action.payload,
      };
    case ACTION_TYPE.SIGN_IN:
      return {
        ...state,
        isSignIn: true,
      };
    case ACTION_TYPE.SIGN_OUT:
      return {
        ...state,
        isSignIn: false,
      };
    case ACTION_TYPE.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ACTION_TYPE.FINISH_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case ACTION_TYPE.SWITCH_DARK_MODE:
      return {
        ...state,
        isDarkMode: !action.isDarkMode,
      };
  }
};

export default reducer;
