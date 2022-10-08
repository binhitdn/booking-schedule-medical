import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils/constant'
import { changeLanguage } from '../../store/actions/appActions';
import { withRouter } from 'react-router'
import ToggleMode from '../../components/ToggleMode';


class HomeHeader extends Component {

    handleChangLanguage = (languages) => {
        this.props.changeLanguageRedux(languages)
    }
    handleBackHome = () => {
        this.props.history.push('/');
    }
    render() {

        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            {/* <i className="fa fa-bars logo" ></i> */}

                            <div className="header-logo"
                                onClick={() => { this.handleBackHome() }}
                            ></div>

                        </div>
                        <div className="center-content">
                            {/* <div className="child-content">
                                <div><b>
                                    <FormattedMessage id="home-header.speciality" />
                                </b></div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.search-doctor-speciality" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div><b>
                                    <FormattedMessage id="home-header.hospital" />
                                </b></div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.search-hospital" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div><b>
                                    <FormattedMessage id="home-header.fee" />
                                </b></div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.check-health" />
                                </div>
                            </div> */}
                        </div>
                        <div className="right-content">
                            {/* <div className="support">
                                <i className="fa fa-question-circle"></i> Hỗ trợ
                            </div> */}
                            <p className={
                                (this.props.lang === languages.VI) ? "lang-vi lang active" : "lang-vi lang"} onClick={() => this.handleChangLanguage(languages.VI)
                                } >VN</p>
                            <p className={(this.props.lang === languages.EN) ? "lang-en lang active" : "lang-en lang"} onClick={() => this.handleChangLanguage(languages.EN)}>EN</p>
                            <p className={(this.props.lang === languages.JP) ? "lang-jp lang active" : "lang-jp lang"} onClick={() => this.handleChangLanguage(languages.JP)}>日本語</p>
                            <ToggleMode />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageRedux: (lang) => {
            dispatch(changeLanguage(lang));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
