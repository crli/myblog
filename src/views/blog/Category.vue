<!--
 * @Author: crli
 * @Date: 2020-04-27 14:34:33
 * @LastEditors: crli
 * @LastEditTime: 2020-04-28 16:04:38
 * @Description: file content
 -->
<template>
  <div>
    <a-button type="primary" @click="show" style="margin-bottom:20px">添加</a-button>
    <a-table :columns="columns" :dataSource="data" :loading="loading" @change="handleTableChange" :pagination="pagination">
      <span slot="action" slot-scope="text, record">
        <a-button type="danger" @click="del(record)">删除</a-button>
        <a-divider type="vertical" />
        <a-button type="primary" @click="getOneData(record)">修改</a-button>
      </span>
    </a-table>
    <a-modal
      :title="`${edit ? '修改':'添加'}分类`"
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
        <a-form-model-item label="分类名:" prop="name">
          <a-input v-model="form.name"/>
        </a-form-model-item>
        <a-form-model-item label="分类描述:" prop="desc">
          <a-input v-model="form.desc"/>
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
import { addCategory, updateCategory, getOneCategory, getCategoryList, delCategory } from '@/api/category'
const columns = [
  {
    title: 'id',
    dataIndex: '_id'
  },
  {
    title: '分类名',
    dataIndex: 'name'
  },
  {
    title: '分类描述',
    dataIndex: 'desc'
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  data () {
    return {
      data: [],
      columns,
      id: '',
      form: {
        name: '',
        desc: ''
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      modal2Visible: false,
      rules: {
        name: [{ required: true, message: '分类名', trigger: 'change' }]
        // desc: [{ required: true, message: '请选择文章类型', trigger: 'change' }]
      },
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      edit: true
    }
  },
  created () {
  },
  mounted () {
    this.getCategory()
  },
  methods: {
    getCategory () {
      this.loading = true
      getCategoryList({
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      }).then((res) => {
        if (res.code === '0000') {
          this.data = res.data.list
          this.pagination.total = res.data.count
          this.loading = false
        }
      })
    },
    getOneData (v) {
      getOneCategory({ categoryId: v._id }).then((res) => {
        if (res.code === '0000') {
          this.form = res.data
          this.modal2Visible = true
          this.edit = true
        }
      })
    },
    show () {
      this.modal2Visible = true
      this.edit = false
    },
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let fun = addCategory
          let params = this.form
          if (this.edit) {
            fun = updateCategory
            params = {
              ...this.form,
              categoryId: this.form._id
            }
          }
          console.log(params)
          fun(params).then((res) => {
            if (res.code === '0000') {
              this.modal2Visible = false
              this.form = {
                name: '',
                desc: ''
              }
              this.getCategory()
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleTableChange (pagination) {
      this.pagination.current = pagination.current
      this.getCategory()
    },
    del (v) {
      const self = this
      this.$confirm({
        content: '确定删除？',
        onOk () {
          delCategory({ categoryId: v._id }).then(res => {
            if (res.code === '0000') {
              self.$message.success(res.msg)
              self.getCategory()
            } else {
              self.$message.error(res.msg)
            }
          })
        }
        // onCancel () {
        //   self.destroyAll()
        // }
      })
    }
  }
}
</script>
