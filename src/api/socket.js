var websock = null
var globalCalback = null

function initWebSocket() {
  websock = new WebSocket(process.env.VUE_APP_SOCKET_URL)
  websock.binaryType = 'arraybuffer'
  websock.onopen = function() {
    websocketopen()
  }
  websock.onmessage = function(e) {
    websockonmessage(e)
  }
  websock.onerror = function() {
    console.log('ws连接失败' + '888888')
  }
  websock.onclose = function(e) {
    websocketclose(e)
  }
}

function sendSock(data, callback) {
  globalCalback = callback
  if (websock.readyState === websock.OPEN) {
    // 若是ws开启状态
    websocketsend(data)
  } else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function() {
      sendSock(data, callback)
    }, 1000)
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function() {
      sendSock(data, callback)
    }, 1000)
  }
}

function websockonmessage(e) {
  console.log('websocket_message:' + '222222')
  // console.log(new Date().getTime() + '/' + '222222')
  var buffer = new Uint8Array(e.data)
  globalCalback(buffer)
}

function websocketsend(data) {
  // console.log(new Date().getTime() + '/' + '111111')
  console.log('websocket_send:' + '111111')
  websock.send(data)
}

function websocketclose(e) {
  console.log('websocket_close:' + '333333')
}

function websocketopen() {
  console.log('连接成功')
}

initWebSocket()

export { sendSock }
