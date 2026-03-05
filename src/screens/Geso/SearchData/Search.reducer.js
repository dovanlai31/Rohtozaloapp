

const initState = {
  test: 0,
  NppId: null,
  NvbhId: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case 'test':
      return {
        ...state,
        test: action.payload,
      };
    case 'setnpp':
      return {
        ...state,
        NppId: action.payload,
      };
    case 'setnvbh':
      return {
        ...state,
        NvbhId: action.payload,
      };
    case 'resetdatasearch':
      return {
        ...state,
        NppId: null,
        NvbhId: null,
      };
    default:
      return state;
  }
}
