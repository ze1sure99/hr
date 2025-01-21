<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ username}}</div>
    <!-- 使用svg-icon 组件 -->
     <!-- 设置iconClass属性=“文件名（没有后缀）” -->
     <svg-icon icon-class="dashboard" ></svg-icon>
     <svg-icon icon-class="example"></svg-icon>
     <svg-icon icon-class="skill"></svg-icon>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  data() {
    return {
      // name: 'admin'
    }
  },
  created() {
  
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
