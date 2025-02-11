<template>
  <div class="department-container">
    <el-tree
      :data="treeData"
      :props="defaultProps"
      accordion
      style="width: 400px; background-color: #f4f7fb; padding: 10px 20px; border-radius: 8px"
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
</template>

<script>
export default {
  name: 'TreeExample',
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
              admin: '王五'
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
.department-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 5px;
  height: 100vh; /* Ensures container occupies full viewport height for centering */
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
  flex-grow: 1; /* Left side will grow to take available space */
}

.node-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Right-align actions */
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
