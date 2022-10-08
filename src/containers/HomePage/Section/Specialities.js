import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialities.scss';
import Slider from "react-slick";
import {getAllSpeciality} from '../../../services/userService'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {withRouter} from 'react-router'

class Specialties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widthScreen: window.innerWidth,
            specialties: []
        }
    }
    async componentDidMount() {
        window.addEventListener("resize", ()=>{
            this.setState({
                widthScreen: window.innerWidth
            })
        });
        let specialties = await getAllSpeciality();
        this.setState({
            specialties: specialties.specialities
        })

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
    parsePhoto = (image) => {
        if (image) {

            return new Buffer(image, 'base64').toString('binary');

        } else {
            return "";
        }
    }
    handleViewSpeciality = (info) => {       
        this.props.history.push(`/specialities/${info.id}`);

    }

    render() {
        let {specialties} = this.state;
        console.log('specialty',specialties)
        let settings = {
            infinite: true,
            speed: 500,
            slidesToShow: this.numberOfDiv(),
            slidesToScroll: 1,
            autoplaySpeed: 2000
        };
        
       
        return (       
            <div className="section-specialties">
                <div class="section-specialties-title">
                <h4>Chuyên khoa phổ biến</h4>
                <a href="#">XEM THÊM</a>
                </div>
                <div className="specialty-content">
                <Slider {...settings}>
            {specialties && specialties.length > 0 && specialties.map((specialty, index) => {
                
                return (
                    <div className="img-customize" onClick={() => { this.handleViewSpeciality(specialty) }}>
                    <div className="section-specialty-item">
                        <div style={{
                            background: `url(${this.parsePhoto(specialty.image)})`
                        }}>           
                            </div>
                        <p>{specialty.name}</p>
                    </div>
              </div>
                )

            }
            )}

     
      
      
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



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialties))
