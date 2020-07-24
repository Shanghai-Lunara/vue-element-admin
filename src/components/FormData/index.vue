<template>
  <el-form ref="form" label-width="150px">
    <el-form-item>
      <el-select v-model="branch" @change="changeBranch">
        <el-option
          v-for="item in select"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Name">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="image">
      <!-- <el-input v-model="form.image" /> -->

      <el-cascader
        v-model="value"
        :options="options"
        @change="handleChange"
      />

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
      type: Object,
      required: true
    }
  },
  data() {
    return {
      select: [{
        value: 'master',
        label: 'master'
      }, {
        value: 'slave',
        label: 'slave'
      }],
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
      },
      options: [],
      value: [],
      url: '',
      project: 1,
      image: '',
      masterData: '',
      slaveData: ''
    }
  },
  watch: {
    oneData() {
      this.initForm()
    }
  },
  mounted() {
    this.getCreateData()
    // this.initForm()
  },
  methods: {
    getCreateData() {
      var param = this.initParam()
      this.initHubs(param)
    },
    initHubs(param) {
      var senddata = this.initData('hubs', param)

      // hubs
      var _self = this
      this.$socketApi(senddata, function(res) {
        _self.responseData(res, _self)
      })
    },
    changeBranch(value) {
      this.branch = value
      this.form = this.oneData[value]

      if (value === 'slave') {
        this.masterData = this.editableTabs
      }

      if (value === 'master') {
        this.slaveData = this.editableTabs
      }

      this.editableTabs = []
      this.tabIndex = {
        contain: 1,
        service: 1
      }

      this.editableTabsValue = {
        contain: '1',
        service: '1'
      }

      this.initPodService()
    },
    handleChange(value) {
      console.log(45545454)
      console.log(value)
    },
    initProject() {
      var param = this.initParam()
      var senddata = this.initData('projects', param, 0)

      // HarborRequest
      var _self = this
      this.$socketApi(senddata, function(res) {
        _self.responseData(res, _self)
      })
    },
    initPodService() {
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
    initForm() {
      this.branch = 'master'
      this.form = this.oneData.master
      this.initPodService()
    },
    initChange(id) {
      console.log(id)
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
        _self.responseData(res, _self, id)
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
        console.log(id)
        console.log(969696)
        data = {
          'harborUrl': this.url,
          'command': type,
          'projectId': 0,
          'imageName': id
        }
      } else {
        data = {
          'harborUrl': this.url,
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
    responseData(res, _self, tag_name = '') {
      var result = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response.decode(res)
      switch (result.param.command) {
        case 'hubs':
          var hublist = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborHubList.decode(result.result)

          hublist.items.forEach(element => {
            _self.options.push(
              {
                'value': element.name,
                'label': element.name,
                'children': []
              }
            )

            _self.url = element.name
            _self.initProject()
          })

          break
        case 'projects':
          var dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborProjectList.decode(result.result)

          _self.options.forEach(value => {
            if (value.value === _self.url) {
              dataStr.items.forEach((element, key) => {
                value.children.push(
                  {
                    'value': element.projectId,
                    'label': element.name,
                    'children': []
                  }
                )

                _self.projectId = element.projectId
                _self.initChange(element.projectId)
              })
            }
          })

          break
        case 'repositories':
          // HarborRepositoryList
          var repositories = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborRepositoryList.decode(result.result)

          _self.options.forEach(value => {
            if (value.value === _self.url) {
              value.children.forEach(repos_value => {
                repositories.items.forEach(element => {
                  if (repos_value.value === element.projectId) {
                    repos_value.children.push({
                      'value': element.repositoryId,
                      'label': element.name,
                      'children': []
                    })
                    // console.log(element.name)
                    // console.log(121212121)
                    _self.initTag(element.name)
                  }
                })
              })
            }
          })

          break
        case 'tags':
          var tags = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborTagList.decode(result.result)

          _self.options.forEach(value => {
            if (value.value === _self.url) {
              value.children.forEach(repos_value => {
                repos_value.children.forEach(element => {
                  console.log(element)
                  // console.log(8888)
                  // console.log(tag_name)

                  if (element.label === tag_name) {
                    console.log(tags)
                    tags.items.forEach(tag_value => {
                      element.children.push({
                        'value': tag_value.digest,
                        'label': tag_value.name
                      })
                    })
                  }
                })
              })
            }
          })

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
