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

export const getReminderHistoryApi = async(header) => {
    return await commonApi('GET',`${baseUrl}/user/gethistoryReminder`,'',header)
}

export const verifyingThePasswordApi = async(pass,header) => {
    return await commonApi('POST',`${baseUrl}/user/verifyPassword`,pass,header)
}

export const resetPasswordApi = async(pass,header) => {
    return await commonApi('POST',`${baseUrl}/user/resetPassword`,pass,header)
}

export const changeNotificationPrefeApi = async(notif,header) => {
    return await commonApi('POST',`${baseUrl}/user/notificationPreference`,notif,header)
}