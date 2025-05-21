import { baseUrl } from './baseUrl'
import { commonApi } from './commonApi'

export const loginApi = async(loginData) => {
    return await commonApi('POST',`${baseUrl}/user/login`,loginData,'')
}

export const registerApi = async(registerData) => {
    return await commonApi('POST',`${baseUrl}/user/register`,registerData,'')
}

export const addReminderApi = async(reminderData,header) => {
    return await commonApi('POST',`${baseUrl}/user/addReminder`,reminderData,header)
}

export const getHomeReminderApi = async(header) => {
    return await commonApi('GET',`${baseUrl}/user/getHomeReminder`,'',header)
}