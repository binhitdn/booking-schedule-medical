import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { languages, USER_ROLES } from '../../utils/constant'
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    handleChangLanguage = (languages) => {
        this.props.changeLanguageRedux(languages)
    }
    componentDidMount() {
        let { userInfo } = this.props;
        // if (userInfo) {
        //     if (userInfo.roleId === USER_ROLES.ADMIN) {
        //         this.setState({
        //             menuApp: adminMenu
        //         })
        //     } else if (userInfo.roleId === USER_ROLES.DOCTOR) {
        //         this.setState({
        //             menuApp: doctorMenu
        //         })
        //     } else {

        //     }
        // }
        this.setState({
            menuApp: adminMenu
        })
    }
    render() {
        const { processLogout, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className="lang-logout">

                    <span>
                        <span className={this.props.language === 'vi' ? 'active lang lang-vi' : 'lang lang-vi'}
                            onClick={() => this.handleChangLanguage(languages.VI)}>VN</span>
                        <span className={this.props.language === 'en' ? 'active lang lang-en' : 'lang lang-en'}
                            onClick={() => this.handleChangLanguage(languages.EN)}>EN</span>
                        <span className={this.props.language === 'jp' ? 'active lang lang-jp' : 'lang lang-jp'}
                            onClick={() => this.handleChangLanguage(languages.JP)}>日本語</span>
                    </span>
                    <span>
                        Welcome {userInfo && userInfo.email ? userInfo.email : ''} !
                    </span>
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>

                </div>



            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageRedux: (lang) => dispatch(actions.changeLanguage(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
