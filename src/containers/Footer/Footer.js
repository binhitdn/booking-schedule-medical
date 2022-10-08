import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { languages, USER_ROLES } from '../../utils/constant'
class Header extends Component {
    render() {
        const { processLogout, userInfo } = this.props;

        return (
            <div className="footer-container">

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
