import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import './ManageDoctor.js.scss';
import * as actions from '../../../store/actions';
import { handleGetAllCode, bulkCreateSchedule } from '../../../services/userService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { collapseTextChangeRangesAcrossMultipleVersions, createNoSubstitutionTemplateLiteral, textSpanIntersectsWithTextSpan } from 'typescript';
import { toast } from 'react-toastify';
import DatePicker from '../../../components/Input/DatePicker';
import './ManageSchedule.scss';
import moment from 'moment';
import { result } from 'lodash';



let options = [];
class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            selectedDoctor: null,
            arrTime: [],
            rangeTime: [],
            currentDate: new Date()
        }
    }

    async componentDidMount() {
        console.log("componentDidMount đã chạy")
        await this.props.fetchAllDoctorStart();
        this.state.doctors.map(
            (doctor, index) => {
                let obj = {}
                obj.value = doctor.id
                obj.label = doctor.lastName + " " + doctor.firstName
                return (
                    options.push(obj)
                )
            }
        );


        let arrTime = await handleGetAllCode("TIME");
        let times = arrTime.data.data;
        if (times && times.length > 0) {
            times = times.map(item => ({
                ...item,
                isSelected: false
            }))
        }
        this.setState({
            arrTime: times
        })




    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.doctorRedux !== this.props.doctorRedux) {
            this.setState({ doctors: this.props.doctorRedux });
        }
    }
    handleChange = (selectedDoctor) => {
        this.setState(
            {
                selectedDoctor: selectedDoctor
            }
        );
    };
    handleChangeDate = (e) => {
        this.setState({
            currentDate: e[0]
        })
    }
    handleClickBtnTime = (time) => {
        let { arrTime } = this.state;
        if (arrTime && arrTime.length > 0) {
            arrTime = arrTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                arrTime: arrTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { arrTime, selectedDoctor, currentDate } = this.state;
        if (!currentDate) {
            toast.error("Chưa chọn ngày")
            return;
        }
        if (!selectedDoctor) {
            toast.error("Chưa chọn bác sĩ")
            return;
        }
        let formatedDate = moment(this.state.currentDate).format("DD/MM/YYYY");
        let result = [];
        if (arrTime && arrTime.length > 0) {

            arrTime = arrTime.filter(item => item.isSelected === true);
            if (arrTime.length > 0) {
                arrTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            }
        }
        
        let bulk = await bulkCreateSchedule({
            arrSchedule: result
        });
        if (bulk.errCode === 2) {
            toast.success("No change!!!")
        } else if (bulk.errCode === 0) {
            toast.success("Changed success!!!")
        }
       
    }


    render() {
        let { arrTime } = this.state;
        return (

            <div className="manage-doctor-container">
                <div className="manage-doctor-title">Tạo thêm thông tin bác sĩ</div>
                <div className="more-info">
                    <div className="content">
                        <div className="content-right">
                            <label>Chọn Bác Sĩ: </label>
                            <Select
                                value={this.selectedDoctor}
                                onChange={this.handleChange}
                                options={options}
                            />
                        </div>
                        <div className="content-left">
                            <label>Chọn Ngày: </label>
                            <DatePicker
                                className="form-control"
                                selected={new Date()}
                                onChange={(e) => this.handleChangeDate(e)}
                                dateFormat="dd/MM/yyyy"
                                data-enable-time
                                value={this.state.currentDate}
                            />
                        </div>
                    </div>
                    <div className="content-2">
                        {arrTime && arrTime.map(
                            (time, index) => {
                                return (
                                    <button key={index} value={time.keyMap}
                                        className={time.isSelected === true ? "button-time active" : "button-time"}
                                        onClick={() => this.handleClickBtnTime(time)}
                                    >
                                        {time.valueVi}

                                    </button>
                                )
                            }
                        )


                        }
                    </div>
                </div>
                <div className="button-container">
                    <button className="button-time"
                        onClick={this.handleSaveSchedule}
                    >Tạo lịch hẹn</button>
                </div>
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        userRedux: state.admin.users,
        doctorRedux: state.admin.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
