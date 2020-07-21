<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
      <!-- <el-select v-model="listQuery.importance" :placeholder="$t('table.importance')" clearable style="width: 200px" class="filter-item" @change="selectNameSpace">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select> -->
      <span>ResourceType:</span>
      <el-select v-model="listQuery.type" :placeholder="$t('table.type')" class="filter-item" style="width: 160px;margin-left: 10px" @change="selectResource">
        <el-option v-for="item in calendarTypeOptions" :key="item" :label="item" :value="item" />
      </el-select>

      <!-- mysql | redis | secret -->
      <el-button v-if="showFlag" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <!--<el-table-column :label="$t('table_config.state')" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>-->

      <el-table-column v-for="(info,index) in table" :key="index" :label="info" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="index === 'namespace'">{{ row[index] }}</el-tag>
          <span v-else>{{ row[index] }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">

          <el-button type="primary" size="mini" @click="showFlag ? editData(row) : handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <!-- <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            {{ $t('table.publish') }}
          </el-button> -->
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="selectNameSpace" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

      <!-- mysql | redis -->

      <FormData v-if="createFlag" ref="FormData" :one-data="oneData" />

      <!-- configmap -->
      <template v-else>
        <div>
          <div class="editor-container">
            <yaml-editor ref="yamlEditor" :value="yamlData" />
          </div>
        </div>
      </template>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <!--        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">-->
        <el-button type="primary" @click="makeSureEdit()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import YamlEditor from '@/components/YamlEditor/index.vue'
// redis | mysql
import FormData from '@/components/FormData'

const configMapTable = {
  name: 'Name',
  namespace: 'NameSpace',
  keys: 'keys'
}

const mysqlOperatorTable = {
  name: 'Name',
  namespace: 'NameSpace',
  master: 'Image',
  slave: 'replicas'
}

const RedisOperatorTable = {
  name: 'Name',
  namespace: 'NameSpace',
  master: 'Image',
  slave: 'replicas'
}

const ServiceTable = {
  name: 'Name',
  clusterIP: 'clusterIP',
  port: 'port'
}

const table = {
  'ConfigMap': configMapTable,
  'MysqlOperator': mysqlOperatorTable,
  'RedisOperator': RedisOperatorTable,
  'Service': ServiceTable
}

export default {
  name: 'ComplexTable',
  components: {
    Pagination,
    YamlEditor: YamlEditor,
    FormData
  },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
    // typeFilter(type) {
    //  return calendarTypeKeyValue[type]
    // }
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: '',
        sort: '+id'
      },
      calendarTypeOptions: [],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      nameSpace: '',
      table: '',
      yamlData: '',
      showFlag: false,
      nowRow: '', // 当前选中对象
      createFlag: false,
      mysqlData: '',
      oneData: ''
    }
  },
  watch: {
    $route(route) {
      // 监控路由
      var name = route.query.name
      this.nameSpace = name
      this.selectNameSpace()
    }
  },
  mounted() {
    // this.getList()
    this.getResourceList()

    // 路由
    if (this.nameSpace === '') {
      var name = this.$router.history.current.query.name
      this.nameSpace = name
      this.table = configMapTable
    }

    // 刷新定位到/
    if (this.$route.fullPath.indexOf('?') !== -1) {
      this.$router.push({ path: '/' })
    }
    this.timer()

    // 获取右边搜索的list
    this.getTinyTableList()
  },
  methods: {
    /* getList() {
      // 加载分页
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        console.log(response)
        // this.list = response.data.items
        // this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },*/
    timer() {
      return setInterval(() => {
        const data = {
          'nameSpace': '',
          'service': 'ping',
          'resourceType': ''
        }

        var msg = {
          'param': data,
          'data': ''
        }

        var request = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request

        var message = request.create(msg)

        var senddata = request.encode(message).finish()
        const _self = this
        _self.$socketApi(senddata, function(res) {
          _self.returnResource(res, _self)
        })
      }, 10000)
    },
    getResourceList() {
      const data = {
        'nameSpace': 'default',
        'service': 'resource',
        'resourceType': ''
      }

      var errData = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.verify(data)

      if (errData) { throw Error(errData) }

      var msg = {
        'param': data,
        'data': ''
      }

      var request = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request

      var message = request.create(msg)

      var senddata = request.encode(message).finish()

      const _self = this
      this.$socketApi(senddata, function(res) {
        _self.returnResource(res, _self)
      })
    },
    getList(data) {
      var errData = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.verify(data)

      if (errData) { throw Error(errData) }

      var msg = {
        'param': data,
        'data': ''
      }

      var request = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request

      var message = request.create(msg)

      var senddata = request.encode(message).finish()

      const _self = this
      this.$socketApi(senddata, function(res) {
        _self.returnResource(res, _self)
      })
    },
    updateConfigMapList(data) {
      var errData = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.verify(data)

      if (errData) { throw Error(errData) }

      const param = {
        'nameSpace': this.nameSpace,
        'service': 'update',
        'resourceType': this.listQuery.type
      }

      var data_request = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap
      var data_message = data_request.create(data)
      var msg_data = data_request.encode(data_message).finish()

      var msg = {
        'param': param,
        'data': msg_data
      }

      console.log('msg update')
      console.log(msg)

      var request = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request

      var message = request.create(msg)

      var senddata = request.encode(message).finish()

      const _self = this
      this.$socketApi(senddata, function(res) {
        _self.returnResource(res, _self)
      })
    },
    returnMessage(res, _self) {
      const result = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response.decode(res)

      let dataStr = ''
      let list
      let total

      let isTiny = false // service时为true, 存贮侧边栏数据

      switch (result.param.resourceType) {
        case 'ConfigMap':
          dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMapList.decode(result.result)

          console.log('return configMap')
          console.log(dataStr)
          list = []
          dataStr.items.forEach(function(item, index) {
            const one = []
            one.name = item.Name
            one.namespace = _self.nameSpace

            one.keys = Object.keys(item.data).join(',')
            one.value = Object.values(item.data)
            one.item = item

            list.push(one)
          })

          total = dataStr.items.length
          break
        case 'MysqlOperator':
          dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrdList.decode(result.result)

          list = []
          dataStr.items.forEach(function(item, index) {
            if (item.hasOwnProperty('master')) {
              var master = []
              master.namespace = _self.nameSpace
              master.name = item.name + '_' + item.master.name + '_master'
              master.master = item.master.image
              master.slave = item.master.replicas
              master.flagname = item.name
              master.flagdiff = 'master'
              list.push(master)
            }

            if (item.hasOwnProperty('slave')) {
              var slave = []
              slave.namespace = _self.nameSpace
              slave.name = item.name + '_' + item.slave.name + '_slave'
              slave.master = item.slave.image
              slave.slave = item.slave.replicas
              slave.flagname = item.name
              slave.flagdiff = 'slave'
              list.push(slave)
            }

            // list.push(one)
          })

          total = dataStr.items.length
          _self.list = list
          _self.total = dataStr.items.length
          _self.mysqlData = dataStr.items
          break
        case 'RedisOperator':
          // dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrdList.decode(result.result)

          // list = []
          // dataStr.items.forEach(function(item, index) {
          //   var one = []
          //   one.namespace = _self.nameSpace

          //   if (item.hasOwnProperty('master')) {
          //     one.name = item.Name + '_' + item.master.Name + '_master'
          //     one.master = item.master.image
          //     one.slave = item.master.replicas
          //   } else if (item.hasOwnProperty('slave')) {
          //     one.name = item.Name + '_' + item.slave.Name + '_slave'
          //     one.master = item.slave.image
          //     one.slave = item.slave.replicas
          //   }
          //   list.push(one)
          //   console.log(list)
          // })
          // total = dataStr.items.length
          break

        case 'Service':
          dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServiceList.decode(result.result)
          console.log('return Service')
          console.log(dataStr)

          list = []
          dataStr.items.forEach(function(item, index) {
            const one = []
            one.name = item.Name
            one.clusterIP = item.clusterIP
            one.port = item.ports[0].port

            list.push(one)
          })
          total = dataStr.items.length
          isTiny = true

          break

        case 'NameSpace':
          // 更改到侧边栏, 取消这个
          // dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpaceList.decode(result.result)

          break
      }

      return {
        list: list,
        total: total,
        isTiny: isTiny
      }
    },

    returnResource(service, _self) {
      const result = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response.decode(service)
      console.log(result)
      switch (result.param.service) {
        case 'ping':
          console.log('ping')
          break
        case 'resource':
          var calendarTypeOptions = _self.calendarTypeOptions
          var dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.ResourceList.decode(result.result)
          dataStr.items.forEach(function(item, index) {
            if (item !== 'NameSpace') {
              calendarTypeOptions.push(item)
            }
          })

          this.listQuery.type = calendarTypeOptions[0]
          _self.calendarTypeOptions = calendarTypeOptions
          _self.listQuery.type = 'MysqlOperator'
          this.showFlag = true
          break
        case 'list':
          var obj = _self.returnMessage(service, _self)

          if (obj.isTiny) {
            this.$store.list = obj.list
          }

          this.list = obj.list
          this.total = obj.total
          break
        case 'update':
          console.log('update')
          if (result.code === 0) {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            const data = {
              'nameSpace': this.nameSpace,
              'service': 'list',
              'resourceType': this.listQuery.type
            }
            this.getList(data)
          }
          break
        case 'harbor':
          console.log('harbor')

          dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborProjectList.decode(result.result)

          console.log(dataStr)

          break
      }
    },
    selectNameSpace() {
      const data = {
        'nameSpace': this.nameSpace,
        'service': 'list',
        'resourceType': this.listQuery.type
      }
      this.getList(data)
    },
    selectResource() {
      if (this.namespace !== '') {
        const data = {
          'nameSpace': this.nameSpace,
          'service': 'list',
          'resourceType': this.listQuery.type
        }
        this.table = table[this.listQuery.type]

        if (this.listQuery.type === 'secret' || this.listQuery.type === 'ConfigMap') {
          this.showFlag = false
        } else {
          this.showFlag = true
        }

        this.getList(data)
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      // this.getList()
    },
    handleModifyStatus(row) {
      console.log('yamlData')
      console.log(this.yamlData)
    },
    handleCreate() {
      if (this.listQuery.type === 'secret' || this.listQuery.type === 'ConfigMap') {
        this.createFlag = false
      } else {
        this.createFlag = true
      }
      // this.getCreateData()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.nowRow = row
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      let str = ''
      const keys = row.keys.split(',')
      const reg = new RegExp('\n', 'g')
      row.value.forEach(function(item, index) {
        const newMsg = item.replace(reg, '\n    ')
        str += ' \n ' + keys[index] + ' : | \n    ' + newMsg
      })
      this.yamlData = str
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    makeSureEdit() {
      console.log('makeSureEdit')
      // 获取,更改编辑框里的值
      const editValue = this.$refs.yamlEditor.getValue()
      this.$refs.yamlEditor.setValue(editValue)
      this.yamlData = editValue
      console.log(editValue)

      // 取消弹框
      this.dialogFormVisible = false

      // 将编辑框内转化为对象,并update
      const yaml = require('js-yaml')
      const obj = yaml.load(this.yamlData)

      const data = {
        Name: this.nowRow.item.Name,
        data: obj
      }
      this.updateConfigMapList(data)
    },
    // 获取右边搜索的list
    getTinyTableList() {
      const data = {
        'nameSpace': this.nameSpace,
        'service': 'list',
        'resourceType': 'Service'
      }
      this.getList(data)
    },
    editData(row) {
      console.log(row)
      console.log(this.mysqlData)

      var arr = []

      this.mysqlData.forEach(element => {
        if (element.name === row.flagname) {
          if (row.flagdiff === 'master') {
            arr['master'] = element.master
          } else if (row.flagdiff === 'slave') {
            arr['slave'] = element.slave
          }
        }
      })

      this.oneData = arr
      this.createFlag = true
      this.dialogFormVisible = true
    }
  }
}
</script>
<style scoped>
  .editor-container{
    position: relative;
    height: 100%;
  }
</style>
