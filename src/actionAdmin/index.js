import axios from 'axios';
import { 
    ADMIN_LOGIN_SUCCESS, 
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING,
    LOGOUT,
    COOKIE_CHECKED
} from './types';

export const onAdminLogout = () => {
    return { type: LOGOUT }
}


//Admin Login-----------------------------------------------------------------------
export const onAdminLogin = ({ useradmin, password }) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING })
        // setTimeout(() => loginMin(dispatch,useradmin,password), 2000);
        loginMin(dispatch,useradmin,password);
    }
}

export const keepLoginMin = (useradmin) => {
    
    return(dispatch) => {
        axios.get('http://localhost:1997/admin', {
        params: {
            useradmin
        }
    }).then((res) => {
        console.log('BADALAAA')
        console.log(useradmin)
        if(res.data.length > 0) {
            dispatch({ 
                type: ADMIN_LOGIN_SUCCESS, 
                payload: {email: res.data[0].email, useradmin} 
            })
        }
    })
    }
    
    // return { type: ADMIN_LOGIN_SUCCESS, payload: useradmin }
}

var loginMin = (dispatch,useradmin,password) => {
    axios.get('http://localhost:1997/admin', {
            params: {
                useradmin,
                password
            }
        }).then((res) => {
            // console.log(res)
            if (res.data.length > 0) {
                dispatch({ 
                    type: ADMIN_LOGIN_SUCCESS, 
                    payload: { email: res.data[0].email, useradmin }
                })
            }
            else {
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'useradmin or password invalid' })
            }
        }).catch((err) => {
            console.log(err)
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' })
        })
}
//End Admin Login-----------------------------------------------------------------------


export const cookieCheckedMin = () => {
    return { type: COOKIE_CHECKED }
}