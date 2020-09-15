<template>
  <div id="terminal" style="margin:0 0 0 0;height:600px;width:auto" />
</template>
<script>

import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import 'xterm/lib/xterm.js'

export default {
  data() {
    return {
      term: '',
      socket: ''
    }
  },
  beforeDestroy() {
    this.close()
  },
  mounted() {
    console.log(888888888)
    var url = 'ws://47.111.225.60:9090/ssh/2148c19e9965d160edcfe09b6fa707cf'
    this.init(url)
  },
  methods: {
    initXterm() {
      this.term = new Terminal({
        rendererType: 'canvas', // 渲染类型
        rows: 35, // 行数
        convertEol: true, // 启用时，光标将设置为下一行的开头
        scrollback: 10, // 终端中的回滚量
        disableStdin: false, // 是否应禁用输入
        cursorStyle: 'underline', // 光标样式
        cursorBlink: true, // 光标闪烁
        theme: {
          foreground: 'yellow', // 字体
          background: '#060101', // 背景色
          cursor: 'help' // 设置光标
        }
      })

      //   {"type":"input","input":"pwd","rows":0,"cols":0}

      this.term.open(document.getElementById('terminal'))
      const fitAddon = new FitAddon()
      this.term.loadAddon(fitAddon)
      // 支持输入与粘贴方法
      const _this = this // 一定要重新定义一个this，不然this指向会出问题
      var input = ''
      this.term.onData(function(key) {
        // let order = ["stdin",key]; //这里key值是你输入的值，数据格式一定要找后端要！！！！
        // _this.socket.onsend(JSON.stringify(order)); //转换为字符串
        _this.term.write(key)
        input += key
        if (Buffer.from(key)[0] === 13) {
          var message = { 'type': 'input', 'input': input, 'rows': 0, 'cols': 0 }
          _this.term.writeln('')
          _this.send(JSON.stringify(message))
          input = ''
        }
      })
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
      // console.log("socket已经关闭");
    },
    getMessage: function(event) {
      console.log(event)

      var reader = new FileReader()

      var _self = this
      reader.onload = function(event) {
        console.log(2222)
        // console.log(event)
        // console.log(reader)
        console.log(reader.result)
        _self.term.write(reader.result)
        // _self.term.writeln('')
      }
      reader.readAsText(event.data)
    },
    send: function(order) {
      this.socket.send(order)
    }
  }
}
</script>

