import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import { getScheduleDoctorByDate, getDetailDoctorById } from '../../../services/userService'
import "./DoctorSchedule.scss"
import moment from 'moment'
import localization from '../../../../node_modules/moment/locale/vi'
import { isArrayBindingPattern } from 'typescript';
import { languages } from '../../../utils/constant'



class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {



        }
    }
    async componentDidMount() { }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.lang !== this.props.lang) {
            let language = this.props.lang;
            this.getSelectDate(language)

        }
    }
    render() {
        return (
            <div></div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};



export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
