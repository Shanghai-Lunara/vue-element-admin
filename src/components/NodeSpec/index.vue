<template>

  <el-form label-width="150px" style="margin-top: 10px;">

    <!-- command -->
    <el-form-item v-if="specData.flag" label="command">
      <div class="sub-title" style="color: blue;margin-left: 20px;font-size: 15px;">以(,)分割参数 示例: ["php",""]</div>
      <el-input v-model="commandStr" type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="请输入内容" />
    </el-form-item>

    <!-- args -->

    <el-form-item v-if="specData.flag" label="args">
      <div class="sub-title" style="color: blue;margin-left: 20px;font-size: 15px;">以(,)分割参数 示例: ["/var/www/app/extensions/queue_server.php","debug"]</div>
      <el-input v-model="argsStr" type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="请输入内容" />
    </el-form-item>

    <!-- spec -->

    <el-form-item label="Name">
      <el-input v-if="specData.flag === false" v-model="form.name" disabled />
      <el-input v-else v-model="form.name" />
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

    <el-form-item label="replicas">
      <el-input v-model="form.replicas" />
    </el-form-item>

    <el-form-item label="volumePath">
      <el-input v-model="form.volumePath" />
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
</template>

<script>

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
      argsStr: '',
      commandStr: '',
      form: [],
      value: []
    }
  },
  watch: {

    argsStr() {
      if (this.specData.data['args'] !== '') {
        this.specData.data['args'] = JSON.parse(this.argsStr)
      }
    },
    commandStr() {
      if (this.specData.data['command'] !== '') {
        this.specData.data['command'] = JSON.parse(this.commandStr)
      }
    }

  },
  mounted() {
  },
  methods: {
    // 初始化form数据
    initForm() {
      this.form = this.specData.data

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
      console.log(99999999)
      console.log(this.specData)

      if (this.specData.data.args !== '') {
        this.argsStr = JSON.stringify(this.specData.data.args)
      }

      if (this.specData.data.command !== '') {
        this.commandStr = JSON.stringify(this.specData.data.command)
      }

      this.form = this.specData.data.spec

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
        const new_port = {
          intVal: 3306,
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
