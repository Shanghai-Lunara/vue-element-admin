<template>
  <div class="app-container">
    <div class="filter-container">
      <span>ResourceType:</span>
      <el-select v-model="listQuery.type" :placeholder="$t('table.type')" class="filter-item" style="width: 250px;margin-left: 10px" @change="selectResource">
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

      <el-table-column v-for="(info,index) in table" :key="index" :label="info" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="index === 'namespace'">{{ row[index] }}</el-tag>
          <span v-else>{{ row[index] }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="listQuery.type !== 'Service' && listQuery.type !== 'Secret'" :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">

          <el-button type="primary" size="mini" @click="editData(row)">
            {{ $t('table.edit') }}
          </el-button>

          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            {{ $t('table.delete') }}
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="selectNameSpace" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

      <!-- mysql | redis -->

      <template v-if="createFlag">
        <FormData ref="FormData" :one-data="oneData" />
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            {{ $t('table.cancel') }}
          </el-button>
          <el-button type="primary" @click="makeConfirm()">
            {{ $t('table.confirm') }}
          </el-button>
        </div>
      </template>

      <!-- configmap -->
      <template v-else>
        <div>
          <div class="editor-container">
            <yaml-editor ref="yamlEditor" :value="yamlData" />
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            {{ $t('table.cancel') }}
          </el-button>
          <el-button type="primary" @click="makeSureEdit()">
            {{ $t('table.confirm') }}
          </el-button>
        </div>
      </template>

    </el-dialog>

  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import YamlEditor from '@/components/YamlEditor/index.vue'
// redis | mysql | helixsaga
import FormData from '@/components/FormData'

// 挂载
import { mapGetters } from 'vuex'

const configMapTable = {
  name: 'Name',
  namespace: 'NameSpace',
  keys: 'keys'
}

const mysqlOperatorTable = {
  name: 'Name',
  namespace: 'NameSpace'
}

const RedisOperatorTable = {
  name: 'Name',
  namespace: 'NameSpace'
}

const HelixSagaOperatorTable = {
  name: 'Name',
  namespace: 'NameSpace'
}

const ServiceTable = {
  name: 'Name',
  clusterIP: 'clusterIP',
  port: 'port'
}

const SecretTable = {
  name: 'Name',
  namespace: 'NameSpace'
}

const table = {
  'ConfigMap': configMapTable,
  'MysqlOperator': mysqlOperatorTable,
  'RedisOperator': RedisOperatorTable,
  'HelixSagaOperator': HelixSagaOperatorTable,
  'Service': ServiceTable,
  'Secret': SecretTable
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
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      downloadLoading: false,
      nameSpace: '',
      table: '',
      yamlData: '',
      showFlag: false,
      nowRow: '', // 当前选中对象
      createFlag: false,
      oneData: {},
      configList: []
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  watch: {
    $route(route) {
      // 监控路由
      var name = route.query.name
      this.nameSpace = name
      this.selectNameSpace()
    },
    permission_routes() {
      if (this.permission_routes[5]['children'].length === 0) {
        this.itemList()
      }
    }
  },
  mounted() {
    // this.getList()

    if (this.permission_routes[5]['children'].length === 0) {
      this.itemList()
    }

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
    // 侧边栏延迟加载
    itemList() {
      var data = {
        'nameSpace': '',
        'service': 'list',
        'resourceType': 'NameSpace'
      }

      this.getList(data)
    },
    // 获得下拉框列表属性值
    getResourceList() {
      var data = {
        'nameSpace': 'default',
        'service': 'resource',
        'resourceType': ''
      }

      this.getList(data)
    },
    getList(param, data = '') {
      var errData = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.verify(param)

      if (errData) { throw Error(errData) }

      var msg = {
        'param': param,
        'data': data
      }

      var request = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Request

      var message = request.create(msg)

      var senddata = request.encode(message).finish()

      const _self = this
      this.$socketApi(senddata, function(res) {
        _self.returnResource(res, _self)
      })
    },
    // 修改更新数据
    updateConfigMapList(data, type) {
      var errData = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.verify(data)

      if (errData) { throw Error(errData) }

      var param = {
        'nameSpace': this.nameSpace,
        'service': type,
        'resourceType': this.listQuery.type
      }

      var data_request = ''
      switch (this.listQuery.type) {
        case 'ConfigMap':
          data_request = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap
          break
        case 'MysqlOperator':
          data_request = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd
          break
        case 'RedisOperator':
          data_request = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd
          break
        case 'HelixSagaOperator':
          data_request = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaCrd
          break
      }

      var data_message = data_request.create(data)
      var msg_data = data_request.encode(data_message).finish()

      this.getList(param, msg_data)
    },
    returnMessage(res, _self) {
      const result = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response.decode(res)

      let dataStr = ''
      let list
      let total = 1

      let isTiny = false // service时为true, 存贮侧边栏数据

      switch (result.param.resourceType) {
        case 'ConfigMap':
          dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMapList.decode(result.result)
          list = []
          var config_list = []
          dataStr.items.forEach(function(item, index) {
            var one = []
            var tmp = ''
            one.name = item.Name
            one.namespace = _self.nameSpace

            one.keys = Object.keys(item.data).join(',')
            one.value = Object.values(item.data)
            one.item = item

            tmp = item.Name

            list.push(one)
            config_list.push(tmp)
          })

          total = dataStr.items.length
          _self.showFlag = false
          _self.configList = config_list
          break
        case 'MysqlOperator':
          dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrdList.decode(result.result)

          list = []
          dataStr.items.forEach(function(item, index) {
            item.namespace = _self.nameSpace

            list.push(item)
          })

          total = dataStr.items.length
          _self.list = list
          _self.showFlag = true
          break
        case 'RedisOperator':
          dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrdList.decode(result.result)

          list = []
          dataStr.items.forEach(function(item, index) {
            item.namespace = _self.nameSpace

            list.push(item)
          })

          total = dataStr.items.length
          _self.list = list
          _self.showFlag = true
          break

        case 'HelixSagaOperator':
          dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaCrdList.decode(result.result)

          list = []
          dataStr.items.forEach(function(item, index) {
            item.namespace = _self.nameSpace
            item.typename = 'HelixSagaOperator'

            list.push(item)
          })

          total = dataStr.items.length
          _self.list = list
          _self.showFlag = true

          break

        case 'Service':
          dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.ServiceList.decode(result.result)
          list = []
          dataStr.items.forEach(function(item, index) {
            var one = []
            one.name = item.Name
            one.clusterIP = item.clusterIP
            one.port = item.ports[0].port

            list.push(one)
          })
          total = dataStr.items.length
          isTiny = true

          _self.showFlag = false

          break

        case 'Secret':
          dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.SecretList.decode(result.result)
          list = []
          dataStr.items.forEach(function(item, index) {
            item.namespace = _self.nameSpace

            list.push(item)
          })
          total = dataStr.items.length

          _self.showFlag = false

          break
      }

      return {
        list: list,
        total: total,
        isTiny: isTiny
      }
    },

    returnResource(service, _self) {
      var result = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response.decode(service)
      switch (result.param.service) {
        case 'ping':
          console.log('ping')
          break
        case 'NameSpace':
          var spaceList = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpaceList.decode(result.result)

          var now_arr = []

          var arr = spaceList.items

          arr.forEach(element => {
            var now_list = { 'path': 'complex-table' }
            now_list['name'] = element['Name']
            now_list['component'] = () => import('@/views/table/complex-table')

            now_list['meta'] = { 'title': element['Name'], 'icon': 'form' }
            now_arr.push(now_list)
          })

          this.permission_routes[5]['children'] = now_arr

          break
        case 'resource': {
          var calendarTypeOptions = _self.calendarTypeOptions
          var dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.ResourceList.decode(result.result)
          dataStr.items.forEach(function(item, index) {
            if (item !== 'NameSpace') {
              calendarTypeOptions.push(item)
            }
          })

          _self.calendarTypeOptions = calendarTypeOptions
          _self.listQuery.type = 'ConfigMap'
          _self.showFlag = false

          const data = {
            'nameSpace': _self.nameSpace,
            'service': 'list',
            'resourceType': _self.listQuery.type
          }

          _self.getList(data)
        }

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
          if (result.code === 0) {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
            const data = {
              'nameSpace': this.nameSpace,
              'service': 'list',
              'resourceType': this.listQuery.type
            }
            this.getList(data)
          }
          break
        case 'create':
          console.log(55555555)
          console.log(result)
          console.log(this.binaryToStr(result.result))
          if (result.code === 0) {
            this.$notify({
              title: '成功',
              message: '新增',
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
            const data = {
              'nameSpace': this.nameSpace,
              'service': 'list',
              'resourceType': this.listQuery.type
            }
            this.getList(data)
          }
          break
        case 'delete':
          if (result.code === 0) {
            this.$notify({
              title: '成功',
              message: '删除成功',
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
      }
    },
    binaryToStr(fileData) {
      var dataString = ''
      for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i])
      }

      return dataString
    },
    selectNameSpace() {
      var data = {
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
    // mysql | redis | helixsaga 新增
    handleCreate() {
      console.log('add')
      if (this.warning()) {
        return
      }

      this.oneData = {}

      this.createFlag = true
      this.oneData.type = 1

      if (this.listQuery.type === 'HelixSagaOperator') {
        this.oneData.configList = this.configList
      }

      this.oneData.typename = this.listQuery.type

      this.dialogStatus = 'create'
      this.dialogFormVisible = true

      this.oneData.name = ''
      this.oneData.namespace = this.nameSpace
    },
    // configmap 内容展示
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
    handleDelete(row, index) {
      if (this.warning()) {
        return
      }

      this.$confirm('确认删除此项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delete row.namespace
        delete row.resourceVersion

        this.updateConfigMapList(row, 'delete')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    makeSureEdit() {
      // 获取,更改编辑框里的值
      const editValue = this.$refs.yamlEditor.getValue()
      this.$refs.yamlEditor.setValue(editValue)
      this.yamlData = editValue

      // 取消弹框
      this.dialogFormVisible = false

      // 将编辑框内转化为对象,并update
      const yaml = require('js-yaml')
      const obj = yaml.load(this.yamlData)

      const data = {
        Name: this.nowRow.item.Name,
        data: obj
      }
      this.updateConfigMapList(data, 'update')
    },
    // 更新mysqloperate
    makeConfirm() {
      delete this.oneData.namespace

      var str = ''
      switch (this.oneData.typename) {
        case 'MysqlOperator':
          str = 'mo-'
          break
        case 'RedisOperator':
          str = 'ro-'
          break
        case 'HelixSagaOperator':
          str = 'hso-'
          break
      }

      if (this.oneData.typename === 'HelixSagaOperator') {
        this.checkSaga()
      } else {
        this.checkData()
      }

      this.oneData.name = str + this.oneData.name

      delete this.oneData.typename
      if (this.oneData.type) {
        delete this.oneData.type
        this.updateConfigMapList(this.oneData, 'create')
      } else {
        delete this.oneData.type
        this.updateConfigMapList(this.oneData, 'update')
      }
    },
    // 处理helixsaga 数据
    checkSaga() {
      delete this.oneData.configList

      if (this.oneData.configMap.volume.volumeSource.configMap.items !== '') {
        this.oneData.configMap.volume.volumeSource.configMap.items.forEach(element => {
          delete element.isSet
        })
      }

      if (this.oneData.applications[0]['spec']['containerPorts'] !== '') {
        this.oneData.applications[0]['spec']['containerPorts'].forEach(element => {
          delete element.isSet
        })
      }

      if (this.oneData.applications[0]['spec']['servicePorts'] !== '') {
        this.oneData.applications[0]['spec']['servicePorts'].forEach(element => {
          delete element.isSet
        })
      }
    },
    // 处理mysql | redis 修改数据
    checkData() {
      if (this.oneData.master.containerPorts !== '') {
        this.oneData.master.containerPorts.forEach(element => {
          delete element.isSet
        })
      }

      if (this.oneData.master.servicePorts !== '') {
        this.oneData.master.servicePorts.forEach(element => {
          delete element.isSet
        })
      }

      if (this.oneData.slave.containerPorts !== '') {
        this.oneData.slave.containerPorts.forEach(element => {
          delete element.isSet
        })
      }

      if (this.oneData.slave.servicePorts !== '') {
        this.oneData.slave.servicePorts.forEach(element => {
          delete element.isSet
        })
      }
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
    // config | mysqloperator | redisoperator 编辑
    editData(row) {
      console.log('editor')
      if (this.warning()) {
        return
      }
      if (this.listQuery.type === 'secret' || this.listQuery.type === 'ConfigMap') {
        this.handleUpdate(row)
        this.createFlag = false
      } else {
        this.oneData = row
        this.createFlag = true
        this.dialogFormVisible = true
        this.oneData.type = 0
        this.oneData.typename = this.listQuery.type

        if (this.listQuery.type === 'HelixSagaOperator') {
          this.oneData.configList = this.configList
        }

        this.dialogStatus = 'update'
      }
    },
    warning() {
      if (this.nameSpace === undefined) {
        this.$message({
          message: '请先选择命名空间',
          type: 'warning'
        })
        return true
      }
      return false
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
