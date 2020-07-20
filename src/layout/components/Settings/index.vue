<template>
  <div class="drawer-container">
    <div>
      <div style="margin-bottom: 10px">
        <h3 class="drawer-title">{{ $t('tiny_table.title') }}</h3>
        <el-input v-model="searchValue" v-on:input ="inputFunc" :placeholder="$t('tiny_table.title')" style="width: 200px;" class="filter-item" @keyup.enter.native="" />
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="test">
          {{ $t('table.add') }}
        </el-button>
      </div>

      <!--<div class="drawer-item">
        <span>{{ $t('settings.theme') }}</span>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.tagsView') }}</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.fixedHeader') }}</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.sidebarLogo') }}</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>
      <a v-if="isShowJob" href="https://panjiachen.github.io/vue-element-admin-site/zh/job/" target="_blank" class="job-link">
        <el-alert
          title="部门目前非常缺人！有兴趣的可以点击了解详情。坐标: 字节跳动"
          type="success"
          :closable="false"
        />
      </a>

      <div v-if="lang === 'zh'" class="drawer-item">
        <span>菜单支持拼音搜索</span>
        <el-switch v-model="supportPinyinSearch" class="drawer-switch" />
      </div>-->

      <div style="max-height: 500px">
        <el-table
          :key="tableKey"
          :data="tmpList"
          border
          fit
          height="750"
          highlight-current-row
          style="width: 100%;height: 100%"
        >
          <el-table-column :label="$t('tiny_table.name')" width="350px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('tiny_table.port')" width="100px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.port }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'

export default {
  components: { ThemePicker },
  data() {
    return {
      tableKey: 0,
      list: [],
      tmpList: [],
      searchValue: ''
    }
  },
  /*computed: {
    isShowJob() {
      return this.$store.getters.language === 'zh'
    },
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    },
    supportPinyinSearch: {
      get() {
        return this.$store.state.settings.supportPinyinSearch
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'supportPinyinSearch',
          value: val
        })
      }
    },
    lang() {
      return this.$store.getters.language
    }
  },*/
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    },
    test() {
      this.tmpList = this.list = this.$store.list
    },
    inputFunc(){
      let value = this.searchValue
      console.log(this.searchValue);
      this.tmpList = []
      let tmp = []
      this.list.forEach(function(item, index) {
        if (item.name.indexOf(value) !== -1) {
          tmp.push(item)
        }
      })
      console.log('tmp');
      console.log(tmp);

      this.tmpList = tmp
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }

  .job-link{
    display: block;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }
}
</style>
