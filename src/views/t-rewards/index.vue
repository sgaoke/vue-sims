<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form" :model="listQuery" label-width="80px">
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="学生学号">
              <el-input v-model="listQuery.title" placeholder="请输入学生学号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="学生姓名">
              <el-input v-model="listQuery.title" placeholder="请输入学生姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item style="text-align: right;">
              <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
                查询
              </el-button>
              <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
                新增
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="奖励信息" name="award">
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          @sort-change="sortChange"
        >
          <el-table-column label="序号" prop="id" fixed sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230" fixed class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="handleUpdate(row)">
                查看
              </el-button>
              <el-button type="primary" size="mini" @click="handleUpdate(row)">
                编辑
              </el-button>
              <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="学号" width="140px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.studentNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="120px">
            <template slot-scope="{row}">
              <span>{{ row.studentName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="性别" width="120px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.gender }}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖励编号" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.awardNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖励项目" width="240px">
            <template slot-scope="{row}">
              <span>{{ row.awardProject }}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖励级别" width="120px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.awardLevel }}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖励方式" width="120px">
            <template slot-scope="{row}">
              <span>{{ row.awardWay }}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖励类别" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.awardCategory }}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖励金额" width="140">
            <template slot-scope="{row}">
              <span>{{ row.awardBonus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="获奖时间" width="140">
            <template slot-scope="{row}">
              <span>{{ row.awardTime }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-tab-pane>
      <!-- 处分信息 -->
      <el-tab-pane label="处分信息" name="punish">
        <el-table
          :key="tableKey1"
          v-loading="listLoading1"
          :data="list1"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          @sort-change="sortChange1"
        >
          <el-table-column label="序号" prop="id" fixed sortable="custom" align="center" width="80" :class-name="getSortClass1('id')">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230" fixed class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="handleUpdate(row)">
                查看
              </el-button>
              <el-button type="primary" size="mini" @click="handleUpdate(row)">
                编辑
              </el-button>
              <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="学号" width="140px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.studentNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="120px">
            <template slot-scope="{row}">
              <span>{{ row.studentName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="性别" width="120px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.gender }}</span>
            </template>
          </el-table-column>
          <el-table-column label="处分编号" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.punishNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="处分名称" width="180px">
            <template slot-scope="{row}">
              <span>{{ row.punishName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="处分日期" width="140px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.punishDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="违纪类别" width="120px">
            <template slot-scope="{row}">
              <span>{{ row.disciplineCategory }}</span>
            </template>
          </el-table-column>
          <el-table-column label="违纪日期" align="center" width="140">
            <template slot-scope="{row}">
              <span>{{ row.disciplineDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="处分解除原因" width="160">
            <template slot-scope="{row}">
              <span>{{ row.disciplineReason }}</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total1>0" :total="total1" :page.sync="listQuery1.page" :limit.sync="listQuery1.limit" @pagination="getList1" />

      </el-tab-pane>
    </el-tabs>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchTAwardList, fetchTPunishList, createArticle, updateArticle } from '@/api/teacher'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      tableKey1: 0,
      list: null,
      list1: null,
      total: 0,
      total1: 0,
      listLoading: true,
      listLoading1: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: '+id'
      },
      listQuery1: {
        page: 1,
        limit: 10,
        sort: '+id'
      },
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
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
      activeName: 'award'
    }
  },
  created() {
    this.getList()
    this.getList1()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchTAwardList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getList1() {
      this.listLoading1 = true
      fetchTPunishList(this.listQuery1).then(response => {
        this.list1 = response.data.items
        this.total1 = response.data.total
        console.log(this.list1)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading1 = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleFilter1() {
      this.listQuery.page = 1
      this.getList1()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortChange1(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID1(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    sortByID1(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter1()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
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
    getSortClass1: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    handleClick() {
      console.log('切换Tab')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
