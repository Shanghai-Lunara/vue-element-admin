<template>
  <div class="hello">
    <div id="terminal-container" style="width: 100%;" />
  </div>
</template>

<script>
import 'xterm/dist/xterm.css'
import 'xterm/dist/xterm'
import * as fit from 'xterm/dist/addons/fit/fit'
import * as attach from 'xterm/dist/addons/attach/attach'
import { Terminal } from 'xterm'

export default {
  name: 'HelloWorld',
  data() {
    return {
      terminal: Object,
      input: '',
      prefix: '',
      // 历史指令
      histIndex: 0,
      histCommandList: [],
      currentOffset: Number
    }
  },
  mounted() {
    this.terminal = this.initTerm()
  },
  methods: {
    initTerm() {
      const rows = Math.floor((document.body.clientHeight - 100) / 15)
      console.log(rows)

      Terminal.applyAddon(fit)
      Terminal.applyAddon(attach)

      const term = new Terminal({
        rendererType: 'canvas',
        cursorBlink: true,
        convertEol: true,
        scrollback: 200,
        rows: rows,
        fontSize: 15,
        theme: {
          foreground: 'white',
          background: '#060101'
        }
      })
      const terminalContainer = document.querySelector('#terminal-container')
      term.open(terminalContainer)

      window.addEventListener('resize', this.onWindowResize)

      term.fit()
      term.focus()
      term.writeln(`Hello from web terminal`)
      term.prompt = () => {
        console.log('init')
        term.write(this.prefix)
      }

      console.log(term.cols)
      console.log(term.rows)

      // 实际需要使用socket来交互, 这里不做演示
      if ('WebSocket' in window) {
        term.writeln('\x1b[1;1;32mThe Browser supports websocket!\x1b[0m')
        term.prompt()
        // 这里创建socket.io客户端实例
        // socket监听事件

        const token = this.$router.history.current.query.token
        var url = process.env.VUE_APP_BASH_SOCKET_URL + '/ssh/' + token
        this.init(url)
      } else {
        term.writeln('\x1b[1;1;31mThe Browser does not support websocket!\x1b[0m')
      }

      term.on('key', function(key, ev) {
        console.log('key____' + key)
        const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey

        console.log('printable____' + printable)
        // 每行开头前缀长度 @ashinWu:$
        const threshold = this.prefix.length
        console.log('threshold____' + threshold)
        // 总偏移(长度) = 输入+前缀
        const fixation = this.input.length + threshold
        // 当前x偏移量
        const offset = term._core.buffer.x
        console.log('fixation____' + fixation)
        console.log('offset____' + offset)
        this.currentOffset = fixation
        // 禁用Home、PgUp、PgDn、Ins、Del键
        if ([36, 33, 34, 45, 46].indexOf(ev.keyCode) !== -1) return

        switch (ev.keyCode) {
          // 回车键
          case 13:
            this.handleInput()
            this.input = ''
            break
          // 退格键
          case 8:

            if (offset > threshold) {
              term._core.buffer.x = offset - 1

              // \x1b[?K: 清除光标至行末的"可清除"字符
              term.write('\x1b[?K' + this.input.slice(offset - threshold))
              // 保留原来光标位置
              const cursor = this.bulidData(fixation - offset, '\x1b[D')
              term.write(cursor)
              this.input = this.input.slice(0, this.input.length - 1)
            }
            break
          case 35:
            var cursor = this.bulidData(fixation - offset, '\x1b[C')
            term.write(cursor)
            break
          // 方向盘上键
          case 38:
            console.log(this.histCommandList)
            console.log(this.histIndex)
            if (this.histCommandList[this.histIndex - 1]) {
              console.log('上')
              // 将光标重置到末端
              // term._core.buffer.x = fixation
              var off = offset
              // const b1 = ''
              // 构造退格(模拟替换效果) \b \b标识退一格; \b\b  \b\b表示退两格...
              for (let i = 0; i < this.input.length; i++) {
                off--
                // b1 = b1 + '\b'
                // b2 = b2 + ' '
                // b3 = b3 + '\b'
                // b1 = b1 + '\b'
              }

              term._core.buffer.x = off

              term.write(this.histCommandList[this.histIndex - 1])
              this.input += this.histCommandList[this.histIndex - 1]
              // term.write(this.input)
              this.histIndex--
            }
            break
          // 方向盘下键
          case 40:
            if (this.histCommandList[this.histIndex + 1]) {
              // 将光标重置到末端
              term._core.buffer.x = fixation
              let b1 = ''; let b2 = ''; let b3 = ''
              // 构造退格(模拟替换效果) \b \b标识退一格; \b\b  \b\b表示退两格...
              for (let i = 0; i < this.histCommandList[this.histIndex].length; i++) {
                b1 = b1 + '\b'
                b2 = b2 + ' '
                b3 = b3 + '\b'
              }
              this.input = this.histCommandList[this.histIndex + 1]
              term.write(b1 + b2 + b3)
              term.write(this.histCommandList[this.histIndex + 1])
              this.histIndex++
            }
            break
          // 方向盘左键
          case 37:
            if (offset > threshold) {
              term.write(key)
            }
            break
          // 方向盘右键
          case 39:
            if (offset < fixation) {
              term.write(key)
            }
            break
          default:
            console.log('1111111____' + 'init')
            if (printable) {
              // 限制输入最大长度 防止换行bug
              if (fixation >= term.cols) return

              // 不在末尾插入时 要拼接
              if (offset < fixation) {
                console.log('222222____' + 'init')
                term.write('\x1b[?K' + `${key}${this.input.slice(offset - threshold)}`)
                const cursor = this.bulidData(fixation - offset, '\x1b[D')
                term.write(cursor)
                this.input = `${this.input.slice(0, offset - threshold)}${key}${this.input.slice(offset - threshold)}`
              } else {
                console.log('333333____' + 'init')
                term.write(key)
                this.input += key
              }
              this.histIndex = this.histCommandList.length
            }
            break
        }
      }.bind(this))

      // 选中复制
      term.on('selection', function() {
        console.log(88888888)
        if (term.hasSelection()) {
          this.copy = term.getSelection()
        }
      }.bind(this))

      term.attachCustomKeyEventHandler(function(ev) {
        // curl+v
        if (ev.keyCode === 86 && ev.ctrlKey) {
          console.log(999999)
          const inline = (this.currentOffset + this.copy.length) >= term.cols
          if (inline) return
          if (this.copy) {
            term.write(this.copy)
            this.input += this.copy
          }
        }
      }.bind(this))

      return term
    },
    // 在这里处理自定义输入...
    handleInput() {
      // 判断空值
      this.terminal.write('\r\n')
      // if (this.input.trim()) {
      // 记录历史命令
      if (this.histCommandList[this.histCommandList.length - 1] !== this.input) {
        this.histCommandList.push(this.input)
        this.histIndex = this.histCommandList.length
      }
      const command = this.input.trim()
      // 可限制可用命令
      // 这里进行socket交互 发送message
      console.log('command')
      console.log(command)

      // {"type":"input","input":"pwd","rows":0,"cols":0}
      const rows = Math.floor((document.body.clientHeight - 100) / 15)
      var message = { 'type': 'input', 'input': command + '\n', 'rows': 0, 'cols': rows }

      this.send(JSON.stringify(message))
      this.terminal.prompt()
    },

    onWindowResize() {
      try {
        this.terminal.fit()

        // 窗口大小改变时触发xterm的resize方法，向后端发送行列数，格式由后端决定
        // 这里不使用size默认参数，因为改变窗口大小只会改变size中的列数而不能改变行数，所以这里不使用size.clos,而直接使用获取我们根据窗口大小计算出来的行列数
        this.terminal.on('resize', function() {
          const rows = Math.floor((document.body.clientHeight - 100) / 15)
          var message = { 'Op': 'resize', 'rows': 0, 'cols': rows }
          this.send(JSON.stringify(message))
        })
      } catch (e) {
        console.log('e', e.message)
      }
    },

    bulidData(length, subString) {
      let cursor = ''
      for (let i = 0; i < length; i++) {
        cursor += subString
      }
      return cursor
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
      // this.initXterm()
    },
    error: function() {
      console.log('连接错误')
    },
    close: function() {
      if (this.socket) {
        this.socket.close()
      }
      if (this.term) {
        this.term.dispose(document.getElementById('terminal-container'))
      }
      // console.log("socket已经关闭");
    },
    getMessage: function(event) {
      var reader = new FileReader()

      var _self = this
      reader.onload = function(event) {
        _self.terminal.write(reader.result)
      }

      reader.readAsText(event.data)
    },
    send: function(order) {
      this.socket.send(order)
    }
  }
}
</script>

<style>
  .xterm-screen {
    height: 100%
  }
</style>
