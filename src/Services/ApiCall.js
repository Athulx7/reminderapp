import { baseUrl } from './baseUrl'
import { commonApi } from './commonApi'

export const loginApi = async(loginData) => {
    return await commonApi('POST',`${baseUrl}/user/login`,loginData,'')
}

export const registerApi = async(registerData) => {
    return await commonApi('POST',`${baseUrl}/user/register`,registerData,'')
}