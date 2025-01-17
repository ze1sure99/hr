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
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
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
            <el-button @click="testAjax">
              测试接口
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
        username: '',
        password: '',
        agreement: false // 协议字段
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
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
        this.loginForm.username.trim() !== '' &&
        this.loginForm.password.trim() !== '' &&
        this.loginForm.password.length >= 6 &&
        this.loginForm.password.length <= 16 &&
        this.loginForm.agreement
      );
    }
  },
  methods: {
    onSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 模拟登录请求
          setTimeout(() => {
            this.loading = false;
            // 这里可以添加实际的登录逻辑，例如调用API
            this.$store.dispatch('user/login', this.loginForm)
            this.$message.success('登录成功！');
            // 跳转到主页或其他页面
            this.$router.push({ name: 'Home' });
          }, 2000);
        } else {
          this.$message.error('请完善表单信息');
          return false;
        }
      });
    },
    // testAjax() {
    //   const data = {
    //     mobile: '13800000002',
    //     password: 'hm#qd@23!'
    //   };
    //   this.$ajax.post('/api/sys/login', data).then(res => {
    //     console.log(res);
    //   }).catch(error => {
    //     console.error('请求错误:', error);
    //   });
    // }
  }
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