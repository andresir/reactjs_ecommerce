import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';
import { ITEM_CART } from './types';

export const item_cart = (username) => {
    
    return(dispatch) => {
        axios.get(API_URL_1 + '/orders', {
            params: {
                username
            }
        }).then((res) => {
            console.log('INI BARUUUUUUUUUUUUUUUUUUUU')
            // console.log(res.data[0].username)
            dispatch({ type : ITEM_CART, payload: res.data })
        })
    }
    
    
}