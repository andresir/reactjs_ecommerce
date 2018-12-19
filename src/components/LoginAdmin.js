import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { onAdminLogin } from '../actionAdmin';

const cookies = new Cookies();

class LoginAdmin extends Component {
    
    componentWillReceiveProps(newProps) {
        console.log('-------newProps')
        console.log(newProps)
        if(newProps.useradmin !== '') {
            cookies.set('IniNamaKukis', newProps.useradmin, { path: '/' })
        }
    }

    onBtnLoginClick = () => {
        var useradmin = this.refs.useradmin.refs.tbuseradmin.value;
        var password = this.refs.password.refs.tbPassword.value;
        this.props.onAdminLogin({useradmin, password}) // data dari action creator ,,ini buat naruh data ke global state
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
        if(this.props.useradmin === "") {
            return (
              <div>


                <div class="container">
                <div class="title-bg">
                
					<div className="title">ADMIN AREA</div>
				</div>

                <div className="col-md-6 det-desc">
                    <div className="productdata">
                    <div className="average">
                        <form role="form">
                     
                            <div className="alert btn-danger"><span>Masukkan useradmin & Password</span>
                            </div>
                       
                            <div className="clearfix" />
                       
                        </form>
                    </div>

                    <form className="form-horizontal ava" role="form">
                        <div className="form-group">
                        <label htmlFor="mem" className="col-sm-2 control-label">Useradmin</label>
                        <div className="col-sm-10">
                            <Input type="text" name="useradmin" ref="useradmin" innerRef="tbuseradmin" className="form-control newstler-input" placeholder="Enter useradmin" />
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
        useradmin: state.authAdmin.useradmin, 
        error: state.authAdmin.error, 
        loading: state.authAdmin.loading
    };
}

export default connect(mapStateToProps, { onAdminLogin })(LoginAdmin);