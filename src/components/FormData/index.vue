<template>
  <el-form ref="dataForm" label-position="left" label-width="130px" style=" margin-left:50px;">
    <el-form-item label="project_name">
      <el-select v-model="flag" class="filter-item" placeholder="Please select">
        <el-option v-for="item in list" :key="item.projectId" :value="item.name" @change="initChange(item.projectId)" />
      </el-select>
    </el-form-item>
    <!-- <el-form-item :label="$t('table.date')" prop="timestamp">
      <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
    </el-form-item>
    <el-form-item :label="$t('table.title')" prop="title">
      <el-input v-model="temp.title" />
    </el-form-item>
    <el-form-item :label="$t('table.status')">
      <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
        <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('table.importance')">
      <el-rate v-model="jashjc" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
    </el-form-item>
    <el-form-item :label="$t('table.remark')">
      <el-input v-model="t121211" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
    </el-form-item> -->
  </el-form>
</template>

<script>

export default {
  name: 'FormData',
  data() {
    return {
      list: '',
      flag: '',
      command: ''
    }
  },
  mounted() {
    this.getCreateData()
  },
  methods: {
    initChange(id) {
      var param = this.initParam()

      var senddata = this.initData('repositories', param, id)

      // HarborRequest

      var _self = this
      this.$socketApi(senddata, function(res) {
        _self.responseData(res, _self)
      })
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

      var data = {
        'command': type,
        'projectId': id,
        'imageName': ''
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
    getCreateData() {
      var param = this.initParam()

      var senddata = this.initData('projects', param)

      // HarborRequest

      var _self = this
      this.$socketApi(senddata, function(res) {
        _self.responseData(res, _self)
      })
    },
    responseData(res, _self) {
      var result = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response.decode(res)
      switch (result.param.service) {
        case 'harbor':
          var dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.HarborProjectList.decode(result.result)

          dataStr.items.forEach((element, key) => {
            if (key === 0) {
              _self.flag = element.name
            //   _self.initChange(element.projectId)
            }
          })

          _self.list = dataStr.items
          break
      }
    }
  }
}
</script>

<style scoped>
    label .el-form-item__label {
        width: 130px;
    }
</style>
