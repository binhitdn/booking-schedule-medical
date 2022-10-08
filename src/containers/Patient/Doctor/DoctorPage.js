import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from './DoctorSchedule'
import { getDetailDoctorById } from '../../../services/userService'
import './DoctorPage.scss'
import { withRouter } from 'react-router'




class DoctorPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            avatar: '',
            name: '',
            description: '',
            position: '',
            contentHTML: '',
            widthScreen: window.innerWidth,
            Doctor_Info: {}

        }
    }
    async componentDidMount() {
        let res = await getDetailDoctorById(this.state.id);
        console.log("res: ",res)
        this.setState({
            avatar: res.data.image ? res.data.image : "",
            name: res.data.lastName + ' ' + res.data.firstName,
            description: res.data.doctor.description,
            position: res.data.positionData.valueVi,
            contentHTML: res.data.doctor.contentHTML,
            Doctor_Info: res.data.doctor
                         })

    }
    parsePhoto = (avatar) => {
        if (avatar) {

            return new Buffer(avatar, 'base64').toString('binary');

        } else {
            return "";
        }
    }

    render() {
        console.log(this.state)
        
        return (
            <React.Fragment>
               
                <div className="doctor-detail-container">
                    <div className="doctor-info">
                        <div className="doctor-avatar"
                            style={{ backgroundImage: `url(${this.parsePhoto(this.state.avatar)})` }}

                        ></div>
                        <div className="doctor-info-content">
                            <h2 className="doctor-name">
                                {this.state.position} {this.state.name}
                            </h2>
                            <h6 className="doctor-description">

                                {this.state.description}


                            </h6>
                        </div>

                    </div>
                    <div className="doctor-schedule-component">
                        <DoctorSchedule idDoctor={this.state.id}
                            Doctor_Info={this.state.Doctor_Info}
                        />

                    </div>

                    <div className="doctor-content-component">
                        <div className="doctor-content">
                            <div dangerouslySetInnerHTML={{ __html: this.state.contentHTML }}></div>
                        </div>



                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};



export default connect(mapStateToProps, mapDispatchToProps)(DoctorPage);
