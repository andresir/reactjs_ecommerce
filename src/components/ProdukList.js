import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ProdukItem from './ProdukItem';

class ProdukList extends Component {

    state = { listProduk: [], searchListProduk: [] }

    componentDidMount() {
        axios.get('http://localhost:1997/popok')
            .then((res) => {
                this.setState({ listProduk: res.data, searchListProduk: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnSearchClick = () => {
        var nama = this.refs.searchNama.value;
        var merk = this.refs.searchMerk.value;
        var hargaMin = parseInt(this.refs.hargaMinSearch.value);
        var hargaMax = parseInt(this.refs.hargaMaxSearch.value);

        var arrSearch = this.state.ListProduk.filter((item) => {
            return item.merk.includes(merk) 
                    && item.harga >= hargaMin
                    && item.harga <= hargaMax
                    && item.nama.toLowerCase().includes(nama.toLowerCase())
        })

        this.setState({ searchListProduk: arrSearch })
    }


    renderListProduk = () => {
        var listJSXProduk = this.state.searchListProduk.map((item) => {
            return (
                <ProdukItem produk={item} />
            )
        })
        return listJSXProduk;
    }

    render() {
        if(this.props.username !== "") {
            if(this.props.produk.id !== 0) {
                // return <Redirect to={`/popokdetail/${this.props.popok.id}`} />
                // popokid
                return <Redirect to={`/produkdetail?produkid=${this.props.produk.id}&namaproduk=${this.props.produk.nama}`} />
            }
            return (
                <div>

                    <div className="container">

                        <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-wrap">
                            <div className="page-title-inner">
                                <div className="row">
                                <div className="col-md-4">
                                    <div className="bread"><a href="#">Home</a> › Category</div>
                                    <div className="bigtitle">Category</div>
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
                        <div className="col-md-9">

                            <div className="title-bg">
                            <div className="title">Category - All products</div>
                            <div className="title-nav">
                                <a href="category.html"><i className="fa fa-th-large" />grid</a>
                                <a href="category-list.html"><i className="fa fa-bars" />List</a>
                            </div>
                            </div>

                            <div className="row prdct">
                            {this.renderListProduk()}
                            </div>
                            
                        </div>
                        </div>
                    </div>


                 </div>
                    
                 
                
            );
        }
        
        return <Redirect to='/login' />
    }
}

const mapStateToProps = (state) => {
    return { username: state.auth.username, produk: state.selectedProduk }
}

export default connect(mapStateToProps)(ProdukList);