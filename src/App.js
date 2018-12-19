import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { keepLogin, cookieChecked } from './actions';
import { keepLoginMin, cookieCheckedMin } from './actionAdmin';
import { withRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import logo from './style/images/logo.png';
import Home from './components/Home';
import Login from './components/Login';
import LoginAdmin from './components/LoginAdmin';
import Register from './components/Register';
import About from './components/About';
import loading from './style/images/loading.gif';
import ProdukList from './components/ProdukList';
import ProdukDetail from './components/ProdukDetail';
import ManageProduk from './components/ManageProduk';

const cookies = new Cookies();

class App extends Component {

  //Awal bikin cookies
  componentDidMount() {
    const username = cookies.get('IniNamaKukis');
    if(username !== undefined) {
        this.props.keepLogin(username);
        this.props.keepLoginMin(username);
    }
    else {
      this.props.cookieChecked();
      this.props.cookieCheckedMin();
    }
  }

  render() {
    if (this.props.cookie || this.props.cookieAdmin) {
      return (
        <div>
          <Header navBrand={<img src={logo} alt="logoX" className="logo img-responsive" />} />
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/reg" component={Register} />
            <Route path="/about" component={About} />
            <Route path="/produk" component={ProdukList} />
            <Route path="/produkdetail/" component={ProdukDetail} />
            <Route path="/manageproduk" component={ManageProduk} />
            <Route path="/admin" component={LoginAdmin} />
          
          </div>
        </div>
      );
    }
    
    return (<div>
      <center>{<img src={loading} alt="loading" className="logo img-responsive" />}</center>
    </div>);
  
  }
}


const mapStateToProps = (state) => {
  return { cookie: state.auth.cookie, cookieAdmin: state.authAdmin.cookieAdmin }
}


export default withRouter(connect(mapStateToProps, { keepLogin, cookieChecked, keepLoginMin, cookieCheckedMin })(App));
