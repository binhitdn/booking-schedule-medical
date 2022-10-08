import React, { Component ,Fragment} from 'react';
import { connect } from "react-redux";
import {  Route, Switch } from 'react-router-dom';


import ClinicPage from './ClinicPage';
import CommunityPage from './CommunityPage';
import DoctorsPage from './DoctorPage';
import HandBook from './HandBook';
import SpecialtyPage from './SpecialtyPage';
import HomeHeader from '../HomePage/HomeHeader';
import SideBar from '../../components/SideBar';

import './Page.scss';
import HomePage from '../HomePage/HomePage';
import specialitiesPage from '../Patient/Speciality/specialitiesPage';
import DoctorPage from '../Patient/Doctor/DoctorPage';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDarkMode: this.props.isDarkMode
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isDarkMode !== this.props.isDarkMode) {
            this.setState({
                isDarkMode: this.props.isDarkMode
            })
        }
    }
    render() {
        return (
            <Fragment>
                
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
                                <Switch>
                                    <Route path="/"  exact component={HomePage} />
                                    <Route path="/specialty" component={SpecialtyPage} />
                                    <Route path="/clinic" component={ClinicPage} />
                                    <Route path="/community" component={CommunityPage} />
                                    <Route path="/doctor" component={DoctorsPage} />
                                    <Route path="/handbook" component={HandBook} />
                                    <Route path="/specialities/:id" component={specialitiesPage} />
                                    <Route path="/doctors/:id" component={DoctorPage} />
                                </Switch>
                            

                                    </div>

                            </div>
                        </div>
                        
                    </div>
                
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDarkMode: state.app.isDarkMode,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
