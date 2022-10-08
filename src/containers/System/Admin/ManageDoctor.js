import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import './ManageDoctor.js.scss';
import * as actions from '../../../store/actions';
import {  postDetailInforDoctor, handleGetAllCode, handleAddInfoDoctor, getDetailDoctorById,getAllSpeciality } from '../../../services/userService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import './ManageDoctor.scss';
import { toast } from 'react-toastify';



let options = [];
class ManageDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      selectedDoctor: "",
      contentMarkdown: "",
      contentHTML: "",
      description: "",

      listProvince: [],
      listPrice: [],
      listPayment: [],
      selectedProvince: "PRO1",
      selectedPrice: "PR1",
      selectedPayment: "PAY1",
      nameClinic: "",
      addressClinic: "",
      note: "",
      selectedSpecialty: [],
      listSpecialty: [],


    }
  }

  async componentDidMount() {
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
    let listProvince = await handleGetAllCode('PROVINCE');
    let listPrice = await handleGetAllCode('PRICE');
    let listPayment = await handleGetAllCode('PAYMENT');
    this.setState({
      listProvince: listProvince.data.data,
      listPrice: listPrice.data.data,
      listPayment: listPayment.data.data
    })
    
    let listSpecialty = await getAllSpeciality();
    this.setState({
      listSpecialty: listSpecialty.specialities
    })
    console.log("This list Specialty: ",this.state.listSpecialty)

  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.doctorRedux !== this.props.doctorRedux) {
      this.setState({ doctors: this.props.doctorRedux });
    }
  }

  handleEditorChange = ({ html, text }) => {
    console.log('handleEditorChange', html, text);
    this.setState({
      contentMarkdown: text,
      contentHTML: html
    })
  }
  handleSaveContentMarkdown = async () => {
    console.log(this.state)
    await handleAddInfoDoctor({
      province: this.state.selectedProvince,
      price: this.state.selectedPrice,
      payment: this.state.selectedPayment,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      doctorId: this.state.selectedDoctor.value,
      specialityId: this.state.selectedSpecialty,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
    })

    // await this.handleAddInfoDoctor();
    toast.success("Tạo thành công chi tiết user");
  }
  handleChange = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    console.log(`Option selected:`, selectedDoctor);
    let a = await getDetailDoctorById(selectedDoctor.value)
    console.log("a", a)
    this.setState({
      contentHTML: a.data.doctor.contentHTML ? a.data.doctor.contentHTML : "",
      contentMarkdown: a.data.doctor.contentMarkdown ? a.data.doctor.contentMarkdown : "",
      description: a.data.doctor.description ? a.data.doctor.description : "",
      selectedProvince: a.data.doctor.province ? a.data.doctor.province : "PRO1",
      selectedPrice: a.data.doctor.priceId ? a.data.doctor.priceId : "PR1",
      selectedPayment: a.data.doctor.paymentId ? a.data.doctor.paymentId : "PAY1",
      nameClinic: a.data.doctor.nameClinic ? a.data.doctor.nameClinic : "",
      addressClinic: a.data.doctor.addressClinic ? a.data.doctor.addressClinic : "",
      note: a.data.doctor.note ? a.data.doctor.note : "",
    })

  };
  handleOnChangeDesc = (e) => {
    this.setState({
      description: e.target.value
    })
  }
  handleChangeSelect = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleOnChangeCheckbox = (e) => {
    if (e.target.checked) {
      this.setState({
        selectedSpecialty: [...this.state.selectedSpecialty, e.target.value]
      })
    } else {
      this.setState({
        selectedSpecialty: this.state.selectedSpecialty.filter(item => item !== e.target.value)
      })
    }
  }

  render() {
    console.log("This is state: ", this.state.selectedSpecialty)
    let { doctors, listProvince, listPrice, listPayment ,listSpecialty} = this.state;
    let mdParser = new MarkdownIt(/* Markdown-it options */);

    return (

      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin bác sĩ</div>
        <div className="more-info">
          <div className="content">
            <div className="content-left">
              <label>Chọn Bác Sĩ: </label>
              <Select
                value={this.selectedDoctor}
                onChange={this.handleChange}
                options={options}
              />
            </div>
            <div className="content-right">
              <label>Thông tin giới thiệu:</label>
              <textarea
                className="form-control"
                rows="5"
                onChange={(e) => { this.handleOnChangeDesc(e) }}
                value={this.state.description}
              >
              </textarea>

            </div>

          </div>
        </div>
        <div className="doctor-detail">
          <div className="content">
            <div className="content-left">
              <label>Chọn Giá Khám: </label>
              <select className="form-select" name="selectedPrice"
                onChange={(e) => {
                  this.handleChangeSelect(e)
                }}
                value={this.state.selectedPrice}
              >
                {listPrice && listPrice.length > 0 && listPrice.map((price, index) => {
                  return (
                    <option key={index} value={
                      price.keyMap
                    }>{price.valueVi}</option>
                  )
                })
                }

              </select>
            </div>
            <div className="content-left">
              <label>Chọn Tỉnh: </label>
              <select className="form-select" name="selectedProvince"
                onChange={
                  (e) => {
                    this.handleChangeSelect(e)
                  }
                }
                value={this.state.selectedProvince}
              >
                {listProvince && listProvince.length > 0 && listProvince.map((province, index) => {
                  return (
                    <option key={index} value={province.keyMap}>{province.valueVi}</option>
                  )
                })
                }

              </select>
            </div>
            <div className="content-left">
              <label>Chọn Phương Thức Thanh Toán: </label>
              <select className="form-select" name="selectedPayment"
                onChange={
                  (e) => {
                    this.handleChangeSelect(e)
                  }
                }
                value={this.state.selectedPayment}
              >
                {listPayment && listPayment.length > 0 && listPayment.map((payment, index) => {
                  return (
                    <option key={index} value={payment.keyMap}>{payment.valueVi}</option>
                  )
                })
                }

              </select>
            </div>


          </div>
        </div>
        <div className="doctor-detail">
          <div className="content">
            <div className="content-left">
              <label>Tên Phòng Khám: </label>
              <input type="text" className="form-control"
                onChange={(e) => {
                  this.handleChangeSelect(e)
                }}
                value={this.state.nameClinic}
                name="nameClinic"
              ></input>
              <div className="content-left">
                <label>Địa Chỉ Phòng Khám: </label>
                <input type="text" className="form-control"
                  onChange={(e) => {
                    this.handleChangeSelect(e)
                  }}
                  value={this.state.addressClinic}
                  name="addressClinic"
                ></input>
              </div>
              <div className="content-left">
                <label> Note : </label>
                <input type="text" className="form-control"
                  onChange={(e) => {
                    this.handleChangeSelect(e)
                  }}
                  value={this.state.note}
                  name="note"
                ></input>
              </div>
              <div className="content-left">
                <label>Chuyên Khoa: </label>
              <div name="selectedSpecialty" >
                {listSpecialty && listSpecialty.length > 0 && listSpecialty.map((specialty, index) => {
                  return (
                    // <option key={index} value={specialty.id}>{specialty.name}</option>
                    <span>
                      <input key={index} className="form-check-input" type="checkbox" value={specialty.id} 
                      
                      onClick={(e) => {
                        this.handleOnChangeCheckbox(e)
                      }}
                      />
                    <label>{specialty.name}</label>
                    </span>
                   
                    
                  )
                })
                }
                

              </div>
              </div>


            </div>
          </div>
        </div>
        <div className="manage-doctor-edit">
          <MdEditor style={{ height: '500px' }} renderHTML={text =>
            mdParser.render(text)} onChange={this.handleEditorChange} value={this.state.contentMarkdown} />
        </div>
        <button
          onClick={() => {
            this.handleSaveContentMarkdown()
          }}
          className="button-save"
        >
          Lưu thông tin
        </button>
      </div>

    );

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
