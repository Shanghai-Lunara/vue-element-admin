<template>

  <div>
    <!-- name  -->
    <!-- <el-input v-model="project_name" placeholder="请输入name" /> -->

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

      <!-- command -->
      <el-collapse-item v-if="flag === true" title="command" name="3">
        <div class="sub-title" style="color: blue;margin-left: 20px;font-size: 15px;">以(,)分割参数 示例: ["php",""]</div>
        <el-input v-model="commandStr" type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="请输入内容" />
      </el-collapse-item>

      <!-- args -->
      <el-collapse-item v-if="flag === true" title="args" name="4">
        <div class="sub-title" style="color: blue;margin-left: 20px;font-size: 15px;">以(,)分割参数 示例: ["/var/www/app/extensions/queue_server.php","debug"]</div>
        <el-input v-model="argsStr" type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="请输入内容" />
      </el-collapse-item>

      <!-- master slave spec -->

      <el-collapse-item title="NodeSpec" name="2">

        <el-form ref="form" label-width="150px" style="margin-top: 10px;">

          <el-form-item v-if="flag === false">
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
            <el-input v-if="flag === false" v-model="form.name" disabled />
            <el-input v-else v-model="form.name" />
          </el-form-item>

          <el-form-item label="image">
            <el-input v-model="form.image" style="width: 400px;" />

            <el-cascader
              :key="isResouceShow"
              v-model="value"
              :options="options"
              style="width: 580px;"
              @change="handleChange"
            />

          </el-form-item>

          <el-form-item label="imagePullSecrets">
            <el-select v-model="form.imagePullSecrets" @change="changesecre">
              <el-option
                v-for="item in secretData"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="replicas">
            <el-input v-model="form.replicas" />
          </el-form-item>

          <el-form-item label="volumePath">
            <el-input v-model="form.volumePath" />
          </el-form-item>

          <el-form-item v-if="flag === true" label="env">
            <!-- env -->
            <el-row>
              <el-col>
                <el-table size="mini" :data="form.env" border style="width: 100%" highlight-current-row>

                  <el-table-column v-for="v in envColumn" :key="v.field" :label="v.title" :width="v.width">
                    <template slot-scope="scope">
                      <span v-if="scope.row.isSet">
                        <el-input v-model="scope.row[v.field]" size="mini" placeholder="请输入内容" />
                      </span>
                      <span v-else>{{ scope.row[v.field] }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,true,4)">
                        {{ scope.row.isSet?'保存':"修改" }}
                      </span>
                      <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,false,4)">
                        删除
                      </span>
                      <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,false,4)">
                        取消
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col>
                <div class="el-table-add-row" style="width: 99.2%;" @click="addEnv()"><span>+ 添加</span></div>
              </el-col>
            </el-row>

          </el-form-item>

          <el-form-item label="containerPorts">
            <!-- containerPorts -->

            <el-row>
              <el-col>
                <el-table size="mini" :data="form.containerPorts" border style="width: 100%" highlight-current-row>

                  <el-table-column v-for="v in containCloumn" :key="v.field" :label="v.title" :width="v.width">
                    <template slot-scope="scope">
                      <span v-if="scope.row.isSet">
                        <el-input v-model="scope.row[v.field]" size="mini" placeholder="请输入内容" />
                      </span>
                      <span v-else>{{ scope.row[v.field] }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,true,1)">
                        {{ scope.row.isSet?'保存':"修改" }}
                      </span>
                      <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,false,1)">
                        删除
                      </span>
                      <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,false,1)">
                        取消
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col>
                <div class="el-table-add-row" style="width: 99.2%;" @click="addContainPort()"><span>+ 添加</span></div>
              </el-col>
            </el-row>

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

            <!-- servicePorts -->

            <el-row>
              <el-col>
                <el-table size="mini" :data="form.servicePorts" border style="width: 100%" highlight-current-row>

                  <el-table-column v-for="v in serviceCloumn" :key="v.field" :label="v.title" :width="v.width">
                    <template slot-scope="scope">
                      <span v-if="scope.row.isSet">
                        <el-input v-model="scope.row[v.field]" size="mini" placeholder="请输入内容" />
                      </span>
                      <span v-else>{{ scope.row[v.field] }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,true,2)">
                        {{ scope.row.isSet?'保存':"修改" }}
                      </span>
                      <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,false,2)">
                        删除
                      </span>
                      <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,false,2)">
                        取消
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col>
                <div class="el-table-add-row" style="width: 99.2%;" @click="addServicePort()"><span>+ 添加</span></div>
              </el-col>
            </el-row>

          </el-form-item>

        </el-form>
      </el-collapse-item>

    </el-collapse>

    <!-- applications spec -->

  </div>

</template>

<script>

const Applications = [
  {
    args: [],
    command: []
  }
]

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

const Form = {
  name: '',
  containerPorts: [],
  env: [],
  image: '',
  imagePullSecrets: '',
  podResource: {
    limits: {
      cpu: '100m',
      memory: '1Gi'
    },
    requests: {
      cpu: '10m',
      memory: '512Mi'
    }
  },
  replicas: 0,
  servicePorts: [],
  volumePath: ''
}

const contain = {
  containerPort: 3306,
  hostIP: '',
  hostPort: 0,
  name: '',
  protocol: 'TCP',
  isSet: true
}

const servicePort = {
  name: '',
  nodePort: 0,
  port: 3306,
  protocol: 'TCP',
  targetPort: {
    intVal: 3306,
    strVal: '',
    type: 0
  },
  isSet: true
}

const envTmp = {
  name: '',
  value: '',
  isSet: true
}

const volumnTmp = {
  key: '',
  path: '',
  isSet: true
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
      form: [],
      options: [],
      value: [],
      secretData: '',
      containCloumn: [
        { field: 'containerPort', title: 'containerPort', width: 150 },
        { field: 'hostIP', title: 'hostIP', width: 150 },
        { field: 'hostPort', title: 'hostPort', width: 150 },
        { field: 'name', title: 'name', width: 150 },
        { field: 'protocol', title: 'protocol', width: 150 }
      ],
      serviceCloumn: [
        { field: 'name', title: 'name', width: 150 },
        { field: 'nodePort', title: 'nodePort', width: 150 },
        { field: 'port', title: 'port', width: 150 },
        { field: 'protocol', title: 'protocol', width: 150 },
        { field: 'targetPort', title: 'targetPort', width: 380 }
      ],
      isResouceShow: 1,
      flag: false,
      volume_map: [],
      volumeColumn: [
        { field: 'key', title: 'key' },
        { field: 'path', title: 'path' }
      ],
      activeNames: ['1'],
      project_name: '',
      envColumn: [
        { field: 'name', title: 'name' },
        { field: 'value', title: 'value' }
      ],
      typeName: '',
      argsStr: '',
      commandStr: ''
    }
  },
  watch: {

    oneData() {
      this.initSaga()
    },
    'volume_map.volume.name': function(val) {
      this.volume_map.volumeMount.name = this.volume_map.volume.name
    },
    argsStr() {
      if (this.oneData.applications[0]['args'] !== '') {
        this.oneData.applications[0]['args'] = JSON.parse(this.argsStr)
      }
    },
    commandStr() {
      if (this.oneData.applications[0]['command'] !== '') {
        this.oneData.applications[0]['command'] = JSON.parse(this.commandStr)
      }
    },
    project_name() {
      if (this.oneData.typename === 'RedisOperator' || this.oneData.typename === 'MysqlOperator') {
        this.oneData.master.name = this.typeName + this.project_name
        this.oneData.slave.name = this.typeName + this.project_name
      } else if (this.oneData.typename === 'HelixSagaOperator') {
        this.oneData.applications[0]['spec']['name'] = this.typeName + this.project_name
      }
    }
  },
  mounted() {
    // console.log(this.oneData)
    this.initSaga()
  },
  methods: {
    initSaga() {
      // this.oneData.typename

      // var i = 0

      switch (this.oneData.typename) {
        case 'MysqlOperator':
          this.typeName = 'mo-'
          // i = 2
          break
        case 'RedisOperator':
          this.typeName = 'ro-'
          // i = 2
          break
        case 'HelixSagaOperator':
          this.typeName = 'hso-'
          // i = 3
          break
      }

      if (this.oneData.name === '') {
        if (this.oneData.typename === 'HelixSagaOperator') {
          this.oneData.applications = Applications
          this.oneData.applications[0]['spec'] = Form
          this.oneData.configMap = Configmap
        } else {
          this.oneData.master = JSON.parse(JSON.stringify(Form))
          this.oneData.slave = JSON.parse(JSON.stringify(Form))
        }
        this.oneData.name = this.project_name
      } else {
        // if (this.oneData.name.indexOf(this.typeName) !== -1) {
        //   this.oneData.name = this.oneData.name.splice(i)
        // } else {
        this.project_name = this.oneData.name
        // }

        if (this.oneData.typename === 'HelixSagaOperator') {
          if (this.oneData.applications[0]['args'] !== '') {
            this.argsStr = JSON.stringify(this.oneData.applications[0]['args'])
          }

          if (this.oneData.applications[0]['command'] !== '') {
            this.commandStr = JSON.stringify(this.oneData.applications[0]['command'])
          }
        }
      }

      this.getCreateData()
      this.secret()

      if (this.oneData.typename === 'HelixSagaOperator') {
        this.initHelixSaga()
        this.activeNames = ['1']
      } else {
        this.activeNames = ['2']
        this.flag = false
        this.initForm()
      }
    },
    getCreateData() {
      // 初始化 hubs
      this.options = []
      // cascader 渲染更新
      ++this.isResouceShow
      this.initParam('hubs')
    },
    initHelixSaga() {
      this.flag = true
      this.volume_map = this.oneData.configMap
      this.form = this.oneData.applications[0]['spec']

      if (this.volume_map.volume.volumeSource.configMap.items !== '') {
        this.volume_map.volume.volumeSource.configMap.items.forEach(element => {
          element.isSet = false
        })

        this.volume_map.volume.volumeSource.configMap.items = JSON.parse(JSON.stringify(this.volume_map.volume.volumeSource.configMap.items))
      }

      if (this.form.env !== '') {
        this.form.env.forEach(value => {
          value.isSet = false
        })

        this.form.env = JSON.parse(JSON.stringify(this.form.env))
      }

      if (this.form.containerPorts !== '') {
        this.form.containerPorts.forEach(value => {
          value.isSet = false
        })

        this.form.containerPorts = JSON.parse(JSON.stringify(this.form.containerPorts))
      }

      if (this.form.servicePorts !== '') {
        this.form.servicePorts.forEach(element => {
          element.isSet = false
        })
        this.form.servicePorts = JSON.parse(JSON.stringify(this.form.servicePorts))
      }
    },
    handleChange(value) {
      var str = value[0].slice(7) + '/' + value[2] + ':' + value[3]
      this.form.image = str
    },
    changesecre(value) {},
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
    // master | slave 切换
    changeBranch(value) {
      this.branch = value
      this.form = this.oneData[value]

      if (this.form.containerPorts !== '') {
        this.form.containerPorts.forEach(value => {
          value.isSet = false
        })

        this.form.containerPorts = JSON.parse(JSON.stringify(this.form.containerPorts))
      }

      if (this.form.servicePorts !== '') {
        this.form.servicePorts.forEach(element => {
          element.isSet = false
        })
        this.form.servicePorts = JSON.parse(JSON.stringify(this.form.servicePorts))
      }

      if (this.form.env !== '') {
        this.form.env.forEach(value => {
          value.isSet = false
        })

        this.form.env = JSON.parse(JSON.stringify(this.form.env))
      }
    },
    // 初始化form数据
    initForm() {
      this.branch = 'master'
      this.form = this.oneData.master

      if (this.form.containerPorts !== {}) {
        this.form.containerPorts.forEach(value => {
          value.isSet = false
        })
        this.form.containerPorts = JSON.parse(JSON.stringify(this.form.containerPorts))
      }

      if (this.form.servicePorts !== {}) {
        this.form.servicePorts.forEach(element => {
          element.isSet = false
        })
        this.form.servicePorts = JSON.parse(JSON.stringify(this.form.servicePorts))
      }

      if (this.form.env !== '') {
        this.form.env.forEach(value => {
          value.isSet = false
        })

        this.form.env = JSON.parse(JSON.stringify(this.form.env))
      }
    },
    responseData(res, _self) {
      var result = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response.decode(res)

      if (result.param.service === 'list') {
        var list = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.SecretList.decode(result.result)

        _self.secretData = list.items
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

          break
      }
    },
    // 修改 | 保存
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
    // 添加 containport
    addContainPort() {
      var mark = true
      this.form.containerPorts.forEach((element, key) => {
        if (element.isSet) {
          mark = false
          this.$message({
            message: '请先保存当前修改项',
            type: 'warning'
          })
        }
      })

      if (mark) {
        this.form.containerPorts.push(contain)
      }
    },
    addServicePort() {
      var mark = true
      this.form.servicePorts.forEach((element, key) => {
        if (element.isSet) {
          mark = false
          this.$message({
            message: '请先保存当前修改项',
            type: 'warning'
          })
        }
      })

      if (mark) {
        servicePort.targetPort = JSON.stringify(servicePort.targetPort)
        this.form.servicePorts.push(servicePort)
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
        this.volume_map.volume.volumeSource.configMap.items.push(volumnTmp)
      }
    },
    addEnv() {
      var mark = true
      this.form.env.forEach((element, key) => {
        if (element.isSet) {
          mark = false
          this.$message({
            message: '请先保存当前修改项',
            type: 'warning'
          })
        }
      })

      if (mark) {
        this.form.env.push(envTmp)
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
</style>
