/*
 * @Author: crli
 * @Date: 2020-04-23 10:56:02
 * @LastEditors: crli
 * @LastEditTime: 2020-04-23 11:04:02
 * @Description: file content
 */
import { axios } from '@/utils/request'
export function addArticle (parameter) {
  return axios({
    url: `/article/addArticle`,
    method: 'post',
    data: parameter
  })
}
export function updateArticle (parameter) {
  return axios({
    url: `/article/updateArticle`,
    method: 'post',
    data: parameter
  })
}
export function deleteArticle (parameter) {
  return axios({
    url: `/article/deleteArticle`,
    method: 'post',
    data: parameter
  })
}
export function getArticleList (parameter) {
  return axios({
    url: `/article/getArticleList`,
    method: 'post',
    data: parameter
  })
}
export function getArticleDetail (parameter) {
  return axios({
    url: `/article/getArticleDetail`,
    method: 'post',
    data: parameter
  })
}
export function likeArticle (parameter) {
  return axios({
    url: `/article/likeArticle`,
    method: 'post',
    data: parameter
  })
}
