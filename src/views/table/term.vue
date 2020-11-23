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
import 'xterm/css/xterm.css'
import 'xterm/lib/xterm.js'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'

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
    // this.initTerm()
  },

  mounted() {
    //  111111
    this.rows = Math.floor(document.getElementById('indexContainer').clientHeight / 16 - 6)
    this.cols = document.getElementById('indexContainer').clientWidth / 14

    const _this = this

    const term = new Terminal({
      rendererType: 'canvas', // 渲染类型
      rows: parseInt(_this.rows), // 行数
      cols: parseInt(_this.cols), // 不指定行数，自动回车后光标从下一行开始
      convertEol: true, // 启用时，光标将设置为下一行的开头
      //   scrollback: 50, //终端中的回滚量
      disableStdin: false, // 是否应禁用输入。
      cursorStyle: 'underline', // 光标样式
      cursorBlink: true, // 光标闪烁
      theme: {
        foreground: '#7e9192', // 字体
        background: '#002833', // 背景色
        cursor: 'help', // 设置光标
        lineHeight: 16
      }
    })

    // 创建terminal实例
    term.open(this.$refs['terminal'])

    // 换行并输入起始符“$”
    term.prompt = () => {
      term.write('\r ')
    }
    term.prompt()

    // // canvas背景全屏
    var fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    fitAddon.fit()

    window.addEventListener('resize', resizeScreen)

    _this.term = term

    // 内容全屏显示
    function resizeScreen() {
      // 不传size

      try {
        fitAddon.fit()

        // 窗口大小改变时触发xterm的resize方法，向后端发送行列数，格式由后端决定
        // 这里不使用size默认参数，因为改变窗口大小只会改变size中的列数而不能改变行数，所以这里不使用size.clos,而直接使用获取我们根据窗口大小计算出来的行列数
        term.onResize(() => {
          _this.send({ type: 'resize', cols: term.cols, rows: term.rows, input: '' })
        })
      } catch (e) {
        console.log('e', e.message)
      }
    }

    function runFakeTerminal(_this) {
      if (term._initialized) {
        return
      }
      // 初始化
      term._initialized = true

      term.prompt()

      // / **
      //     *添加事件监听器，用于按下键时的事件。事件值包含
      //     *将在data事件以及DOM事件中发送的字符串
      //     *触发了它。
      //     * @返回一个IDisposable停止监听。
      //  * /
      //   / ** 更新：xterm 4.x（新增）
      //  *为数据事件触发时添加事件侦听器。发生这种情况
      //  *用户输入或粘贴到终端时的示例。事件值
      //  *是`string`结果的结果，在典型的设置中，应该通过
      //  *到支持pty。
      //  * @返回一个IDisposable停止监听。
      //  * /
      // 支持输入与粘贴方法
      term.onData(function(key) {
        const order = {
          // type: "resize", cols: term.cols, rows: term.rows, input: ''
          input: key,
          type: 'input',
          cols: term.cols,
          rows: term.rows
        }
        _this.send(JSON.stringify(order))
        // 为解决窗体resize方法才会向后端发送列数和行数，所以页面加载时也要触发此方法
        _this.send(JSON.stringify({
          input: '',
          type: 'resize',
          cols: term.cols,
          rows: term.rows
        }))
      })
    }
    runFakeTerminal(_this)
  },

  methods: {
    initTerm() {

    },
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

