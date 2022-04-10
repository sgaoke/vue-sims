<template>
  <div class="app-container">
    <div class="p-wrapper">
      <div class="edit">
        <el-button v-if="isEdit" class="e-btn" type="text" @click="onSave">
          <i class="el-icon-s-management" />
          保存
        </el-button>
        <el-button v-else class="e-btn" type="text" @click="onEdit">
          <i class="el-icon-edit-outline" />
          编辑
        </el-button>
      </div>
      <div class="avatar">
        <img src="@/assets/img/avatar.jpg" alt="avatar" width="150" height="150">
      </div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="学号" prop="snumber">
                <el-input v-if="isEdit" v-model="ruleForm.snumber" />
                <span v-else>{{ ruleForm.snumber }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="姓名" prop="name">
                <el-input v-if="isEdit" v-model="ruleForm.name" />
                <span v-else>{{ ruleForm.name }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">&nbsp;</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="性别" prop="gender">
                <el-input v-if="isEdit" v-model="ruleForm.gender" />
                <span v-else>{{ ruleForm.gender }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="证件类型" prop="cType">
                <el-input v-if="isEdit" v-model="ruleForm.cType" />
                <span v-else>{{ ruleForm.cType }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">&nbsp;</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="证件号码" prop="cNumber">
                <el-input v-if="isEdit" v-model="ruleForm.cNumber" />
                <span v-else>{{ ruleForm.cNumber }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="出生日期" prop="birthDate">
                <el-input v-if="isEdit" v-model="ruleForm.birthDate" />
                <span v-else>{{ ruleForm.birthDate }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">&nbsp;</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="民族" prop="nation">
                <el-input v-if="isEdit" v-model="ruleForm.nation" />
                <span v-else>{{ ruleForm.nation }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="政治面貌" prop="politicsStatus">
                <el-input v-if="isEdit" v-model="ruleForm.politicsStatus" />
                <span v-else>{{ ruleForm.politicsStatus }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="家庭地址" prop="address">
                <el-input v-if="isEdit" v-model="ruleForm.address" />
                <span v-else>{{ ruleForm.address }}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="联系方式" prop="contact">
                <el-input v-if="isEdit" v-model="ruleForm.contact" />
                <span v-else>{{ ruleForm.contact }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="是否住校" prop="isCampus">
                <el-input v-if="isEdit" v-model="ruleForm.isCampus" />
                <span v-else>{{ ruleForm.isCampus }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="年级" prop="grade">
                <el-input v-if="isEdit" v-model="ruleForm.grade" />
                <span v-else>{{ ruleForm.grade }}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { fetchPersonInfo, savePersonInfo } from '@/api/student'
export default {
  data() {
    return {
      isEdit: false,
      ruleForm: {
        snumber: '',
        name: '',
        gender: '',
        cType: '',
        cNumber: '',
        birthDate: '',
        nation: '',
        politicsStatus: '',
        address: '',
        contact: '',
        isCampus: '',
        grade: ''
      },
      rules: {
        snumber: [
          { required: false, message: '请输入学号', trigger: 'blur' }
        ],
        name: [
          { required: false, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        gender: [
          { required: false, message: '请输入性别', trigger: 'blur' }
        ]
      },
      query: {
        page: 1,
        limit: 10,
        snumber: '2018051613005'
      }
    }
  },
  created() {
    this.getPersonInfo()
  },
  methods: {
    getPersonInfo() {
      // console.log(this.listQuery)
      // this.listLoading = true
      console.log('-------------------->query', this.query)
      fetchPersonInfo(this.query).then(response => {
        console.log('------------------->response', response.data.items[0])
        this.ruleForm = response.data.items[0]

        // Just to simulate the time of the request
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1.5 * 1000)
      })
    },
    onEdit() {
      this.isEdit = !this.isEdit
    },
    onSave() {
      const _self = this
      const ruleFormData = Object.assign({}, this.ruleForm)
      _self.isEdit = !_self.isEdit
      // console.log(ruleFormData)
      savePersonInfo(ruleFormData).then((res) => {
        // console.log(res)
        this.ruleForm = res.data
        _self.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .p-wrapper {
    position: relative;
    background: #fff;
    padding: 20px 10px 0 10px;
    box-shadow: 0 0 3px rgb(0 0 0 / 20%);
    .edit {
      position: absolute;
      right: 20px;
      top: 0;
      z-index: 100;
    }
    .avatar{
      position: absolute;
      right: 120px;
      top: 40px;
    }
  }
</style>
