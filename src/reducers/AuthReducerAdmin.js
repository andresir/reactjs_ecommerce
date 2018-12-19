import { 
    ADMIN_LOGIN_SUCCESS, 
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING,
    LOGOUT,
    COOKIE_CHECKED
} from '../actionAdmin/types';

const INITIAL_STATE = { useradmin: '', email: '', error: '', loading: false, cookieAdmin: false };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADMIN_LOGIN_SUCCESS :
            return { ...INITIAL_STATE, useradmin: action.payload.useradmin, email: action.payload.email, cookieAdmin: true };
        case AUTH_SYSTEM_ERROR :
            return { ...INITIAL_STATE, error: action.payload, cookieAdmin: true }
        case AUTH_LOADING :
            return { ...state, loading: true }
        case LOGOUT :
            return { ...INITIAL_STATE, cookieAdmin: true };
        case COOKIE_CHECKED :
            return { ...INITIAL_STATE, cookieAdmin: true }
        default :
            return state;
    }
}