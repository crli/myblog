<!--
 * @Author: crli
 * @Date: 2020-04-23 11:28:35
 * @LastEditors: crli
 * @LastEditTime: 2020-04-28 16:34:03
 * @Description: file content
 -->
<template>
  <div>
    <div class="top">
      <div class="topleft">
        <span style="width:40px">标题</span>  <a-input placeholder="标题" v-model="form.title"/>
      </div>
      <div style="width:200px">
        <a-button style="margin: 0 10px" @click="saveblog(0)">保存草稿</a-button>
        <a-button type="primary" @click="saveblog(1)">发布文章</a-button>
      </div>
    </div>
    <markdown-editor v-model="form.content"/>
    <a-modal
      title="发布文章"
      centered
      :footer="null"
      v-model="modal2Visible"
      @ok="() => (modal2Visible = true)"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="分类:" prop="category">
          <a-select v-model="form.category" placeholder="请选择分类">
            <a-select-option :value="v._id" v-for="(v) in categorys" :key="v._id">
              {{ v.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="选择标签:" prop="tags">
          <a-checkbox-group v-model="form.tags">
            <a-checkbox :value="v._id" name="tags" v-for="(v) in tags" :key="v._id">
              {{ v.name }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="文章类型:" prop="type">
          <a-select v-model="form.type" placeholder="请选择文章类型">
            <a-select-option :value="1">
              文章
            </a-select-option>
            <a-select-option :value="2">
              简历
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="创作类型:" prop="origin">
          <a-select v-model="form.origin" placeholder="请选择创作类型">
            <a-select-option :value="0">
              原创
            </a-select-option>
            <a-select-option :value="1">
              转载
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
          <a-button type="primary" @click="onSubmit">
            确定
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import { MarkdownEditor } from '@/components'
import { addArticle, updateArticle, getArticleDetail } from '@/api/article'
import { getCategoryList } from '@/api/category'
import { getTagList } from '@/api/tag'
export default {
  name: 'AddBlog',
  components: {
    MarkdownEditor
  },
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      tags: [],
      categorys: [],
      modal2Visible: false,
      form: {
        title: '',
        content: '',
        type: 1,
        state: 1,
        origin: 0,
        tags: [],
        category: ''
      },
      rules: {
        category: [{ required: true, message: '请选择分类', trigger: 'change' }],
        tags: [{
          type: 'array',
          required: true,
          message: '选择标签',
          trigger: 'change'
        }],
        type: [{ required: true, message: '请选择文章类型', trigger: 'change' }],
        origin: [{ required: true, message: '请选择创作类型', trigger: 'change' }]
      },
      articleId: ''
    }
  },
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId) {
      getArticleDetail(this.articleId).then((res) => {

      })
    }
  },
  mounted () {
    this.getCategory()
    this.getTag()
  },
  methods: {
    getCategory () {
      getCategoryList({
        pageNum: 1,
        pageSize: 1000
      }).then((res) => {
        if (res.code === '0000') {
          this.categorys = res.data.list
        }
      })
    },
    getTag () {
      getTagList({
        pageNum: 1,
        pageSize: 1000
      }).then((res) => {
        if (res.code === '0000') {
          this.tags = res.data.list
        }
      })
    },
    saveblog (number) {
      if (!this.form.title) {
        this.$message.error('请输入文章标题')
        return
      } else if (!this.form.content) {
        this.$message.error('请输入文章内容')
        return
      }
      this.form.state = number
      this.modal2Visible = true
    },
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let fun = addArticle
          let params = {
            ...this.form,
            tags: this.form.tags.join(','),
            userid: this.$store.state.user.info._id
          }
          if (this.articleId) {
            fun = updateArticle
            params = {
              ...this.form,
              tags: this.form.tags.join(','),
              userid: this.$store.state.user.info._id,
              articleId: this.articleId
            }
          }
          console.log(params)
          fun(params).then((res) => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.top{
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
}
.topleft{
  flex: 1;
  display: flex;
  align-items: center;
}
</style>
