import actionTypes from './actionTypes';
import {getTopDocterHome} from '../../services/userService'

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})
export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})
export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export const fetchAllDoctorStart = () => {
    return async(dispatch,getState) => {
        try {
            let res = await getTopDocterHome();
            dispatch(fetchAllDoctorSuccess(res.data));
        }   catch(e) {
            console.log(e)
        }
    }
}

export const fetchAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: data
})



