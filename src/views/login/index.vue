<template>
  <el-row class="login-container" type="flex" justify="center" align="middle">
    <!-- 左侧图片部分 -->
    <el-col :span="12" :xs="24" :sm="24" :md="12" class="login-image">
      <img src="@/assets/common/work.png" alt="登录图片" class="image" />
    </el-col>

    <!-- 右侧登录表单部分 -->
    <el-col :span="8" :xs="24" :sm="24" :md="8" class="login-form-container">
      <el-card class="login-card">
        <h2 class="form-title">登录</h2>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="手机号" prefix-icon="el-icon-phone"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="密码" prefix-icon="el-icon-lock"
              @keyup.enter.native="onSubmit"></el-input>
          </el-form-item>

          <!-- 使用协议复选框 -->
          <el-form-item prop="agreement">
            <el-checkbox v-model="loginForm.agreement">
              我已阅读并同意<a href="/user-agreement" target="_blank">《用户平台使用协议》</a>
            </el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="login-button" @click="onSubmit" :loading="loading"
              :disabled="!isFormValid">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        mobile: '',
        password: '',
        agreement: false // 协议字段
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度必须在 6 到 16 位之间', trigger: 'blur' }
        ],
        agreement: [ // 协议验证规则
          { type: 'boolean', required: true, message: '请同意用户平台使用协议', trigger: 'change' }
        ]
      },
      loading: false
    };
  },
  computed: {
    isFormValid() {
      // 检查用户名和密码是否非空，并且协议已勾选
      return (
        this.loginForm.mobile.trim() !== '' &&
        this.loginForm.password.trim() !== '' &&
        this.loginForm.password.length >= 6 &&
        this.loginForm.password.length <= 16 &&
        this.loginForm.agreement
      );
    }
  },
  methods: {
    async onSubmit() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            // 调用 Vuex 登录方法
            await this.$store.dispatch('user/login',this.loginForm);
            // 登录成功后跳转
              this.$message.success('登录成功！');
              this.$router.push({
                path: '/'
              }); 
          } catch (error) {
            // 登录失败
            console.error('登录失败:', error);
            this.$message.error('登录失败，请检查账号和密码');
          } finally {
            this.loading = false;  // 请求结束后关闭loading
          }
        } else {
          this.$message.error('请完善表单信息');
        }
      });
    }
  },
  //   testAxios() {
  //     const data = {
  //       mobile: '13800000002',
  //       password: 'hm#qd@23!'
  //     };
  //     // 使用 axios 实例发送 POST 请求
  //     service.post('/api/sys/login', data)
  //       .then(res => {
  //         console.log(res); // 请求成功，输出响应结果
  //       })
  //       .catch(error => {
  //         console.error('请求错误:', error); // 请求失败，输出错误
  //       });
  //    }
  // }

};
</script>

<style scoped>
.login-container {
  height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
}

.login-image {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.image {
  width: 100%;
  max-width: 600px;
  height: auto;
  object-fit: cover;
}

.login-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 30px 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.login-button {
  width: 100%;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .login-image,
  .login-form-container {
    padding: 10px;
  }

  .image {
    max-width: 100%;
    height: 200px;
  }

  .login-card {
    padding: 20px 10px;
  }

  .form-title {
    font-size: 20px;
  }
}
</style>