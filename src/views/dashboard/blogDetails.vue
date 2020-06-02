<!--
 * @Author: crli
 * @Date: 2020-04-23 11:28:35
 * @LastEditors: crli
 * @LastEditTime: 2020-05-21 11:04:39
 * @Description: file content
 -->
<template>
  <div>
    <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
      <a-card :loading="loading" :title="form.title">
        <div id="fieldTest" v-show="false"></div>
        <div class="top" v-html="form.content">
          <!-- {{ form.content }} -->
        </div>
      </a-card>
    </a-col>
    <a-col
      style="padding: 0 12px"
      :xl="8"
      :lg="24"
      :md="24"
      :sm="24"
      :xs="24">
      <HotArticle></HotArticle>
    </a-col>
  </div>
</template>
<script>
import HotArticle from './hotArticle.vue'
import Simplemde from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import { getArticleDetail } from '@/api/article'
export default {
  components: {
    HotArticle
  },
  data () {
    return {
      simplemde: null,
      loading: false,
      articleId: '',
      user: {},
      form: {
        title: '',
        content: '',
        type: 1,
        state: 1,
        origin: 0,
        tags: [],
        category: ''
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  watch: {
    $route () {
      this.getData()
    }
  },
  created () {
    this.user = this.userInfo
    var simplemde = new Simplemde({
      element: document.getElementById('fieldTest'),
      autoDownloadFontAwesome: false,
      status: false
    })
    this.simplemde = simplemde
    this.getData()
  },
  mounted () {
  },
  methods: {
    getData () {
      this.articleId = this.$route.query.id
      if (this.articleId) {
        this.loading = true
        getArticleDetail({ articleId: this.articleId }).then((res) => {
          if (res.code === '0000') {
            this.loading = false
            const { title, content, type, state, origin, tags, category } = res.data
            const tagsarr = []
            tags.forEach(element => {
              tagsarr.push(element._id)
            })
            this.form = {
              title,
              content: this.simplemde.markdown(content),
              type,
              state,
              origin,
              tags: tagsarr,
              category: category._id
            }
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
