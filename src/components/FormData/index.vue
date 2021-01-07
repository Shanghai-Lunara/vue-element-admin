<template>

  <div>
    <!-- name  -->

    <el-input v-model="project_name">
      <template slot="prepend">{{ typeName }}</template>
    </el-input>

    <el-collapse v-model="activeNames" style="margin-top: 5px;" @change="changePart">
      <el-collapse-item v-if="flag === true" title="volume" name="1">
        <el-tabs type="border-card">

          <el-tab-pane label="name">
            <el-input v-model="volume_map.volume.name" />
          </el-tab-pane>

          <el-tab-pane label="volumeSource">
            <!-- volumeSource -->

            <!-- configmap name select 选择 -->

            <el-select v-model="volume_map.volume.volumeSource.name" style="width: 300px;" @change="changeConfigName">
              <el-option
                v-for="item in oneData.configList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>

            <!-- <el-input v-model="volume_map.volume.volumeSource.name" /> -->

            <el-row style="margin-top: 10px;">
              <el-col>
                <el-table size="mini" :data="volume_map.volume.volumeSource.configMap.items" border style="width: 100%" highlight-current-row>

                  <el-table-column v-for="v in volumeColumn" :key="v.field" :label="v.title">
                    <template slot-scope="scope">
                      <span v-if="scope.row.isSet">
                        <el-input v-model="scope.row[v.field]" size="mini" placeholder="请输入内容" />
                      </span>
                      <span v-else>{{ scope.row[v.field] }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,true,3)">
                        {{ scope.row.isSet?'保存':"修改" }}
                      </span>
                      <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,false,3)">
                        删除
                      </span>
                      <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,false,3)">
                        取消
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col>
                <div class="el-table-add-row" style="width: 99.2%;" @click="addVolumn()"><span>+ 添加</span></div>
              </el-col>
            </el-row>

          </el-tab-pane>
        </el-tabs>

        <el-input v-model="volume_map.volumeMount.name" style="width: 30%; margin-top: 10px;" disabled>
          <template slot="prepend">name</template>
        </el-input>
        <el-input v-model="volume_map.volumeMount.mountPath" style="width: 30%; margin-top: 10px;">
          <template slot="prepend">mountPath</template>
        </el-input>
      </el-collapse-item>

      <!-- master slave spec -->

      <el-collapse-item title="applications" name="2">
        <el-tag
          v-for="tag in tagsList"
          :key="tag"
          :closable="closeFlag"
          :disable-transitions="false"
          @close="handleClose(tag)"
          @click="openData(tag)"
        >
          {{ tag }}
        </el-tag>

        <el-input
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="inputValue"
          class="input-new-tag"
          size="medium"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button v-else class="button-new-tag" :disabled="disabledFlag" @click="showInput">+ New Spec</el-button>

        <el-dialog
          title="内容"
          :visible.sync="dialogVisible"
          append-to-body
          @close="setName"
        >
          <NodeSpec ref="NodeSpec" :spec-data="specData" />
        </el-dialog>

      </el-collapse-item>

    </el-collapse>

    <!-- applications spec -->

  </div>

</template>

<script>

// nodespec

import NodeSpec from '@/components/NodeSpec'

const Configmap = {
  volume: {
    name: '',
    volumeSource: {
      configMap: {
        items: [],
        name: ''
      }
    }
  },
  volumeMount: {
    mountPath: '/var/www/app/conf',
    name: '',
    readOnly: false,
    subPath: '',
    subPathExpr: ''
  }
}

export default {
  name: 'FormData',
  components: {
    NodeSpec
  },
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
      options: [],
      isResouceShow: 1,
      flag: false,
      volume_map: [],
      volumeColumn: [
        { field: 'key', title: 'key' },
        { field: 'path', title: 'path' }
      ],
      activeNames: ['1', '2', '3', '4'],
      project_name: '',
      typeName: '',

      specData: {},

      //  标签使用
      tagsList: [],
      inputVisible: false,
      inputValue: '',
      closeFlag: false,
      disabledFlag: true,
      dialogVisible: false
    }
  },
  watch: {

    oneData() {
      this.initSaga()
    },
    'volume_map.volume.name': function(val) {
      this.volume_map.volumeMount.name = this.volume_map.volume.name
    },
    project_name() {
      if (this.oneData.typename === 'RedisOperator' || this.oneData.typename === 'MysqlOperator') {
        this.oneData.master.name = this.typeName + this.project_name
        this.oneData.slave.name = this.typeName + this.project_name
      }

      if (this.oneData.typename === 'HelixSagaOperator') {
        this.oneData.name = this.typeName + this.project_name
      }
    }
  },
  mounted() {
    this.initSaga()
  },
  methods: {
    initSaga() {
      // public data
      this.getCreateData()
      this.secret()
      this.serviceAccount()

      var i = 0

      // name
      switch (this.oneData.typename) {
        case 'MysqlOperator':
          this.typeName = 'mo-'
          i = 3
          this.tagsList = ['master', 'slave']
          this.closeFlag = false
          this.disabledFlag = true
          break
        case 'RedisOperator':
          this.typeName = 'ro-'
          i = 3
          this.tagsList = ['master', 'slave']
          this.closeFlag = false
          this.disabledFlag = true
          break
        case 'HelixSagaOperator':
          this.typeName = 'hso-'
          i = 4
          this.tagsList = JSON.parse(JSON.stringify(this.getAppList()))
          this.closeFlag = true
          this.disabledFlag = false
          break
      }

      if (this.oneData.name === '') {
        //  create
        if (this.oneData.typename === 'HelixSagaOperator') {
          this.oneData.applications = []
          this.oneData.configMap = Configmap
        } else {
          this.oneData.master = JSON.parse(JSON.stringify(this.generateForm()))
          this.oneData.slave = JSON.parse(JSON.stringify(this.generateForm()))
        }
        this.project_name = ''
        this.oneData.name = this.typeName + this.project_name
      } else {
        // update

        if (this.oneData.name.indexOf(this.typeName) !== -1) {
          this.project_name = this.oneData.name.slice(i)
        }
      }

      if (this.oneData.typename === 'HelixSagaOperator') {
        this.specData.flag = true
        this.flag = true
        this.volume_map = this.oneData.configMap

        if (this.volume_map.volume.volumeSource.configMap.items !== '') {
          this.volume_map.volume.volumeSource.configMap.items.forEach(element => {
            element.isSet = false
          })

          this.volume_map.volume.volumeSource.configMap.items = JSON.parse(JSON.stringify(this.volume_map.volume.volumeSource.configMap.items))
        }
      } else {
        this.specData.flag = false
        this.flag = false
      }
    },
    generateForm() {
      const form = {
        name: '',
        containerPorts: [],
        env: [],
        image: '',
        imagePullSecrets: '',
        podResource: {
          limits: {
            cpu: '0',
            memory: '0'
          },
          requests: {
            cpu: '0',
            memory: '0'
          }
        },
        replicas: 0,
        servicePorts: [],
        volumePath: '',
        status: {
          collisionCount: 0,
          currentReplicas: 0,
          currentRevision: 'mo-dev-master-69f598988c',
          observedGeneration: 0,
          readyReplicas: 0,
          replicas: 0,
          updateRevision: '',
          updatedReplicas: 0
        }
      }

      return form
    },
    handleClose(tag) {
      this.tagsList.splice(this.tagsList.indexOf(tag), 1)

      this.oneData.applications.forEach((element, key) => {
        if (element.spec.name === tag) {
          this.oneData.applications.splice(key, 1)
        }
      })
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        const new_inputValue = this.typeName + this.project_name + '-' + inputValue
        this.tagsList.push(new_inputValue)
        const form = this.generateForm()
        form.name = new_inputValue
        const app = {
          args: [],
          command: [],
          spec: form
        }

        if (this.oneData.typename === 'HelixSagaOperator') {
          app.watchPolicy = ''
          app.serviceAccountName = ''
          app.tolerations = []
          app.nodeSelector = {}
        }

        this.oneData.applications.push(app)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    getAppList() {
      const arr = []

      if (this.oneData.applications !== undefined) {
        this.oneData.applications.forEach(element => {
          // const flagName = this.typeName + this.project_name + '-'
          // arr.push(element.spec.name.replace(flagName, ''))
          arr.push(element.spec.name)
        })
      }

      return arr
    },
    openData(tag) {
      this.dialogVisible = true
      switch (this.oneData.typename) {
        case 'MysqlOperator':
        case 'RedisOperator':
          this.specData.data = this.oneData[tag]

          this.$nextTick(_ => {
            this.$refs.NodeSpec.initForm()
          })
          break
        case 'HelixSagaOperator':

          this.oneData.applications.forEach(element => {
            if (element.spec.name === tag) {
              this.specData.data = element
            }
          })

          this.specData.flag = true
          this.$nextTick(_ => {
            this.$refs.NodeSpec.initHelixSaga()
          })
          break
      }
    },
    getCreateData() {
      // 初始化 hubs
      this.options = []
      // cascader 渲染更新
      ++this.isResouceShow
      this.initParam('hubs')
    },
    changeConfigName(value) {},
    changePart(value) {},
    initParam(type, url = '', id = 0, imageName = '') {
      var Proto = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto

      var data = {
        'harborUrl': url,
        'command': type,
        'projectId': id,
        'imageName': imageName
      }

      var param = {
        'nameSpace': this.oneData.namespace,
        'service': 'harbor',
        'resourceType': '',
        'harborRequest': data
      }

      var errData = Proto.Param.verify(param)

      if (errData) { throw Error(errData) }

      var msg = {
        'param': param,
        'data': ''
      }

      var message = Proto.Request.create(msg)

      var senddata = Proto.Request.encode(message).finish()

      var _self = this
      this.$socketApi(senddata, function(res) {
        _self.responseData(res, _self)
      })
    },
    serviceAccount() {
      var Proto = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto

      var param = {
        'nameSpace': this.oneData.namespace,
        'service': 'list',
        'resourceType': 'ServiceAccount'
      }

      var errData = Proto.Param.verify(param)

      if (errData) { throw Error(errData) }

      var msg = {
        'param': param,
        'data': ''
      }

      var message = Proto.Request.create(msg)

      var senddata = Proto.Request.encode(message).finish()

      var _self = this
      this.$socketApi(senddata, function(res) {
        _self.returnResource(res, _self)
      })
    },
    returnResource(service, _self) {
      var result = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response.decode(service)

      switch (result.param.resourceType) {
        case 'ServiceAccount':
          var ServiceAccountList = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServiceAccountList.decode(result.result)

          _self.specData.serviceList = ServiceAccountList.items

          break
      }
    },
    secret() {
      var Proto = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto

      var param = {
        'nameSpace': this.oneData.namespace,
        'service': 'list',
        'resourceType': 'Secret'
      }

      var errData = Proto.Param.verify(param)

      if (errData) { throw Error(errData) }

      var msg = {
        'param': param,
        'data': ''
      }

      var message = Proto.Request.create(msg)

      var senddata = Proto.Request.encode(message).finish()

      var _self = this
      this.$socketApi(senddata, function(res) {
        _self.responseData(res, _self)
      })
    },
    responseData(res, _self) {
      var result = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response.decode(res)

      if (result.param.service === 'list') {
        var list = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.SecretList.decode(result.result)

        _self.specData.secretData = list.items
      }

      switch (result.param.harborRequest.command) {
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

            _self.initParam('projects', element.name)
          })

          break
        case 'projects':
          var dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborProjectList.decode(result.result)

          _self.options.forEach(value => {
            if (value.value === result.param.harborRequest.harborUrl) {
              dataStr.items.forEach((element, key) => {
                value.children.push(
                  {
                    'value': element.projectId,
                    'label': element.name,
                    'children': []
                  }
                )

                _self.initParam('repositories', result.param.harborRequest.harborUrl, element.projectId)
              })
            }
          })

          break
        case 'repositories':
          // HarborRepositoryList
          var repositories = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborRepositoryList.decode(result.result)

          _self.options.forEach(value => {
            if (value.value === result.param.harborRequest.harborUrl) {
              value.children.forEach(repos_value => {
                if (repos_value.value === result.param.harborRequest.projectId) {
                  repositories.items.forEach(element => {
                    repos_value.children.push({
                      'value': element.name,
                      'label': element.name,
                      'children': []
                    })
                    _self.initParam('tags', result.param.harborRequest.harborUrl, element.projectId, element.name)
                  })
                }
              })
            }
          })

          break
        case 'tags':
          var tags = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborTagList.decode(result.result)

          _self.options.forEach(value => {
            if (value.value === result.param.harborRequest.harborUrl) {
              value.children.forEach(repos_value => {
                if (repos_value.value === result.param.harborRequest.projectId) {
                  repos_value.children.forEach(tags_value => {
                    if (tags_value.label === result.param.harborRequest.imageName) {
                      tags.items.forEach(element => {
                        tags_value.children.push({
                          'value': element.name,
                          'label': element.name
                        })
                      })
                    }
                  })
                }
              })
            }
          })

          _self.specData.options = _self.options

          break
      }
    },
    addVolumn() {
      var mark = true
      this.volume_map.volume.volumeSource.configMap.items.forEach((element, key) => {
        if (element.isSet) {
          mark = false
          this.$message({
            message: '请先保存当前修改项',
            type: 'warning'
          })
        }
      })

      if (mark) {
        this.volume_map.volume.volumeSource.configMap.items.push({
          key: '',
          path: '',
          isSet: true
        })
      }
    },
    edit(row, index, cg, type) {
      // 点击修改 判断是否已经保存所有操作

      var param = ''

      if (type === 1) {
        param = 'containerPorts'
      } else if (type === 2) {
        param = 'servicePorts'
      } else if (type === 3) {
        param = 'volumn'
      } else {
        param = 'env'
      }

      var flag = 0

      if (type === 3) {
        // volume_map.volume.volumeSource.configMap.items
        this.volume_map.volume.volumeSource.configMap.items.forEach((element, key) => {
          if (element.isSet && key !== index) {
            this.$message.warning('请先保存当前编辑项')
            flag = 1
          }
        })
      } else {
        this.form[param].forEach((element, key) => {
          if (element.isSet && key !== index) {
            this.$message.warning('请先保存当前编辑项')
            flag = 1
          }
        })
      }

      if (flag) {
        return
      }

      // 是否是取消操作
      if (!cg) {
        if (type === 3) {
          this.volume_map.volume.volumeSource.configMap.items.splice(index, 1)
        } else {
          if (this.form[param][index]) {
            this.form[param].splice(index, 1)
          }
        }
      } else {
        // 提交数据
        if (row.isSet) {
          if (type === 2) {
            this.form[param][index]['targetPort'] = JSON.parse(this.form[param][index]['targetPort'])
          }

          row.isSet = false
        } else {
          if (type === 2) {
            this.form[param][index]['targetPort'] = JSON.stringify(this.form[param][index]['targetPort'])
          }

          row.isSet = true
        }
      }
    },
    setName() {
      if (this.oneData.typename === 'HelixSagaOperator') {
        this.tagsList = JSON.parse(JSON.stringify(this.getAppList()))
      }
    }
  }
}

</script>

<style scoped>

.el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
}

.el-input-group {
  width: 20%;
  margin-top: 5px;
}

.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
