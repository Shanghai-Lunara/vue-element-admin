<template>
  <div class="hello">
    <div id="terminal-container" />
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
      termOptions: {
        rows: 40,
        scrollback: 800
      },
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
      Terminal.applyAddon(fit)
      Terminal.applyAddon(attach)
      const term = new Terminal({
        rendererType: 'canvas',
        cursorBlink: true,
        convertEol: true,
        scrollback: this.termOptions.scrollback,
        row: this.termOptions.rows,
        theme: {
          foreground: 'white',
          background: '#060101'
        }
      })
      const terminalContainer = document.querySelector('#terminal-container')
      term.open(terminalContainer)
      term.fit()
      term.focus()
      term.writeln(`Hello from web terminal`)
      term.prompt = () => {
        term.write(this.prefix)
      }

      // 实际需要使用socket来交互, 这里不做演示
      if ('WebSocket' in window) {
        term.writeln('\x1b[1;1;32mThe Browser supports websocket!\x1b[0m')
        term.prompt()
        // 这里创建socket.io客户端实例
        // socket监听事件

        const token = this.$router.history.current.query.token
        var url = 'ws://47.111.225.60:9090/ssh/' + token
        this.init(url)
      } else {
        term.writeln('\x1b[1;1;31mThe Browser does not support websocket!\x1b[0m')
      }

      term.on('key', function(key, ev) {
        const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
        // 每行开头前缀长度 @ashinWu:$
        const threshold = this.prefix.length
        // 总偏移(长度) = 输入+前缀
        const fixation = this.input.length + threshold
        // 当前x偏移量
        const offset = term._core.buffer.x
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
              this.input = `${this.input.slice(0, offset - threshold - 1)}${this.input.slice(offset - threshold)}`
            }
            break
          case 35:
            var cursor = this.bulidData(fixation - offset, '\x1b[C')
            term.write(cursor)
            break
          // 方向盘上键
          case 38:
            if (this.histCommandList[this.histIndex - 1]) {
              // 将光标重置到末端
              term._core.buffer.x = fixation
              let b1 = ''; let b2 = ''; let b3 = ''
              // 构造退格(模拟替换效果) \b \b标识退一格; \b\b  \b\b表示退两格...
              for (let i = 0; i < this.input.length; i++) {
                b1 = b1 + '\b'
                b2 = b2 + ' '
                b3 = b3 + '\b'
              }
              term.write(b1 + b2 + b3)
              this.input = this.histCommandList[this.histIndex - 1]
              term.write(this.histCommandList[this.histIndex - 1])
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
            if (printable) {
              // 限制输入最大长度 防止换行bug
              if (fixation >= term.cols) return

              // 不在末尾插入时 要拼接
              if (offset < fixation) {
                term.write('\x1b[?K' + `${key}${this.input.slice(offset - threshold)}`)
                const cursor = this.bulidData(fixation - offset, '\x1b[D')
                term.write(cursor)
                this.input = `${this.input.slice(0, offset - threshold)}${key}${this.input.slice(offset - threshold)}`
              } else {
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

      // 若需要中文输入, 使用on data监听
      // term.on('data', function(data){
      // todo something
      // })

      return term
    },
    // 在这里处理自定义输入...
    handleInput() {
      // 判断空值
      this.terminal.write('\r\n')
      if (this.input.trim()) {
        // 记录历史命令
        if (this.histCommandList[this.histCommandList.length - 1] !== this.input) {
          this.histCommandList.push(this.input)
          this.histIndex = this.histCommandList.length
        }
        const command = this.input.trim().split(' ')
        // 可限制可用命令
        // 这里进行socket交互 发送message
        console.log('command')
        console.log(command)

        // {"type":"input","input":"pwd","rows":0,"cols":0}
        var message = { 'type': 'input', 'input': command[0] + '\n', 'rows': 0, 'cols': 0 }

        this.send(JSON.stringify(message))
        // switch (command[0]) {
        //   case 'help':
        //     this.terminal.writeln('\x1b[40;33;1m\nthis is a web terminal demo based on xterm!\x1b[0m\n此demo模拟shell上下左右和退格键效果\n')
        //     break
        //   default:
        //     this.terminal.writeln(this.input)
        //     break
        // }
      }
      this.terminal.prompt()
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
      console.log('message')

      var reader = new FileReader()

      var _self = this
      reader.onload = function(event) {
        console.log(33333333333)
        console.log(reader)
        console.log(reader.result)
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
