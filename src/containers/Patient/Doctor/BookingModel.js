import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import { getScheduleDoctorByDate, getDetailDoctorById } from '../../../services/userService'
import "./BookingModel.scss"
import moment from 'moment'
import localization from '../../../../node_modules/moment/locale/vi'
import { isArrayBindingPattern } from 'typescript';
import { languages } from '../../../utils/constant'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "../../../components/Input/DatePicker";



class BookingModel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemBooking: this.props.info,
            price: this.props.info.price,
        }
    }
    async componentDidMount() { }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.lang !== this.props.lang) {
            let language = this.props.lang;
            this.getSelectDate(language)

        }
        if (prevProps.itemBooking !== this.props.itemBooking) {
            this.setState({
                itemBooking: this.props.itemBooking
            })
        }

    }
    render() {
        let hour, date;
        hour = this.state.itemBooking.timeTypeData.valueVi;
        date =
            moment(this.state.itemBooking.date).locale('vi').format('dddd - MM/DD/YYYY')
        console.log("itemBooking: ", this.state.itemBooking)

        return (
            <Modal isOpen={this.props.toggleBooking} className={'booking-modal-container'}
                centered={true}
                size="lg"
            >


                <div className="modal-header">
                    < h5 className="modal-title" > Thông tin đặt lịch khám bệnh</h5 >
                    <i class="fa-solid fa-xmark"
                        onClick={() => this.props.handleToogleBookingFarent()}
                    ></i>
                </div >
                <div className="modal-body">
                    <div>
                        <div className="info-schedule">
                            <div className="info-doctor"></div>
                            <div className="info-extra">
                                <div className="select-price">
                                    <center>
                                        <input type="radio" value={this.state.itemBooking.doctorName} checked />
                                        Giá khám {this.props.price}
                                    </center>
                                </div>
                                <span> {hour} - </span>
                                <span> {date}</span>

                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-6">
                                <div className="input-icon">
                                    <i className="fa-solid fa-user input-icon-icon"></i>
                                    <input className=" input-icon-input" placeholder="Họ tên bệnh nhân"></input>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-icon">
                                    <i class="fa-regular fa-calendar input-icon-icon"></i>
                                    <DatePicker
                                        className=" input-icon-input"
                                        onChange={
                                            (date) => {
                                                console.log(date);
                                            }
                                        }
                                        placeholder=" Ngày / Tháng / Năm Sinh"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="input-icon">
                                    <i class="fa-solid fa-phone input-icon-icon"></i>
                                    <input className=" input-icon-input" placeholder="Số điện thoại liên hệ"></input>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-icon">
                                    <i class="fa-solid fa-circle-envelope input-icon-icon"></i>
                                    <input className=" input-icon-input" placeholder="Email" type="email"></input>
                                </div>
                            </div>

                        </div>
                        <div className="row">

                            <div className="col-6">
                                <div className="input-icon">
                                    <i class="fa-sharp fa-solid fa-location-dot input-icon-icon"></i>
                                    <input className=" input-icon-input" placeholder="Địa chỉ liên hệ" type="text"></input>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-icon">

                                    <i class="fa-light fa-square-user input-icon-icon"></i>
                                    <input className=" input-icon-input" placeholder="Đặt cho ai" type="text"></input>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-icon">
                                    <i class="fa-solid fa-circle-envelope input-icon-icon"></i>
                                    <input className=" input-icon-input" placeholder="Lí do khám" type="text"></input>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="button btn-continue" data-dismiss="modal">Tiếp tục</button>
                    <button type="button" className="button btn-exit" data-dismiss="modal">Thoát</button>

                </div>

            </Modal >
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



export default connect(mapStateToProps, mapDispatchToProps)(BookingModel);
