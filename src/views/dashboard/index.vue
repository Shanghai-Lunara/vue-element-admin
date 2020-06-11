<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
// import socket from '../../api/socket'
// import { array } from 'jszip/lib/support'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }

    this.initWebSocket()
    // var arr = '{"service":"ping","data":"abc"}'
    // socket.sendsock(arr)
  },
  methods: {
    initWebSocket() {
      this.websock = new WebSocket('ws://192.168.16.202:9090')
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() {
      var arr = '{"service":"ping","data":"abc"}'
      this.websocketsend(arr)
    },
    websocketonerror() {
      console.log(454544)
      this.initWebSocket()
    },
    websocketonmessage(e) {
      const redata = JSON.parse(e.data)
      console.log(redata)
    },
    websocketsend(Data) {
      this.websock.send(Data)
    },
    websocketclose(e) {
      console.log('断开连接', e)
    }
  }
}
</script>
