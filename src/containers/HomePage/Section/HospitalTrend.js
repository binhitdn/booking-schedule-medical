import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialities.scss';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Specialties extends Component {
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
        if(thisWidth > 875) {
            return 4;
        } else if(thisWidth >600) {
            return 3;
        } else if(thisWidth > 380) {
            return 2;
        } else {
            return 1;
        }
            
        
    }

    render() {
        let settings = {
            infinite: true,
            speed: 500,
            slidesToShow: this.numberOfDiv(),
            slidesToScroll: 1,
            autoplaySpeed: 2000
        };

        return (       
            <div className="section-specialties">
                <h4>Chuyên khoa phổ biến</h4>
                <div className="specialty-content">
                <Slider {...settings}>
      <div className="img-customize">
            <div className="section-specialty-item">
                <div style={{
                    background: `url('https://photo-cms-tpo.zadn.vn/w890/Uploaded/2022/tqdqdw-jxqdxjhqd/2021_05_03/116796747-3467421396635018-7866457779342926796-n-6939.jpeg')`
                }}>               </div>
                <p>Bệnh viện Hoàn Mỹ Đà Nẵng

                </p>
            </div>
      </div>
      <div className="img-customize">
            <div className="section-specialty-item">
                <div style={{
                    background: `url('https://thuocdantoc.vn/wp-content/uploads/2018/12/benh-vien-da-khoa-tam-tri-da-nang.jpeg')`
                }}>               </div>
                <p>Bệnh viện Tâm Trí Đà Nẵng</p>
            </div>
      </div>
      <div className="img-customize">
            <div className="section-specialty-item">
                <div style={{
                    background: `url('https://thuocdantoc.vn/wp-content/uploads/2018/12/benh-vien-da-khoa-tam-tri-da-nang.jpeg')`
                }}>               </div>
                <p>Bệnh viện Tâm Trí Đà Nẵng</p>
            </div>
      </div>
      <div className="img-customize">
            <div className="section-specialty-item">
                <div style={{
                    background: `url('https://thuocdantoc.vn/wp-content/uploads/2018/12/benh-vien-da-khoa-tam-tri-da-nang.jpeg')`
                }}>               </div>
                <p>Bệnh viện Tâm Trí Đà Nẵng</p>
            </div>
      </div>
      <div className="img-customize">
            <div className="section-specialty-item">
                <div style={{
                    background: `url('https://thuocdantoc.vn/wp-content/uploads/2018/12/benh-vien-da-khoa-tam-tri-da-nang.jpeg')`
                }}>               </div>
                <p>Bệnh viện Tâm Trí Đà Nẵng</p>
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



export default connect(mapStateToProps, mapDispatchToProps)(Specialties);
