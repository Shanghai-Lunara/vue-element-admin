<template>
  <el-form ref="form" label-width="150px">
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
    <el-form-item label="Name">
      <el-input v-model="form.Name" />
    </el-form-item>

    <el-form-item label="image">
      <el-input v-model="form.image" />
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
      <div v-if="form.containerPorts !== ''">
        <el-input placeholder="">
          <template slot="prepend">containerPort:</template>
        </el-input>
        <el-input placeholder="">
          <template slot="prepend">hostIP:</template>
        </el-input>
        <el-input placeholder="">
          <template slot="prepend">hostPort:</template>
        </el-input>
        <el-input placeholder="">
          <template slot="prepend">name:</template>
        </el-input>
        <el-input placeholder="">
          <template slot="prepend">protocol:</template>
        </el-input>
      </div>

      <el-input v-else v-model="form.containerPorts" />

    </el-form-item>

    <el-form-item label="podResource">
      <el-input v-model="form.podResource" />
    </el-form-item>

    <el-form-item label="servicePorts">
      <el-input v-model="form.servicePorts" />
    </el-form-item>

  </el-form>
</template>

<script>

const form = {
  Name: '',
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
  protocol: ''
}

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
      branch: '',
      form
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
        this.form = this.oneData['master']
        this.branch = 'master'
      } else if (this.oneData.hasOwnProperty('slave')) {
        this.form = this.oneData['slave']
        this.branch = 'slave'
      }

      console.log(this.form.containerPorts)
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
.el-input-group {
  width: 20%;
}
</style>
