<template>
  <div class="drawer-container">
    <div>
      <div style="margin-bottom: 10px">
        <h3 class="drawer-title">{{ $t('tiny_table.title') }}</h3>
        <el-input v-model="searchValue" :placeholder="$t('tiny_table.title')" style="width: 200px;" class="filter-item" @input="inputFunc" />
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="test">
          {{ $t('table.add') }}
        </el-button>
      </div>

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
// import ThemePicker from '@/components/ThemePicker'

export default {
  // components: { ThemePicker },
  data() {
    return {
      tableKey: 0,
      list: [],
      tmpList: [],
      searchValue: ''
    }
  },
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
    inputFunc() {
      const value = this.searchValue
      console.log(this.searchValue)
      this.tmpList = []
      const tmp = []
      this.list.forEach(function(item, index) {
        if (item.name.indexOf(value) !== -1) {
          tmp.push(item)
        }
      })
      console.log('tmp')
      console.log(tmp)

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
