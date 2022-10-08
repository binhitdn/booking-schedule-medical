import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
   users: [],
   doctors: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
            case actionTypes.FETCH_GENDER_SUCCESS:
                state.genders = action.data;
                return {
                    ...state
                };
            case actionTypes.FETCH_GENDER_FAILED:                   
                    state.genders = [];
                    return {
                        ...state       
                    }
                    case actionTypes.FETCH_POSITION_SUCCESS:
                        state.positions = action.data;
                
                        return {
                            ...state
                        };
                    case actionTypes.FETCH_POSITION_FAILED:                   
                            state.positions = [];
                            return {
                                ...state       
                            }
                            case actionTypes.FETCH_ROLE_SUCCESS:
                                state.roles = action.data;
                                return {
                                    ...state
                                };
                            case actionTypes.FETCH_ROLE_FAILED:                   
                                    state.roles = [];
                                    return {
                                        ...state       
                                    }
                                    case actionTypes.CREATE_NEW_USER_SUCCESS:
                                        return {
                                            ...state,
                                           
                                            
                                        }
                                    case actionTypes.CREATE_NEW_USER_FAILED:
                                            return {
                                                ...state                                  
                                    }
                                    case actionTypes.FETCH_ALL_USER_SUCCESS:
                                        state.users = action.data;
                                        return {
                                            ...state

                                        }
                                    case actionTypes.FETCH_ALL_USER_FAILED:
                                        state.users = [];
                                            return {
                                                ...state
                                            }
                                    case actionTypes.EDIT_USER_SUCCESS:
                                        return {
                                            ...state
                                        }
                                    case actionTypes.EDIT_USER_FAILED:
                                        return {
                                            ...state
                                        }
                                    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
                                        state.doctors = action.data;
                                        return {
                                            ...state
                                        }
                                    
                                        

                                    

              
        default:
            return state;
    }
}

export default adminReducer;