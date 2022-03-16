<template>
  <div class="app-container">
    <div class="p-wrapper">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="ruleForm">
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="学号" prop="number">
                <!-- <el-input v-model="ruleForm.number" /> -->
                <span>{{ ruleForm.number }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="姓名" prop="name">
                <!-- <el-input v-model="ruleForm.name" /> -->
                <span>{{ ruleForm.name }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="性别" prop="gender">
                <!-- <el-input v-model="ruleForm.gender" /> -->
                <span>{{ ruleForm.gender }}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="证件类型" prop="cType">
                <!-- <el-input v-model="ruleForm.number" /> -->
                <span>{{ ruleForm.cType }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="证件号码" prop="cNumber">
                <!-- <el-input v-model="ruleForm.name" /> -->
                <span>{{ ruleForm.cNumber }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="出生日期" prop="birthDate">
                <!-- <el-input v-model="ruleForm.gender" /> -->
                <span>{{ ruleForm.birthDate }}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="民族" prop="nation">
                <!-- <el-input v-model="ruleForm.number" /> -->
                <span>{{ ruleForm.nation }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="政治面貌" prop="politicsStatus">
                <!-- <el-input v-model="ruleForm.name" /> -->
                <span>{{ ruleForm.politicsStatus }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="家庭地址" prop="address">
                <!-- <el-input v-model="ruleForm.name" /> -->
                <span>{{ ruleForm.address }}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="联系方式" prop="contact">
                <!-- <el-input v-model="ruleForm.number" /> -->
                <span>{{ ruleForm.contact }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="是否住校" prop="isCampus">
                <!-- <el-input v-model="ruleForm.name" /> -->
                <span>{{ ruleForm.isCampus }}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <el-form-item label="年级" prop="grade">
                <!-- <el-input v-model="ruleForm.name" /> -->
                <span>{{ ruleForm.grade }}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        number: '2018051613004',
        name: '李筛筛',
        gender: '女',
        cType: '居民身份证',
        cNumber: '500230199902122333',
        birthDate: '1999-02-12',
        nation: '汉族',
        politicsStatus: '中共党员',
        address: '重庆市沙坪坝区',
        contact: '1234567890',
        isCampus: '是',
        grade: '初二'
      },
      rules: {
        number: [
          { required: false, message: '请输入学号', trigger: 'blur' }
        ],
        name: [
          { required: false, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        gender: [
          { required: false, message: '请输入性别', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

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
    background: #fff;
    padding: 20px 10px 0 10px;
    box-shadow: 0 0 3px rgb(0 0 0 / 20%);
  }
</style>
