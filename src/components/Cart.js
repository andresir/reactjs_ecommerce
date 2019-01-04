import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';
import { item_cart } from '../actionsCart';

class Cart extends Component {

    state = { idProduk: 0, hargaProduk: 0, diskon: 0 }

    componentDidMount(){

        this.props.item_cart(this.props.username);

    }

    //Edit quantity
    onBtnEdit = (idNya, hargaNya) => {  
        this.setState({ idProduk: idNya, hargaProduk: hargaNya })   
    }

    //Cancel edit
    onBtnCancel = () => {  
        this.setState({ idProduk: 0, hargaProduk: 0 })   
    }

    //Save edit
    onBtnSave = (idNya) => {
        var qty = parseInt(this.refs.qtySAVE.value);

        if(qty === 0){
            return(
                (window.alert('Quantity tidak boleh 0 !!!')),
                this.setState({idProduk: 0, hargaProduk: 0})  
            )
        }

        axios.patch(API_URL_1 + '/orders/' + idNya, {
            qty, totalHarga: qty*this.state.hargaProduk
        }).then((res) => {
            this.setState({idProduk: 0, hargaProduk: 0});
            this.props.item_cart(this.props.username);
        }).catch((err) => {
            console.log(err)
        })
    }

    //Delete item di cart
    onBtnDelete = (idNya) => {
        if(window.confirm('Anda akan hapus item produk ini ?')){
            axios.delete(API_URL_1 + '/orders/' + idNya)
                .then((res) => {
                    this.props.item_cart(this.props.username);
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    //Total Bayar
    totalPrice = () => {
        var cost = 0;
        var totalJumlah = this.props.isiCart.map(({ totalHarga }) => {
            return (
                cost += totalHarga
            )
        })
        return cost;
    }

    //TES KUPON DISKON --------------------------------------------------------------------------------
    //tes Diskon
    renderDiskon = () => {
        var inputDiskon = this.refs.diskon.value;
        var total = 0;
        var cost = 0;
        var totalJumlah = this.props.isiCart.map(({ totalHarga }) => {
            return (
                cost += totalHarga
            )
        })

        if(inputDiskon === 'DISKON10' || inputDiskon === 'Diskon10' || inputDiskon === 'diskon10'){
            if(window.confirm('SELAMAT, Anda dapat diskon 10%')){
                total = cost * 10/100
                this.setState({ diskon: total })
            }
        }else{
            if(window.confirm('UPS... Kode Diskon Anda tidak valid !!!')){
                this.setState({ diskon: 0 })
            }
        }
        
    }

    tampilDiskon = () => {
        if(this.state.diskon === 0){
            return 'NO'
        }
        return(
            this.state.diskon
        )
    }

    totalBayar = () => {
        var bayar = 0;
        var cost = 0;
        var totalJumlah = this.props.isiCart.map(({ totalHarga }) => {
            return (
                cost += totalHarga
            )
        })

        bayar = cost - this.state.diskon
        return bayar;
    }
    //AKHIR TES KUPON DISKON --------------------------------------------------------------------------------

    //menampilkan item cart dari global state
    renderCart = () => {

        // if(this.props.isiCart.length === 0){
        //     return (
        //         <button className="btn btn-default btn-red btn-lg">Keranjang Belanja Anda Masih Kosong !!!</button> 
        //     )
        // }

        var listDalamCart = this.props.isiCart.map((e, index) => {
            if(this.state.idProduk === e.id){
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td><img src={e.img} width={40} alt /></td>
                        <td>{e.nama}</td>
                        <td>{e.harga}</td>
                        {/* <td>{e.qty}</td> */}
                        <td><form><input ref="qtySAVE" type="text" className="form-control quantity" defaultValue={e.qty} /></form></td>
                        <td>{e.totalHarga}</td>
                        <td><input className="btn btn-warning btn-blue btn-sm" type="button" value="Save" onClick={() => this.onBtnSave(e.id)} /></td>
                        <td><input className="btn btn-primary btn-sm" type="button" value="Cancel" onClick={this.onBtnCancel}/></td>
                    </tr>
                )
            }else{
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td><img src={e.img} width={40} alt /></td>
                        <td>{e.nama}</td>
                        <td>{e.harga}</td>
                        <td>{e.qty}</td>
                        {/* <td><form><input type="text" className="form-control quantity" /></form></td> */}
                        <td>{e.totalHarga}</td>
                        <td><input className="btn btn-success btn-blue btn-sm" type="button" value="Edit" onClick={() => this.onBtnEdit(e.id, e.harga)} /></td>
                        <td><input className="btn btn-danger btn-red btn-sm" type="button" value="Delete" onClick={() => this.onBtnDelete(e.id)} /></td>
                    </tr>
                )
            } 
        })
        return listDalamCart;
    }

    render(){
        if(this.props.username !== "") {

            if(this.props.isiCart.length === 0){
                return (
                    <div>
                        <div className="container">
                            <ul className="small-menu">{/*small-nav */}
                                <li><a href className="myacc">My Account</a></li>
                                <li><a href className="myshop">Shopping Chart</a></li>
                                <li><a href className="mycheck">Checkout</a></li>
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
                                        <button className="btn btn-danger btn-red btn-lg">Keranjang Belanja Anda Masih Kosong !!!</button>
                                        </div>
                                        <div className="col-md-3 col-md-offset-5">
                                        <button className="btn btn-default btn-red btn-lg">Lihat Produk</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                            <div className="spacer" />
                            </div>
                    </div>
                )
            }

            return(
                <div>
                    <div className="container">
                        <ul className="small-menu">{/*small-nav */}
                            <li><a href className="myacc">My Account</a></li>
                            <li><a href className="myshop">Shopping Chart</a></li>
                            <li><a href className="mycheck">Checkout</a></li>
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
                                    <div className="bread"><a href="#">Home</a> › Shopping Cart</div>
                                    <div className="bigtitle">Shopping Cart</div>
                                    </div>
                                    <div className="col-md-3 col-md-offset-5">
                                    <button className="btn btn-default btn-red btn-lg">Purchase Theme</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="title-bg">
                            <div className="title">Shopping Cart</div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-bordered chart">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Image</th>
                                        <th>Nama Produk</th>
                                        <th>Harga</th>
                                        <th>Quantity</th>
                                        <th>Total Harga</th>
                                        <th colSpan="2">Action</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderCart()}
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                            <form className="form-horizontal coupon" role="form">
                                <div className="form-group">
                                <label htmlFor="coupon" className="col-sm-10 control-label">TES KODE DISKON 10%: Input Kode "<b>DISKON10</b>"</label>
                                
                                </div>
                            </form>
                            <form className="form-horizontal coupon" role="form">
                                <div className="form-group">
                                <label htmlFor="coupon2" className="col-sm-3 control-label">Coupon Code</label>
                                <div className="col-sm-7">
                                    <input type="text" ref="diskon" className="form-control " id="coupon2" placeholder="Kode Diskon" />
                                </div>
                                <div className="col-sm-2">
                                    <input className="btn btn-primary btn-sm" type="button" value="OK" onClick={this.renderDiskon}/>
                                </div>
                                </div>
                            </form>
                            </div>
                            <div className="col-md-3 col-md-offset-3">
                            <div className="subtotal-wrap">
                                <div className="subtotal">
                                <p>Sub Total : {this.totalPrice()}</p>
                                <p>Diskon 10% : {this.tampilDiskon()}</p>
                                </div>
                                <div className="total">Total : <span className="bigprice">{this.totalBayar()}</span></div>
                                <div className="clearfix" />
                                <a href className="btn btn-primary btn-red btn-lg">Checkout</a>
                                <a href className="btn btn-warning btn-yellow">Continue Shopping</a>
                            </div>
                            <div className="clearfix" />
                            </div>
                        </div>
                        <div className="spacer" />
                        </div>
                </div>
            )
        }

        return <Redirect to='/' />

    }
}

const mapStateToProps = (state) => {
    return { username: state.auth.username, isiCart: state.authItemCart }
}

export default connect(mapStateToProps, { item_cart })(Cart);