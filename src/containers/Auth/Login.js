import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import {FormattedMessage} from 'react-intl';
import {handleLoginApi} from '../../services/userService'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
        
    }
    
    handleOnChangeUsername = (event) => {
        this.setState({ 
            username: event.target.value   
        })
        
    }
    handleOnChangePassword = (event) => {
        this.setState({ 
            password: event.target.value   
        })
        
    }
handleLogin = async() => {
        
       try {
            let data = await handleLoginApi(this.state.username,this.state.password);
            if(data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode === 0) {
                console.log('login success')
                this.props.userLoginSuccess(data.user);
            }
       } catch(error) {
        console.log(error.response)
            if(error.response) {
                if(error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            
       }
    }
    
    // try {
    //     let a = await axios.post('http://localhost:5000/login', {
    //         email: this.state.username,
    //         password: this.state.password
    //     });
    //     console.log(a.data.accessToken);
        
        
    // } catch (error) {
    //     if (error.response) {
    //         setMsg(error.response.data.msg);
    //     }
    // }
       
    // }
    render() {


        return (
            <div className="login-background">
                <div className ="login-container">
                    <div className="login-content row">   
                        <div className="col-12 login-text">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>UserName</label>
                            <input type="text" className="form-control login-input-i" placeholder="Enter your username"  onChange= {(event)=> this.handleOnChangeUsername(event)}/>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>PassWord</label>
                            <div>
                            <input type="text" className="form-control login-input-i" placeholder="Enter your password" onChange= {(event)=> this.handleOnChangePassword(event)}/>
                            <i className="far fa-eye"></i>
                            </div>
                        </div>
                        <div className="col-12" style={{color:'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div>
                            <button className="col-12 btn-login" onClick={()=> this.handleLogin()}>Login</button>
                        </div>
                        
                        <div className="col-12 text-center">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center">
                            <span className="text-other-login">Or Login with:</span>
                        </div>
                        <div className="col-12 social-login">
                          
                           <div className="google-contain">
                           <i className="fab fa-google-plus-g google"></i>
                           <span >Google</span>
                           </div>
                          
                           <div className="facebook-contain">
                           <i className="fab fa-facebook-f facebook"></i>
                           <span>Facebpok</span>
                           </div>
                          
                           
                          
                           
                        </div>
                       
                          
                       

                    </div>
                </div>
            </div>
                
            )
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
