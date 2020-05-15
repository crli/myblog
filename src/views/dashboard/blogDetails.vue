<!--
 * @Author: crli
 * @Date: 2020-04-23 11:28:35
 * @LastEditors: crli
 * @LastEditTime: 2020-05-12 11:46:08
 * @Description: file content
 -->
<template>
  <div>
    <h1>{{ form.title }}</h1>
    <div id="fieldTest" v-show="false"></div>
    <div class="top" v-html="form.content">
      <!-- {{ form.content }} -->
    </div>
  </div>
</template>
<script>
import Simplemde from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import { getArticleDetail } from '@/api/article'
export default {
  components: {
  },
  data () {
    return {
      articleId: '',
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
  watch: {
  },
  created () {
    var simplemde = new Simplemde({
      element: document.getElementById('fieldTest'),
      autoDownloadFontAwesome: false,
      status: false
    })
    console.log(simplemde)
    this.articleId = this.$route.query.id
    if (this.articleId) {
      getArticleDetail({ articleId: this.articleId }).then((res) => {
        if (res.code === '0000') {
          const { title, content, type, state, origin, tags, category } = res.data
          const tagsarr = []
          tags.forEach(element => {
            tagsarr.push(element._id)
          })
          this.form = {
            title,
            content: simplemde.markdown(content),
            type,
            state,
            origin,
            tags: tagsarr,
            category: category._id
          }
        }
      })
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
