<template>
  <el-form ref="form" label-width="200px">
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
    <el-form-item v-for="(value, key) in form" :key="key" :label="key">
      <el-input :value="value" />
    </el-form-item>
    <!-- <el-form-item label="活动区域">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间">
      <el-col :span="11">
        <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;" />
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
      </el-col>
    </el-form-item>
    <el-form-item label="即时配送">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item label="活动性质">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="美食/餐厅线上活动" name="type" />
        <el-checkbox label="地推活动" name="type" />
        <el-checkbox label="线下主题活动" name="type" />
        <el-checkbox label="单纯品牌曝光" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源">
      <el-radio-group v-model="form.resource">
        <el-radio label="线上品牌商赞助" />
        <el-radio label="线下场地免费" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
  </el-form> -->
  </el-form>
</template>

<script>

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
      form: '',
      branch: ''
    }
  },
  watch: {
    oneData() {
      this.initForm()
    }
  },
  mounted() {
    // this.getCreateData()
    this.initForm()
  },
  methods: {
    initForm() {
      console.log(this.oneData)

      if (this.oneData.hasOwnProperty('master')) {
        console.log(222222)
        this.form = this.oneData['master']
        this.branch = 'master'
      } else if (this.oneData.hasOwnProperty('slave')) {
        console.log(12121212121212121212)
        this.form = this.oneData['slave']
        this.branch = 'slave'
      }
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
      //   console.log(result)
      switch (result.param.command) {
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
    }
  }
}
</script>

<style scoped>

</style>
