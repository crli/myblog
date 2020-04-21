/*
 * @Author: crli
 * @Date: 2020-04-20 16:01:52
 * @LastEditors: crli
 * @LastEditTime: 2020-04-21 09:50:25
 * @Description: file content
 */
import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
}
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
