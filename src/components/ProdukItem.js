import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select_produk } from '../actions';

class ProdukItem extends Component {

    onItemClick = () => {
        this.props.select_produk(this.props.produk);
    }

    render() {
        const { img, nama, description, harga } = this.props.produk;
        return (
        
            // {img}
            // {nama}
            // {description}
            // {harga}
            
            <div onClick={this.onItemClick} className="col-md-4">
                <div className="productwrap">
                <div className="pr-img">
                    <div className="new" />
                        <img src={img} alt className="img-responsive" />
                    <div className="pricetag blue"><div className="inner">{harga}</div></div>
                </div>
                <span className="smalltitle"><a href="product.html">{nama}</a></span>
                <span className="smalldesc">Item no.: 1000</span>
                </div>
            </div>
            
            
        )
    }
}

export default connect(null, { select_produk })(ProdukItem);
