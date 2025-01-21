<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <img v-if="staffPhoto" :src="staffPhoto + '?imageView2/1/w/80/h/80'" class="user-avatar" v-bind:alt="username || '用户头像'" />
          <div v-else class="user-avatar-placeholder">
            {{ displayUsername }} <!-- 显示用户名的第一个字母 -->
          </div>

          <!-- 用户名称 -->
          <span class="user-name">{{ username }}</span>
          <!-- 图标 -->
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <el-dropdown-item @click.native="showChangePasswordDialog">
            修改密码
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 修改密码弹出框 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="400px" @close="resetForm">
      <el-form :model="passwordForm" ref="passwordForm" label-width="80px" :rules="formRules">
        <!-- 当前密码 -->
        <el-form-item label="当前密码" prop="currentPassword">
          <el-input 
            :type="passwordVisible.current ? 'text' : 'password'" 
            v-model="passwordForm.currentPassword" 
            autocomplete="off">
            <template slot="suffix">
              <i 
                class="material-icons password-visibility-icon" 
                @click="togglePasswordVisibility('current')">
                {{ passwordVisible.current ? 'visibility' : 'visibility_off' }}
              </i>
            </template>
          </el-input>
        </el-form-item>

        <!-- 新密码 -->
        <el-form-item label="新密码" prop="newPassword">
          <el-input 
            :type="passwordVisible.new ? 'text' : 'password'" 
            v-model="passwordForm.newPassword" 
            autocomplete="off">
            <template slot="suffix">
              <i 
                class="material-icons password-visibility-icon" 
                @click="togglePasswordVisibility('new')">
                {{ passwordVisible.new ? 'visibility' : 'visibility_off' }}
              </i>
            </template>
          </el-input>
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input 
            :type="passwordVisible.confirm ? 'text' : 'password'" 
            v-model="passwordForm.confirmPassword" 
            autocomplete="off">
            <template slot="suffix">
              <i 
                class="material-icons password-visibility-icon" 
                @click="togglePasswordVisibility('confirm')">
                {{ passwordVisible.confirm ? 'visibility' : 'visibility_off' }}
              </i>
            </template>
          </el-input>
        </el-form-item>

      </el-form>

      <!-- 修改密码弹出框底部按钮 -->
      <div class="dialog-footer">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="handleChangePassword">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'staffPhoto',
      'username'
    ]),
    displayUsername() {
      return this.username ? this.username.charAt(0).toUpperCase() : '';  // 只有当 username 存在时才执行 charAt
    }
  },
  data() {
    return {
      dialogVisible: false,  // 控制弹出框的显示和隐藏
      passwordForm: {  // 表单数据
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      passwordVisible: {
        current: false, // 当前密码可见性
        new: false,     // 新密码可见性
        confirm: false  // 确认密码可见性
      },
      formRules: {
        currentPassword: [
          { required: true, message: '当前密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度在6到20之间', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: this.confirmPasswordValidator, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    showChangePasswordDialog() {
      this.dialogVisible = true;  // 显示修改密码弹出框
    },
    // 校验确认密码与新密码一致
    confirmPasswordValidator(rule, value, callback) {
      if (value !== this.passwordForm.newPassword) {
        callback(new Error('新密码和确认密码不一致'));
      } else {
        callback();
      }
    },
    handleChangePassword() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/updatePassword', this.passwordForm).then(() => {
            Message.success('密码修改成功');
            this.dialogVisible = false;
          }).catch(() => {
            Message.error('密码修改失败');
          });
        } else {
          Message.error('表单校验失败');
        }
      });
    },
    resetForm() {
      this.passwordForm = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
    },
    togglePasswordVisibility(field) {
      // 切换指定字段的密码可见性
      this.passwordVisible[field] = !this.passwordVisible[field];
    }
  }
}
</script>

<style lang="scss" scoped>
/* 顶部导航栏样式 */
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 20px;
      /* 调整距离右边的间距 */

      /* 使用 flex 布局对齐头像和用户名 */
      display: flex;
      align-items: center;
      /* 垂直居中头像和用户名 */
      justify-content: flex-start;
      /* 左对齐头像和用户名 */

      .avatar-wrapper {
        display: flex;
        align-items: center;
        /* 垂直居中头像和用户名 */
        position: relative;

        /* 设置头像 */
        .user-avatar {
          cursor: pointer;
          width: 40px;
          /* 增大头像尺寸 */
          height: 40px;
          border-radius: 50%;
          /* 使头像为圆形 */
          margin-right: 10px;
          /* 头像和用户名之间的间距 */
        }

        /* 设置用户名 */
        .user-name {
          font-size: 16px;
          /* 增大用户名的字体 */
          color: #333;
        }

        /* 齿轮图标定位 */
        .el-icon-setting {
          cursor: pointer;
          font-size: 20px;
          /* 增大齿轮图标 */
          margin-left: 15px;
          /* 增加齿轮图标和用户名之间的间距 */
        }
      }
    }
  }
}

/* 头像为空时的背景样式 */
.user-avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #7a3eb0; /* 紫色背景 */
  color: white;
  font-size: 18px;
  border-radius: 50%;
  margin-right: 10px;
}

/* 修改密码弹出框的底部按钮样式 */
.dialog-footer {
  display: flex;
  justify-content: center;
  /* 将按钮居中 */
  padding: 10px 0;
  gap: 20px;
  /* 给按钮之间增加间距 */
}

.el-button {
  margin-left: 5px; /* 调整按钮间距 */
}

/* 密码可见性图标样式 */
.password-visibility-icon {
  font-size: 18px;
  cursor: pointer;
  color: #999; /* 图标颜色 */
  margin-top: -7px;
  margin-right: 5px;
  vertical-align: middle;
}

/* 修改密码弹出框的输入框样式 */
.el-input {
  position: relative;
}

.el-input input {
  padding-right: 36px; /* 给输入框的右边留出空间放眼睛图标 */
}

.el-input__suffix {
  position: absolute;
  right: 10px; /* 将眼睛图标位置微调 */
  top: 50%;
  transform: translateY(-50%); /* 垂直居中图标 */
  cursor: pointer;
}

.el-input__suffix i {
  font-size: 18px;
}

/* 弹出框设置 */
.el-dialog {
  max-width: 400px; /* 控制弹出框的最大宽度 */
}

.el-input {
  width: 100%;
  max-width: 100%;
}

/* 修改密码框的位置和间距 */
.el-form-item {
  margin-bottom: 20px;
}

/* 修改按钮样式 */
.dialog-footer .el-button {
  font-size: 14px;
}
</style>
