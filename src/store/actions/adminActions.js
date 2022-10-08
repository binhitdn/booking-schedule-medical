import actionTypes from './actionTypes';
import {handleGetAllCode,handleAddNewUserApi,getAllUsersApi,handleEditUserApi,getTopDocterHome} from '../../services/userService'
import {  toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch,getState) => {
        try {
            let res = await handleGetAllCode("GENDER");
            if(res.data && res.data.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data.data));
            }
        } catch(e) {
               dispatch(fetchGenderFailed());
            console.log(e)
        }
    }  
}
export const fetchAllUserStart = () => {
    return async (dispatch,getState) => {
        try {
            let res = await getAllUsersApi('ALL');
            let user = res.users.reverse();
            if(res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(user));
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch(e) {
            console.log(e)
        }
    }
}

export const fetchPositionStart = () => {

    return async (dispatch,getState) => {
        try {
            let res = await handleGetAllCode("POSITION");
            if(res.data && res.data.errCode === 0) {
                
                dispatch(fetchPositionSuccess(res.data.data));
            }
        } catch(e) {
               dispatch(fetchPositionFailed());
            console.log(e)
        }
    }
   

}
export const fetchRoleStart = () => {

    return async (dispatch,getState) => {
        try {
    
            let res = await handleGetAllCode("ROLE");
            if(res.data && res.data.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data.data));
            }
        } catch(e) {
               dispatch(fetchRoleFailed());
            console.log(e)
        }
    }
   

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED   
})

export const fetchPositionSuccess = (genderData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: genderData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED   
})
export const fetchRoleSuccess = (genderData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: genderData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED   
})
export const addNewUserStart = (data) => {
    return async (dispatch,getState) => {
        try {
            let res = await handleAddNewUserApi(data);
            toast.success("Tạo user mới thành công");
            if(res.data && res.data.errCode === 0) {
                
                dispatch(addNewUserSuccess(res.data));
            }
        } catch(e) {
               dispatch(addNewUserFail());
        }
    }
}
export const editUserStart = (data) => {
    return async (dispatch,getState) => {
        try {
            let res = await handleEditUserApi(data);                   
            toast.success("Sửa user thành công");
            if(res.data && res.data.errCode === 0) {
                         
                dispatch(editUserSuccess(res.data));
            }
        } catch(e) {
               dispatch(editUserFailed());
        }
    }
}
export const addNewUserSuccess = (data) => ({
    type: actionTypes.CREATE_NEW_USER_SUCCESS,
    data: data
})
export const addNewUserFail = () => ({
    type: actionTypes.CREATE_NEW_USER_FAILED
})
export const editUserSuccess = (data) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
    data: data
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
export const fetchAllUserSuccess = (data) => {
    return {

        type: actionTypes.FETCH_ALL_USER_SUCCESS,
        data: data
    }
}
export const fetchAllUserFailed = () => {
    return {
        type: actionTypes.FETCH_ALL_USER_FAILED
    }
}


