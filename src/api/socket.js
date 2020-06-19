var websock = null
var globalCalback = null

function initWebSocket() {
  websock = new WebSocket('ws://39.99.229.222:9090')
  websock.onopen = function() {
    websocketopen()
  }
  websock.onmessage = function(e) {
    websockonmessage(e)
  }
  websock.onerror = function() {
    console.log('ws连接失败')
  }
  websock.onclose = function(e) {
    websocketclose(e)
  }
}

function sendSock(data, callback) {
  console.log(555556)
  globalCalback = callback
  if (websock.readyState === websock.OPEN) {
    // 若是ws开启状态
    websocketsend(data)
  } else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function() {
      sendSock(data, callback)
    }, 10000)
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function() {
      sendSock(data, callback)
    }, 10000)
  }
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

export { sendSock }
