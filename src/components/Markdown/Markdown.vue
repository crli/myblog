<!--
 * @Author: crli
 * @Date: 2020-04-22 16:28:17
 * @LastEditors: crli
 * @LastEditTime: 2020-04-29 17:01:53
 * @Description: file content
 -->
<template>
  <div class="markdown-wrapper">
    <textarea ref="editor"></textarea>
  </div>
</template>

<script>
import Simplemde from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
export default {
  name: 'MarkdownEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => {
        return {
          toolbar: [
            'bold',
            'italic',
            'strikethrough',
            'heading',
            'code',
            'quote',
            'unordered-list',
            'ordered-list',
            'clean-block',
            'link',
            'image',
            'table',
            'horizontal-rule',
            'preview',
            'side-by-side',
            'fullscreen',
            'guide'
          ]
        }
      }
    }
    // localCache: {
    //   type: Boolean,
    //   default: true
    // }
  },
  data () {
    return {
      editor: null
    }
  },
  methods: {
    addEvents () {
      this.editor.codemirror.on('change', () => {
        // if (this.localCache) localStorage.markdownContent = value
        this.$emit('input', this.editor.value())
        this.$emit('on-change', this.editor.value())
      })
      this.editor.codemirror.on('focus', () => {
        this.$emit('on-focus', this.editor.value())
      })
      this.editor.codemirror.on('blur', () => {
        this.$emit('on-blur', this.editor.value())
      })
    },
    // 初始化hack
    setValue () {
      this.$nextTick(() => {
        if (!this.editor.value()) {
          this.editor.value(this.value)
        }
      })
    }
  },
  mounted () {
    this.editor = new Simplemde(Object.assign(this.options, {
      element: this.$refs.editor
    }))
    this.addEvents()
    // let content = localStorage.markdownContent
    // if (content) this.editor.value(content)
  }
}
</script>

<style lang="less">
.markdown-wrapper{
  .editor-toolbar.fullscreen{
    z-index: 9999;
  }
  .CodeMirror-fullscreen{
    z-index: 9999;
  }
  .CodeMirror-fullscreen ~ .editor-preview-side{
    z-index: 9999;
  }
}
</style>
