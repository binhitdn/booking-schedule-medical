import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { createNewSpeciality} from '../../../services/userService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageSpecialty.scss';
import { toast } from 'react-toastify';
import CommonUtils from '../../../utils/CommonUtils';
import Lightbox from 'react-image-lightbox';



let options = [];
class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameSpecialty: '',
            avatar: '',
            avatarPreview: '',
            contentMarkdown: '',
            contentHTML: '',
            isOpen: false,
        }
    }

    async componentDidMount() {
        
    }


    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.doctorRedux !== this.props.doctorRedux) {
            this.setState({ doctors: this.props.doctorRedux });
        }
    }

    handleSaveSpeciality = async() => {
        await createNewSpeciality({
            name: this.state.nameSpecialty,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            avatar: this.state.avatar,
        })
        this.setState({
            nameSpecialty: '',
            avatar: '',
            avatarPreview: '',
            contentMarkdown: '',
            contentHTML: '',
        })
        toast.success("Thêm chuyên khoa thành công")
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('base64: ', base64);
            let object = URL.createObjectURL(file);
            this.setState({
                avatarPreview: object,
                avatar: base64
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
          contentMarkdown: text,
          contentHTML: html
        })
      }

      handleChangeInput = (e) => {
        let { name, value } = e.target;
        this.setState({
          [name]: value
        })
      }
    

    render() {
        console.log("Chuyên khoa: ",this.state)
        let { doctors, listProvince, listPrice, listPayment ,isOpen} = this.state;
        let mdParser = new MarkdownIt(/* Markdown-it options */);

        return (

            <div className="manage-doctor-container">
                <div className="manage-doctor-container__header text-center">
                    <h3>Quản lý chuyên khoa</h3>
                </div>
                <div className="row">
                    <div className="col-6">
                    <label>Tên chuyên khoa</label>
                        <input type="text" className="form-control" onChange={(e)=>{this.handleChangeInput(e)}} name="nameSpecialty" value={this.state.nameSpecialty}></input>
                    </div>
                    <div className="col-6">
                    <div className="col-6">
                        <label>Chọn ảnh</label>
                        <input type="file" className="form-control" id="up-photo" hidden
                                    onChange={(e) => {
                                        this.handleOnChangeImage(e)
                                    }}
                                    name="avatar"
                                ></input>
                                <div className="upload"><label htmlFor="up-photo" className="upload-text"> <i className="fa-solid fa-arrow-up-from-bracket icon-upload"></i> Tải Ảnh</label></div>
                                <div className="preview-image"
                                    style={{ backgroundImage: `url(${this.state.avatarPreview})` }}
                                    onClick={() => {
                                        this.setState({ isOpen: true })
                                    }
                                    }
                                ></div>
                    </div>
                    </div>

                </div>
                <div className="manage-doctor-edit">
                    <MdEditor style={{ height: '500px' }} renderHTML={text =>
                        mdParser.render(text)} onChange={this.handleEditorChange} value={this.state.contentMarkdown} />
                </div>
                <button
                    onClick={() => {
                        this.handleSaveSpeciality()
                    }}
                    className="button-save"
                >
                    Lưu thông tin
                </button>



                {isOpen && (
                    <Lightbox

                        mainSrc={this.state.avatarPreview}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
