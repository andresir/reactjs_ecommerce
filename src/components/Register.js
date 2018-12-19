import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { onUserRegister } from '../actions';
import cs from '../style/images/cs.jpg';

const cookies = new Cookies();

class Register extends Component {

    componentWillReceiveProps(newProps) {
        if(newProps.username !== '') {
            cookies.set('IniNamaKukis', newProps.username, { path: '/' });
        }
    }

    onBtnRegisterClick = () => {
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var phone = this.refs.phone.value;
        var password = this.refs.password.value;

        this.props.onUserRegister({ username, email, password, phone });
    }

    renderError = () => {
        if(this.props.error.length > 0) {
            return <p className="alert alert-danger">{this.props.error}</p>;
        }
    }

    renderButton = () => {
        if(this.props.loading) {
            return <i className="fa fa-spinner fa-spin" style={{ fontSize: '54px' }}/>
        }
        return <input type="button" name="submit" id="submit" className="btn btn-danger btn-red" defaultValue="Register" onClick={this.onBtnRegisterClick} />
    }

    render() {
        console.log(this.props.username)
        if(this.props.username === '') {
            return (
                <div>
                    <div className="container">
                    <ul className="small-menu">{/*small-nav */}
                        <li><a href="#" className="myacc">My Account</a></li>
                        <li><a href="#" className="myshop">Shopping Chart</a></li>
                        <li><a href="#" className="mycheck">Checkout</a></li>
                    </ul>{/*small-nav */}
                    <div className="clearfix" />
                    <div className="lines" />
                    </div>
                    <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <div className="page-title-wrap">
                            <div className="page-title-inner">
                            <div className="row">
                                <div className="col-md-4">
                                <div className="bread"><a href="#">Home</a> › Register</div>
                                <div className="bigtitle">Register</div>
                                </div>
                                <div className="col-md-3 col-md-offset-5">
                                <button className="btn btn-danger btn-red btn-lg">Register Dulu Bro...</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <form className="form-horizontal checkout" role="form">
                        <div className="row">
                        <div className="col-md-6">
                            <div className="title-bg">
                            <div className="title">Personal Details</div>
                            </div>
                        
                            <div className="form-group">
                            <div className="col-sm-12">
                                <input ref="username" type="text" className="form-control" id="username" placeholder="Username" />
                            </div>
                            </div>

                            <div className="form-group">
                            <div className="col-sm-12">
                                <input ref="email" type="text" className="form-control" id="email" placeholder="Email" />
                            </div>
                            </div>

                            <div className="form-group">
                            <div className="col-sm-12">
                                <input ref="phone" type="text" className="form-control" id="No HP" id="phone" placeholder="No HP" />
                            </div>
                            </div>

                            <div className="form-group">
                            <div className="col-sm-12">
                                <input ref="password" type="password" className="form-control" id="Password" placeholder="Password" />
                            </div>
                            </div>
                        
                            
                            {this.renderError()}
                            {this.renderButton()}
                        </div>

                        <div className="col-md-6">
                            <div className="title-bg">
                            {/* <div className="title">Your address</div> */}
                            </div>
                        
                            <img src={cs} alt="Register" className="logo img-responsive" />
                        
                        </div>

                        </div>
                    </form>
                    <div className="spacer" />
                    </div>
                </div>
            ) 
        }

        return <Redirect to='/' />

    }
}

const mapStateToProps = (state) => {
    return { 
        username: state.auth.username, 
        loading: state.auth.loading, 
        error: state.auth.error 
    };
}

export default connect(mapStateToProps, { onUserRegister })(Register);