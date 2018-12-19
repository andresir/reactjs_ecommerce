import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { connect } from 'react-redux';
// import { select_produk } from '../actions';
import { select_produk, tambahCart } from '../actions'

class ProdukDetail extends Component {

    ////cara params ---> http://localhost:3000/produkdetail/2
    // componentDidMount(){
    //     //untuk mendapatkan link / akses ke id / buat GET id
    //     var produkId = this.props.match.params.id;
    //     axios.get(`http://localhost:1997/produk/${produkId}`)
    //     .then((res) => {
    //         this.props.select_produk(res.data)
    //         // console.log(res)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }


    //cara query-string ---> http://localhost:3000/produkdetail?produkid=2&namaproduk=bronson
    componentDidMount(){
        //untuk mendapatkan link / akses ke id / buat GET id
        // var produkId = this.props.match.params.id;

        var params = queryString.parse(this.props.location.search);
        var produkId = params.produkid;
        // console.log(params)
        axios.get(`http://localhost:1997/popok/${produkId}`)
        .then((res) => {
            this.props.select_produk(res.data)
            // console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }


    onToCart = () => {
       


        // var nama = this.refs.namaAdd.value;
        // var merk = this.refs.merkAdd.value;
        var jumlahBeli = this.refs.jumlahBeli.value;
        // var img = this.refs.imgAdd.value;
        // var description = this.refs.descAdd.value;
        
        var { nama, harga, img, description, merk } = this.props.produk;
        axios.post('http://localhost:1997/orders' , {

          username : this.props.username,
          qty: jumlahBeli,
          totalHarga: jumlahBeli * harga
        
        }).then((res) => {
            (window.alert('Produk berhasil dimasukan ke Keranjang'))
          console.log(res)
          
          this.props.tambahCart() 
        }).catch((err) => {
          console.log(err)
        })
        }
    

    render() {
        
        var { nama, harga, img, description, merk } = this.props.produk;
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
                                <button className="btn btn-danger btn-red btn-sm" onClick={this.onToCart}><span className="addchart">Add To Chart</span></button>
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
                            <div className="avatock"><span>{this.props.hargaNya}</span></div>
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
    return { produk: state.selectedProduk, username: state.auth.username }
}

export default connect(mapStateToProps, { select_produk, tambahCart })(ProdukDetail);