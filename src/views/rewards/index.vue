<template>
  <div class="app-container">
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
          <el-table-column label="序号" prop="id" sortable="custom" fixed align="center" width="80" :class-name="getSortClass('id')">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="140" fixed class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="handleReward(row)">
                查看
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="奖励编号" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.awardNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖励项目" min-width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.awardProject }}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖励级别" min-width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.awardLevel }}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖励方式" width="110px">
            <template slot-scope="{row}">
              <span>{{ row.awardWay }}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖励类别" align="center" width="120">
            <template slot-scope="{row}">
              <span>{{ row.awardCategory }}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖励金额" width="120">
            <template slot-scope="{row}">
              <span>{{ row.awardBonus }}&nbsp;元</span>
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
          <el-table-column label="序号" prop="id" sortable="custom" fixed align="center" width="80" :class-name="getSortClass1('id')">
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="140" fixed class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="handlePunish(row)">
                查看
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="处分编号" min-width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.punishNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="处分名称" min-width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.punishName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="处分日期" width="130px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.punishDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="违纪类别" width="130px">
            <template slot-scope="{row}">
              <span>{{ row.disciplineCategory }}</span>
            </template>
          </el-table-column>
          <el-table-column label="违纪日期" align="center" width="130">
            <template slot-scope="{row}">
              <span>{{ row.disciplineDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="处分解除原因" width="180">
            <template slot-scope="{row}">
              <span>{{ row.disciplineReason }}</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total1>0" :total="total1" :page.sync="listQuery1.page" :limit.sync="listQuery1.limit" @pagination="getList1" />

      </el-tab-pane>
    </el-tabs>

    <!-- 处分信息弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="600px">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="110px" style="margin-left:50px;">
        <el-form-item label="处分编号">
          <span>{{ temp.punishNumber }}</span>
        </el-form-item>
        <el-form-item label="处分名称">
          <span>{{ temp.punishName }}</span>
        </el-form-item>
        <el-form-item label="处分日期">
          <span>{{ temp.punishDate }}</span>
        </el-form-item>
        <el-form-item label="违纪类别">
          <span>{{ temp.disciplineCategory }}</span>
        </el-form-item>
        <el-form-item label="违纪日期">
          <span>{{ temp.disciplineDate }}</span>
        </el-form-item>
        <el-form-item label="处分解除原因">
          <span>{{ temp.disciplineReason }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>

    <!-- 奖励信息弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible1" width="600px">
      <el-form ref="dataForm" :model="temp1" label-position="left" label-width="110px" style="margin-left:50px;">
        <el-form-item label="奖励编号">
          <span>{{ temp1.awardNumber }}</span>
        </el-form-item>
        <el-form-item label="奖励项目">
          <span>{{ temp1.awardProject }}</span>
        </el-form-item>
        <el-form-item label="奖励级别">
          <span>{{ temp1.awardLevel }}</span>
        </el-form-item>
        <el-form-item label="奖励方式">
          <span>{{ temp1.awardWay }}</span>
        </el-form-item>
        <el-form-item label="奖励类别">
          <span>{{ temp1.awardCategory }}</span>
        </el-form-item>
        <el-form-item label="奖励金额">
          <span>{{ temp1.awardBonus }}&nbsp;元</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchAwardList, fetchPunishList } from '@/api/student'
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
      temp: {
        id: undefined,
        punishNumber: '',
        punishName: '',
        punishDate: '',
        disciplineCategory: '',
        disciplineDate: '',
        disciplineReason: ''
      },
      temp1: {
        id: undefined,
        awardNumber: '',
        awardProject: '',
        awardLevel: '',
        awardWay: '',
        awardCategory: '',
        awardBonus: ''
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogStatus: '',
      textMap: {
        PunishView: '查看处分信息',
        RewardView: '查看奖励信息'
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
      fetchAwardList(this.listQuery).then(response => {
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
      fetchPunishList(this.listQuery1).then(response => {
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
    handleReward(row) {
      this.temp1 = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'RewardView'
      this.dialogFormVisible1 = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    handlePunish(row) {
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'PunishView'
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
    },
    getSortClass1: function(key) {
      const sort = this.listQuery1.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    handleClick() {
      console.log('切换Tab')
    }
  }
}
</script>
