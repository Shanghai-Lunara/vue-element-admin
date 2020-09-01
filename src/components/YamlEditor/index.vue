<template>
  <div>
    <div>
      <el-input v-model="value.Name" placeholder="请输入name" style="width: 300px;" />
    </div>
    <div style="margin-top: 5px;">
      <el-tag
        v-for="tag in list"
        :key="tag.name"
        closable
        :disable-transitions="false"
        :type="tag.status === 1 ? '' : 'danger'"
        @close="handleClose(tag.name)"
        @click="changeBranch(tag.name)"
      >
        {{ tag.name }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        ref="saveTagInput"
        v-model="inputValue"
        class="input-new-tag"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
    <div class="yaml-editor CodeMirror-wrap" style="margin-top: 5px;">
      <textarea id="yaml" ref="textarea" />
    </div>
  </div>

</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/yaml/yaml'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/yaml-lint'
import 'codemirror/mode/php/php'

window.jsyaml = require('js-yaml') // 引入js-yaml为codemirror提高语法检查核心支持

export default {
  name: 'YamlEditor',
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  data() {
    return {
      yamlEditor: false,
      list: [],
      old_branch: '',
      inputVisible: false,
      inputValue: '',
      input: ''
    }
  },
  watch: {
    'value.data': function() {
      this.old_branch = ''
      this.initData()
    }
  },
  mounted() {
    this.initMode()
    this.initData()
  },
  methods: {
    initData() {
      // console.log(this.value)
      const now_list = Object.keys(this.value.data)

      const arr = []

      now_list.forEach(element => {
        arr.push({
          name: element,
          status: 1
        })
      })

      this.list = arr

      if (arr.length === 0) {
        const value = ''
        this.setValue(value)
      }
    },
    getValue() {
      return this.yamlEditor.getValue()
    },
    setValue(value) {
      this.yamlEditor.setValue(value)
    },
    changeBranch(val) {
      const old_data = this.yamlEditor.getValue()

      if (old_data !== '') {
        this.value.data[this.old_branch] = old_data
      }

      this.list.forEach(element => {
        if (element.name === val) {
          element.status = 2
        } else {
          element.status = 1
        }
      })

      if (val.indexOf('.php') !== -1) {
        this.yamlEditor.setOption('mode', 'php')
      } else {
        this.yamlEditor.setOption('mode', 'text/x-yaml')
      }

      this.old_branch = val

      this.yamlEditor.setValue(this.value.data[val])
    },
    initMode() {
      this.yamlEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
        lineNumbers: true, // 显示行号
        mode: 'text/x-yaml', // 语法model
        gutters: ['CodeMirror-lint-markers'], // 语法检查器
        theme: 'monokai', // 编辑器主题
        lint: true // 开启语法检查
      })
    },
    handleClose(tag) {
      this.list.splice(this.list.indexOf(tag), 1)
      delete this.value.data[tag]
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.list.push({
          name: inputValue,
          status: 2
        })

        this.list.forEach(element => {
          if (element.name !== inputValue) {
            element.status = 1
          }
        })
        this.old_branch = inputValue
        this.value.data[inputValue] = ''
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style scoped>
  .yaml-editor{
    height: 100%;
    position: relative;
  }
  .yaml-editor >>> .CodeMirror {
    height: auto;
    min-height: 300px;
  }
  .yaml-editor >>> .CodeMirror-scroll{
    min-height: 300px;
  }
  .yaml-editor >>> .cm-s-rubyblue span.cm-string {
    color: #F08047;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
    margin-top: 5px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
