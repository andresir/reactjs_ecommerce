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

    render() {

        console.log(this.props.username.length)

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
                            <div className="regwrap">
                              <div className="row">
                                <div className="col-md-6 regform">
                                  <div className="title-widget-bg">
                                    <div className="title-widget">Login</div>
                                  </div>
                                  <form role="form">
                                    <div className="form-group">
                                      <input type="text" className="form-control" id="username" placeholder="Username" />
                                    </div>
                                    <div className="form-group">
                                      <input type="password" className="form-control" id="password" placeholder="password" />
                                    </div>
                                    <div className="form-group">
                                      <button className="btn btn-default btn-red btn-sm">Sign In</button>
                                    </div>
                                  </form>
                                </div>
                                <div className="col-md-6">
                                  <div className="title-widget-bg">
                                    <div className="title-widget">Register</div>
                                  </div>
                                  <p>
                                    New User? By creating an account you be able to shop faster, be up to date on an order's status...
                                  </p>
                                  <button className="btn btn-default btn-yellow">Register Now</button>
                                </div>
                              </div>
                            </div>
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
                          <div className="popcart">
                            <table className="table table-condensed popcart-inner">
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="product.html"><img src="images/dummy-1.png" alt className="img-responsive" /></a>
                                  </td>
                                  <td><a href="product.html">Casio Exilim Zoom</a><br /><span>Color: green</span></td>
                                  <td>1X</td>
                                  <td>$138.80</td>
                                  <td><a href="#"><i className="fa fa-times-circle fa-2x" /></a></td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="product.html"><img src="images/dummy-1.png" alt className="img-responsive" /></a>
                                  </td>
                                  <td><a href="product.html">Casio Exilim Zoom</a><br /><span>Color: green</span></td>
                                  <td>1X</td>
                                  <td>$138.80</td>
                                  <td><a href="#"><i className="fa fa-times-circle fa-2x" /></a></td>
                                </tr>
                                <tr>
                                  <td>
                                    <a href="product.html"><img src="images/dummy-1.png" alt className="img-responsive" /></a>
                                  </td>
                                  <td><a href="product.html">Casio Exilim Zoom</a><br /><span>Color: green</span></td>
                                  <td>1X</td>
                                  <td>$138.80</td>
                                  <td><a href="#"><i className="fa fa-times-circle fa-2x" /></a></td>
                                </tr>
                              </tbody>
                            </table>
                            <span className="sub-tot">Sub-Total : <span>$277.60</span> | <span>Vat (17.5%)</span> : $36.00 </span>
                            <br />
                            <div className="btn-popcart">
                              <a href="checkout.html" className="btn btn-default btn-red btn-sm">Checkout</a>
                              <a href="cart.html" className="btn btn-default btn-red btn-sm">More</a>
                            </div>
                            <div className="popcart-tot">
                              <p>
                                Total<br />
                                <span>$313.60</span>
                              </p>
                            </div>
                            <div className="clearfix" />
                          </div>
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
                        <button id="popcart" className="btn btn-default btn-chart btn-sm "><span className="mychart">Cart</span>|<span className="allprice">$0.00</span></button>
                        <div className="popcart">
                          <table className="table table-condensed popcart-inner">
                            <tbody>
                              <tr>
                                <td>
                                  <a href="product.html"><img src="images/dummy-1.png" alt className="img-responsive" /></a>
                                </td>
                                <td><a href="product.html">Casio Exilim Zoom</a><br /><span>Color: green</span></td>
                                <td>1X</td>
                                <td>$138.80</td>
                                <td><a href="#"><i className="fa fa-times-circle fa-2x" /></a></td>
                              </tr>
                              <tr>
                                <td>
                                  <a href="product.html"><img src="images/dummy-1.png" alt className="img-responsive" /></a>
                                </td>
                                <td><a href="product.html">Casio Exilim Zoom</a><br /><span>Color: green</span></td>
                                <td>1X</td>
                                <td>$138.80</td>
                                <td><a href="#"><i className="fa fa-times-circle fa-2x" /></a></td>
                              </tr>
                              <tr>
                                <td>
                                  <a href="product.html"><img src="images/dummy-1.png" alt className="img-responsive" /></a>
                                </td>
                                <td><a href="product.html">Casio Exilim Zoom</a><br /><span>Color: green</span></td>
                                <td>1X</td>
                                <td>$138.80</td>
                                <td><a href="#"><i className="fa fa-times-circle fa-2x" /></a></td>
                              </tr>
                            </tbody>
                          </table>
                          <span className="sub-tot">Sub-Total : <span>$277.60</span> | <span>Vat (17.5%)</span> : $36.00 </span>
                          <br />
                          <div className="btn-popcart">
                            <a href="checkout.html" className="btn btn-default btn-red btn-sm">Checkout</a>
                            <a href="cart.html" className="btn btn-default btn-red btn-sm">More</a>
                          </div>
                          <div className="popcart-tot">
                            <p>
                              Total<br />
                              <span>$313.60</span>
                            </p>
                          </div>
                          <div className="clearfix" />
                        </div>
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
  
                      {/* Keranjang Belanja (CART) */}
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
  return { username: state.auth.username, useradmin: state.authAdmin.useradmin }
}

export default connect(mapStateToProps, { onUserLogout, keepLogin, onAdminLogout, keepLoginMin })(Header);