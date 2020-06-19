<template>
  <div class="icons-container">
    <aside>
      <a href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html" target="_blank">Add and use
      </a>
    </aside>
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div class="grid">
          <div v-for="item of svgIcons" :key="item" @click="handleClipboard(generateIconCode(item),$event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateIconCode(item) }}
              </div>
              <div class="icon-item">
                <svg-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div class="grid">
          <div v-for="item of elementIcons" :key="item" @click="handleClipboard(generateElementIconCode(item),$event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateElementIconCode(item) }}
              </div>
              <div class="icon-item">
                <i :class="'el-icon-' + item" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard'
import svgIcons from './svg-icons'
import elementIcons from './element-icons'
import proto from '../../../proto/proto'

import { sendSock } from '../../api/socket'

export default {
  name: 'Icons',
  data() {
    return {
      svgIcons,
      elementIcons
    }
  },
  created() {
    var data = {
      'nameSpace': 'default',
      'service': 'ping',
      'resource': 'RedisOperator'
    }

    var errData = proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.verify(data)

    if (errData) { throw Error(errData) }

    var msg = {
      'param': data,
      'data': ''
    }

    var errMsg = proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request.verify(msg)

    if (errMsg) { throw Error(errMsg) }

    var request = proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request

    var message = request.create(msg)

    var senddata = request.encode(message).finish()

    console.log(senddata)

    // proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.prototype.nameSpace = 'default'
    // proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.prototype.service = 'ping'
    // proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.prototype.resourceType = 'RedisOperator'

    // var param = proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.prototype

    // proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request.prototype.param = param
    // proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request.prototype.data = '12342121213131'

    // var list = proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request.prototype

    // // console.log(list)

    // var senddata = proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request.encode(list).finish()

    sendSock(senddata, function(res) {
      console.log(res.data)
      // console.log(res.data.arrayBuffer(res.data))
      var buffer = new Uint8Array(res.data)
      console.log(buffer)
      var result = proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request.decode(buffer)
      console.log(result)
      // var data = proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response.toObject(result)
      // console.log(data)
    })
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    generateElementIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
