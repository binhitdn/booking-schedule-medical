import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import {useSelector } from 'react-redux';

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import Login from './Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import HomePage from './HomePage/HomePage';
import CustomScrollbars from '../components/CustomScrollbars';
import DoctorPage from '././Patient/Doctor/DoctorPage';
import specialitiesPage from '././Patient/Speciality/specialitiesPage'
import SideBar from '../components/SideBar';
import HomeHeader from './HomePage/HomeHeader';


import ClinicPage from '../containers/Page/ClinicPage';
import CommunityPage from '../containers/Page/CommunityPage';
import DoctorsPage from '../containers/Page/DoctorPage';
import HandBook from '../containers/Page/HandBook';
import SpecialtyPage from '../containers/Page/SpecialtyPage';
import './App.scss'

class App extends Component {
      
    constructor(props) {
        super(props);
        this.state = {
            isDarkMode: this.props.isDarkMode
        }
    }

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isDarkMode !== this.props.isDarkMode) {
            this.setState({
                isDarkMode: this.props.isDarkMode
            })
        }
    }

    render() {console.log("DARK MODE", this.state.isDarkMode)
        return (
            <Fragment>
                <Router history={history}>
                    <div 
                    className={
                        this.state.isDarkMode ? "main-container dark-mode" : "main-container"
                    }
                    >
                        <div className="navbar">
                                <HomeHeader/>
                        </div>
                        <div className="main-content">
                            <div className="left-sidebar">
                                <SideBar />
                            </div>
                            <div className="right-sidebar">
                                 <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path="/doctors/:id" component={DoctorPage} />
                                    <Route path="/specialities/:id" component={specialitiesPage} />
                                    <Route path="/specialty" component={SpecialtyPage} />
                                    <Route path="/clinic" component={ClinicPage} />
                                    <Route path="/community" component={CommunityPage} />
                                    <Route path="/doctor" component={DoctorsPage} />
                                    <Route path="/handbook" component={HandBook} />

                                </Switch>
                            </CustomScrollbars>

                                    </div>

                            </div>
                        </div>
                        {/* <SideBar/> */}
                        {/* <ConfirmModal /> */}
                        {/* {this.props.isLoggedIn && <Header />} */}

                       
                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        {/* <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        /> */}
                        {/* Same as */}
                        {/* <ToastContainer /> */}
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        isDarkMode: state.app.isDarkMode,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);