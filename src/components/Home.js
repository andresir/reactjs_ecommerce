import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { connect } from 'react-redux';

// import cs from './style/images/logo.png';

// import { onUserLogout, keepLogin } from '../actions';

// const cookies = new Cookies();

class Home extends Component {
    

    render() {
        // console.log(this.props.username)

        // Untuk carousel
        const settings = {
          dots: true,
          autoplay: true,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1
        };
        
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
                  <h2>{this.props.pikachu} {this.props.username} {this.props.useradmin}</h2>
                </div>

                <div className="container" style={{ marginTop: "20px" }}>
                <Slider {...settings}>
                  <div><img src='http://entrepreneurcamp.id/wp-content/uploads/2017/12/bidang-manajemen-bisnis.jpg' alt="Credit to Joshua Earle on Unsplash"/></div>
                  <div><img src='http://entrepreneurcamp.id/wp-content/uploads/2017/12/bidang-manajemen-bisnis.jpg' alt="Credit to Alisa Anton on Unsplash"/></div>
                  <div><img src='http://entrepreneurcamp.id/wp-content/uploads/2017/12/bidang-manajemen-bisnis.jpg' alt="Credit to Igor Ovsyannykov on Unsplash"/></div>
                  <div><img src='http://entrepreneurcamp.id/wp-content/uploads/2017/12/bidang-manajemen-bisnis.jpg' alt="Credit to Pierre Châtel-Innocenti on Unsplash"/></div>
                  <div><img src='http://entrepreneurcamp.id/wp-content/uploads/2017/12/bidang-manajemen-bisnis.jpg' alt="Credit to Richard Nolan on Unsplash"/></div>
                  {/* <div><img src={require('../style/images/logo.png')} alt="Credit to Cristina Gottardi on Unsplash"/></div> */}
                </Slider>
                </div>

              </div>
            )
        
    }
}

const mapStateToProps = (state) => {
  return { pikachu: state.pikachu, username: state.auth.username, useradmin: state.authAdmin.useradmin };
}

export default connect(mapStateToProps)(Home);