<template>
  <div
    id="indexContainer"
    style="height: 100%;
    background: #002833;"
  >
    <div id="terminal" ref="terminal" />
  </div>
</template>

<script>
import { Terminal } from 'xterm'
import 'xterm/dist/xterm.css'
import * as fit from 'xterm/lib/addons/fit/fit'

import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen'
import * as attach from 'xterm/lib/addons/attach/attach'

Terminal.applyAddon(fit)
Terminal.applyAddon(attach)
Terminal.applyAddon(fullscreen) // Apply the `fullscreen` addon

export default {
  name: 'Shell',
  data() {
    return {
      order: '',
      term: '', // 保存terminal实例
      rows: 40,
      cols: 100
    }
  },

  created() {
    this.wsShell()
  },

  mounted() {
    const _this = this

    this.rows = Math.floor(document.getElementById('indexContainer').clientHeight / 16 - 6)
    this.cols = document.getElementById('indexContainer').clientWidth / 14

    const term = new Terminal({
      rendererType: 'canvas', // 渲染类型
      rows: parseInt(_this.rows), // 行数
      // cols: parseInt(_this.cols),
      convertEol: true, // 启用时，光标将设置为下一行的开头
      //   scrollback: 50, //终端中的回滚量
      disableStdin: false, // 是否应禁用输入。
      cursorStyle: 'underline', // 光标样式
      cursorBlink: true, // 光标闪烁
      fontSize: 16,
      theme: {
        foreground: '#7e9192', // 字体
        background: '#002833', // 背景色
        cursor: 'help', // 设置光标
        lineHeight: 16
      }
    })
    // 换行并输入起始符“$”
    term.prompt = () => {
      term.write('\r\n$ ')
    }
    // Load WebLinksAddon on terminal, this is all that's needed to get web links
    // working in the terminal.
    // term.loadAddon(new WebLinksAddon());

    term.open(this.$refs['terminal'])
    term.toggleFullScreen() // 全屏

    window.onresize = function() {
      term.fit()
      term.toggleFullScreen() // 全屏
      term.prompt()
    }

    function runFakeTerminal(_this) {
      if (term._initialized) {
        return
      }

      term._initialized = true

      term.prompt = () => {
        term.write('\r\n')
      }

      //   term.writeln('Welcome to use Superman.')

      term.prompt()

      // 监控键盘输入事件
      // / **
      //     *添加事件监听器，用于按下键时的事件。事件值包含
      //     *将在data事件以及DOM事件中发送的字符串
      //     *触发了它。
      //     * @返回一个IDisposable停止监听。
      //  * /

      term.on('key', function(key, ev) {
        // console.log(key)
        if (ev.keyCode === 13) {
          key = '\n'
        }
        const order = { 'type': 'input', 'input': key, 'rows': term.rows, 'cols': term.cols }
        // console.log(order)
        _this.send(JSON.stringify(order))
      })

      term.on('paste', function(data) {
        _this.order = data
        const order = { 'type': 'input', 'input': data, 'rows': Math.floor(term.rows), 'cols': Math.floor(term.cols) }
        // console.log(order)
        _this.send(JSON.stringify(order))
        // term.write(data)
      })

      term.on('resize', size => {
        // console.log(size)
        const order = {
          rows: Math.floor(size.rows),
          cols: Math.floor(size.cols),
          type: 'resize',
          input: ''
        }

        _this.send(order)
      })

      _this.term = term
    }

    runFakeTerminal(_this)
  },

  methods: {
    wsShell() {
      const token = this.$router.history.current.query.token

      let type = ''
      if (this.$router.history.current.query.type === 'bash') {
        type = '/ssh/'
      } else {
        type = '/log/'
      }

      const url = process.env.VUE_APP_BASH_SOCKET_URL + type + token

      this.init(url)
    },
    initXtermPing() {
      var _this = this
      setInterval(function() {
        const order = { 'type': 'ping', 'input': '', 'rows': 0, 'cols': 0 }
        _this.send(JSON.stringify(order))
      }, 1000)
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
      this.initXtermPing()
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
    },
    getMessage: function(event) {
      var reader = new FileReader()

      var _self = this
      reader.onload = function(event) {
        _self.term.write(reader.result)
      }

      reader.readAsText(event.data)
    },
    send: function(order) {
      this.socket.send(order)
    }
  }
}
</script>

