import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { onUserLogin } from '../actions';

const cookies = new Cookies();

class Login extends Component {
    
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        if(newProps.username !== '') {
            cookies.set('IniNamaKukis', newProps.username, { path: '/' })
        }
    }

    onBtnLoginClick = () => {
        var username = this.refs.username.refs.tbUsername.value;
        var password = this.refs.password.refs.tbPassword.value;
        this.props.onUserLogin({username, password}) // data dari action creator ,,ini buat naruh data ke global state
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
        return <button class="btn btn-danger" onClick={this.onBtnLoginClick}><span class="addchart">LOGIN</span></button>
    }

    render() {
        if(this.props.username === "") {
            return (
              <div>


                <div class="container">
                <div class="title-bg">
                
					<div className="title">MEMBER AREA</div>
				</div>

                <div className="col-md-6 det-desc">
                    <div className="productdata">
                    <div className="average">
                        <form role="form">
                     
                            <div className="alert btn-danger"><span>Masukkan Username & Password</span>
                            </div>
                       
                            <div className="clearfix" />
                       
                        </form>
                    </div>

                    <form className="form-horizontal ava" role="form">
                        <div className="form-group">
                        <label htmlFor="mem" className="col-sm-2 control-label">Username</label>
                        <div className="col-sm-10">
                            <Input type="text" name="username" ref="username" innerRef="tbUsername" className="form-control newstler-input" placeholder="Enter username" />
                        </div>
                        <div className="clearfix" />
                        <div className="dash" />
                        </div>
                        <div className="form-group">
                        <label htmlFor="color" className="col-sm-2 control-label">Password</label>
                        <div className="col-sm-10">
                            <Input type="password" name="password" ref="password" innerRef="tbPassword" className="form-control newstler-input" placeholder="Enter password" />
                        </div>
                        <div className="clearfix" />
                        <div className="dash" />
                        </div>
                        <div className="form-group">
                        <label htmlFor="qty" className="col-sm-2 control-label"></label>
                        <div className="col-sm-8">
                        {this.renderError()}
                        {this.renderButton()}
                        </div>
                        <div className="clearfix" />
                        </div>
                    </form>
           
                    </div>
                </div>

                </div>

              </div>
            )
        }

        return <Redirect to="/" />
        
    }
}

const mapStateToProps = (state) => {
    return { 
        username: state.auth.username, 
        error: state.auth.error, 
        loading: state.auth.loading
    };
}

export default connect(mapStateToProps, { onUserLogin })(Login);