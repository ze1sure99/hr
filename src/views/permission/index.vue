<template>
  <div class="container">
    <div class="app-container">
      <el-button size="small" @click="addPermission" class="blue-btn">权限管理</el-button>
      <el-table 
        :data="tableData" 
        style="width: 100%" 
        :tree-props="treeProps"
        row-key="id"
      >
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="标识" prop="label"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <span @click="addItem" class="blue-text">添加</span>
            <span @click="editItem(scope.row)" class="blue-text">编辑</span>
            <span @click="deleteItem(scope.row)" class="blue-text">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// 引入权限列表函数
import { getPermissionList } from '@/api/permission';
export default {
  name: 'Permission',
  created() {
    // 获取权限列表
    this.getPermissionList();
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '组织架构',
          label: 'department',
          description: '组织架构',
          children: [
            {
              id: 2,
              name: '部门1',
              label: 'department1',
              description: '部门1描述',
              children: []
            },
            {
              id: 3,
              name: '部门2',
              label: 'department2',
              description: '部门2描述',
              children: []
            }
          ]
        },
        { 
          id: 4, 
          name: '公司设置', 
          label: 'setting', 
          description: '角色设置菜单', 
          children: [] 
        },
        { 
          id: 5, 
          name: '员工管理', 
          label: 'employee', 
          description: '用户管理菜单', 
          children: [] 
        },
        { 
          id: 6, 
          name: '权限管理', 
          label: 'permission', 
          description: '权限菜单', 
          children: [] 
        },
        { 
          id: 7, 
          name: '审批', 
          label: 'approval', 
          description: '审批', 
          children: [] 
        }
      ],
      treeProps: {
        children: 'children' // 指定子数据字段
      }
    };
  },
  methods: {
    addPermission() {
      // 添加权限操作
      console.log('添加权限');
    },
    addItem() {
      // 添加操作
      console.log('添加');
    },
    editItem(row) {
      // 编辑操作
      console.log('编辑:', row);
    },
    deleteItem(row) {
      // 删除操作
      console.log('删除:', row);
    },
    async getPermissionList(){
            await getPermissionList().then(res => {
            console.log(res);
            // this.tableData = res.data;
    });
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}
.app-container {
  padding: 20px;
  border: 1px solid #dcdfe6;
  background-color: #ffffff;
}
.el-button {
  margin-bottom: 20px;
}
.blue-btn {
  background-color: #409EFF; /* 蓝色按钮 */
  color: white;
}
.blue-text {
  color: #00BFFF; /* 天蓝色文字 */
  cursor: pointer;
  margin-right: 10px;
}
.blue-text:hover {
  text-decoration: none; /* 去掉下划线 */
}
</style>
