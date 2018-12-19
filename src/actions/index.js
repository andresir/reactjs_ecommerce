import axios from 'axios';
import { 
    USER_REG_SUCCESS,
    USER_LOGIN_SUCCESS, 
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING,
    LOGOUT,
    COOKIE_CHECKED,
    SELECT_PRODUK,
    PLUS_CART
} from './types';

//Register user
export const onUserRegister = ({ username, email, phone, password }) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING })
        if(username === '' || email === '' || phone === '' || password === '') {
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Semua form diatas wajib diisi!' })
        }
        else {
            axios.get('http://localhost:1997/users', { 
                params: {
                    username
                }
            }).then((res) => {
                console.log('iniiiiiiiiiiiiiiiiiii')
                // console.log(res)
                if(res.data.length === 0) {
                    axios.post('http://localhost:1997/users', {
                        username, email, password, phone
                    }).then((res) => {
                        console.log(typeof(res.data.username))
                        dispatch({ type : USER_REG_SUCCESS, payload: res.data.username })
                    }).catch((err) => {
                        // console.log(err);
                        dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' })
                    })
                }
                else {
                    dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Username has been taken'})
                }
                
            }).catch((err) => {
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error'})
            })
            
        }



    }
}

//Logout
export const onUserLogout = () => {
    return { type: LOGOUT }
}

//User Login-----------------------------------------------------------------------
export const onUserLogin = ({ username, password }) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING })
        // setTimeout(() => loginYok(dispatch,username,password), 2000);
        loginYok(dispatch,username,password);
    }
}

export const keepLogin = (username) => {
    
    return(dispatch) => {
        axios.get('http://localhost:1997/users', {
        params: {
            username
        }
    }).then((res) => {
        console.log('BADALAAA')
        console.log(username)
        if(res.data.length > 0) {
            dispatch({ 
                type: USER_LOGIN_SUCCESS, 
                payload: {email: res.data[0].email, username} 
            })
        }
    })
    }
    
    // return { type: USER_LOGIN_SUCCESS, payload: username }
}

var loginYok = (dispatch,username,password) => {
    axios.get('http://localhost:1997/users', {
            params: {
                username,
                password
            }
        }).then((res) => {
            // console.log(res)
            if (res.data.length > 0) {
                dispatch({ 
                    type: USER_LOGIN_SUCCESS, 
                    payload: { email: res.data[0].email, username }
                })
            }
            else {
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Username or password invalid' })
            }
        }).catch((err) => {
            console.log(err)
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' })
        })
}
//End User Login-----------------------------------------------------------------------

export const cookieChecked = () => {
    return { type: COOKIE_CHECKED }
}

export const select_produk = (selectedProduk) => {
    return { 
        type: SELECT_PRODUK,
        payload: selectedProduk
    }
}

export const tambahCart = () => {
    return{
        type: PLUS_CART 
    }
}