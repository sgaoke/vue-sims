<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form" :model="listQuery" label-width="80px">
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="课程编号">
              <el-input v-model="listQuery.courseNumber" placeholder="请输入课程编号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="课程名称">
              <el-input v-model="listQuery.courseName" placeholder="请输入课程名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item style="text-align: right;">
              <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
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
      <el-table-column label="序号" prop="id" sortable="custom" fixed align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="240" fixed class-name="small-padding fixed-width">
        <template slot-scope="{row}">
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
      <el-table-column label="课程编号" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.courseNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名称" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.courseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程类型" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.courseType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="授课教师" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.teacher }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上课时间" align="center" width="160px">
        <template slot-scope="{row}">
          <span>{{ row.schoolTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上课地点" align="left" width="260px">
        <template slot-scope="{row}">
          <span>{{ row.schoolAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center" width="160px">
        <template slot-scope="{row}">
          <span>{{ row.contact }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog v-if="dialogFormVisible" class="student-dialog" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="110px"
        class="student-form scrollbar-sty"
      >
        <el-form-item v-if="dialogStatus !== 'view'" label="课程编号" prop="courseNumber">
          <el-input v-model="temp.courseNumber" />
        </el-form-item>
        <el-form-item v-else label="课程编号">
          <span>{{ temp.courseNumber }}</span>
        </el-form-item>

        <el-form-item v-if="dialogStatus !== 'view'" label="课程名称" prop="courseName">
          <el-input v-model="temp.courseName" />
        </el-form-item>
        <el-form-item v-else label="课程名称">
          <span>{{ temp.courseName }}</span>
        </el-form-item>

        <el-form-item label="课程类型">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.courseType" />
          <span v-else>{{ temp.courseType }}</span>
        </el-form-item>
        <el-form-item label="授课教师">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.teacher" />
          <span v-else>{{ temp.teacher }}</span>
        </el-form-item>
        <el-form-item label="上课时间">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.schoolTime" />
          <span v-else>{{ temp.schoolTime }}</span>
        </el-form-item>
        <el-form-item label="上课地点">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.schoolAddress" />
          <span v-else>{{ temp.schoolAddress }}</span>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.contact" />
          <span v-else>{{ temp.contact }}</span>
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
import {
  fetchSubjectList,
  createSubject,
  updateSubject,
  deleteSubject
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
        courseNumber: undefined,
        courseName: undefined,
        sort: '+id'
      },
      temp: {
        id: undefined,
        courseNumber: '',
        courseName: '',
        courseType: '',
        teacher: '',
        schoolTime: '',
        schoolAddress: '',
        contact: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增',
        view: '查看课程信息'
      },
      rules: {
        courseNumber: [{ required: true, message: '课程编号是必填项', trigger: 'blur' }],
        courseName: [{ required: true, message: '课程名称是必填项', trigger: 'blur' }]
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
      fetchSubjectList(this.listQuery).then(response => {
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
        courseNumber: '',
        courseName: '',
        courseType: '',
        teacher: '',
        schoolTime: '',
        schoolAddress: '',
        contact: ''
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
      const _self = this
      _self.$refs['dataForm'].validate((valid) => {
        if (valid) {
          _self.temp.author = 'songgaoke'
          createSubject(_self.temp).then(() => {
            // this.list.unshift(this.temp)
            _self.getList()
            _self.dialogFormVisible = false
            _self.$notify({
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

          updateSubject(tempData).then(() => {
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

        deleteSubject(deleteData).then((res) => {
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
