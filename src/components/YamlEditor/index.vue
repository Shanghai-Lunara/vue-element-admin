<template>
  <div>
    <div>
      <el-select v-model="branch" filterable placeholder="请选择" @change="changeBranch">
        <el-option
          v-for="item in list"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <!-- <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
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
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button> -->
    </div>
    <div class="yaml-editor CodeMirror-wrap" style="margin-top: 5px;">
      <textarea ref="textarea" />
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
      branch: ''
    }
  },
  watch: {
    value(value) {
      console.log(8888888)
      console.log(value)
      // const editorValue = this.yamlEditor.getValue()
      // if (value !== editorValue) {
      //   this.yamlEditor.setValue(this.value)
      // }
    }
  },
  mounted() {
    // console.log(99999999)
    // console.log(this.value)

    this.initMode()

    this.list = Object.keys(this.value)
  },
  methods: {
    getValue() {
      return this.yamlEditor.getValue()
    },
    setValue(value) {
      this.yamlEditor.setValue(value)
    },
    changeBranch(val) {
      // console.log(this.$refs.textarea)
      if (val.indexOf('.php') !== -1) {
        this.yamlEditor.setOption('mode', 'php')
      } else {
        this.yamlEditor.setOption('mode', 'text/x-yaml')
      }

      var current_data = this.value[val]

      this.yamlEditor.setValue(current_data)
    },
    initMode() {
      this.yamlEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
        lineNumbers: true, // 显示行号
        mode: 'text/x-yaml', // 语法model
        gutters: ['CodeMirror-lint-markers'], // 语法检查器
        theme: 'monokai', // 编辑器主题
        lint: true // 开启语法检查
      })

      this.yamlEditor.on('change', (cm) => {
        console.log(cm)
        console.log(99999)
        this.$emit('changed', cm.getValue())
        this.$emit('input', cm.getValue())
      })
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
</style>
