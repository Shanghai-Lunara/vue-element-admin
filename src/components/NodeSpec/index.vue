<template>

  <el-form label-width="150px" style="margin-top: 10px;">

    <!-- command -->
    <el-form-item v-if="specData.flag" label="command">
      <div class="sub-title" style="color: blue;margin-left: 20px;font-size: 15px;">以(,)分割参数 示例: ["/server/publisher"]</div>
      <el-input v-model="commandStr" type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="请输入内容" />
    </el-form-item>

    <!-- args -->

    <el-form-item v-if="specData.flag" label="args">
      <div class="sub-title" style="color: blue;margin-left: 20px;font-size: 15px;">以(,)分割参数 示例: ["-alsologtostderr=true","-v=4","-configPath=/var/conf/conf.yaml"]</div>
      <el-input v-model="argsStr" type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="请输入内容" />
    </el-form-item>

    <!-- spec -->

    <el-form-item label="Name">
      <el-input v-model="form.name" />
      <!-- <el-input v-if="specData.flag === false" v-model="form.name" disabled /> -->
      <!-- <el-input v-else v-model="form.name" /> -->
    </el-form-item>

    <el-form-item label="image">
      <el-input v-model="form.image" style="width: 400px;" />

      <el-cascader
        v-model="value"
        :options="specData.options"
        style="width: 580px;"
        @change="handleChange"
      />

    </el-form-item>

    <el-form-item label="imagePullSecrets">
      <el-select v-model="form.imagePullSecrets" @change="changesecre">
        <el-option
          v-for="item in specData.secretData"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="serviceAccount">
      <el-select v-model="specData.data.serviceAccountName" clearable @change="changeServiceAccount">
        <el-option
          v-for="(itemV,key) in specData.serviceList"
          :key="key"
          :label="itemV.name"
          :value="itemV.name"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="replicas">
      <el-input v-model="form.replicas" />
    </el-form-item>

    <el-form-item label="volumePath">
      <el-input v-model="form.volumePath" />
    </el-form-item>

    <el-form-item label="nodeSelector">
      <el-input v-model="nodeSelectorKey" placeholder="nodeSelector的key" style="width:200px" @change="changeNodeKey" />
      <el-input v-model="nodeSelectorVal" placeholder="nodeSelector的val" style="width:200px" @change="changeNodeVal" />
    </el-form-item>

    <el-form-item v-if="specData.flag === true" label="env">
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

    <el-form-item label="serviceType">
      <el-select v-model="form.serviceType" @change="changeServiceType">
        <el-option
          v-for="item in serviceType_list"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <el-form-item v-if="policyFlag" label="watchPolicy">
      <el-select v-model="watchPolicy" @change="watchPolicyType">
        <el-option
          v-for="item in watchPolicy_list"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <!-- tolerations -->
    <!-- nodeSelector -->
    <!-- affinity -->

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

    <el-form-item label="tolerations">
      <!-- toleation  5555 -->
      <el-row>
        <el-col>
          <el-table size="mini" :data="specData.data.tolerations" border style="width: 100%" highlight-current-row>

            <!-- matchExpressions: Array(1)
              matchFields -->

            <!-- key: "kubernetes.io/hostname"
              operator: "In"
              values -->

            <el-table-column v-for="v in tolerationColumn" :key="v.field" :label="v.title" :width="v.width">
              <template slot-scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input v-if="v.title === 'key' || v.title === 'value'" v-model="scope.row[v.field]" size="mini" placeholder="请输入内容" />
                  <el-select v-else-if="v.title === 'operator'" v-model="scope.row['operator']">
                    <el-option
                      v-for="item in TolerationOperator"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                  <el-select v-else-if="v.title === 'effect'" v-model="scope.row['effect']">
                    <el-option
                      v-for="item in TaintEffect"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </span>
                <span v-else>{{ scope.row[v.field] }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,true,5)">
                  {{ scope.row.isSet?'保存':"修改" }}
                </span>
                <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,false,5)">
                  删除
                </span>
                <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,false,5)">
                  取消
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <div class="el-table-add-row" style="width: 99.2%;" @click="addToleation()"><span>+ 添加</span></div>
        </el-col>
      </el-row>

    </el-form-item>

    <!-- affinity  6666 -->
    <el-form-item label="affinity">

      <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
        <el-tab-pane
          v-for="item in specData.data.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >

          <el-row>
            <el-col>
              <el-table size="mini" :data="item.matchExpressions" border style="width: 100%" highlight-current-row>

                <el-table-column v-for="v in affinityColumn" :key="v.field" :label="v.title" :width="v.width">
                  <template slot-scope="scope">
                    <span v-if="scope.row.isSet">
                      <el-input v-if="v.title === 'key'" v-model="scope.row['key']" size="mini" placeholder="请输入内容" />
                      <el-input v-else-if="v.title === 'values'" v-model="scope.row[v.field]" size="mini" placeholder="请输入内容" />
                      <el-select v-else-if="v.title === 'operator'" v-model="scope.row['operator']">
                        <el-option
                          v-for="affVal in affinityList"
                          :key="affVal"
                          :label="affVal"
                          :value="affVal"
                        />
                      </el-select>
                    </span>
                    <span v-else>{{ scope.row[v.field] }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,true,6)">
                      {{ scope.row.isSet?'保存':"修改" }}
                    </span>
                    <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,false,6)">
                      删除
                    </span>
                    <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="edit(scope.row,scope.$index,false,6)">
                      取消
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col>
              <div class="el-table-add-row" style="width: 99.2%;" @click="addAffinity()"><span>+ 添加</span></div>
            </el-col>
          </el-row>

        </el-tab-pane>
      </el-tabs>

    </el-form-item>

  </el-form>
</template>

<script>

export default {
  name: 'NodeSpec',
  props: {
    specData: {
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
      envColumn: [
        { field: 'name', title: 'name' },
        { field: 'value', title: 'value' }
      ],
      // tolerationColumn
      tolerationColumn: [
        { field: 'key', title: 'key', width: 150 },
        { field: 'value', title: 'value', width: 150 },
        { field: 'operator', title: 'operator', width: 150 },
        { field: 'effect', title: 'effect', width: 150 }
      ],

      //  affinity
      affinityColumn: [
        { field: 'key', title: 'key', width: 210 },
        { field: 'values', title: 'values', width: 280 },
        { field: 'operator', title: 'operator', width: 180 }
      ],
      editableTabsValue: '1',
      editableTabs: [],
      tabIndex: 0,
      // -------

      argsStr: '',
      commandStr: '',
      form: [],
      value: [],
      serviceType_list: [
        'ExternalName',
        'ClusterIP',
        'NodePort',
        'LoadBalance'
      ],
      watchPolicy_list: [
        'auto',
        'manual'
      ],
      TolerationOperator: [
        'Exists',
        'Equal'
      ],
      // effect
      TaintEffect: [
        'NoSchedule',
        'PreferNoSchedule',
        'NoExecute'
      ],
      // aff
      affinityList: [
        'In',
        'NotIn',
        'Exists',
        'DoesNotExist',
        'Gt',
        'Lt'
      ],
      watchPolicy: '',
      policyFlag: true,
      nodeSelectorKey: '',
      nodeSelectorVal: ''
    }
  },
  watch: {

    argsStr() {
      if (this.argsStr !== '') {
        this.specData.data.args = JSON.parse(this.argsStr)
      }
    },
    commandStr() {
      if (this.commandStr !== '') {
        this.specData.data.command = JSON.parse(this.commandStr)
      }
    }

  },
  mounted() {
  },
  methods: {
    // 初始化form数据
    initForm() {
      this.form = this.specData.data

      this.policyFlag = false

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
    initHelixSaga() {
      if (this.specData.data.args !== '') {
        this.argsStr = JSON.stringify(this.specData.data.args)
      }

      if (this.specData.data.command !== '') {
        this.commandStr = JSON.stringify(this.specData.data.command)
      }

      this.form = this.specData.data.spec

      this.watchPolicy = this.specData.data.watchPolicy
      // 最新添加

      if (this.specData.data.tolerations !== '') {
        this.specData.data.tolerations.forEach(value => {
          value.isSet = false
        })

        this.specData.data.tolerations = JSON.parse(JSON.stringify(this.specData.data.tolerations))
      }

      // specData.data.nodeSelector

      if (this.specData.data.nodeSelector.length !== 0) {
        this.nodeSelectorKey = this.specData.data.nodeSelector[0]
        this.nodeSelectorVal = this.specData.data.nodeSelector[1]
      }

      this.policyFlag = true

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

      //       affinity: Affinity

      // var tmp = {}
      this.editableTabs = []

      // console.log(this.specData.data.affinity)

      if (this.specData.data.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms.length === 0) {
        // var tmp1 = {}
        // tmp1.matchExpressions = []
        // tmp1.matchFields = []

        // tmp.title = 'matchExpressions1'
        // tmp.name = '1'
        // tmp.element = tmp1

        // this.specData.data.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms.push(tmp)
        // this.editableTabs.push(tmp)
        this.editableTabsValue = '0'
      } else {
        this.specData.data.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms.forEach((element, key) => {
          var tmpkey = key + 1
          element.title = 'matchExpressions' + tmpkey.toString()
          element.name = tmpkey.toString()
          element.matchExpressions.forEach(v => {
            v.isSet = false
          })
        })

        this.specData.data.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms = JSON.parse(JSON.stringify(this.specData.data.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms))
        this.editableTabsValue = '1'
      }

      this.tabIndex = this.specData.data.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms.length
    },
    handleChange(value) {
      var str = value[0].slice(7) + '/' + value[2] + ':' + value[3]
      this.form.image = str
      this.value = []
    },
    changesecre(value) {},
    changeServiceType() {},
    changeServiceAccount(value) {},
    watchPolicyType(value) {
      this.specData.data.watchPolicy = value
    },
    changeNodeKey(val) {
      this.specData.data.nodeSelector[0] = this.nodeSelectorKey
    },
    changeNodeVal(val) {
      this.specData.data.nodeSelector[1] = this.nodeSelectorVal
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
      } else if (type === 4) {
        param = 'env'
      } else if (type === 5) {
        param = 'tolerations'
      } else {
        param = 'affinity'
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
      } else if (type === 5) {
        this.specData.data.tolerations.forEach((element, key) => {
          if (element.isSet && key !== index) {
            this.$message.warning('请先保存当前编辑项')
            flag = 1
          }
        })
      } else if (type === 6) {
        var tmpKey = parseInt(this.editableTabsValue - 1)
        //  修改编辑
        this.specData.data.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms[tmpKey].matchExpressions.forEach((element, key) => {
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
        } else if (type === 5) {
          this.specData.data.tolerations.splice(index, 1)
        } else if (type === 6) {
          var tmpKey1 = parseInt(this.editableTabsValue - 1)
          this.specData.data.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms[tmpKey1].matchExpressions.splice(index, 1)
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

          if (type === 6) {
            row.values = JSON.parse(row.values)
          }

          row.isSet = false
        } else {
          if (type === 2) {
            this.form[param][index]['targetPort'] = JSON.stringify(this.form[param][index]['targetPort'])
          }

          if (type === 6) {
            row.values = JSON.stringify(row.values)
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

      const contain = {
        containerPort: 80,
        hostIP: '',
        hostPort: 0,
        name: '',
        protocol: 'TCP',
        isSet: true
      }

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
        const servicePort = {
          name: '',
          nodePort: 0,
          port: 80,
          protocol: 'TCP',
          targetPort: {
            intVal: 80,
            strVal: '',
            type: 0
          },
          isSet: true
        }

        const new_port = {
          intVal: 80,
          strVal: '',
          type: 0
        }
        servicePort.targetPort = JSON.stringify(new_port)
        this.form.servicePorts.push(servicePort)
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
        const envTmp = {
          name: '',
          value: '',
          isSet: true
        }
        this.form.env.push(envTmp)
      }
    },
    addToleation() {
      var mark = true
      this.specData.data.tolerations.forEach((element, key) => {
        if (element.isSet) {
          mark = false
          this.$message({
            message: '请先保存当前修改项',
            type: 'warning'
          })
        }
      })

      if (mark) {
        const tolerationTmp = {
          key: '',
          value: '',
          operator: '',
          effect: '',
          isSet: true
        }
        this.specData.data.tolerations.push(tolerationTmp)
      }
    },
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        const newTabName = ++this.tabIndex + ''

        // 初始化
        var tmp = {}
        tmp.matchExpressions = []
        tmp.matchFields = []
        tmp.title = 'matchExpressions' + newTabName
        tmp.name = newTabName

        this.specData.data.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms.push(tmp)

        this.editableTabsValue = newTabName
      }
      if (action === 'remove') {
        this.specData.data.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms.forEach((tab, index) => {
          if (tab.name === targetName) {
            this.specData.data.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms.splice(index, 1)
          }
        })

        this.specData.data.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms.forEach((v, k) => {
          var tmpkey = k + 1
          v.title = 'matchExpressions' + tmpkey.toString()
          v.name = tmpkey.toString()
          v.matchExpressions.forEach(v => {
            v.isSet = false
          })
        })

        this.editableTabsValue = '1'
        this.tabIndex = this.editableTabs.length
      }
    },
    addAffinity() {
      var tmpKey = parseInt(this.editableTabsValue - 1)

      var mark = true
      this.specData.data.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms[tmpKey].matchExpressions.forEach((element, key) => {
        if (element.isSet) {
          mark = false
          this.$message({
            message: '请先保存当前修改项',
            type: 'warning'
          })
        }
      })

      if (mark) {
        const affinityTmp = {
          key: '',
          values: '[]',
          operator: '',
          isSet: true
        }
        this.specData.data.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms[tmpKey].matchExpressions.push(affinityTmp)
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
