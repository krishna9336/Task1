const initialState = {
    users: [],
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_USER':
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      case 'DELETE_USER':
        return {
          ...state,
          users: state.users.filter((user) => user.id !== action.payload),
        };
      // Define other cases for different actions
      default:
        return state;
    }
  };
  
  export default userReducer;
  