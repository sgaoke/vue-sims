<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form" :model="listQuery" label-width="80px">
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="学生学号">
              <el-input v-model="listQuery.studentNumber" placeholder="请输入学生学号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="学生姓名">
              <el-input v-model="listQuery.studentName" placeholder="请输入学生姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleView(row)">
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
      <el-table-column label="班级号" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.classNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级名称" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.className }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生学号" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.studentNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生姓名" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.studentName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="迟到时间" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.layTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="迟到原因" width="160px">
        <template slot-scope="{row}">
          <span>{{ row.layReason }}</span>
        </template>
      </el-table-column>
      <el-table-column label="早退时间" width="140" align="center">
        <template slot-scope="{row}">
          <span>{{ row.earlyTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="早退原因" width="160">
        <template slot-scope="{row}">
          <span>{{ row.earlyReason }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请假时间" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.leaveTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请假原因" width="140">
        <template slot-scope="{row}">
          <span>{{ row.leaveReason }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog class="student-dialog" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="110px"
        class="student-form scrollbar-sty"
      >
        <el-form-item v-if="dialogStatus !== 'view'" label="班级号" prop="classNumber">
          <el-input v-model="temp.classNumber" />
        </el-form-item>
        <el-form-item v-else label="班级号">
          <span>{{ temp.classNumber }}</span>
        </el-form-item>

        <el-form-item v-if="dialogStatus !== 'view'" label="班级名称" prop="className">
          <el-input v-model="temp.className" />
        </el-form-item>
        <el-form-item v-else label="班级名称">
          <span>{{ temp.className }}</span>
        </el-form-item>

        <el-form-item v-if="dialogStatus !== 'view'" label="学号" prop="studentNumber">
          <el-input v-model="temp.studentNumber" />
        </el-form-item>
        <el-form-item v-else label="学生学号">
          <span>{{ temp.studentNumber }}</span>
        </el-form-item>

        <el-form-item v-if="dialogStatus !== 'view'" label="姓名" prop="studentName">
          <el-input v-model="temp.studentName" />
        </el-form-item>
        <el-form-item v-else label="学生姓名">
          <span>{{ temp.studentName }}</span>
        </el-form-item>

        <el-form-item label="迟到时间">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.layTime" />
          <span v-else>{{ temp.layTime }}</span>
        </el-form-item>
        <el-form-item label="迟到原因">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.layReason" />
          <span v-else>{{ temp.layReason }}</span>
        </el-form-item>
        <el-form-item label="早退时间">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.earlyTime" />
          <span v-else>{{ temp.earlyTime }}</span>
        </el-form-item>
        <el-form-item label="早退原因">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.earlyReason" />
          <span v-else>{{ temp.earlyReason }}</span>
        </el-form-item>
        <el-form-item label="请假时间">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.leaveTime" />
          <span v-else>{{ temp.leaveTime }}</span>
        </el-form-item>
        <el-form-item label="请假原因">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.leaveReason" />
          <span v-else>{{ temp.leaveReason }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button v-if="dialogStatus !== 'view'" type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchDepartmentList,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '@/api/teacher'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        studentNumber: undefined,
        studentName: undefined,
        sort: '+id'
      },
      temp: {
        id: undefined,
        classNumber: '',
        className: '',
        studentNumber: '',
        studentName: '',
        layTime: '',
        layReason: '',
        earlyTime: '',
        earlyReason: '',
        leaveTime: '',
        leaveReason: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增',
        view: '查看出勤信息'
      },
      rules: {
        classNumber: [{ required: true, message: '班级号是必填项', trigger: 'blur' }],
        className: [{ required: true, message: '班级名称是必填项', trigger: 'blur' }],
        studentNumber: [{ required: true, message: '学号是必填项', trigger: 'blur' }],
        studentName: [{ required: true, message: '姓名是必填项', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchDepartmentList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        classNumber: '',
        className: '',
        studentNumber: '',
        studentName: '',
        layTime: '',
        layReason: '',
        earlyTime: '',
        earlyReason: '',
        leaveTime: '',
        leaveReason: ''
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
          this.temp.author = 'songgaoke'
          createDepartment(this.temp).then(() => {
            // this.list.unshift(this.temp)
            this.getList()
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
      // this.temp.timestamp = new Date(this.temp.timestamp)
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

          updateDepartment(tempData).then(() => {
            // const index = this.list.findIndex(v => v.id === this.temp.id)
            // this.list.splice(index, 1, this.temp)
            this.getList()
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
      var _self = this
      _self.$confirm('请确认是否删除当前记录?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton'
      }).then(() => {
        const deleteData = Object.assign({}, row)

        deleteDepartment(deleteData).then((res) => {
          console.log(res)
          _self.getList()
          _self.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
        })
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
    handleView(row) {
      // console.log(row)
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'view'
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  .el-form-item {
      margin-bottom: 0;
  }
}
.student-dialog {
  .el-form-item {
      margin-bottom: 22px;
  }
}
.student-form {
  max-height:360px;
  margin-left:50px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
