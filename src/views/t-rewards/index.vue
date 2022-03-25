<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form v-if="activeName === 'award'" ref="form" :model="listQuery" label-width="90px">
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
      <el-form v-else ref="form1" :model="listQuery1" label-width="90px">
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="学生学号">
              <el-input v-model="listQuery1.studentNumber" placeholder="请输入学生学号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter1" />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="学生姓名">
              <el-input v-model="listQuery1.studentName" placeholder="请输入学生姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter1" />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item style="text-align: right;">
              <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter1">
                查询
              </el-button>
              <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate1">
                新增
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 奖励信息 -->
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
              <span>{{ row.gender | typeFilter }}</span>
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
              <el-button type="primary" size="mini" @click="handleView1(row)">
                查看
              </el-button>
              <el-button type="primary" size="mini" @click="handleUpdate1(row)">
                编辑
              </el-button>
              <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete1(row,$index)">
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
              <span>{{ row.gender | typeFilter }}</span>
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
        <el-form-item label="奖励编号">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.awardNumber" />
          <span v-else>{{ temp.awardNumber }}</span>
        </el-form-item>
        <el-form-item label="奖励项目">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.awardProject" />
          <span v-else>{{ temp.awardProject }}</span>
        </el-form-item>
        <el-form-item label="奖励级别">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.awardLevel" />
          <span v-else>{{ temp.awardLevel }}</span>
        </el-form-item>
        <el-form-item label="奖励方式">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.awardWay" />
          <span v-else>{{ temp.awardWay }}</span>
        </el-form-item>
        <el-form-item label="奖励类别">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.awardCategory" />
          <span v-else>{{ temp.awardCategory }}</span>
        </el-form-item>
        <el-form-item label="奖励金额">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.awardBonus" />
          <span v-else>{{ temp.awardBonus }}</span>
        </el-form-item>
        <el-form-item label="获奖时间">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.awardTime" />
          <span v-else>{{ temp.awardTime }}</span>
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
    <el-dialog v-if="dialogFormVisible1" class="student-dialog" :title="textMap1[dialogStatus1]" :visible.sync="dialogFormVisible1">
      <el-form
        ref="dataForm1"
        :rules="rules1"
        :model="temp1"
        label-position="left"
        label-width="110px"
        class="student-form scrollbar-sty"
      >

        <el-form-item v-if="dialogStatus1 !== 'view'" label="学号" prop="studentNumber">
          <el-input v-model="temp1.studentNumber" />
        </el-form-item>
        <el-form-item v-else label="学号">
          <span>{{ temp1.studentNumber }}</span>
        </el-form-item>

        <el-form-item v-if="dialogStatus1 !== 'view'" label="姓名" prop="studentName">
          <el-input v-model="temp1.studentName" />
        </el-form-item>
        <el-form-item v-else label="姓名">
          <span>{{ temp1.studentName }}</span>
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
        <el-form-item label="处分编号">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.punishNumber" />
          <span v-else>{{ temp1.punishNumber }}</span>
        </el-form-item>
        <el-form-item label="处分名称">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.punishName" />
          <span v-else>{{ temp1.punishName }}</span>
        </el-form-item>
        <el-form-item label="处分日期">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.punishDate" />
          <span v-else>{{ temp1.punishDate }}</span>
        </el-form-item>
        <el-form-item label="违纪类别">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.disciplineCategory" />
          <span v-else>{{ temp1.disciplineCategory }}</span>
        </el-form-item>
        <el-form-item label="违纪日期">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.disciplineDate" />
          <span v-else>{{ temp1.disciplineDate }}</span>
        </el-form-item>
        <el-form-item label="处分解除原因">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.disciplineReason" />
          <span v-else>{{ temp1.disciplineReason }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">
          取消
        </el-button>
        <el-button v-if="dialogStatus1 !== 'view'" type="primary" @click="dialogStatus1==='create'?createData1():updateData1()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchTAwardList, fetchTPunishList,
  createTAward,
  updateTAward,
  deleteTAward,
  createTPunish,
  updateTPunish,
  deleteTPunish
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
        studentNumber: undefined,
        studentName: undefined,
        sort: '+id'
      },
      listQuery1: {
        page: 1,
        limit: 10,
        studentNumber: undefined,
        studentName: undefined,
        sort: '+id'
      },
      genderOptions,
      temp: {
        id: undefined,
        studentNumber: '',
        studentName: '',
        gender: '',
        awardNumber: '',
        awardProject: '',
        awardLevel: '',
        awardWay: '',
        awardCategory: '',
        awardBonus: '',
        awardTime: ''
      },
      temp1: {
        id: undefined,
        studentNumber: '',
        studentName: '',
        gender: '',
        punishNumber: '',
        punishName: '',
        punishDate: '',
        disciplineCategory: '',
        disciplineDate: '',
        disciplineReason: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增',
        view: '查看奖励信息'
      },
      rules: {
        studentNumber: [{ required: true, message: '学号是必填项', trigger: 'blur' }],
        studentName: [{ required: true, message: '姓名是必填项', trigger: 'blur' }]
      },
      dialogFormVisible1: false,
      dialogStatus1: '',
      textMap1: {
        update: '编辑',
        create: '新增',
        view: '查看奖励信息'
      },
      rules1: {
        studentNumber: [{ required: true, message: '学号是必填项', trigger: 'blur' }],
        studentName: [{ required: true, message: '姓名是必填项', trigger: 'blur' }]
      },
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
      this.listQuery1.page = 1
      this.getList1()
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
        this.listQuery1.sort = '+id'
      } else {
        this.listQuery1.sort = '-id'
      }
      this.handleFilter1()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        studentNumber: '',
        studentName: '',
        gender: '',
        awardNumber: '',
        awardProject: '',
        awardLevel: '',
        awardWay: '',
        awardCategory: '',
        awardBonus: '',
        awardTime: ''
      }
    },
    resetTemp1() {
      this.temp1 = {
        id: undefined,
        studentNumber: '',
        studentName: '',
        gender: '',
        punishNumber: '',
        punishName: '',
        punishDate: '',
        disciplineCategory: '',
        disciplineDate: '',
        disciplineReason: ''
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
    handleCreate1() {
      this.resetTemp1()
      this.dialogStatus1 = 'create'
      this.dialogFormVisible1 = true
      this.$nextTick(() => {
        this.$refs['dataForm1'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'songgaoke'
          createTAward(this.temp).then(() => {
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
    createData1() {
      this.$refs['dataForm1'].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'songgaoke'
          createTPunish(this.temp1).then(() => {
            // this.list.unshift(this.temp)
            this.getList1()
            this.dialogFormVisible1 = false
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
    handleUpdate1(row) {
      this.temp1 = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus1 = 'update'
      this.dialogFormVisible1 = true
      this.$nextTick(() => {
        this.$refs['dataForm1'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateTAward(tempData).then(() => {
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
    updateData1() {
      this.$refs['dataForm1'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp1)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateTPunish(tempData).then(() => {
            // const index = this.list.findIndex(v => v.id === this.temp.id)
            // this.list.splice(index, 1, this.temp)
            this.getList1()
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
    handleDelete(row, index) {
      var _self = this
      _self.$confirm('请确认是否删除当前记录?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton'
      }).then(() => {
        const deleteData = Object.assign({}, row)

        deleteTAward(deleteData).then((res) => {
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
    handleDelete1(row, index) {
      var _self = this
      _self.$confirm('请确认是否删除当前记录?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton'
      }).then(() => {
        const deleteData = Object.assign({}, row)

        deleteTPunish(deleteData).then((res) => {
          console.log(res)
          _self.getList1()
          _self.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
        })
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
      const sort = this.listQuery1.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleView(row) {
      // console.log(row)
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'view'
      this.dialogFormVisible = true
    },
    handleView1(row) {
      // console.log(row)
      this.temp1 = Object.assign({}, row)
      this.dialogStatus1 = 'view'
      this.dialogFormVisible1 = true
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
