import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutStandingDoctor.scss';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router'


class OutStangdingDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            doctors: [],

            widthScreen: window.innerWidth

        }
    }
    async componentDidMount() {
        await this.props.fetchAllDoctorStart();
        this.setState({
            name: this.props.doctorsRedux
        })
        this.setState({
            users: this.props.userRedux
        })
        window.addEventListener("resize", () => {
            this.setState({
                widthScreen: window.innerWidth
            })
        });
    }
    componentDidUpdate(prevProps, preState, snapshot) {
        if (prevProps.doctorsRedux !== this.props.doctorsRedux) {
            let arrDoctors = this.props.doctorsRedux;
            this.setState({
                doctors: arrDoctors
            })
        }
    }
    parsePhoto = (user) => {
        if (user.image) {

            return new Buffer(user.image, 'base64').toString('binary');

        } else {
            return "";
        }
    }
    numberOfDiv = () => {
        let thisWidth = this.state.widthScreen;
        if (thisWidth > 875) {
            return 4;
        } else if (thisWidth > 600) {
            return 3;
        } else if (thisWidth > 380) {
            return 2;
        } else {
            return 1;
        }


    }
    handleViewDoctor = (info) => {
        this.props.history.push(`/doctors/${info.id}`);
    }

    render() {
        let doctors = this.state.doctors;
        let settings = {
            infinite: true,
            speed: 500,
            slidesToShow: this.numberOfDiv(),
            slidesToScroll: 1,
            autoplaySpeed: 2000,
        };


        return (

            <div className="section-doctor-trend">
                <div class="section-specialties-title">
                    <h4>Bác Sĩ Nổi Bật</h4>
                    <a href="#">XEM THÊM</a>
                </div>
                <div className="specialty-content">
                    <Slider {...settings}>
                        {doctors.map((doctor, index) => {
                            return (
                                <div className="img-customize" key={index}
                                    onClick={() => { this.handleViewDoctor(doctor) }}
                                >
                                    <div className="section-doctor-trend-item">
                                        <div className="anh-bac-si" style={{
                                            background: `url(${this.parsePhoto(doctor)})`
                                        }}>

                                        </div>
                                    </div>

                                    <div className="name">
                                        <h6>{doctor.positionData.valueVi + " " + doctor.lastName + " " + doctor.firstName}</h6>
                                        <p>Khoa xương khớp</p>
                                    </div>
                                </div>
                            )
                        })}








                    </Slider>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        doctorsRedux: state.admin.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorStart: () => { dispatch(actions.fetchAllDoctorStart()) }
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStangdingDoctor));

