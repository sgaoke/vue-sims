<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form v-if="activeName === 'student'" ref="form" :model="listQuery" label-width="80px">
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
      <el-form v-else ref="form" :model="teacherListQuery" label-width="80px">
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="教师工号">
              <el-input v-model="teacherListQuery.teacherNumber" placeholder="请输入教师工号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleTeacherFilter" />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="教师姓名">
              <el-input v-model="teacherListQuery.teacherName" placeholder="请输入教师姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleTeacherFilter" />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item style="text-align: right;">
              <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleTeacherFilter">
                查询
              </el-button>
              <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleTeacherCreate">
                新增
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="学生账号" name="student">
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
          <el-table-column label="操作" align="center" width="250" fixed class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="handleStudentView(row)">
                查看
              </el-button>
              <el-button type="primary" size="mini" @click="handleStudentUpdate(row)">
                编辑
              </el-button>
              <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleStudentDelete(row,$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="学号" width="160px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.studentNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="140px">
            <template slot-scope="{row}">
              <span>{{ row.studentName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="性别" width="140px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.gender | typeFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="密码" width="160px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.password }}</span>
            </template>
          </el-table-column>
          <el-table-column label="邮箱" min-width="160px">
            <template slot-scope="{row}">
              <span>{{ row.email }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-tab-pane>
      <!-- 教师账号 -->
      <el-tab-pane label="教师账号" name="teacher">
        <el-table
          :key="teacherTableKey"
          v-loading="teacherListLoading"
          :data="teacherList"
          border
          fit
          highlight-current-row
          style="width: 100%;"
          @sort-change="teacherSortChange"
        >
          <el-table-column label="序号" prop="id" fixed sortable="custom" align="center" width="80" :class-name="getSortClass1('id')">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="250" fixed class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="handleTeacherView(row)">
                查看
              </el-button>
              <el-button type="primary" size="mini" @click="handleTeacherUpdate(row)">
                编辑
              </el-button>
              <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleTeacherDelete(row,$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="工号" width="160px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.teacherNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="140px">
            <template slot-scope="{row}">
              <span>{{ row.teacherName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="性别" width="140px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.gender | typeFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="密码" width="160px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.password }}</span>
            </template>
          </el-table-column>
          <el-table-column label="邮箱" min-width="160px">
            <template slot-scope="{row}">
              <span>{{ row.email }}</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="teacherTotal>0" :total="teacherTotal" :page.sync="teacherListQuery.page" :limit.sync="teacherListQuery.limit" @pagination="getTeacherList" />

      </el-tab-pane>
    </el-tabs>

    <!-- student -->
    <el-dialog class="student-dialog" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item v-if="dialogStatus !== 'view'" label="学号" prop="studentNumber">
          <el-input v-model="temp.studentNumber" />
        </el-form-item>
        <el-form-item v-else label="学号">
          <span>{{ temp.studentNumber }}</span>
        </el-form-item>

        <el-form-item v-if="dialogStatus !== 'view'" label="姓名" prop="studentName">
          <el-input v-model="temp.studentName" />
        </el-form-item>
        <el-form-item v-else label="姓名">
          <span>{{ temp.studentName }}</span>
        </el-form-item>

        <el-form-item label="性别">
          <el-select
            v-if="dialogStatus !== 'view'"
            v-model="temp.gender"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="item in genderOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            />
          </el-select>
          <span v-else>{{ temp.gender === 'male' ? '男' : '女' }}</span>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.password" />
          <span v-else>{{ temp.password }}</span>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.email" />
          <span v-else>{{ temp.email }}</span>
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

    <!-- teacher -->
    <el-dialog class="teacher-dialog" :title="textMap1[dialogStatus1]" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm1" :rules="rules1" :model="temp1" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item v-if="dialogStatus1 !== 'view'" label="工号" prop="teacherNumber">
          <el-input v-model="temp1.teacherNumber" />
        </el-form-item>
        <el-form-item v-else label="工号">
          <span>{{ temp1.teacherNumber }}</span>
        </el-form-item>

        <el-form-item v-if="dialogStatus1 !== 'view'" label="姓名" prop="teacherName">
          <el-input v-model="temp1.teacherName" />
        </el-form-item>
        <el-form-item v-else label="姓名">
          <span>{{ temp1.teacherName }}</span>
        </el-form-item>

        <el-form-item label="性别">
          <el-select
            v-if="dialogStatus1 !== 'view'"
            v-model="temp1.gender"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="item in genderOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            />
          </el-select>
          <span v-else>{{ temp1.gender === 'male' ? '男' : '女' }}</span>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.password" />
          <span v-else>{{ temp1.password }}</span>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.email" />
          <span v-else>{{ temp1.email }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">
          取消
        </el-button>
        <el-button v-if="dialogStatus1 !== 'view'" type="primary" @click="dialogStatus1 === 'create' ? createTeacherData() : updateTeacherData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchAStudentList,
  fetchATeacherList,
  createStudentAccount,
  updateStudentAccount,
  deleteStudentAccount,
  createTeacherAccount,
  updateTeacherAccount,
  deleteTeacherAccount
} from '@/api/account'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const genderOptions = [
  { key: 'male', label: '男' },
  { key: 'female', label: '女' }
]

const genderKeyValue = genderOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.label
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    typeFilter(type) {
      return genderKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      teacherTableKey: 0,
      list: null,
      teacherList: null,
      total: 0,
      teacherTotal: 0,
      listLoading: true,
      teacherListLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        studentNumber: undefined,
        studentName: undefined,
        sort: '+id'
      },
      teacherListQuery: {
        page: 1,
        limit: 10,
        teacherNumber: undefined,
        teacherName: undefined,
        sort: '+id'
      },
      genderOptions,
      temp: {
        id: undefined,
        studentNumber: '',
        studentName: '',
        gender: '',
        password: '',
        email: ''
      },
      temp1: {
        id: undefined,
        teacherNumber: '',
        teacherName: '',
        gender: '',
        password: '',
        email: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      dialogFormVisible1: false,
      dialogStatus1: '',
      textMap: {
        update: '编辑',
        create: '新增',
        view: '查看账号信息'
      },
      textMap1: {
        update: '编辑',
        create: '新增',
        view: '查看账号信息'
      },
      rules: {
        studentNumber: [{ required: true, message: '学号是必填项', trigger: 'blur' }],
        studentName: [{ required: true, message: '姓名是必填项', trigger: 'blur' }]
      },
      rules1: {
        teacherNumber: [{ required: true, message: '工号是必填项', trigger: 'blur' }],
        teacherName: [{ required: true, message: '姓名是必填项', trigger: 'blur' }]
      },
      downloadLoading: false,
      activeName: 'student'
    }
  },
  created() {
    this.getList()
    this.getTeacherList()
  },
  methods: {
    getList() {
      const _self = this
      _self.listLoading = true

      fetchAStudentList(_self.listQuery).then(response => {
        _self.list = response.data.items
        _self.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          _self.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getTeacherList() {
      const _self = this
      _self.teacherListLoading = true

      console.log(_self.teacherListQuery)
      fetchATeacherList(_self.teacherListQuery).then(response => {
        this.teacherList = response.data.items
        this.teacherTotal = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.teacherListLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleTeacherFilter() {
      this.teacherListQuery.page = 1
      this.getTeacherList()
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
    teacherSortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID1(order)
      }
    },
    sortByID1(order) {
      if (order === 'ascending') {
        this.teacherListQuery.sort = '+id'
      } else {
        this.teacherListQuery.sort = '-id'
      }
      this.handleTeacherFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        studentNumber: '',
        studentName: '',
        gender: '',
        password: '',
        email: ''
      }
    },
    resetTemp1() {
      this.temp1 = {
        id: undefined,
        teacherNumber: '',
        teacherName: '',
        gender: '',
        password: '',
        email: ''
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
    handleTeacherCreate() {
      this.resetTemp1()
      this.dialogStatus1 = 'create'
      this.dialogFormVisible1 = true
      this.$nextTick(() => {
        this.$refs['dataForm1'].clearValidate()
      })
    },
    createData() {
      const _self = this
      _self.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // _self.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          _self.temp.author = 'songgaoke'
          console.log(_self.temp)
          createStudentAccount(_self.temp).then((res) => {
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
    createTeacherData() {
      const _self = this
      _self.$refs['dataForm1'].validate((valid) => {
        if (valid) {
          // _self.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          _self.temp1.author = 'songgaoke'
          console.log(_self.temp1)
          createTeacherAccount(_self.temp1).then((res) => {
            // this.list.unshift(this.temp)
            _self.getTeacherList()
            _self.dialogFormVisible1 = false
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
    handleStudentView(row) {
      console.log(row)
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'view'
      this.dialogFormVisible = true
    },
    handleTeacherView(row) {
      console.log(row)
      this.temp1 = Object.assign({}, row)
      this.dialogStatus1 = 'view'
      this.dialogFormVisible1 = true
    },
    handleStudentUpdate(row) {
      console.log(row)
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleTeacherUpdate(row) {
      this.temp1 = Object.assign({}, row) // copy obj
      this.dialogStatus1 = 'update'
      this.dialogFormVisible1 = true
      this.$nextTick(() => {
        this.$refs['dataForm1'].clearValidate()
      })
    },
    // 学生信息 - 编辑
    updateData() {
      const _self = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          console.log(tempData)
          updateStudentAccount(tempData).then((res) => {
            console.log(res)
            // this.list = res.data.items
            _self.getList()
            // const index = this.list.findIndex(v => v.id === this.temp.id)
            // this.list.splice(index, 1, this.temp)
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
    updateTeacherData() {
      const _self = this
      this.$refs['dataForm1'].validate((valid) => {
        if (valid) {
          const temp1Data = Object.assign({}, this.temp1)
          console.log(temp1Data)
          updateTeacherAccount(temp1Data).then((res) => {
            console.log(res)
            // this.list = res.data.items
            _self.getTeacherList()
            // const index = this.list.findIndex(v => v.id === this.temp.id)
            // this.list.splice(index, 1, this.temp)
            this.dialogFormVisible1 = false
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
    // 学生信息 - 删除
    handleStudentDelete(row, index) {
      var _self = this
      _self.$confirm('请确认是否删除当前记录?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton'
      }).then(() => {
        const deleteData = Object.assign({}, row)

        deleteStudentAccount(deleteData).then((res) => {
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

      // this.list.splice(index, 1)
    },
    handleTeacherDelete(row, index) {
      var _self = this
      _self.$confirm('请确认是否删除当前记录?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton'
      }).then(() => {
        const deleteData = Object.assign({}, row)

        deleteTeacherAccount(deleteData).then((res) => {
          console.log(res)
          _self.getTeacherList()
          _self.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
        })
      })

      // this.list.splice(index, 1)
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
      const sort = this.teacherListQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    handleClick(tab, event) {
      console.log(tab, event)
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
.student-dialog, .teacher-dialog {
  .el-form-item {
      margin-bottom: 22px;
  }
}
</style>
