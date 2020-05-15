<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}<span class="welcome-text">，{{ welcome }}</span></div>
      <div>前端工程师 | 蚂蚁金服 - 某某某事业群 - VUE平台</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <head-info title="博客" content="56" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="8">
          <head-info title="点赞" content="222" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="8">
          <head-info title="浏览量" content="2323" :center="false" />
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="博客列表"
            :body-style="{ padding: 0 }">
            <a slot="extra" @click="articleListMy(userInfo._id)" style="margin-right:10px">我的博客</a>
            <a slot="extra" @click="articleList" style="margin-right:10px">全部博客</a>
            <a slot="extra" @click="toAddBlog" v-if="userInfo._id ">写博客</a>
            <div style="background: #eee">
              <div v-for="(item, i) in blogs" :key="i" class="blogitem">
                <div class="blogitemtop" @click="toDetails(item._id)">
                  <span class="origin">{{ item.origin === 0 ? '原创' : item.origin === 1 ? '转载' : '全部' }}</span>
                  <span class="title">{{ item.title }}</span>
                </div>
                <div class="desc" v-html="item.html"></div>
                <div class="other">
                  <div class="otherleft">
                    <div class="created">{{ item.created }}</div>
                    <a-divider type="vertical" />
                    <div class="views"><a-icon type="eye" /> {{ item.views }}</div>
                    <a-divider type="vertical" />
                    <div class="likes"><a-icon type="heart" theme="twoTone" two-tone-color="#eb2f96" /> {{ item.likes }}</div>
                    <a-divider type="vertical" />
                    <div class="likes"><a-icon type="user" /> {{ item.name }}</div>
                  </div>
                  <div class="btns" v-if="item.userid === userInfo._id ">
                    <a-button type="primary" @click="changeblog(item._id)">修改</a-button>
                    <a-button type="danger" style="margin-left:10px" @click="delblog(item._id)">删除</a-button>
                  </div>
                </div>
              </div>
            </div>
          </a-card>

          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="草稿列表"
            :body-style="{ padding: 0 }">
            <div style="background: #eee">
              <div v-for="(item, i) in drafts" :key="i" class="blogitem">
                <div class="blogitemtop">
                  <span class="origin">{{ item.origin === 0 ? '原创' : item.origin === 1 ? '转载' : '全部' }}</span>
                  <span class="title">{{ item.title }}</span>
                </div>
                <div class="desc" v-html="item.html"></div>
                <div class="other">
                  <div class="otherleft">
                    <div class="created">{{ item.created }}</div>
                    <a-divider type="vertical" />
                    <div class="views"><a-icon type="eye" /> {{ item.views }}</div>
                    <a-divider type="vertical" />
                    <div class="likes"><a-icon type="heart" theme="twoTone" two-tone-color="#eb2f96" /> {{ item.likes }}</div>
                    <a-divider type="vertical" />
                    <div class="likes"><a-icon type="user" /> {{ item.name }}</div>
                  </div>
                  <div class="btns" v-if="item.userid === userInfo._id ">
                    <a-button type="primary" @click="changeblog(item._id)">修改</a-button>
                    <a-button type="danger" style="margin-left:10px" @click="delblog(item._id)">删除</a-button>
                  </div>
                </div>
              </div>
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
          <a-card :loading="loading" title="分类" :bordered="false" style="margin-bottom: 24px">
            <div>
              <a-tag v-for="(v) in categorys" :key="v._id" style="cursor: pointer;" @click="getCategoryById(v._id)">{{ v.name }}</a-tag>
            </div>
          </a-card>
          <a-card title="标签" :bordered="false" style="margin-bottom: 24px">
            <div>
              <a-tag v-for="(v) in tags" :key="v._id" style="cursor: pointer;" @click="getTagById(v._id)">{{ v.name }}</a-tag>
            </div>
          </a-card>
          <a-card title="归档" :bordered="false" style="margin-bottom: 24px">
            <div v-for="(item, i) in archive" :key="i" class="archive">
              <div class="title">{{ item.year }}</div>
              <div class="times">
                <div class="time" v-for="(val, key) in item.time" :key="key" @click="getTimeArchive(item.year, val.month)">
                  <a-tag style="cursor: pointer;">{{ val.month + '月' }}</a-tag>
                  <a-tag style="cursor: pointer;">{{ val.count + '篇' }}</a-tag>
                </div>
              </div>
            </div>
          </a-card>
          <a-card title="热门文章" :bordered="false">
            <div v-for="(item, i) in hot" :key="i" class="archive">
              {{ item.title }} <a-icon type="eye" /> {{ item.views }}
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'

import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
import { getArticleList, deleteArticle, getHotArticleList, getArchive } from '@/api/article'
import marked from 'marked'
import { getCategoryList } from '@/api/category'
import { getTagList } from '@/api/tag'

export default {
  name: 'Workplace',
  components: {
    PageView,
    HeadInfo
  },
  data () {
    return {
      content: '',
      timeFix: timeFix(),
      avatar: '',
      user: {},
      drafts: [],
      blogs: [],
      loading: true,
      radarLoading: true,
      tags: [],
      categorys: [],
      archive: [
      ],
      hot: []
    }
  },
  computed: {
    ...mapState({
      nickname: (state) => state.user.nickname,
      welcome: (state) => state.user.welcome
    }),
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar
  },
  mounted () {
    this.articleList()
    this.getCategory()
    this.getTag()
    this.getHot()
    this.getArchiveList()
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
    articleList (parmas = {}) {
      getArticleList(parmas).then(res => {
        if (res.code === '0000') {
          const arr = res.data && res.data.list
          const blogArr = []
          const draftArr = []
          arr.forEach(ele => {
            const str = ele.content.length > 150 ? '...' : ''
            ele.html = marked(ele.content.substr(0, 150) + str, {
              sanitize: true
            })
            if (ele.state === 1) {
              blogArr.push(ele)
            } else {
              draftArr.push(ele)
            }
          })
          this.blogs = blogArr
          this.drafts = draftArr
          this.loading = false
        }
      })
    },
    toAddBlog () {
      this.$router.push({ name: 'AddBlog' })
    },
    delblog (id) {
      const self = this
      this.$confirm({
        content: '确定删除？',
        onOk () {
          deleteArticle({ articleId: id, userid: self.$store.state.user.info._id }).then(res => {
            if (res.code === '0000') {
              self.$message.success(res.msg)
              self.articleList()
            } else {
              self.$message.error(res.msg)
            }
          })
        }
      })
    },
    changeblog (id) {
      this.$router.push({ name: 'AddBlog', query: { id } })
    },
    getTagById (id) {
      this.articleList({ tagid: id })
    },
    getCategoryById (id) {
      this.articleList({ categoryid: id })
    },
    articleListMy (id) {
      this.articleList({ userid: id })
    },
    toDetails (id) {
      this.$router.push({ name: 'BlogDetails', query: { id } })
    },
    getHot () {
      getHotArticleList({ userid: this.user._id, likes: 1 }).then(res => {
        if (res.code === '0000') {
          this.hot = res.data
        }
      })
    },
    getArchiveList () {
      getArchive({ userid: this.user._id }).then(res => {
        if (res.code === '0000') {
          this.archive = res.data
        }
      })
    },
    getTimeArchive (year, month) {
      this.articleList({ year, month, userid: this.userInfo._id })
    }
  }
}
</script>

<style lang="less" scoped>
  .blogitem{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    background: #fff;
    margin-bottom: 10px;
    &:first-child{
      border-top: 1px solid #eee;
    }
    .blogitemtop{
      cursor: pointer;
      display: flex;
      align-items: center;
      &:hover{
        color: #52c41a;
      }
      .origin{
        color: #ff1111;
        margin-right: 10px;
      }
      .title{
        font-weight: bold;
        font-size: 22px;
      }
    }
    .desc{
      padding: 10px 0;
    }
    .other{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .otherleft{
        display: flex;
        align-items: center;
      }
    }
  }
  .project-list {

    .card-title {
      font-size: 0;

      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;

        &:hover {
          color: #1890ff;
        }
      }
    }
    .card-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
    .project-item {
      display: flex;
      margin-top: 8px;
      overflow: hidden;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      a {
        color: rgba(0, 0, 0, 0.45);
        display: inline-block;
        flex: 1 1 0;

        &:hover {
          color: #1890ff;
        }
      }
      .datetime {
        color: rgba(0, 0, 0, 0.25);
        flex: 0 0 auto;
        float: right;
      }
    }
    .ant-card-meta-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
  }

  .item-group {
    padding: 20px 0 8px 24px;
    font-size: 0;
    a {
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }

  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;
      .member {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }
      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }

  .mobile {

    .project-list {

      .project-card-grid {
        width: 100%;
      }
    }

    .more-info {
      border: 0;
      padding-top: 16px;
      margin: 16px 0 16px;
    }

    .headerContent .title .welcome-text {
      display: none;
    }
  }
.archive{
  margin-bottom: 10px;
  .title{
    margin-bottom: 10px;
  }
  .times{
    display: flex;
    .time{
      width: 25%;
      text-align: center;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
