const initialState = {
    users: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      address1: '',
      address2: '',
      state: '',
      city: '',
      country: '',
      zipCode: '',
    },
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_USER':
        return {
          ...state,
          users: action.payload,
        };
          case 'FETCH_USERS_SUCCESS':
            return {
              ...state,
              users: action.payload, // Update users array with fetched data
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
  



