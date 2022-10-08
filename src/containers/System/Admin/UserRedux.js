
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, CRUD_ACTIONS } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './UserRedux.scss';
import TableUsers from './TableUsers';
import CommonUtils from '../../../utils/CommonUtils';
import { handleDeleteUserApi } from '../../../services/userService';


class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            arrGender: [],
            arrPosition: [],
            arrRole: [],
            previewImage: "",
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            phone: "",
            gt: "M",
            position: "P0",
            role: "R1",
            avatar: "",
            address: "",
            users: [],
            isOpen: false,
            action: CRUD_ACTIONS.CREATE
        }
    }

    async componentDidMount() {
        await this.props.getGenderStart();
        await this.props.getPositionStart();
        await this.props.getRoleStart();
        let resDoctor = await this.props.fetchAllDoctorStart();

        console.log("Hello world: ", resDoctor);
        this.setState({
            users: this.props.userRedux
        })
    }
    componentDidUpdate(prevProps, preState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                arrGender: this.props.genderRedux
            })
            this.setState({
                arrPosition: this.props.positionRedux
            })
            this.setState({
                arrRole: this.props.roleRedux
            })
        }
        if (prevProps.usersRedux !== this.props.usersRedux) {
            let arrGenders = this.props.genderRedux;
            let arrPositions = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;
            this.setState({
                email: "",
                password: "",
                firstname: "",
                lastname: "",
                phone: "",
                gt: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
                avatar: "",
                address: "",
                previewImage: "",
                action: CRUD_ACTIONS.CREATE
            })
        }
    }


    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('base64: ', base64);
            let object = URL.createObjectURL(file);
            this.setState({
                previewImage: object,
                avatar: base64
            })
        }



    }
    handleAddUser = async () => {
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            if (this.checkValidateInput()) {
                await this.props.addNewUserStart({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstname,
                    lastName: this.state.lastname,
                    address: this.state.address,
                    phone: this.state.phone,
                    gender: this.state.gt,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    image: this.state.avatar
                })
            }
            this.props.fetchAllUserStart();
        } else if (action === CRUD_ACTIONS.EDIT) {
            if (this.checkValidateInput()) {
                await this.props.editUserStart({
                    id: this.state.id,
                    email: this.state.email,
                    firstName: this.state.firstname,
                    lastName: this.state.lastname,
                    address: this.state.address,
                    phone: this.state.phone,
                    gender: this.state.gt,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    image: this.state.avatar,
                })
            }
        }
        this.props.fetchAllUserStart();


    }
    checkValidateInput() {
        let isValidate = true;
        let arrCheck = ["email", "password", "firstname", "lastname", "phone", "gt", "role", "position"];
        for (let i = 0; i < arrCheck.length; i++) {
            if (this.state[arrCheck[i]] === "") {
                isValidate = false;
                alert("This input is required: " + arrCheck[i])
                break;
            }
        }
        return isValidate;

    }
    handleOnChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleEditUserFromParent = async (user) => {
        let imageBase64 = '';
        if (user.image) {

            imageBase64 = new Buffer(user.image, 'base64').toString('binary');

        }
        this.setState({
            id: user.id,
            email: user.email,
            password: 'HARDCODE',
            firstname: user.firstName,
            lastname: user.lastName,
            phone: user.phone,
            address: user.address,
            gt: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: user.image,
            action: CRUD_ACTIONS.EDIT,
            previewImage: imageBase64
        }, () => {
            console.log('this.state: ', this.state);
        })
    }
    handleDeleteUserFromParent = async (id) => {
        await handleDeleteUserApi(id);
        this.props.fetchAllUserStart();
    }



    render() {
        console.log("User redux đã render lại thành công")
        let genders = this.state.arrGender;
        let positions = this.props.positionRedux;
        let roles = this.props.roleRedux;
        let language = this.props.language;
        let { isOpen, previewImage, action } = this.state;

        return (
            <div className="user-redux-container">
                <div className="title text-center">
                    Manager User with Redux
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <label>Email</label>
                                <input onChange={(e) => this.handleOnChangeInput(e)} className="form-control" type="text" name="email" value={this.state.email}
                                    disabled={action === CRUD_ACTIONS.EDIT ? true : false}
                                ></input>
                            </div>
                            <div className="col-3">
                                <label>PassWord</label>
                                <input onChange={(e) => this.handleOnChangeInput(e)} className="form-control" type="password" name="password" value={this.state.password}
                                    disabled={action === CRUD_ACTIONS.EDIT ? true : false}
                                ></input>
                            </div>
                            <div className="col-3">
                                <label>First Name</label>
                                <input onChange={(e) => this.handleOnChangeInput(e)} className="form-control" type="text" name="firstname" value={this.state.firstname}></input>
                            </div>
                            <div className="col-3">
                                <label>Last Name</label>
                                <input onChange={(e) => this.handleOnChangeInput(e)} className="form-control" type="text" name="lastname" value={this.state.lastname}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <label>Phone</label>
                                <input onChange={(e) => this.handleOnChangeInput(e)} className="form-control" type="text" name="phone" value={this.state.phone}></input>
                            </div>
                            <div className="col-9">
                                <label>Address</label>
                                <input onChange={(e) => this.handleOnChangeInput(e)} className="form-control
                                    " type="text" name="address" value={this.state.address}></input>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-3">
                                <label>Giới Tính</label>
                                <select className="form-select" onChange={(e) => this.handleOnChangeInput(e)} name="gt" value={this.state.gt}>

                                    {genders && genders.length > 0 &&
                                        genders.map((gender, index) => {
                                            return (
                                                <option key={index} value={gender.keyMap}>
                                                    {language === languages.VI ? gender.valueVi : gender.valueEn}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Chức danh</label>
                                <select className="form-select" name="position" onChange={(e) => this.handleOnChangeInput(e)} value={this.state.position}>

                                    {positions && positions.length > 0 && positions.map((position, index) => {
                                        return (
                                            <option key={index} value={position.keyMap}>
                                                {language === languages.VI ? position.valueVi : position.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Vai trò</label>
                                <select className="form-select" onChange={(e) => this.handleOnChangeInput(e)} name="role" value={this.state.role}>

                                    {roles && roles.length > 0 && roles.map((role, index) => {
                                        return (
                                            <option key={index} value={role.keyMap}>
                                                {language === languages.VI ? role.valueVi : role.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Ảnh</label>
                                <input type="file" className="form-control" id="up-photo" hidden
                                    onChange={(e) => {
                                        this.handleOnChangeImage(e)
                                    }}
                                    name="avatar"
                                ></input>
                                <div className="upload"><label htmlFor="up-photo" className="upload-text"> <i className="fa-solid fa-arrow-up-from-bracket icon-upload"></i> Tải Ảnh</label></div>
                                <div className="preview-image"
                                    style={{ backgroundImage: `url(${this.state.previewImage})` }}
                                    onClick={() => {
                                        this.setState({ isOpen: true })
                                    }
                                    }
                                ></div>
                            </div>
                        </div>
                        <div className="row">
                            <button type="button" name="submit"
                                className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                onClick={() => { this.handleAddUser() }}
                            >
                                {this.state.action === CRUD_ACTIONS.EDIT ? "Cập nhật" : "Thêm"}
                            </button>
                        </div>

                    </div>
                </div>

                {isOpen && (
                    <Lightbox

                        mainSrc={this.state.previewImage}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}

                <TableUsers
                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                    handleDeleteUserFromParentKey={this.handleDeleteUserFromParent}
                    action={this.state.action}
                />
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        usersRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        addNewUserStart: (user) => dispatch(actions.addNewUserStart(user)),
        fetchAllUserStart: () => dispatch(actions.fetchAllUserStart()),
        editUserStart: (user) => dispatch(actions.editUserStart(user)),
        fetchAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
