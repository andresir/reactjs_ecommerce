import React, { Component } from 'react';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { select_produk } from '../actions';
import { item_cart } from '../actionsCart';

class ProdukDetail extends Component {

    state = { listCart: [] }

    //cara query-string ---> http://localhost:3000/popokdetail?popokid=2&namapopok=bronson
    // cdidmount ini digunakan agar setelah render page detail produk biar gak ilang
    componentDidMount(){
        //untuk mendapatkan link / akses ke id / buat GET id
        // var popokId = this.props.match.params.id;

        var params = queryString.parse(this.props.location.search);
        var popokId = params.produkid;
        axios.get(`${API_URL_1}/popok/${popokId}`)
        .then((res) => {
            this.props.select_produk(res.data)
            // console.log(res)
        }).catch((err) => {
            console.log(err)
        })

        this.getCartList();
        this.props.item_cart(this.props.username);
    }


    //untuk menampilkan keranjang belanja berdasarkan username
    getCartList = () => {
        axios.get(API_URL_1 + '/orders', {
            params: {
                username: this.props.username
            }
        }).then((res) => {
            this.setState({ listCart: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    onToCart = () => {
        var params = queryString.parse(this.props.location.search);
        var popokId = params.produkid;

        var jumlahBeli = parseInt(this.refs.jumlahBeli.value);
        
        var { nama, harga, img, merk } = this.props.produk;
        axios.post(API_URL_1 + '/orders', {

            username : this.props.username, produkId: popokId, nama, harga, img, merk, qty: jumlahBeli, totalHarga: harga*jumlahBeli,
            date: new Date()
        
        }).then((res) => {
            // this.setState({ listCart: res.data })
            this.getCartList();
            this.props.item_cart(this.props.username);

            (window.alert('Produk berhasil dimasukan ke Keranjang'))

        }).catch((err) => {
            console.log(err)
        })
    }

    renderTotalCart = () => {
        console.log('xxxxxxxxxxxxxxxxxxxxxxx')
        console.log(this.props.isiCart)
        return(
            this.props.isiCart.length
        )
    }
    

    render() {
        
        var { nama, harga, img, description, merk } = this.props.produk;
        // var { namaNya } = this.props.isiCart;
        return(
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
                            <div className="bread"><a href="#">Home</a> › Product Detail</div>
                            <div className="bigtitle">Product Detail</div>
                            </div>
                            <div className="col-md-3 col-md-offset-5">
                            <button className="btn btn-default btn-red btn-lg">Purchase Theme</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9">{/*Main content*/}
                    <div className="title-bg">
                        <div className="title">{merk}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="dt-img">
                                <div className="detpricetag"><div className="inner">{harga}</div></div>
                                <a className="fancybox" href={img} data-fancybox-group="gallery" title={merk}><img src={img} alt className="img-responsive" /></a>
                            </div>
                        </div>
                        <div className="col-md-6 det-desc">
                        <div className="productdata">
                            <div className="infospan">Model <span>PT - 3</span></div>
                            <div className="infospan">Item no <span>2522</span></div>
                            <div className="infospan">Manufacturer <span>Nikon</span></div>
                            <div className="average">
                            <form role="form">
                                <div className="form-group">
                                <div className="rate"><span className="lbl">Average Rating</span>
                                </div>
                                <div className="starwrap">
                                    <div id="score" />
                                </div>
                                <div className="clearfix" />
                                </div>
                            </form>
                            </div>
                            <h4>Available Options</h4>
                            <form className="form-horizontal ava" role="form">
                            <div className="form-group">
                                <label htmlFor="mem" className="col-sm-2 control-label">Memory</label>
                                <div className="col-sm-10">
                                <select className="form-control" id="mem">
                                    <option>Blank 1</option>
                                </select>
                                </div>
                                <div className="clearfix" />
                                <div className="dash" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="color" className="col-sm-2 control-label">Color</label>
                                <div className="col-sm-10">
                                <select className="form-control" id="color">
                                    <option>Blank 1</option>
                                
                                </select>
                                </div>
                                <div className="clearfix" />
                                <div className="dash" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="qty" className="col-sm-2 control-label">Qty</label>
                                <div className="col-sm-4">

                                {/* <input type="number" ref='qty' innerRef = 'innerqty' defaultValue = '1'/> */}

                                {/* <input ref="jumlahBeli" type="number" placeholder="Harga Produk" /> */}
                                
                                    <select ref="jumlahBeli">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select> 

                                </div>
                                <div className="col-sm-4">
                                {/* <input type="button" className="btn-danger" value='Add' onClick={this.onToCart}/> */}
                                {/* <button className="btn btn-danger btn-red btn-sm" onClick={this.onToCart}><span className="addchart">Add To Chart</span></button> */}
                                <input className="btn btn-danger btn-red btn-sm" onClick={this.onToCart} type="button" value="Add To Cart" />
                                </div>
                                <div className="clearfix" />
                            </div>
                            </form>
                            <div className="sharing">
                            <div className="share-bt">
                                <div className="addthis_toolbox addthis_default_style ">
                                <a className="addthis_counter addthis_pill_style" />
                                </div>
                                <div className="clearfix" />
                            </div>
                            <div className="avatock"><span>{this.state.listCart.length} // {this.renderTotalCart()}</span></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="tab-review">
                        <ul id="myTab" className="nav nav-tabs shop-tab">
                        <li className="active"><a href="#desc" data-toggle="tab">Description</a></li>
                        </ul>
                        <div id="myTabContent" className="tab-content shop-tab-ct">
                        <div className="tab-pane fade active in" id="desc">
                            <p>
                                {description}
                            </p>
                        </div>
                        
                        </div>
                    </div>
                    </div></div></div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return { produk: state.selectedProduk, username: state.auth.username, isiCart: state.authItemCart }
}

export default connect(mapStateToProps, { select_produk, item_cart })(ProdukDetail);