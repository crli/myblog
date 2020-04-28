<!--
 * @Author: crli
 * @Date: 2020-04-21 09:46:27
 * @LastEditors: crli
 * @LastEditTime: 2020-04-26 11:20:41
 * @Description: file content
 -->
<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: zhCN
    }
  },
  mounted () {
    console.log(this.$store.state)
  }
}
</script>
<style>
  #app {
    height: 100%;
  }
</style>
