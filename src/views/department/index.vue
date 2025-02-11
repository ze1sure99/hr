<template>
  <div class="department-container">
    <!-- 紫旭教育部分：总部门 -->
    <el-collapse v-model="activeNames">
      <el-collapse-item title="紫旭教育" name="1">
        <!-- 树形结构 -->
        <el-tree
          :data="departmentData"
          :props="defaultProps"
          node-key="id"
          highlight-current
          default-expand-all
          @node-click="handleNodeClick"
        >
          <!-- 自定义树节点 -->
          <template #default="{ node, data }">
            <div class="tree-row" :class="{ 'is-current': node.isCurrent }">
              <!-- 左侧：部门名称 -->
              <div class="tree-row-left">
                {{ data.name }}
              </div>

              <!-- 右侧：人员名称和操作按钮 -->
              <div class="tree-row-right">
                <span v-if="!data.isDept" class="person-name">
                  {{ data.name }}
                </span>
                <el-dropdown v-if="!data.isDept" @command="handleCommand(data)">
                  <span class="op-text">
                    操作
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                    <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                    <el-dropdown-item command="delete">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </template>
        </el-tree>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data() {
    return {
      activeNames: ['1'],  // 控制折叠面板的展开
      departmentData: [
        {
          id: 1,
          name: '紫旭教育',
          isDept: true,
          children: [
            { id: 2, name: '总裁办', isDept: true, children: [
              { id: 3, name: '张三', isDept: false },
              { id: 4, name: '李四', isDept: false }
            ]},
            { id: 5, name: '行政部', isDept: true, children: [
              { id: 6, name: '王五', isDept: false }
            ]},
            { id: 7, name: '人事部', isDept: true, children: [
              { id: 8, name: '赵六', isDept: false }
            ]}
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    };
  },
  methods: {
    handleNodeClick(nodeData) {
      console.log('点击节点：', nodeData);
    },
    handleCommand(data, cmd) {
      switch (cmd) {
        case 'add':
          this.addSubDepartment(data);
          break;
        case 'edit':
          this.editDepartment(data);
          break;
        case 'delete':
          this.deleteDepartment(data);
          break;
      }
    },
    addSubDepartment(item) {
      console.log('添加子部门到：', item);
    },
    editDepartment(item) {
      console.log('编辑部门：', item);
    },
    deleteDepartment(item) {
      console.log('删除部门：', item);
    }
  }
};
</script>

<style scoped>
/* 1. 整体居中容器 */
.department-container {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px 0;
}

/* 树节点的自定义样式 */
.tree-row {
  display: flex;
  align-items: center;
  padding: 6px 16px;
  transition: background-color 0.3s;
}

.tree-row.is-current {
  background-color: #f0f9eb !important;
}

.tree-row:hover {
  background-color: #f5f7fa;
}

/* 左侧：部门名称 */
.tree-row-left {
  flex: 1;
  text-align: left;
  font-weight: 500;
  color: #333;
}

/* 右侧：人员名称和操作按钮 */
.tree-row-right {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
}

.person-name {
  color: #333;
}

.op-text {
  color: #409eff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.el-dropdown-menu {
  min-width: 120px;
  text-align: center;
}
</style>
