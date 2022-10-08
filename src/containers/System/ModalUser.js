import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils';

class ModelUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      address: ''
    }
    this.listenToEmitter();
  }
  listenToEmitter = () => {
    emitter.on('EVENT_CLEAR_MODAL_DATA', data => {
      this.setState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        address: ''
      })
    })
  }
  componentDidMount() {

  }

  toggle = () => {
    this.props.toggleFromParent();

  }

  handleOnChangeInput = (event, id) => {
    this.setState({
      [id]: event.target.value
    })
  }
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [this.state.email, this.state.password, this.state.firstname, this.state.lastname, this.state.address];
    for (let i = 0; i < arrInput.length; i++) {
      if (!arrInput[i]) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }
  handleAddUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      alert('Tạo User mới Thành Công');
      this.props.createNewUser(this.state);
    }
  }

  toggle = () => {
    this.props.toggleFromParent();

  }
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={'Modal-User-Container'}>
        <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label htmlFor="firstName">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Email"
                  onChange={(event) => { this.handleOnChangeInput(event, 'email') }} value={this.state.email} />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="firstName">Password</label>
                <input type="password" className="form-control" id="password" placeholder="PassWord"
                  onChange={(event) => { this.handleOnChangeInput(event, 'password') }} value={this.state.password} />
              </div>

            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label htmlFor="firstName">FirstName</label>
                <input type="text" className="form-control" id="firstname" placeholder="Frist Name"
                  onChange={(event) => { this.handleOnChangeInput(event, 'firstname') }} value={this.state.firstname} />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="firstName">Last Name</label>
                <input type="text" className="form-control" id="lastname" placeholder="Last Name"
                  onChange={(event) => { this.handleOnChangeInput(event, 'lastname') }} value={this.state.lastname} />
              </div>

            </div>
            <div className="row">
              <div className="col-12 form-group">
                <label htmlFor="firstName">Address</label>
                <input type="text" className="form-control" id="address" placeholder="Address"
                  onChange={(event) => { this.handleOnChangeInput(event, 'address') }} value={this.state.address} />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { this.handleAddUser() }}>
            Save
          </Button>{' '}
          <Button color="secondary" onClick={() => { this.toggle() }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelUser);











