<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-openeds="['/']"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    var data = {
      'nameSpace': '',
      'service': 'list',
      'resourceType': 'NameSpace'
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

    var _self = this

    this.$socketApi(senddata, function(res) {
      var result = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.Response.decode(res)

      var dataStr = _self.$proto.github.com.nevercase.k8s_controller_custom_resource.api.proto.NameSpaceList.decode(result.result)

      var now_arr = []

      var arr = dataStr.items

      arr.forEach(element => {
        var now_list = { 'path': 'complex-table' }
        now_list['name'] = element['Name']
        now_list['component'] = () => import('@/views/table/complex-table')

        now_list['meta'] = { 'title': element['Name'], 'icon': 'message' }
        now_arr.push(now_list)
      })

      _self.permission_routes[5]['children'] = now_arr
    })
  }
}
</script>
