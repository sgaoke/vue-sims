<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form" :model="listQuery" label-width="80px">
        <el-row :gutter="10">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="学生学号">
              <el-input v-model="listQuery.studentNumber" placeholder="请输入学生学号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="学生姓名">
              <el-input v-model="listQuery.studentName" placeholder="请输入学生姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item style="text-align: right;">
              <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
                查询
              </el-button>
              <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
                新增
              </el-button>
              <el-button v-waves disabled :loading="uploadLoading" class="filter-item" type="primary" icon="el-icon-upload" @click="handleUpload">
                上传
              </el-button>
              <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
                下载
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
      <el-table-column label="学号" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.studentNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.studentName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.gender | typeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column label="证件类型" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.idType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证件号码" width="180px">
        <template slot-scope="{row}">
          <span>{{ row.idNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出生日期" align="center" width="140">
        <template slot-scope="{row}">
          <span>{{ row.birthDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="民族" width="140">
        <template slot-scope="{row}">
          <span>{{ row.nation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="政治面貌" align="center" width="140">
        <template slot-scope="{row}">
          <span>{{ row.politicsStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="家庭地址" min-width="260">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center" width="160">
        <template slot-scope="{row}">
          <span>{{ row.contact }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否住校" width="100">
        <template slot-scope="{row}">
          <span>{{ row.isResidence }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年级" width="120">
        <template slot-scope="{row}">
          <span>{{ row.class }}</span>
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
        <el-form-item label="证件类型">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.idType" />
          <span v-else>{{ temp.idType }}</span>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.idNumber" />
          <span v-else>{{ temp.idNumber }}</span>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.birthDate" />
          <span v-else>{{ temp.birthDate }}</span>
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.nation" />
          <span v-else>{{ temp.nation }}</span>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.politicsStatus" />
          <span v-else>{{ temp.politicsStatus }}</span>
        </el-form-item>
        <el-form-item label="家庭地址">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.address" />
          <span v-else>{{ temp.address }}</span>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.contact" />
          <span v-else>{{ temp.contact }}</span>
        </el-form-item>
        <el-form-item label="是否住校">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.isResidence" />
          <span v-else>{{ temp.isResidence }}</span>
        </el-form-item>
        <el-form-item label="年级">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.class" />
          <span v-else>{{ temp.class }}</span>
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
  fetchStudentList,
  createStudentAccount,
  updateStudentAccount,
  deleteStudentAccount
} from '@/api/teacher'
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
      list: null,
      allList: null,
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
        studentNumber: '',
        studentName: '',
        gender: '',
        idType: '',
        idNumber: '',
        birthDate: '',
        nation: '',
        politicsStatus: '',
        address: '',
        contact: '',
        isResidence: '',
        class: ''
      },
      genderOptions,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增',
        view: '查看学生信息'
      },
      rules: {
        studentNumber: [{ required: true, message: '学号是必填项', trigger: 'blur' }],
        studentName: [{ required: true, message: '姓名是必填项', trigger: 'blur' }]
      },
      downloadLoading: false,
      uploadLoading: false
    }
  },
  created() {
    this.getList()
    this.getAllList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchStudentList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getAllList() {
      fetchStudentList({
        page: 1,
        limit: 10000
      }).then(response => {
        console.log(response)
        this.allList = response.data.items
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
        studentNumber: '',
        studentName: '',
        gender: '',
        idType: '',
        idNumber: '',
        birthDate: '',
        nation: '',
        politicsStatus: '',
        address: '',
        contact: '',
        isResidence: '',
        class: ''
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
          createStudentAccount(_self.temp).then(() => {
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
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      const _self = this
      _self.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, _self.temp)
          updateStudentAccount(tempData).then(() => {
            // const index = this.list.findIndex(v => v.id === this.temp.id)
            // this.list.splice(index, 1, this.temp)
            _self.getList()
            _self.dialogFormVisible = false
            _self.$notify({
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
      // this.$notify({
      //   title: 'Success',
      //   message: 'Delete Successfully',
      //   type: 'success',
      //   duration: 2000
      // })
      // this.list.splice(index, 1)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['学号', '姓名', '性别', '证件类型', '证件号码', '出生日期', '民族', '政治面貌', '家庭地址', '联系方式', '是否住校', '年级']
        const filterVal = [
          'studentNumber',
          'studentName',
          'gender',
          'idType',
          'idNumber',
          'birthDate',
          'nation',
          'politicsStatus',
          'address',
          'contact',
          'isResidence',
          'class'
        ]
        const data = this.formatJson(filterVal)
        console.log(data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '学生信息表'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.allList.map(v => filterVal.map(j => {
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
    handleUpload() {
      console.log('Upload')
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
