import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Login from './Auth/Login';
import System from '../routes/System';
import CustomScrollbars from '../components/CustomScrollbars';
import './App.scss'
import Page from './Page/Page';

class Apps extends Component {
      
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
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.PAGE} component={(Page)} />                                  
                                    
                                </Switch>
                            </CustomScrollbars>                   
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

export default connect(mapStateToProps, mapDispatchToProps)(Apps);