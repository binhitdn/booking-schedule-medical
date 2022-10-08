import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Speciality.scss';
import Slider from "react-slick";
import * as actions from '../../../store/actions';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widthScreen: window.innerWidth
        }
    }

    componentDidMount() {
        window.addEventListener("resize", ()=>{
            this.setState({
                widthScreen: window.innerWidth
            })
            console.log("Width Redux: ",this.screenWidth);
        });
    }
    numberOfDiv = () => {
        let thisWidth = this.state.widthScreen;
        if(thisWidth > 1150) {
            return 4;
        } else if(thisWidth >840) {
            return 3;
        } else if(thisWidth > 500) {
            return 2;
        } else {
            return 1;
        }
            
        
    }
    
    render() {
        console.log("Test: ",this.state.widthScreen)
        let settings = {
            infinite: true,
            speed: 500,
            slidesToShow: this.numberOfDiv(),
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1500
        };

        return (
           
            <div className="section-specialty">
                <div className="specialty-content">
                <Slider {...settings}>
      <div className="img-customize">
            <div className="section-specialty-item">
                <div style={{
                    background: `url('https://cdn.bookingcare.vn/fo/2022/08/02/232252-cam-bien-dau-doc-freestyle-libre.jpg')`
                }}>               </div>
                <h4>Xét nghiệm COVID</h4>
                <ul>
                    <li>Tầm soát và xác định COVID-19</li>
                    <li>Phương pháp Test nhanh </li>
                    <li>Theo quy chuẩn Bộ Y tế</li>
                </ul>
                <a href="#">XEM THÊM <i className="fa-solid fa-share-from-square"></i></a>
            </div>
      </div>
      <div className="img-customize">
            <div className="section-specialty-item">
                <div style={{
                    background: `url('https://cdn.bookingcare.vn/fo/2022/08/02/232252-cam-bien-dau-doc-freestyle-libre.jpg')`
                }}>               </div>
                <h4>Xét nghiệm COVID</h4>
                <ul>
                    <li>Tầm soát và xác định COVID-19</li>
                    <li>Phương pháp Test nhanh </li>
                    <li>Theo quy chuẩn Bộ Y tế</li>
                </ul>
                <a href="#">XEM THÊM <i className="fa-solid fa-share-from-square"></i></a>
            </div>
      </div>
      <div className="img-customize">
            <div className="section-specialty-item">
                <div style={{
                    background: `url('https://cdn.bookingcare.vn/fo/2022/08/02/232252-cam-bien-dau-doc-freestyle-libre.jpg')`
                }}>               </div>
                <h4>Xét nghiệm COVID</h4>
                <ul>
                    <li>Tầm soát và xác định COVID-19</li>
                    <li>Phương pháp Test nhanh </li>
                    <li>Theo quy chuẩn Bộ Y tế</li>
                </ul>
                <a href="#">XEM THÊM <i className="fa-solid fa-share-from-square"></i></a>
            </div>
      </div>
      <div className="img-customize">
            <div className="section-specialty-item">
                <div style={{
                    background: `url('https://cdn.bookingcare.vn/fo/2022/08/02/232252-cam-bien-dau-doc-freestyle-libre.jpg')`
                }}>               </div>
                <h4>Xét nghiệm COVID</h4>
                <ul>
                    <li>Tầm soát và xác định COVID-19</li>
                    <li>Phương pháp Test nhanh </li>
                    <li>Theo quy chuẩn Bộ Y tế</li>
                </ul>
                <a href="#">XEM THÊM <i className="fa-solid fa-share-from-square"></i></a>
            </div>
      </div>
      <div className="img-customize">
            <div className="section-specialty-item">
                <div style={{
                    background: `url('https://cdn.bookingcare.vn/fo/2022/08/02/232252-cam-bien-dau-doc-freestyle-libre.jpg')`
                }}>               </div>
                <h4>Xét nghiệm COVID</h4>
                <ul>
                    <li>Tầm soát và xác định COVID-19</li>
                    <li>Phương pháp Test nhanh </li>
                    <li>Theo quy chuẩn Bộ Y tế</li>
                </ul>
                <a href="#">XEM THÊM <i className="fa-solid fa-share-from-square"></i></a>
            </div>
      </div>
      
      
    </Slider>
                </div>
            </div>
          
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
