/*
 * @Author: crli
 * @Date: 2020-04-28 13:51:27
 * @LastEditors: crli
 * @LastEditTime: 2020-04-28 16:12:28
 * @Description: file content
 */
import { axios } from '@/utils/request'
export function getTagList (parameter) {
  return axios({
    url: `/tag/getTagList`,
    method: 'post',
    data: parameter
  })
}
export function addTag (parameter) {
  return axios({
    url: `/tag/addTag`,
    method: 'post',
    data: parameter
  })
}
export function getOneTag (parameter) {
  return axios({
    url: `/tag/getOneTag`,
    method: 'post',
    data: parameter
  })
}
export function updateTag (parameter) {
  return axios({
    url: `/tag/updateTag`,
    method: 'post',
    data: parameter
  })
}
export function delTag (parameter) {
  return axios({
    url: `/tag/delTag`,
    method: 'post',
    data: parameter
  })
}
