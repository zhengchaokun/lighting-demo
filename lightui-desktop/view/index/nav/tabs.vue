
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
            <el-form label-width="100px" class="demo-form-tab">
                <el-form-item label="基础用法">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                    </el-tabs>
                </el-form-item>
            </el-form>

            <el-form label-width="100px" class="demo-form-tab">
                <el-form-item label="选项卡样式">
                    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                    </el-tabs>
                </el-form-item>
            </el-form>

            <el-form label-width="100px" class="demo-form-tab">
                <el-form-item label="卡片化">
                    <el-tabs type="border-card">
                        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
                        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
                        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
                    </el-tabs>
                </el-form-item>
            </el-form>

            <el-form label-width="100px" class="demo-form-tab">
                <el-form-item label="自定义标签页">
                    <el-tabs type="border-card">
                        <el-tab-pane>
                            <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
                            我的行程
                        </el-tab-pane>
                        <el-tab-pane label="消息中心">消息中心</el-tab-pane>
                        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
                    </el-tabs>
                </el-form-item>
            </el-form>

            <el-form label-width="100px" class="demo-form-tab">
                <el-form-item label="动态增减标签页">
                    <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
                        <el-tab-pane
                            :key="index"
                            v-for="(item, index) in editableTabs"
                            :label="item.title"
                            :name="item.name">
                            {{item.content}}
                        </el-tab-pane>
                        </el-tabs>
                </el-form-item>
            </el-form>



            
            
        </div>
    </div>
</template>
<script>
import top from "../../../ui/top.vue";
export default {
  	components: {
		top
	},
  	data() {
		return {
			title: "标签页",
            desc: "分隔内容上有关联但属于不同类别的数据集合。",
            editableTabsValue: '2',
            editableTabs: [{
                title: 'Tab 1',
                name: '1',
                content: 'Tab 1 content'
            }, {
                title: 'Tab 2',
                name: '2',
                content: 'Tab 2 content'
            }],
            tabIndex: 2,
            activeName: 'first',            
            activeName2: 'first'
		};
	},
	methods: {
        handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      },
       handleClick(tab, event) {
        console.log(tab, event);
      }
       

        
	}
};
</script>

<style lang="less">
.demo-form-tab .el-form-item__content {
    width: auto;
    min-width: 380px;
    max-width: 401px;
}
</style>
