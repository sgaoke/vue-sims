<template>
  <div class="login-container">
    <svg class="bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#0099ff"
        fill-opacity="1"
        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
    <div class="user">
      <i class="fa fa-user" />
      <div class="head">account login</div>
    </div>
    <div class="content">
      <div class="box login">
        <div class="form-content">
          <div class="avtar">
            <div class="pic"><img src="@/assets/img/1.jpg" alt=""></div>
          </div>
          <div class="title-container">
            <h3 class="title">学生信息管理系统</h3>
          </div>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="Username"
                name="username"
                type="text"
                tabindex="1"
                width="200"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="Password"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">登录</el-button>
          </el-form>
          <p class="btn-something">
            Already have an account ? <span class="loginbtn">login</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#000;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      // background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 15px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      // caret-color: $cursor;

      /* &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      } */
    }
  }

  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    border: 0 none;
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    color: #454545;
    box-shadow: 0 0 3px rgb(0 0 0 / 20%);
  }
}
</style>

<style lang="scss" scoped>
$bg:#f0f5f5;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  position: relative;
  &:before{
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #3399ff;
    clip-path: circle(20% at 100% 0);
  }
  svg.bg {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .user {
    position: absolute;
    top: 16rem;
    left: 5rem;
  }

  .user .fa-user {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5rem;
    color: #0066ff;
  }

  .user .head {
    font-size: 1.6rem;
    text-transform: uppercase;
    user-select: none;
    text-shadow: 1px 1px 1px rgba(16, 16, 16, 0.1), 1px 2px 1px rgba(16, 16, 16, 0.1), 1px 3px 1px rgba(16, 16, 16, 0.1), 1px 4px 1px rgba(16, 16, 16, 0.1), 1px 5px 1px rgba(16, 16, 16, 0.1), 1px 6px 1px rgba(16, 16, 16, 0.1), 1px 7px 1px rgba(16, 16, 16, 0.1), 1px 8px 1px rgba(16, 16, 16, 0.1);
  }

  .content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20rem;
    height: 28rem;
    perspective: 1500px;
    -webkit-perspective: 1500px;
    -moz-perspective: 1500px;
    .box {
      position: absolute;
      top: 0;
      left: 0;
      width: 20rem;
      height: 28rem;
      border-radius: 10px;
      cursor: pointer;
      backface-visibility: hidden;
      transition: all 0.5s;
      user-select: none;
      .form-content {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        box-shadow: 0 0 1px #3399ff;
        border-radius: 30px;
        background-color: #fff;
        .avtar {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .avtar .pic {
          position: relative;
          width: 80px;
          height: 80px;
          overflow: hidden;
          border-radius: 50%;
          border: 1px solid #3399ff;
        }

        .avtar .pic img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .title-container h3.title{
          font-size: 1.6rem;
        }
        .btn-something {
          color: #888;
          font-size: 14px;
        }

        .btn-something span {
          color: #0066ff;
          cursor: pointer;
          font-weight: 500;
        }
      }
    }
  }
  .login-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  /* .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  } */

  .svg-container {
    // padding: 6px 5px 6px 15px;
    padding-left: 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    height: 45px;
  }

  /* .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  } */

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
