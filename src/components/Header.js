import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import { Link } from 'react-router-dom';
  import { connect } from 'react-redux';
  import Cookies from 'universal-cookie';
  import { onUserLogout, keepLogin } from '../actions';
  import { onAdminLogout, keepLoginMin } from '../actionAdmin';
  import { item_cart } from '../actionsCart';

const cookies = new Cookies();

class Header extends Component {

  constructor(props) {
      super(props);
      console.log(props)
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
  }
  toggle() {
      this.setState({
          isOpen: !this.state.isOpen
      });
  }

  onLogOutSelect = () => {
    this.props.onAdminLogout();
    this.props.onUserLogout();
    cookies.remove('IniNamaKukis');
  }



  renderCartHeader = () => {
  console.log(this.props.isiCart)

      return (
        // this.props.item_cart(),
        this.props.isiCart.length
      )
    

  }

  totalPrice = () => {
    var cost = 0;
    var totalJumlah = this.props.isiCart.map(({ totalHarga }) => {
        return (
            cost += totalHarga
        )
    })
    return cost;
  }

  render() {

      // console.log(this.props.username.length)

      if(this.props.username === "" && this.props.useradmin === "") {
          return (
            <div>

              <div className="header">{/*Header */}
                <div className="container">
                  <div className="row">
                    <div className="col-xs-6 col-md-4 main-logo">
                      <a href="/">{this.props.navBrand}</a>
                    </div>
                    <div className="col-md-8">
                      <div className="pushright">
                        <div className="top">
                        {/* <a href="/reg" id="reg" className="btn btn-dark">|| Register</a> */}
                        <Link to="/reg"><NavLink className="btn btn-dark">|| Register</NavLink></Link>
                        <Link to="/login"><NavLink className="btn btn-dark">|| Login User</NavLink></Link>
                        <Link to="/admin"><NavLink className="btn btn-dark">|| Login Admin</NavLink></Link>
                          {/* <a href="#" id="reg" className="btn btn-dark">|| Login</a> */}
                          
                          {/* Search */}
                          <div className="srch-wrap">
                            <a href="#" id="srch" className="btn btn-default btn-search"><i className="fa fa-search" /></a>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dashed" />
              </div>{/*Header */}  
            

              <div className="main-nav">{/*end main-nav */}
                <div className="navbar navbar-default navbar-static-top">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-10">
                        <div className="navbar-header">
                          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                          </button>
                        </div>
                        <div className="navbar-collapse collapse">
                          <ul className="nav navbar-nav">
                            <li><a href="/" className="active">Home</a><div className="curve" /></li>
                            
                            {/* <li><a href="page-sidebar.html">About</a></li> */}
                            <li><Link to="/about"><NavLink>About</NavLink></Link></li>
                            <li><Link to="/produk"><NavLink>Product</NavLink></Link></li>
                            <li><a href="contact.html">Contact</a></li>

                            <li className="dropdown">

                              <UncontrolledDropdown style={{color: 'black', paddingTop: '4px'}}>
                                  <DropdownToggle >
                                      Menu DropDown <b className="caret" />
                                  </DropdownToggle>
                                  
                                  <DropdownMenu>
                                      <DropdownItem>
                                          <Link to="/managepopok">Manage Popok</Link>
                                      </DropdownItem>
                                      <DropdownItem>
                                          Option 2
                                      </DropdownItem>
                                      <DropdownItem divider />
                                      <DropdownItem>
                                      <Link to="/login">Login</Link>
                                      </DropdownItem>
                                  </DropdownMenu>
                            
                              </UncontrolledDropdown>
                
                            </li>

                          </ul>
                        </div>
                      </div>

                      {/* Keranjang Belanja (CART) */}
                      <div className="col-md-2 machart">
                        <button id="popcart" className="btn btn-default btn-chart btn-sm "><span className="mychart">Cart</span>|<span className="allprice">$0.00</span></button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>{/*end main-nav */}

            </div>
          )
      }

      else if(this.props.username.length > 0){
      return (
        <div>

          <div className="header">{/*Header */}
            <div className="container">
              <div className="row">
                <div className="col-xs-6 col-md-4 main-logo">
                  <a href="/">{this.props.navBrand}</a>
                </div>
                <div className="col-md-8">
                  <div className="pushright">
                    <div className="top">
                    
                    <Link to="/"><button className="btn btn-danger" onClick={this.onLogOutSelect}>USER LOGOUT</button></Link>
                      <div className="srch-wrap">
                        <a href="#" id="srch" className="btn btn-default btn-search"><i className="fa fa-search" /></a>
                      </div>
                      <div className="srchwrap">
                        <div className="row">
                          <div className="col-md-12">
                            <form className="form-horizontal" role="form">
                              <div className="form-group">
                                <label htmlFor="search" className="col-sm-2 control-label">Search</label>
                                <div className="col-sm-10">
                                  <input type="text" className="form-control" id="search" />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashed" />
          </div>{/*Header */}  
        

          <div className="main-nav">{/*end main-nav */}
            <div className="navbar navbar-default navbar-static-top">
              <div className="container">
                <div className="row">
                  <div className="col-md-10">
                    <div className="navbar-header">
                      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                      </button>
                    </div>
                    <div className="navbar-collapse collapse">
                      <ul className="nav navbar-nav">
                        <li><a href="/" className="active">Home</a><div className="curve" /></li>
                        
                        {/* <li><a href="page-sidebar.html">About</a></li> */}
                        <li><Link to="/profil"><NavLink>Profil</NavLink></Link></li>
                        <li><a href="/produk">Product</a></li>
                        
                        <li><a href="contact.html">Contact</a></li>

                        <li>

                          <UncontrolledDropdown style={{color: 'black', paddingTop: '4px'}}>
                              <DropdownToggle >
                                  Menu DropDown <b className="caret" />
                              </DropdownToggle>
                              
                              <DropdownMenu>
                              <DropdownItem divider />
                                  <DropdownItem>
                                      Lihat Cart
                                  </DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem>
                                      Lihat History Belanja
                                  </DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem onClick={this.onLogOutSelect}>
                                      <Link to="/">Logout</Link>
                                  </DropdownItem>
                              </DropdownMenu>
                            
                        
                          </UncontrolledDropdown>
            
                        </li>

                      </ul>
                    </div>
                  </div>

                  {/* Keranjang Belanja (CART) */}
                  <div className="col-md-2 machart">
                    <button id="popcart" className="btn btn-default btn-chart btn-sm "><span className="mychart">{this.renderCartHeader} items</span>|<span className="allprice">{this.totalPrice()}</span></button>
                  </div>

                </div>
              </div>
            </div>
          </div>{/*end main-nav */}

        </div>
      )
      }

      else if(this.props.useradmin.length > 0){
        return (
          <div>

            <div className="header">{/*Header */}
              <div className="container">
                <div className="row">
                  <div className="col-xs-6 col-md-4 main-logo">
                    <a href="/">{this.props.navBrand}</a>
                  </div>
                  <div className="col-md-8">
                    <div className="pushright">
                      <div className="top">
                      
                      <Link to="/"><button className="btn btn-danger" onClick={this.onLogOutSelect}>ADMIN LOGOUT</button></Link>
                        <div className="srch-wrap">
                          <a href="#" id="srch" className="btn btn-default btn-search"><i className="fa fa-search" /></a>
                        </div>
                        <div className="srchwrap">
                          <div className="row">
                            <div className="col-md-12">
                              <form className="form-horizontal" role="form">
                                <div className="form-group">
                                  <label htmlFor="search" className="col-sm-2 control-label">Search</label>
                                  <div className="col-sm-10">
                                    <input type="text" className="form-control" id="search" />
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashed" />
            </div>{/*Header */}  
          

            <div className="main-nav">{/*end main-nav */}
              <div className="navbar navbar-default navbar-static-top">
                <div className="container">
                  <div className="row">
                    <div className="col-md-10">
                      <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                          <span className="icon-bar" />
                          <span className="icon-bar" />
                          <span className="icon-bar" />
                        </button>
                      </div>
                      <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                          <li><a href="/" className="active">Home</a><div className="curve" /></li>
                          
                          {/* <li><a href="page-sidebar.html">About</a></li> */}
                          <li><Link to="/profil"><NavLink>Profil</NavLink></Link></li>
                          <li><Link to="/manageproduk"><NavLink>Manage Produk</NavLink></Link></li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-md-2 machart">
                      <button className="btn btn-default btn-chart btn-sm "><span className="myacc">Admin Area</span></button>
                      <div className="clearfix" />
                    </div>

                  </div>
                </div>
              </div>
            </div>{/*end main-nav */}

          </div>
        )
        }
      
  }
}

const mapStateToProps = (state) => {
  return { username: state.auth.username, useradmin: state.authAdmin.useradmin, isiCart: state.authItemCart }
}

export default connect(mapStateToProps, { onUserLogout, keepLogin, onAdminLogout, keepLoginMin, item_cart })(Header);