<template>

  <div id="terminal" ref="terminal" />

</template>
<script>

import { Terminal } from 'xterm'
import 'xterm/dist/xterm.css'
import 'xterm/lib/xterm.js'

import * as attach from 'xterm/lib/addons/attach/attach'
import * as fit from 'xterm/lib/addons/fit/fit'
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen'

Terminal.applyAddon(attach)
Terminal.applyAddon(fit)
Terminal.applyAddon(fullscreen)

export default {
  data() {
    return {
      term: '',
      socket: '',
      rows: 40,
      cols: 100,
      order: '',
      shellWs: '',
      inputValue: '',
      showOrder: '', // 保存服务端返回的命令
      inputList: [], // 保存用户输入的命令，用以上下健切换
      beforeUnload_time: ''
    }
  },
  beforeDestroy() {
    this.close()
  },
  mounted() {
    const token = this.$router.history.current.query.token
    var url = 'ws://47.111.225.60:9090/ssh/' + token
    this.init(url)
  },
  methods: {
    initXterm() {
      const _this = this

      this.cols = window.innerWidth / 14
      this.rows = window.innerHeight / 16 - 6

      this.term = new Terminal({
        rendererType: 'canvas', // 渲染类型
        rows: parseInt(_this.rows), // 行数
        cols: parseInt(_this.cols), // 不指定行数，自动回车后光标从下一行开始
        convertEol: true, // 启用时，光标将设置为下一行的开头
        scrollback: 800, // 终端中的回滚量
        disableStdin: false, // 是否应禁用输入。
        cursorStyle: 'underline', // 光标样式
        cursorBlink: true, // 光标闪烁
        fontSize: 16,
        theme: {
          foreground: '#ffffff', // 字体
          background: '#002833', // 背景色
          cursor: 'help', // 设置光标
          lineHeight: 16
        }
      })

      //   {"type":"input","input":"pwd","rows":0,"cols":0}

      this.term.open(document.getElementById('terminal'))

      this.term.toggleFullScreen()

      window.onresize = function() {
        _this.term.fit()
        _this.term.toggleFullScreen() // 全屏
      }

      let last = 0

      this.term.on('key', function(key, ev) {
        // 可打印状态，即不是alt键ctrl等功能健时
        const printable =
          !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey

        // 因服务端返回命令包含乱码，但使用write方法输出时并不显示，故将真实显示内容截取出来
        const index = _this.showOrder.indexOf('sh')
        const show = _this.showOrder.substr(index, _this.showOrder.length - 1)

        //  当输入回车时
        if (ev.keyCode === 13) {
          if (_this.order === 'cls' || _this.order === 'clear') {
            _this.order = ''
            return false
          }
          // // 先将数据发送
          // _this.term.prompt()
          // 判断如果不是英文给出提醒
          const reg = /[a-zA-Z]/

          _this.cols = window.innerWidth / 14
          _this.rows = window.innerHeight / 16 - 6
          const order = { 'type': 'input', 'input': _this.order, 'rows': _this.rows, 'cols': _this.cols }

          if (!reg.test(_this.order)) {
            _this.term.writeln('请输入有效指令~')
          } else {
            // 发送数据
            console.log(111111111)
            _this.inputList.push(_this.order)
            last = _this.inputList.length - 1

            _this.send(JSON.stringify(order))
          }
        } else if (ev.keyCode === 8) {
          // 当输入退

          // Do not delete the prompt
          // 当前行字符长度如果等于后端返回字符就不进行删除
          if (_this.term._core.buffer.x > _this.showOrder.length) {
            _this.term.write('\b \b') // 输出退格
          }

          // 将输入内容变量删除

          if (_this.order.trim() === _this.showOrder.trim()) {
            return false
          } else {
            _this.order = _this.order.substr(0, _this.order.length - 1)
          }
        } else if (ev.keyCode === 38 || ev.keyCode === 40) {
          const len = _this.inputList.length
          const code = ev.keyCode

          if (code === 38 && last <= len && last >= 0) {
            // 直接取出字符串数组最后一个元素
            const inputVal = _this.inputList[last]
            _this.term.write(inputVal)
            if (last > 0) {
              last--
            }
          }
          if (code === 40 && last < len) {
            // last现在为当前元素
            if (last === len - 1) {
              return
            }
            if (last < len - 1) {
              last++
            }

            const inputVal = _this.inputList[last]
            _this.term.write(inputVal)
          }
        } else if (ev.keyCode === 9) {
          // 如果按tab键前输入了之前后端返回字符串的第一个字符，就显示此命令
          if (_this.order !== '' && show.indexOf(_this.order) === 0) {
            _this.term.write(_this.showOrder)
          }
        } else if (printable) {
          // 当为可打印内容时
          if (/[a-zA-Z]/.test(key)) {
            key = key.toLowerCase()
          }
          // 存入输入内容变量
          _this.order = _this.order + key
          // 将变量写入终端内
          _this.term.write(key)
        }
      })

      // 粘贴事件
      this.term.on('paste', function(data) {
        _this.order = data
        _this.term.write(data)
      })
    },
    windowChange() {
      this.term.fit()
      this.term.scrollToBottom()
    },
    init(url) {
      // 实例化socket
      this.socket = new WebSocket(url)
      // 监听socket连接
      this.socket.onopen = this.open
      // 监听socket错误信息
      this.socket.onerror = this.error
      // 监听socket消息
      this.socket.onmessage = this.getMessage
      // 发送socket消息
      this.socket.onsend = this.send
    },
    open: function() {
      console.log('socket连接成功')
      this.initXterm()
    },
    error: function() {
      console.log('连接错误')
    },
    close: function() {
      if (this.socket) {
        this.socket.close()
      }
      if (this.term) {
        this.term.dispose(document.getElementById('terminal'))
      }

      window.removeEventListener('resize', this.windowChange)
      // console.log("socket已经关闭");
    },
    getMessage: function(event) {
      console.log('message')

      var reader = new FileReader()

      var _self = this
      reader.onload = function(event) {
        console.log(33333333333)
        console.log(reader.result)
        _self.term.write(reader.result)
      }
      reader.readAsText(event.data)
    },
    send: function(order) {
      console.log(22222222222)
      console.log(order)
      this.socket.send(order)
    }
  }
}
</script>

<style scoped>
  .terminal .xterm {
    height: 100%;
    position: static;
  }
</style>
