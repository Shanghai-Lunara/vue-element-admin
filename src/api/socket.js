var websock = null
var globalCalback = null

function initWebSocket() {
  websock = new WebSocket('ws://192.168.16.202:9090')
  websock.onopen = function() {
    websocketopen()
  }
  websock.onerror = function() {
    console.log('ws连接失败')
  }
  websock.onmessage = function(e) {
    websockonmessage(e)
  }
  websock.onclose = function(e) {
    websocketclose(e)
  }
}

function sendsock(data, callback) {
  globalCalback = callback
  websocketsend(data)
}

function websockonmessage(e) {
  console.log(22222)
  globalCalback(e.data)
}

function websocketsend(data) {
  console.log(333)
  websock.send(data)
}

function websocketclose(e) {
  console.log(111111)
}

function websocketopen() {
  console.log('连接成功')
}

initWebSocket()

export { sendsock }
