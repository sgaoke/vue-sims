<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form v-if="activeName === 'subjectScore'" ref="form" :model="listQuery" label-width="80px">
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
              <el-button v-waves disabled :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
                下载
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-form v-else ref="form1" :model="listQuery1" label-width="80px">
        <el-row :gutter="10">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="学生学号">
              <el-input v-model="listQuery1.studentNumber" placeholder="请输入学生学号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter1" />
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="学生姓名">
              <el-input v-model="listQuery1.studentName" placeholder="请输入学生姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter1" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item style="text-align: right;">
              <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter1">
                查询
              </el-button>
              <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate1">
                新增
              </el-button>
              <el-button v-waves disabled :loading="uploadLoading1" class="filter-item" type="primary" icon="el-icon-upload" @click="handleUpload1">
                上传
              </el-button>
              <el-button v-waves disabled :loading="downloadLoading1" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload1">
                下载
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="单科成绩信息" name="subjectScore">
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
          <el-table-column label="班级名称" min-width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.className }}</span>
            </template>
          </el-table-column>
          <el-table-column label="学生学号" min-width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.studentNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="学生姓名" min-width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.studentName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="课程名称" min-width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="课程分数" min-width="120px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseScore }}</span>
            </template>
          </el-table-column>
          <el-table-column label="授课教师" width="140">
            <template slot-scope="{row}">
              <span>{{ row.teacher }}</span>
            </template>
          </el-table-column>
          <el-table-column label="考试时间" width="150px">
            <template slot-scope="{row}">
              <span>{{ row.examTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="考试成绩" width="120px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.examScore }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单科成绩排名" width="120px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.scoreRank }}</span>
            </template>
          </el-table-column>
          <el-table-column label="成绩修改原因" width="160px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.scoreReason }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center" width="160px">
            <template slot-scope="{row}">
              <span>{{ row.remark }}</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

      </el-tab-pane>
      <!-- 总成绩信息 -->
      <el-tab-pane label="总成绩信息" name="totalScore">
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
          <el-table-column label="班级名称" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.className }}</span>
            </template>
          </el-table-column>
          <el-table-column label="学生学号" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.studentNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column label="学生姓名" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.studentName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="语文" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseYW }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数学" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseSX }}</span>
            </template>
          </el-table-column>
          <el-table-column label="英语" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseYY }}</span>
            </template>
          </el-table-column>
          <el-table-column label="政治" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseZZ }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生物（操作）" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseSWCZ }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生物" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseSW }}</span>
            </template>
          </el-table-column>
          <el-table-column label="物理（操作）" align="center" width="150px">
            <template slot-scope="{row}">
              <span>{{ row.courseWLCZ }}</span>
            </template>
          </el-table-column>
          <el-table-column label="物理" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseWL }}</span>
            </template>
          </el-table-column>
          <el-table-column label="化学（操作）" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseHXCZ }}</span>
            </template>
          </el-table-column>
          <el-table-column label="化学" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseHX }}</span>
            </template>
          </el-table-column>
          <el-table-column label="地理" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseDL }}</span>
            </template>
          </el-table-column>
          <el-table-column label="地理（户外考察）" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseDLHWKC }}</span>
            </template>
          </el-table-column>
          <el-table-column label="体育" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseTY }}</span>
            </template>
          </el-table-column>
          <el-table-column label="微机实验课" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseWJSYK }}</span>
            </template>
          </el-table-column>
          <el-table-column label="微机" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseWJ }}</span>
            </template>
          </el-table-column>
          <el-table-column label="音乐" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseYYUE }}</span>
            </template>
          </el-table-column>
          <el-table-column label="美术" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.courseMS }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总成绩" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.totalScore }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总成绩排名" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.totalScoreRank }}</span>
            </template>
          </el-table-column>
          <el-table-column label="成绩修改原因" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.scoreReason }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.remark }}</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total1>0" :total="total1" :page.sync="listQuery1.page" :limit.sync="listQuery1.limit" @pagination="getList1" />

      </el-tab-pane>
    </el-tabs>

    <el-dialog class="student-dialog" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="110px"
        class="student-form scrollbar-sty"
      >
        <el-form-item v-if="dialogStatus !== 'view'" label="班级名称" prop="className">
          <el-input v-model="temp.className" />
        </el-form-item>
        <el-form-item v-else label="班级名称">
          <span>{{ temp.studentNumber }}</span>
        </el-form-item>

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

        <el-form-item v-if="dialogStatus !== 'view'" label="课程名称" prop="courseName">
          <el-input v-model="temp.courseName" />
        </el-form-item>
        <el-form-item v-else label="课程名称">
          <span>{{ temp.courseName }}</span>
        </el-form-item>

        <!-- <el-form-item label="课程名称">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.courseName" />
          <span v-else>{{ temp.courseName }}</span>
        </el-form-item> -->
        <el-form-item label="课程分数">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.courseScore" />
          <span v-else>{{ temp.courseScore }}</span>
        </el-form-item>
        <el-form-item label="授课教师">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.teacher" />
          <span v-else>{{ temp.teacher }}</span>
        </el-form-item>
        <el-form-item label="考试时间">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.examTime" />
          <span v-else>{{ temp.examTime }}</span>
        </el-form-item>
        <el-form-item label="考试成绩">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.examScore" />
          <span v-else>{{ temp.examScore }}</span>
        </el-form-item>
        <el-form-item label="单科成绩排名">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.scoreRank" />
          <span v-else>{{ temp.scoreRank }}</span>
        </el-form-item>
        <el-form-item label="成绩修改原因">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.scoreReason" />
          <span v-else>{{ temp.scoreReason }}</span>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-if="dialogStatus !== 'view'" v-model="temp.remark" />
          <span v-else>{{ temp.remark }}</span>
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

    <el-dialog class="total-dialog" :title="textMap1[dialogStatus1]" :visible.sync="dialogFormVisible1">
      <el-form
        ref="dataForm1"
        :rules="rules1"
        :model="temp1"
        label-position="left"
        label-width="110px"
        class="student-form scrollbar-sty"
      >
        <el-form-item v-if="dialogStatus1 !== 'view'" label="班级名称" prop="className">
          <el-input v-model="temp1.className" />
        </el-form-item>
        <el-form-item v-else label="班级名称">
          <span>{{ temp1.studentNumber }}</span>
        </el-form-item>

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

        <el-form-item label="语文">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseYW" />
          <span v-else>{{ temp1.courseYW }}</span>
        </el-form-item>
        <el-form-item label="数学">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseSX" />
          <span v-else>{{ temp1.courseSX }}</span>
        </el-form-item>
        <el-form-item label="英语">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseYY" />
          <span v-else>{{ temp1.courseYY }}</span>
        </el-form-item>
        <el-form-item label="政治">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseZZ" />
          <span v-else>{{ temp1.courseZZ }}</span>
        </el-form-item>
        <el-form-item label="生物（操作）">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseSWCZ" />
          <span v-else>{{ temp1.courseSWCZ }}</span>
        </el-form-item>
        <el-form-item label="生物">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseSW" />
          <span v-else>{{ temp1.courseSW }}</span>
        </el-form-item>
        <el-form-item label="物理（操作）">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseWLCZ" />
          <span v-else>{{ temp1.courseWLCZ }}</span>
        </el-form-item>
        <el-form-item label="物理">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseWL" />
          <span v-else>{{ temp1.courseWL }}</span>
        </el-form-item>
        <el-form-item label="化学（操作）">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseHXCZ" />
          <span v-else>{{ temp1.courseHXCZ }}</span>
        </el-form-item>
        <el-form-item label="化学">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseHX" />
          <span v-else>{{ temp1.courseHX }}</span>
        </el-form-item>
        <el-form-item label="地理（户外考察）">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseDLHWKC" />
          <span v-else>{{ temp1.courseDLHWKC }}</span>
        </el-form-item>
        <el-form-item label="地理">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseDL" />
          <span v-else>{{ temp1.courseDL }}</span>
        </el-form-item>
        <el-form-item label="体育">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseTY" />
          <span v-else>{{ temp1.courseTY }}</span>
        </el-form-item>
        <el-form-item label="微机实验课">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseWJSYK" />
          <span v-else>{{ temp1.courseWJSYK }}</span>
        </el-form-item>
        <el-form-item label="微机">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseWJ" />
          <span v-else>{{ temp1.courseWJ }}</span>
        </el-form-item>
        <el-form-item label="音乐">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseYYUE" />
          <span v-else>{{ temp1.courseYYUE }}</span>
        </el-form-item>
        <el-form-item label="美术">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.courseMS" />
          <span v-else>{{ temp1.courseMS }}</span>
        </el-form-item>

        <el-form-item label="总成绩">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.totalScore" />
          <span v-else>{{ temp1.totalScore }}</span>
        </el-form-item>
        <el-form-item label="总成绩排名">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.totalScoreRank" />
          <span v-else>{{ temp1.totalScoreRank }}</span>
        </el-form-item>
        <el-form-item label="成绩修改原因">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.scoreReason" />
          <span v-else>{{ temp1.scoreReason }}</span>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-if="dialogStatus1 !== 'view'" v-model="temp1.remark" />
          <span v-else>{{ temp1.remark }}</span>
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
import { fetchTGradeList, fetchTotalGradeList,
  createTGrade,
  updateTGrade,
  deleteTGrade,
  createTotalGrade,
  updateTotalGrade,
  deleteTotalGrade
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
      activeName: 'subjectScore',
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
      tableKey1: 0,
      list1: null,
      total1: 0,
      listLoading1: true,
      listQuery1: {
        page: 1,
        limit: 10,
        studentNumber: undefined,
        studentName: undefined,
        sort: '+id'
      },
      temp: {
        id: undefined,
        className: '',
        studentNumber: '',
        studentName: '',
        courseName: '',
        courseScore: '',
        teacher: '',
        examTime: '',
        examScore: '',
        scoreRank: '',
        scoreReason: '',
        remark: ''
      },
      temp1: {
        id: undefined,
        className: '',
        studentNumber: '',
        studentName: '',
        courseYW: '',
        courseSX: '',
        courseYY: '',
        courseZZ: '',
        courseSWCZ: '',
        courseSW: '',
        courseWLCZ: '',
        courseWL: '',
        courseHXCZ: '',
        courseHX: '',
        courseDL: '',
        courseDLHWKC: '',
        courseTY: '',
        courseWJSYK: '',
        courseWJ: '',
        courseYYUE: '',
        courseMS: '',
        totalScore: '',
        totalScoreRank: '',
        scoreReason: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增',
        view: '查看成绩信息'
      },
      rules: {
        className: [{ required: true, message: '班级名称是必填项', trigger: 'blur' }],
        studentNumber: [{ required: true, message: '学号是必填项', trigger: 'blur' }],
        studentName: [{ required: true, message: '姓名是必填项', trigger: 'blur' }],
        courseName: [{ required: true, message: '课程名称是必填项', trigger: 'blur' }]
      },
      dialogFormVisible1: false,
      dialogStatus1: '',
      textMap1: {
        update: '编辑',
        create: '新增',
        view: '查看总成绩信息'
      },
      rules1: {
        className: [{ required: true, message: '班级名称是必填项', trigger: 'blur' }],
        studentNumber: [{ required: true, message: '学号是必填项', trigger: 'blur' }],
        studentName: [{ required: true, message: '姓名是必填项', trigger: 'blur' }]
      },
      downloadLoading: false,
      downloadLoading1: false
    }
  },
  created() {
    this.getList()
    this.getList1()
  },
  methods: {
    getList() {
      console.log(this.listQuery)
      this.listLoading = true
      fetchTGradeList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getList1() {
      console.log(this.listQuery1)
      this.listLoading1 = true
      fetchTotalGradeList(this.listQuery1).then(response => {
        this.list1 = response.data.items
        this.total1 = response.data.total

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
        className: '',
        studentNumber: '',
        studentName: '',
        courseName: '',
        courseScore: '',
        teacher: '',
        examTime: '',
        examScore: '',
        scoreRank: '',
        scoreReason: '',
        remark: ''
      }
    },
    resetTemp1() {
      this.temp1 = {
        id: undefined,
        className: '',
        studentNumber: '',
        studentName: '',
        courseYW: '',
        courseSX: '',
        courseYY: '',
        courseZZ: '',
        courseSWCZ: '',
        courseSW: '',
        courseWLCZ: '',
        courseWL: '',
        courseHXCZ: '',
        courseHX: '',
        courseDL: '',
        courseDLHWKC: '',
        courseTY: '',
        courseWJSYK: '',
        courseWJ: '',
        courseYYUE: '',
        courseMS: '',
        totalScore: '',
        totalScoreRank: '',
        scoreReason: '',
        remark: ''
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
          createTGrade(this.temp).then(() => {
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
          this.temp1.author = 'songgaoke'
          createTotalGrade(this.temp1).then(() => {
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
          updateTGrade(tempData).then(() => {
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
          updateTotalGrade(tempData).then(() => {
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

        deleteTGrade(deleteData).then((res) => {
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

        deleteTotalGrade(deleteData).then((res) => {
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
.student-dialog, .total-dialog{
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
