import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import { getScheduleDoctorByDate, getDetailDoctorById } from '../../../services/userService'
import "./DoctorSchedule.scss"
import moment from 'moment'
import localization from '../../../../node_modules/moment/locale/vi'
import { isArrayBindingPattern } from 'typescript';
import { languages } from '../../../utils/constant'
import BookingModel from './BookingModel';





class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDate: [],
            arrSchedule: [],
            date: moment(new Date()).format("DD/MM/YYYY"),
            doctorId: this.props.idDoctor,
            toggleDetailPrice: false,
            nameClinic: "",
            addressClinic: "",
            payment: "",
            price: "",
            province: "",
            toggleBooking: false,
            itemBooking: null,


        }
    }
    async componentDidMount() {
        let language = this.props.lang;
        this.getSelectDate(language)
        let data = await getScheduleDoctorByDate(this.state.doctorId, this.state.date)
        console.log("data", data)
        this.setState({
            arrSchedule: data.data
        })
        let data2 = await getDetailDoctorById(this.state.doctorId)
        let Doctor_Info = data2.data.doctor;
        
        this.setState({
            nameClinic: Doctor_Info.nameClinic,
            addressClinic: Doctor_Info.addressClinic,
            payment: Doctor_Info.paymentTypeData.valueVi,
            price: Doctor_Info.priceTypeData.valueVi,
            province: Doctor_Info.provinceTypeData.valueVi

        })
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.lang !== this.props.lang) {
            let language = this.props.lang;
            this.getSelectDate(language)

        }
        if (prevState.date !== this.state.date) {
            let data = await getScheduleDoctorByDate(this.state.doctorId, this.state.date)
            this.setState({
                arrSchedule: data.data
            })
        }

    }

    getSelectDate = (language) => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === languages.VI) {
                object.label = this.capitalizeFirstLetter(moment(new Date()).add(i, 'days').locale('vi').format('dddd - DD/MM'))
                object.value = moment(new Date()).add(i, 'days').format("DD/MM/YYYY")
               
                arrDate.push(object)
            }
            else if (language === languages.EN) {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')
                object.value = moment(new Date()).add(i, 'days').format("DD/MM/YYYY")
                arrDate.push(object)
            } else if (language === languages.JP) {
                object.label = moment(new Date()).add(i, 'days').locale('ja').format('M月D日 (ddd)')
                object.value = moment(new Date()).add(i, 'days').format("DD/MM/YYYY")
                arrDate.push(object)
            }
            this.setState({
                arrDate: arrDate
            })

        }
    }


    parsePhoto = (avatar) => {
        if (avatar) {

            return new Buffer(avatar, 'base64').toString('binary');

        } else {
            return "";
        }
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    handleToogleDetailPrice = () => {
        this.setState({
            toggleDetailPrice: !this.state.toggleDetailPrice
        })
    }
    handleToogleBooking = () => {
        this.setState({
            toggleBooking: !this.state.toggleBooking
        })
    }
    handleBooking = (item) => {
        this.handleToogleBooking();
        this.setState({
            itemBooking: item
        })
    }
    render() {

        let { arrDate, arrSchedule } = this.state;
        return (
            <>
                <div className="doctor-schedule">
                    <div className="content-1">
                        <select className="select-date"
                            onChange={(e) => {
                                this.setState({
                                    date: e.target.value
                                })
                            }
                            }
                        >
                            {arrDate && arrDate.length > 0 &&

                                arrDate.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })}
                        </select>
                    </div>
                    <div>
                        <i className="fa-duotone fa-calendar-days"></i> LỊCH KHÁM
                    </div>
                    <div className="doctor-schedule-t">
                        <div className="doctor-schedule-button">
                            {(arrSchedule && arrSchedule.length > 0) ?
                                arrSchedule.map((item, index) => {
                                    return (
                                        <button
                                            className="button-select-time"
                                            onClick={() => {
                                                this.handleBooking(item)
                                            }}
                                            key={index}
                                        >{item.timeTypeData.valueVi}</button>
                                    )
                                }
                                ) : <div className="no-schedule">Không có lịch đặt khám vào ngày này!!!
                                    <br></br> Vui lòng chọn ngày khác!!!
                                </div>}
                            <div>
                                Chọn <i className="fa-regular fa-hand-back-point-up"></i> và đặt (Phí đặt lịch 0đ)
                            </div>
                        </div>
                        <div className="doctor-schedule-info">
                            <div className="title-schedule">ĐỊA CHỈ KHÁM</div>
                            <div className="name-clinic">{this.state.nameClinic}</div>
                            <div>{this.state.addressClinic}</div>

                            <span className="title-schedule" > Giá Khám: </span>{
                                !this.state.toggleDetailPrice &&
                                <span>{this.state.price} đ</span>
                            }
                            {
                                !this.state.toggleDetailPrice && <span className="show-detail" onClick={() => { this.handleToogleDetailPrice() }}>Xem chi tiết</span>
                            }


                            {
                                (this.state.toggleDetailPrice) &&

                                <div>
                                    <div className="show-detail-div">
                                        <div style={{ background: "#eee" }}>
                                            <div class="price">
                                                <div>Giá khám </div><div>{this.state.price} đ</div>
                                            </div>
                                            <div className="tuvan-font">Giá tư vấn 15 phút</div>
                                            <div class="tuvan-font">Giá tư vấn 30 phút</div>
                                        </div>
                                        <div className="payment">Phòng khám có hình thức thanh toán bằng tiền mặt và quẹt thẻ</div>
                                    </div>
                                    <div className="show-detail" onClick={() => { this.handleToogleDetailPrice() }}>Ẩn bảng giá</div>

                                </div>

                            }


                        </div>
                    </div>
                </div >
                {this.state.toggleBooking && <BookingModel toggleBooking={this.state.toggleBooking} handleToogleBookingFarent={this.handleToogleBooking} info={this.state.itemBooking} price={this.state.price} />}
            </>
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
