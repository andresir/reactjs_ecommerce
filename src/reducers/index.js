import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SelectProdukReducer from './SelectProdukReducer';
import AuthReducerAdmin from './AuthReducerAdmin';

export default combineReducers({
    pikachu: () => 'Selamat Datang',
    auth: AuthReducer,
    selectedProduk: SelectProdukReducer,
    authAdmin: AuthReducerAdmin
});