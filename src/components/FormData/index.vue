<template>
  <el-form ref="form" label-width="150px">
    <el-form-item>
      <el-tag
        type=""
        style="width: 100px;
              height: 40px;
              text-align: center;
              line-height: 40px;
              font-size: 15px;"
      >{{ branch }}</el-tag>
    </el-form-item>
    <el-form-item label="Name">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="image">
      <el-input v-model="form.image" />

      <!-- <el-cascader
    v-model="value"
    :options="options"
    @change="handleChange"></el-cascader> -->

    </el-form-item>

    <el-form-item label="imagePullSecrets">
      <el-input v-model="form.imagePullSecrets" />
    </el-form-item>

    <el-form-item label="replicas">
      <el-input v-model="form.replicas" />
    </el-form-item>

    <el-form-item label="volumePath">
      <el-input v-model="form.volumePath" />
    </el-form-item>

    <el-form-item label="containerPorts">
      <!-- containerPorts -->

      <div style="margin-bottom: 20px;">
        <el-button
          size="small"
          type="primary"
          @click="addTab(editableTabsValue.contain, 'contain')"
        >
          add
        </el-button>
      </div>
      <el-tabs v-model="editableTabsValue.contain" type="card" closable @tab-remove="removeTab(editableTabsValue.contain,'contain')">
        <el-tab-pane
          v-for="item in editableTabs.contain"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >

          <el-input v-model="item.content.containerPort" placeholder="">
            <template slot="prepend">containerPort:</template>
          </el-input>
          <el-input v-model="item.content.hostIP" placeholder="">
            <template slot="prepend">hostIP:</template>
          </el-input>
          <el-input v-model="item.content.hostPort" placeholder="">
            <template slot="prepend">hostPort:</template>
          </el-input>
          <el-input v-model="item.content.name" placeholder="">
            <template slot="prepend">name:</template>
          </el-input>
          <el-input v-model="item.content.protocol" placeholder="">
            <template slot="prepend">protocol:</template>
          </el-input>

        </el-tab-pane>
      </el-tabs>

    </el-form-item>

    <el-form-item label="podResource">
      <el-tabs type="border-card">
        <el-tab-pane v-for="(pod,pod_key) in form.podResource" :key="pod_key" :label="pod_key">
          <el-input v-model="pod.cpu">
            <template slot="prepend">cpu</template>
          </el-input>
          <el-input v-model="pod.memory">
            <template slot="prepend">memory</template>
          </el-input>
        </el-tab-pane>
      </el-tabs>
    </el-form-item>

    <el-form-item label="servicePorts">
      <!-- <el-input v-model="form.servicePorts" /> -->
      <div style="margin-bottom: 20px;">
        <el-button
          size="small"
          type="primary"
          @click="addTab(editableTabsValue,'service')"
        >
          add
        </el-button>
      </div>
      <el-tabs v-model="editableTabsValue.service" type="card" closable @tab-remove="removeTab(editableTabsValue.service,'service')">
        <el-tab-pane
          v-for="item in editableTabs.service"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >

          <el-input v-model="item.content.nodePort" placeholder="">
            <template slot="prepend">nodePort:</template>
          </el-input>
          <el-input v-model="item.content.port" placeholder="">
            <template slot="prepend">port:</template>
          </el-input>
          <el-input v-if="item.content.targetPort.type === 0" v-model="item.content.targetPort.intVal" placeholder="">
            <template slot="prepend">targetPort:</template>
          </el-input>
          <el-input v-else v-model="item.content.targetPort.strVal" placeholder="">
            <template slot="prepend">targetPort:</template>
          </el-input>
          <el-input v-model="item.content.name" placeholder="">
            <template slot="prepend">name:</template>
          </el-input>
          <el-input v-model="item.content.protocol" placeholder="">
            <template slot="prepend">protocol:</template>
          </el-input>

        </el-tab-pane>
      </el-tabs>
    </el-form-item>

  </el-form>
</template>

<script>
import service from '../../utils/request'

const form = {
  name: '',
  containerPorts: contain,
  image: '',
  imagePullSecrets: '',
  podResource: [],
  replicas: 0,
  servicePorts: [],
  volumePath: ''
}

const contain = {
  containerPort: 0,
  hostIP: '',
  hostPort: 0,
  name: '',
  protocol: 'TCP'
}

// targetPort: IntOrString
// intVal: 3306
// strVal: ""
// type: 0

const servicePort = {
  name: '',
  nodePort: 0,
  port: 3306,
  protocol: 'TCP',
  targetPort: ''
}

export default {
  name: 'FormData',
  props: {
    oneData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      list: '',
      flag: '',
      command: '',
      mark: '',
      repos_list: '',
      branch: '',
      form,
      editableTabsValue: {
        contain: '1',
        service: '1'
      },
      editableTabs: [],
      tabIndex: {
        contain: 1,
        service: 1
      }
    }
  },
  watch: {
    oneData() {
      this.initForm()
    }
  },
  mounted() {
    this.getCreateData()
    this.initForm()
  },
  methods: {
    getCreateData() {
      var param = this.initParam()

      this.initHubs(param)

      var senddata = this.initData('projects', param)

      // HarborRequest
      var _self = this
      this.$socketApi(senddata, function(res) {
        _self.responseData(res, _self)
      })
    },
    initHubs(param) {
      var senddata = this.initData('hubs', param)

      // hubs
      var _self = this
      this.$socketApi(senddata, function(res) {
        _self.responseData(res, _self)
      })
    },
    initForm() {
      // console.log(this.oneData)

      if (this.oneData.hasOwnProperty('master')) {
        this.form = this.oneData['master']
        this.branch = 'master'
      } else if (this.oneData.hasOwnProperty('slave')) {
        this.form = this.oneData['slave']
        this.branch = 'slave'
      }

      // containerPorts
      if (this.form.containerPorts !== '') {
        this.editableTabs.contain = []
        this.form.containerPorts.forEach((value, index) => {
          var arr = {
            'title': 'port' + (index + 1),
            'name': (index + 1).toString(),
            'content': value
          }

          this.editableTabs.contain.push(arr)
        })
      } else {
        var arr = {
          'title': 'port1',
          'name': '1',
          'content': contain
        }
        this.editableTabs.contain.push(arr)
      }

      this.editableTabsValue.contain = '1'

      // form.podResource
      // console.log(this.form.podResource)

      // form servicePorts
      // console.log(this.form.servicePorts)

      if (this.form.servicePorts !== '') {
        this.editableTabs.service = []

        this.form.servicePorts.forEach((port_value, port_key) => {
          var port_data = {
            'title': 'port' + (port_key + 1),
            'name': (port_key + 1).toString(),
            'content': port_value
          }

          this.editableTabs.service.push(port_data)
        })
      } else {
        var port_data = {
          'title': 'port1',
          'name': '1',
          'content': servicePort
        }
        this.editableTabs.service.push(port_data)
      }

      this.editableTabsValue.service = '1'
    },
    initChange(id) {
      var param = this.initParam()

      var senddata = this.initData('repositories', param, id)

      // HarborRequest

      var _self = this
      this.$socketApi(senddata, function(res) {
        _self.responseData(res, _self)
      })
    },
    initTag(id) {
      var param = this.initParam()

      var senddata = this.initData('tags', param, id)

      // HarborRequest

      var _self = this
      this.$socketApi(senddata, function(res) {
        _self.responseData(res, _self)
      })
    },
    reposChange() {

    },
    initParam() {
      var Proto = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto

      var param = {
        'nameSpace': this.nameSpace,
        'service': 'harbor',
        'resourceType': ''
      }

      var errData = Proto.Param.verify(param)

      if (errData) { throw Error(errData) }

      return param
    },
    initData(type, param, id = 0) {
      var Proto = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto

      var data = ''
      if (type === 'tags') {
        data = {
          'command': type,
          'projectId': 0,
          'imageName': id
        }
      } else {
        data = {
          'command': type,
          'projectId': id,
          'imageName': ''
        }
      }

      var mess = Proto.HarborRequest.create(data)

      var mess_data = Proto.HarborRequest.encode(mess).finish()

      var msg = {
        'param': param,
        'data': mess_data
      }

      var message = Proto.Request.create(msg)

      var senddata = Proto.Request.encode(message).finish()

      return senddata
    },
    responseData(res, _self) {
      var result = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response.decode(res)
      //   console.log(result)
      switch (result.param.command) {
        case 'hubs':
          // var dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborHubList.decode(result.result)

          // console.log(dataStr)
          break
        case 'projects':
          var dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborProjectList.decode(result.result)
          dataStr.items.forEach((element, key) => {
            if (key === 0) {
              _self.flag = element.name
              _self.initChange(element.projectId)
            }
          })

          _self.list = dataStr.items
          break
        case 'repositories':
          // HarborRepositoryList
          var repositories = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborRepositoryList.decode(result.result)
          repositories.items.forEach((element, index) => {
            if (index === 0) {
              _self.mark = element.name
              _self.initTag(element.name)
            }
          })
          _self.repos_list = repositories.items
          break
        case 'tags':
          var tags = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborTagList.decode(result.result)
          console.log('tags')
          console.log(tags)
          break
      }
    },
    addTab(targetName, type) {
      var newTabName = ++this.tabIndex[type]
      var arr = {
        'title': 'port' + newTabName,
        'name': newTabName.toString(),
        'content': type === 'contain' ? contain : service
      }
      this.editableTabs[type].push(arr)
      this.editableTabsValue[type] = newTabName.toString()
    },
    removeTab(targetName, type) {
      const tabs = this.editableTabs[type]
      let activeName = this.editableTabsValue[type]
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.editableTabsValue[type] = activeName
      this.editableTabs[type] = tabs.filter((tab, index) => tab.name !== targetName)
    }
  }
}

</script>

<style scoped>
.el-input-group {
  width: 20%;
  margin-top: 5px;
}
</style>
