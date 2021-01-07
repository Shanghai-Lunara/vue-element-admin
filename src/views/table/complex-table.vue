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

      <el-button v-if="showFlag" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="leadData">
        导入
      </el-button>
      <el-input v-model="schfilter" placeholder="filter words" class="search-input" style="position: absolute;margin-left: 10px;width: 250px;" />
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

          <el-select v-else-if="index === 'containerNames'" v-model="row.modelValue" style="width: 180px;" @change="changeName">
            <el-option v-for="item in row[index]" :key="item" :label="item" :value="item" />
          </el-select>

          <span v-else>{{ row[index] }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="listQuery.type !== 'Service' && listQuery.type !== 'Secret'" :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">

          <div v-if="listQuery.type !== 'Pod'">
            <el-button type="primary" size="mini" @click="editData(row)">
              {{ $t('table.edit') }}
            </el-button>

            <el-button type="primary" size="mini" @click="educeData(row)">
              导出
            </el-button>

            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
              {{ $t('table.delete') }}
            </el-button>

          </div>

          <div v-else>
            <el-button type="primary" size="mini" @click="openTerm(row, 'log')">
              log
            </el-button>

            <el-button size="mini" type="primary" @click="openTerm(row, 'bash')">
              bash
            </el-button>
          </div>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="selectNameSpace" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" @close="closeDia(createFlag)">

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

// axios
import axios from 'axios'

const configMapTable = {
  Name: 'Name',
  namespace: 'NameSpace',
  keys: 'keys'
}

const mysqlOperatorTable = {
  name: 'Name',
  namespace: 'NameSpace',
  status: 'Status'
}

const RedisOperatorTable = {
  name: 'Name',
  namespace: 'NameSpace',
  status: 'Status'
}

const HelixSagaOperatorTable = {
  name: 'Name',
  namespace: 'NameSpace',
  status: 'Status'
}

const ServiceTable = {
  name: 'Name',
  type: 'type',
  clusterIP: 'clusterIP',
  ports: 'ports'
}

const SecretTable = {
  name: 'Name',
  namespace: 'NameSpace'
}

const PodTable = {
  name: 'Name',
  namespace: 'Namespace',
  hostIP: 'hostIP',
  podIP: 'podIP',
  phase: 'Phase',
  containerNames: 'containerNames'
}

const table = {
  'ConfigMap': configMapTable,
  'MysqlOperator': mysqlOperatorTable,
  'RedisOperator': RedisOperatorTable,
  'HelixSagaOperator': HelixSagaOperatorTable,
  'Service': ServiceTable,
  'Secret': SecretTable,
  'Pod': PodTable
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
      configList: [],
      cloneData: '',
      schfilter: '',
      storeList: []
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
      if (this.permission_routes[6]['children'].length === 1) {
        this.itemList()
      }
    },
    schfilter() {
      var _this = this
      var storeList = this.storeList
      var search = this.schfilter
      this.list = storeList
      if (search) {
        if (storeList[0].name !== undefined) {
          _this.list = storeList.filter(data => data.name.toLowerCase().includes(this.schfilter.toLowerCase()))
        } else {
          _this.list = storeList.filter(data => data.Name.toLowerCase().includes(this.schfilter.toLowerCase()))
        }
      }
    }
  },
  mounted() {
    // this.getList()

    if (this.permission_routes[6]['children'].length === 1) {
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
    closeDia(tmp) {
      if (tmp) {
        // var str = ''
        // switch (this.oneData.typename) {
        //   case 'MysqlOperator':
        //     str = 'mo-'
        //     break
        //   case 'RedisOperator':
        //     str = 'ro-'
        //     break
        //   case 'HelixSagaOperator':
        //     str = 'hso-'
        //     break
        // }

        // if (this.oneData.name.indexOf(str) === -1) {
        //   this.oneData.name = str + this.oneData.name
        // }
      } else {
        // console.log('closeDia')
        // 重置数据
        if (this.$refs.yamlEditor.list) {
          // console.log(this.$refs.yamlEditor.list)
          this.$refs.yamlEditor.list.forEach(element => {
            element.status = 1
          })

          this.$refs.yamlEditor.setValue('')
        }
      }
    },
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
    updateConfigMapList(data, nameType) {
      var errData = this.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Param.verify(data)

      if (errData) { throw Error(errData) }

      var param = {
        'nameSpace': this.nameSpace,
        'service': nameType,
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
            one = item
            one.namespace = _self.nameSpace

            one.keys = Object.keys(item.data).join(',')

            tmp = item.Name

            list.push(one)
            config_list.push(tmp)
          })

          _self.createFlag = false

          total = dataStr.items.length
          _self.showFlag = true
          _self.configList = config_list
          break
        case 'MysqlOperator':
          dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrdList.decode(result.result)

          list = []
          dataStr.items.forEach(function(item, index) {
            item.namespace = _self.nameSpace

            item.status = 'master :' + item.master.status.currentReplicas + ' / ' + item.master.status.replicas + ' ; ' + 'slave : ' + item.slave.status.currentReplicas + '/' + item.slave.status.replicas

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

            item.status = 'master :' + item.master.status.currentReplicas + ' / ' + item.master.status.replicas + ' ; ' + 'slave : ' + item.slave.status.currentReplicas + '/' + item.slave.status.replicas

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

            var arr = ''

            if (item.applications !== '') {
              item.applications.forEach(value => {
                arr = arr + value.spec.name + '\xa0\xa0\xa0pods: ' + value.spec.status.currentReplicas + ' / ' + value.spec.status.replicas + ' \n '
              })
            }

            item.status = arr

            list.push(item)
          })

          console.log(list)

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

            one.ports = ''

            item.ports.forEach(element => {
              if (one.ports === '') {
                one.ports = element.port + ':' + element.nodePort + '/' + element.protocol
              } else {
                one.ports = one.ports + ',' + element.port + ':' + element.nodePort + '/' + element.protocol
              }
            })
            one.type = item.type

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

          _self.permission_routes[6]['children'] = now_arr

          break
        case 'Pod':

          var podList = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.PodList.decode(result.result)

          list = []

          podList.items.forEach(element => {
            var one = []

            one.name = element.name
            one.namespace = element.namespace

            one.hostIP = element.status.hostIP
            one.podIP = element.status.podIP
            one.phase = element.status.phase

            one.containerNames = []

            one.modelValue = element.containerNames[0]
            one.containerNames = element.containerNames

            list.push(one)
          })

          total = podList.items.length
          _self.list = list

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
          // 获取右边搜索的list
          // this.getTinyTableList()
          break

        case 'resource': {
          var calendarTypeOptions = _self.calendarTypeOptions
          var dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.ResourceList.decode(result.result)
          dataStr.items.forEach(function(item, index) {
            if (item !== 'NameSpace' && item !== 'ServiceAccount') {
              calendarTypeOptions.push(item)
            }
          })

          _self.calendarTypeOptions = calendarTypeOptions
          _self.listQuery.type = 'ConfigMap'
          _self.showFlag = true

          const data = {
            'nameSpace': _self.nameSpace,
            'service': 'list',
            'resourceType': _self.listQuery.type
          }

          _self.getList(data)
        }

          break
        case 'list':

          if (_self.nameSpace !== undefined) {
            if (result.param.resourceType !== _self.listQuery.type || result.param.nameSpace !== _self.nameSpace) {
              return
            }
          }

          var obj = _self.returnMessage(service, _self)

          if (obj.isTiny) {
            this.$store.list = obj.list
          }

          this.list = obj.list
          this.total = obj.total
          _self.storeList = this.list
          break
        case 'watch':
          _self.initWatch(result, _self)

          break
        case 'update':
          if (result.code === 0) {
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: '失败',
              message: this.binaryToStr(result.result),
              type: 'error',
              duration: 5000
            })
          }
          this.dialogFormVisible = false
          break
        case 'create':
          if (result.code === 0) {
            this.$notify({
              title: '成功',
              message: '新增',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: '失败',
              message: this.binaryToStr(result.result),
              type: 'error',
              duration: 5000
            })
          }
          this.dialogFormVisible = false
          break
        case 'delete':
          if (result.code === 0) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: '失败',
              message: this.binaryToStr(result.result),
              type: 'error',
              duration: 5000
            })
          }
          break
      }
    },
    initWatch(res, _self) {
      let one_data = ''

      //  排除无关watch

      if (_self.nameSpace === 'undefined') {
        return
      }

      if (res.param.resourceType !== _self.listQuery.type || res.param.nameSpace !== _self.nameSpace) {
        return
      }

      switch (res.param.resourceType) {
        case 'ConfigMap':
          // ConfigMap
          one_data = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.ConfigMap.decode(res.result)

          _self.watchConfigMap(res.param.watchEventType, one_data, _self)

          break
        case 'MysqlOperator':
          one_data = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.MysqlCrd.decode(res.result)

          _self.watchEventType(res.param.watchEventType, one_data, _self)

          break
        case 'RedisOperator':
          one_data = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.RedisCrd.decode(res.result)

          _self.watchEventType(res.param.watchEventType, one_data, _self)

          break

        case 'HelixSagaOperator':
          one_data = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HelixSagaCrd.decode(res.result)

          _self.watchEventType(res.param.watchEventType, one_data, _self)

          break
      }
    },
    watchConfigMap(type, one_data, _self) {
      switch (type) {
        case 'ADDED':

          var flag = true

          _self.list.forEach((element, key) => {
            if (element.Name === one_data.Name && one_data.resourceVersion >= element.resourceVersion) {
              one_data.namespace = _self.nameSpace
              one_data.keys = Object.keys(one_data.data).join(',')
              _self.list.splice(key, 1, one_data)
              flag = false
            }
          })

          if (flag) {
            one_data.namespace = _self.nameSpace
            one_data.keys = Object.keys(one_data.data).join(',')
            _self.list.push(one_data)
          }

          break
        case 'MODIFIED':
          _self.list.forEach((element, key) => {
            if (element.Name === one_data.Name && one_data.resourceVersion >= element.resourceVersion) {
              one_data.namespace = _self.nameSpace
              one_data.keys = Object.keys(one_data.data).join(',')
              _self.list.splice(key, 1, one_data)
            }
          })
          break
        case 'DELETED':
          _self.list.forEach((element, key) => {
            if (element.Name === one_data.Name && one_data.resourceVersion >= element.resourceVersion) {
              _self.list.splice(key, 1)
            }
          })
          break
        case 'BOOKMARK':
          break
        case 'ERROR':
          break
      }
    },
    watchEventType(type, one_data, _self) {
      switch (type) {
        case 'ADDED':

          var flag = true

          _self.list.forEach((element, key) => {
            if (element.name === one_data.name && one_data.resourceVersion >= element.resourceVersion) {
              one_data.namespace = _self.nameSpace
              if (_self.listQuery.type === 'HelixSagaOperator') {
                one_data.typename = 'HelixSagaOperator'

                var arr = ''

                if (one_data.applications !== '') {
                  one_data.applications.forEach(value => {
                    arr = arr + value.spec.name + '\xa0\xa0\xa0pods: ' + value.spec.status.currentReplicas + ' / ' + value.spec.status.replicas + ' \n '
                  })
                }

                one_data.status = arr
              } else {
                one_data.status = 'master :' + one_data.master.status.currentReplicas + ' / ' + one_data.master.status.replicas + ' ; ' + 'slave : ' + one_data.slave.status.currentReplicas + '/' + one_data.slave.status.replicas
              }
              _self.list.splice(key, 1, one_data)
              flag = false
            }
          })

          if (flag) {
            one_data.namespace = _self.nameSpace
            if (_self.listQuery.type === 'HelixSagaOperator') {
              one_data.typename = 'HelixSagaOperator'

              var arr = ''

              if (one_data.applications !== '') {
                one_data.applications.forEach(value => {
                  arr = arr + value.spec.name + '\xa0\xa0\xa0pods: ' + value.spec.status.currentReplicas + ' / ' + value.spec.status.replicas + ' \n '
                })
              }

              one_data.status = arr
            } else {
              one_data.status = 'master :' + one_data.master.status.currentReplicas + ' / ' + one_data.master.status.replicas + ' ; ' + 'slave : ' + one_data.slave.status.currentReplicas + '/' + one_data.slave.status.replicas
            }
            _self.list.push(one_data)
          }

          break
        case 'MODIFIED':
          _self.list.forEach((element, key) => {
            if (element.name === one_data.name && one_data.resourceVersion >= element.resourceVersion) {
              one_data.namespace = _self.nameSpace
              if (_self.listQuery.type === 'HelixSagaOperator') {
                one_data.typename = 'HelixSagaOperator'

                var arr = ''

                if (one_data.applications !== '') {
                  one_data.applications.forEach(value => {
                    arr = arr + value.spec.name + '\xa0\xa0\xa0pods: ' + value.spec.status.currentReplicas + ' / ' + value.spec.status.replicas + ' \n '
                  })
                }

                one_data.status = arr
              } else {
                one_data.status = 'master :' + one_data.master.status.currentReplicas + ' / ' + one_data.master.status.replicas + ' ; ' + 'slave : ' + one_data.slave.status.currentReplicas + '/' + one_data.slave.status.replicas
              }
              _self.list.splice(key, 1, one_data)
            }
          })
          break
        case 'DELETED':
          _self.list.forEach((element, key) => {
            if (element.name === one_data.name && one_data.resourceVersion >= element.resourceVersion) {
              _self.list.splice(key, 1)
            }
          })
          break
        case 'BOOKMARK':
          break
        case 'ERROR':
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
    initConfig() {
      const data = {
        'nameSpace': this.nameSpace,
        'service': 'list',
        'resourceType': 'ConfigMap'
      }

      this.getList(data)
    },
    selectResource() {
      this.initConfig()
      if (this.namespace !== '') {
        const data = {
          'nameSpace': this.nameSpace,
          'service': 'list',
          'resourceType': this.listQuery.type
        }
        this.table = table[this.listQuery.type]

        // || this.listQuery.type === 'ConfigMap'
        if (this.listQuery.type === 'secret') {
          this.showFlag = false
        } else {
          this.showFlag = true
        }

        this.getList(data)
      }
    },
    // mysql | redis | helixsaga 新增
    handleCreate() {
      if (this.warning()) {
        return
      }

      if (this.listQuery.type === 'ConfigMap') {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true

        this.yamlData = {
          Name: '',
          data: {}
        }
      } else {
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
      }
    },
    // configmap 内容展示
    handleUpdate(row) {
      this.nowRow = row
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.yamlData = row
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

      if (editValue !== '') {
        const key = this.$refs.yamlEditor.old_branch
        this.$refs.yamlEditor.value.data[key] = editValue
      }

      // 取消弹框
      this.dialogFormVisible = false

      const data = {
        Name: this.$refs.yamlEditor.value.Name,
        data: this.$refs.yamlEditor.value.data
      }

      this.updateConfigMapList(data, this.dialogStatus)
    },
    // 更新mysqloperate
    makeConfirm() {
      delete this.oneData.namespace
      delete this.oneData.status

      // console.log(this.oneData)

      if (this.oneData.typename === 'HelixSagaOperator') {
        this.checkSaga()
      } else {
        this.checkData()
      }

      delete this.oneData.typename
      if (this.oneData.type) {
        delete this.oneData.type

        if (this.listQuery.type !== 'HelixSagaOperator') {
          this.oneData.name = this.oneData.master.name
        }

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

      if (this.oneData.applications !== '') {
        this.oneData.applications.forEach(element => {
          if (element.spec.containerPorts !== '') {
            element.spec.containerPorts.forEach(value => [
              delete value.isSet
            ])
          }

          if (element.spec.servicePorts !== '') {
            element.spec.servicePorts.forEach(value => [
              delete value.isSet
            ])
          }

          if (element.tolerations !== '') {
            element.tolerations.forEach(value => [
              delete value.isSet
            ])
          }
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
    },
    openTerm(data, type) {
      const url = process.env.VUE_APP_BASH_URL + '/namespace/' + data.namespace + '/pod/' + data.name + '/shell/' + data.modelValue + '/' + type

      var _self = this

      axios.get(url).then(function(res) {
        const routeData = _self.$router.resolve({
          path: '/term',
          query: { token: res.data.token, type: type }
        })

        window.open(routeData.href, '_blank')
      }).catch(function(error) {
        console.log(error)
      })
    },
    changeName(value) {
    },
    educeData(value) {
      this.cloneData = value

      this.$notify({
        title: '成功',
        message: '导出数据成功',
        type: 'success',
        duration: 2000
      })
    },
    leadData() {
      delete this.cloneData.resourceVersion
      delete this.cloneData.status

      delete this.cloneData.resourceVersion
      delete this.cloneData.resourceVersion

      if (this.listQuery.type === 'ConfigMap') {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true

        this.yamlData = {
          Name: '',
          data: this.cloneData['data']
        }
      } else {
        this.oneData = this.cloneData
        this.createFlag = true
        this.dialogFormVisible = true
        this.oneData.type = 1
        this.oneData.typename = this.listQuery.type

        if (this.listQuery.type === 'HelixSagaOperator') {
          this.oneData.configList = this.configList
        }

        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      }
    }
  }
}
</script>
<style>
  .editor-container{
    position: relative;
    height: 100%;
  }

  .el-table .cell{
    white-space: pre-line
  }
</style>
