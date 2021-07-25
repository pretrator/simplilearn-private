import { SET_TOKEN } from './actions';

const initialState = {};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type){
        case SET_TOKEN:
            return {
                ...state,
                token: payload,
            }
        default:
            return state;
    }
};

export default authReducer;
