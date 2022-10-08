import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Speciality from './Section/Speciality';
import Sliders from './Slider/Sliders.jsx';
import Specialities from './Section/Specialities';
import OutStandingDoctor from './Section/OutStangdingDoctor';
import HospitalTrend from './Section/HospitalTrend';
import Reviewer from './Section/Reviewer';

class HomePage extends Component {

    render() {

        return (
            <div style={{overflow: "hidden"}}>
                <Sliders />
               
                <Speciality />
                <Specialities />
                <OutStandingDoctor />
                <HospitalTrend />
                
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
