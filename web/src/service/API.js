import axios from 'axios'
import { apiDomain, env } from '../config'
console.log('apiDomain',apiDomain[env])
/**
 * 接口配置
 */

export function getUserInfo () {
  let url = '/user/varify'
  return axios.get(url).then(resp => resp.data)
}
export const upload = apiDomain[env]+ '/api/open/upload'