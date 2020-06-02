<!--
 * @Author: crli
 * @Date: 2020-05-21 10:34:08
 * @LastEditors: crli
 * @LastEditTime: 2020-05-21 10:57:33
 * @Description: file content
-->
<template>
  <a-card title="热门文章" :bordered="false">
    <div v-for="(item, i) in hot" :key="i" class="archive" @click="toDetails(item._id)" style="cursor: pointer;">
      {{ item.title }} <a-icon type="eye" /> {{ item.views }}
    </div>
  </a-card>
</template>

<script>
import { getHotArticleList } from '@/api/article'

export default {
  name: 'HotArticle',
  data () {
    return {
      hot: []
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
  },
  mounted () {
    this.getHot()
  },
  methods: {
    toDetails (id) {
      this.$router.push({ name: 'BlogDetails', query: { id } })
    },
    getHot () {
      getHotArticleList({ userid: this.user._id, likes: 1 }).then(res => {
        if (res.code === '0000') {
          this.hot = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.archive{
  margin-bottom: 10px;
}
</style>
