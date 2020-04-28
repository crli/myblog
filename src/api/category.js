/*
 * @Author: crli
 * @Date: 2020-04-28 13:51:27
 * @LastEditors: crli
 * @LastEditTime: 2020-04-28 13:52:49
 * @Description: file content
 */
import { axios } from '@/utils/request'
export function getCategoryList (parameter) {
  return axios({
    url: `/category/getCategoryList`,
    method: 'post',
    data: parameter
  })
}
export function addCategory (parameter) {
  return axios({
    url: `/category/addCategory`,
    method: 'post',
    data: parameter
  })
}
export function getOneCategory (parameter) {
  return axios({
    url: `/category/getOneCategory`,
    method: 'post',
    data: parameter
  })
}
export function updateCategory (parameter) {
  return axios({
    url: `/category/updateCategory`,
    method: 'post',
    data: parameter
  })
}
export function delCategory (parameter) {
  return axios({
    url: `/category/delCategory`,
    method: 'post',
    data: parameter
  })
}
