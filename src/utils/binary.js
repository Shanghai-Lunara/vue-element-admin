export default {
  toBinary(str) {
    var result = []
    var list = str.split('')
    for (var i = 0; i < list.length; i++) {
      if (i !== 0) {
        result.push(' ')
      }
      var item = list[i]
      var binaryStr = item.charCodeAt().toString(2)
      result.push(binaryStr)
    }
    return result.join('')
  },

  toStr(result) {
    var dataString = ''
    var list = result
    for (var i = 0; i < list.length; i++) {
      dataString += String.fromCharCode(list[i])
    }

    return dataString
  }
}
