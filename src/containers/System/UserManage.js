import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsersApi,handleAddNewUserApi,handleDeleteUserApi,handleEditUserApi} from '../../services/userService';
import ModalUser from './ModalUser'
import emitter from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEdit: false,
            userEdit: {}
        }
    }
    

     async componentDidMount() {
        await this.getAllUserFromServer();
        
    }
    getAllUserFromServer = async () => {
        let response = await getAllUsersApi('ALL');
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            } )
            
        }
    }
    getUserFromServer = async (id) => {
        let response = await getAllUsersApi(id);
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            } )
            
        }
    }

    handleAddNewUser = () => {
        this.setState({isOpenModal: true});
    }

    toggleUserModal = () => {
        this.setState({isOpenModal: !this.state.isOpenModal});
    }
    toggleUserModalEdit = () => {
        this.setState({isOpenModalEdit: !this.state.isOpenModalEdit});
    }

    createNewUser = async(data) => { 
        await handleAddNewUserApi(data);
        this.getAllUserFromServer();
        this.setState({isOpenModal: false});

        emitter.emit('EVENT_CLEAR_MODAL_DATA', data);
    }

    handleDeleteUser = async(id) => {
        alert('Delete user success'+id);
        await handleDeleteUserApi(id);
       
        this.getAllUserFromServer();
    }
    handleEditUser =  async(user) => {
        this.setState({isOpenModalEdit: true});
        await this.setState({
            userEdit: user
        });

        console.log(this.state.userEdit);
       
        
    }
    editUser = async (user) => {
        await handleEditUserApi(user);
        this.getAllUserFromServer();
        this.setState({isOpenModalEdit: false});
        emitter.emit('EVENT_CLEAR_MODAL_DATA', user);
        console.log('Đã lưu thay đổi');
    }


    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                isOpen={this.state.isOpenModal}
                toggleFromParent={this.toggleUserModal}
    createNewUser = {this.createNewUser}
                />
                {
                    this.state.isOpenModalEdit && 
                    <ModalEditUser
                    isOpen={this.state.isOpenModalEdit}
                    toggleFromParent={this.toggleUserModalEdit}
                    editUser = {this.editUser}
                    currentUser = {this.state.userEdit}
                    />
                }
                <div className="title text-center">
                    MANAGER USERS WITH BINH
                </div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3"
                    onClick={() => this.handleAddNewUser()}>
                    
                        <i className="fas fa-plus"></i>
                        Add new users
                        </button>
                </div>
                <div className="users-table">
                <table id="customers">
  <tbody>
  <tr>
    <th>Email</th>
    <th>LastName</th>
    <th>FirstName</th>
    <th>Email</th>
    <th>Address</th>
    <th>Action</th>
  </tr>
  
    
    {arrUsers &&
        arrUsers.map((user, index) => {
            return (

                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.lastName}</td>
                    <td>{user.firstName}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>
                        <button className="btn btn-edit" onClick = {()=>{this.handleEditUser(user)}}>
                        <i className="fa-solid fa-pen-to-square icon"></i>
                            Edit</button>
                        <button className="btn btn-delete" onClick={()=>{this.handleDeleteUser(user.id)}}>
                        <i className="fa-solid fa-trash-can-xmark icon"></i>
                            Delete</button>
                  
                    </td>
                </tr>
            )
        } )
  }
  </tbody>

     
    
 
</table>
                    </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
