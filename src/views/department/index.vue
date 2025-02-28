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
            <span class="node-label">{{ data.name }}</span>
            <div class="node-actions">
              <!-- 右侧：管理员和操作 -->
              <span class="node-admin">{{ data.managerName }}</span>
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
import { getDepartmentList } from '@/api/department';

export default {
  name: 'Department',
  created() {
    this.loadDepartmentData();
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'  // 修改为使用name字段
      }
    };
  },
  methods: {
    async loadDepartmentData() {
      try {
        const res = await getDepartmentList();
        // 转换API数据为树形结构
        this.treeData = this.buildTree(res.data);
      } catch (error) {
        console.error('数据加载失败:', error);
        this.$message.error('部门数据加载失败');
      }
    },

    // 构建树形结构的方法
    buildTree(items) {
      const itemMap = new Map();
      const tree = [];

      // 创建映射表
      items.forEach(item => {
        itemMap.set(item.id, { 
          ...item,
          children: []
        });
      });

      // 构建树结构
      itemMap.forEach(item => {
        if (item.pid === 0) {
          tree.push(item);
        } else {
          const parent = itemMap.get(item.pid);
          if (parent) {
            parent.children.push(item);
          }
        }
      });

      return tree;
    },

    handleAction(command) {
      this.$message(`操作：${command}`);
    }
  }
};
</script>

<style scoped>
/* 保持原有样式不变 */
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
}

.department-container {
  width: calc(100% - 10px);
  margin-top: 5px;
}

.tree-background {
  width: 100%;
  background-color: #ffffff;
  padding: 5px 20px;
  border-radius: 8px;
  box-sizing: border-box;
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
  flex-grow: 1;
}

.node-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
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