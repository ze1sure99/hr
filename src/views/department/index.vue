<template>
  <div class="container">
    <div class="department-container">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        accordion
        class="tree-background"
      >
        <template #default="{ node, data }">
          <div class="tree-node">
            <!-- 左侧：部门名称 -->
            <span class="node-label">{{ data.label }}</span>
            <div class="node-actions">
              <!-- 右侧：管理员和操作 -->
              <span class="node-admin">{{ data.admin }}</span>
              <el-dropdown @command="handleAction">
                <span class="operation-text">操作<i class="el-icon-arrow-down"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子节点</el-dropdown-item>
                  <el-dropdown-item command="edit">修改节点</el-dropdown-item>
                  <el-dropdown-item command="delete">删除节点</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data() {
    return {
      // 数据格式
      treeData: [
        {
          label: '传智教育',
          admin: '管理员',
          children: [
            {
              label: '总裁办',
              admin: '张三',
            },
            {
              label: '行政部',
              admin: '李四',
            },
            {
              label: '人事部',
              admin: '王五',
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  methods: {
    handleAction(command) {
      this.$message(`操作：${command}`);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh; /* 使容器充满视口 */
}

.department-container {
  width: calc(100% - 10px); /* 确保左右有5px的间隙 */
  margin-top: 5px; /* 顶部间距 */
}

.tree-background {
  width: 100%; /* 背景框宽度撑满容器 */
  background-color: #ffffff; /* 白色背景 */
  padding: 5px 20px; /* 上下5px，左右20px的内边距 */
  border-radius: 8px;
  box-sizing: border-box; /* 确保内边距不影响宽度 */
}

.tree-node {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  width: 100%;
}

.node-label {
  font-size: 14px;
  font-weight: bold;
  color: #409eff;
  flex-grow: 1; /* 左侧部分占据剩余空间 */
}

.node-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 右对齐操作 */
}

.node-admin {
  font-size: 12px;
  margin-right: 10px;
  color: #888;
}

.operation-text {
  font-size: 12px;
  color: #409eff;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.operation-text i {
  margin-left: 5px;
}

.operation-text:hover {
  color: #409eff;
}
</style>
