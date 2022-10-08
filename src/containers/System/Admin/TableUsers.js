import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import './TableUsers.scss';
import * as actions from '../../../store/actions';
import {getAllUsersApi,handleAddNewUserApi} from '../../../services/userService';
class TableUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    async componentDidMount() {
        await this.props.fetchAllUserStart();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userRedux !== this.props.userRedux) {
            this.setState({
                users: this.props.userRedux
            } )
        }
    }
    getAllUserFromServer = async () => {
        let response = await getAllUsersApi('ALL');
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            } )
            
        }
    }
    createNewUser = async(data) => { 
        await handleAddNewUserApi(data);
        this.getAllUserFromServer();
    }
    handleEditUser = async(user) => {
        this.props.handleEditUserFromParentKey(user);
    }
    handleDeleteUser = async(id) => {
        this.props.handleDeleteUserFromParentKey(id);
    }
   
    render() {
        const {users} = this.state;     
        return (
            <div className="users-container">
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
  
    
    {users &&
        users.map((user, index) => {
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
        userRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserStart: () => dispatch(actions.fetchAllUserStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUsers);
