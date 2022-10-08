import axios from '../axios'

let handleLoginApi = (userEmail, userPassword) => {
    return axios.post('api/login', { email: userEmail, password: userPassword })
}
const getAllUsersApi = (inputId) => {
    return axios.get(`api/get-all-users?id=${inputId}`)
}
const handleAddNewUserApi = (data) => {
    console.log('check data from service', data)
    return axios.post('/api/create-new-user', data)
}
const handleDeleteUserApi = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } })
}
const handleEditUserApi = (data) => {
    return axios.put('/api/edit-user', data)
}
const handleGetAllCode = (typeInput) => {
    return axios.get(`/api/allcode?type=${typeInput}`)
}
const getTopDocterHome = () => {
    return axios.get(`/api/top-docter-home`)
}
const postDetailInforDoctor = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}
const getDetailDoctorById = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}
const getAllSpeciality = () => {
    return axios.get(`/api/get-all-speciality`)
}
const createNewSpeciality = (data) => {
    return axios.post('/api/create-new-speciality',data)
}
const bulkCreateSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const handleAddInfoDoctor = (data) => {
    return axios.post('/api/add-info-doctor', data)
}
const editInfoDoctor = (data) => {
    return axios.put('/api/edit-info-doctor', data)
}
const getSpecialityById = (data) => {
    return axios.get(`/api/get-speciality-by-id?id=${data}`)
}

export { handleLoginApi, getAllUsersApi, handleAddNewUserApi, handleDeleteUserApi, handleEditUserApi, handleGetAllCode, getTopDocterHome, postDetailInforDoctor, getDetailDoctorById, getAllSpeciality, bulkCreateSchedule, getScheduleDoctorByDate, handleAddInfoDoctor, editInfoDoctor ,createNewSpeciality,getSpecialityById}