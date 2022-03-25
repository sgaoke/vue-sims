<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form" :model="listQuery" label-width="80px">
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="课程名称">
              <el-input v-model="listQuery.course" placeholder="请输入课程名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="考试时间">
              <!-- <el-date-picker
                v-model="listQuery.examTime"
                class="filter-item"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              /> -->
              <el-date-picker
                v-model="listQuery.examTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择考试时间"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item style="text-align: right;">
              <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="g-content">
      <!-- table -->
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
        <el-table-column label="操作" align="center" width="140" fixed class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleView(row)">
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="课程名称" min-width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.course }}</span>
          </template>
        </el-table-column>
        <el-table-column label="授课教师" min-width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.teacher }}</span>
          </template>
        </el-table-column>
        <el-table-column label="考试时间" min-width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.examTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="考试成绩" width="120px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.examScore }}</span>
          </template>
        </el-table-column>
        <el-table-column label="成绩排名" width="120px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.scoreRank }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" width="160px">
          <template slot-scope="{row}">
            <span>{{ row.remark }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- pagination -->
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
    <!-- View Dialog -->
    <el-dialog v-if="dialogFormVisible" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="600px">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="90px" style="margin-left:50px;">
        <el-form-item label="课程名称">
          <span>{{ temp.course }}</span>
        </el-form-item>
        <el-form-item label="授课教师">
          <span>{{ temp.teacher }}</span>
        </el-form-item>
        <el-form-item label="考试时间">
          <span>{{ temp.examTime }}</span>
        </el-form-item>
        <el-form-item label="考试成绩">
          <span>{{ temp.examScore }}</span>
        </el-form-item>
        <el-form-item label="成绩排名">
          <span>{{ temp.scoreRank }}</span>
        </el-form-item>
        <el-form-item label="备注">
          <span>{{ temp.remark }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchGradeList } from '@/api/student'
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
        course: undefined,
        examTime: undefined,
        sort: '+id'
      },
      temp: {
        id: undefined,
        course: '',
        teacher: '',
        examTime: '',
        examScore: '',
        scoreRank: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        view: '查看成绩信息'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // console.log(this.listQuery)
      this.listLoading = true
      fetchGradeList(this.listQuery).then(response => {
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
      console.log(data)
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
    handleView(row) {
      this.temp = Object.assign({}, row) // copy obj
      // console.log(this.temp)
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'view'
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
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
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
