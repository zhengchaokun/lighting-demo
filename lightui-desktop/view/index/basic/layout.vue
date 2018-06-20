
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="分栏间隔" label-width="70px">
                    <el-input :value="gutter" class="w200" @input="handleInputGutter"></el-input>
                </el-form-item>
                <el-form-item label="分栏偏移" label-width="70px">
                    <el-input :value="offset" class="w200" @input="handleInputOffset"></el-input>
                </el-form-item>
                <el-form-item label="对齐方向" label-width="70px">
                    <el-select v-model="justify" placeholder="对齐方向">
                        <el-option label="start" value="start"></el-option>
                        <el-option label="center" value="center"></el-option>
                        <el-option label="end" value="end"></el-option>	
                        <el-option label="space-between" value="space-between"></el-option>
                        <el-option label="space-around" value="space-around"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-row :gutter="gutter" class="mgt20">
                <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
            </el-row>
            <el-row :gutter="gutter">
                <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
            <el-row :gutter="gutter">
                <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
            <el-row :gutter="gutter">
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
                <el-col :span="6" :offset="offset"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
            <el-row type="flex" :justify="justify" :gutter="gutter">
                <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
            <el-row :gutter="gutter">
                <el-col :xs="8" :sm="6" :md="4" :lg="3"><div class="grid-content bg-purple"></div></el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="9"><div class="grid-content bg-purple-light"></div></el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="9"><div class="grid-content bg-purple"></div></el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="3"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
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
			title: "布局",
            desc: "通过基础的 24 分栏，迅速简便地创建布局。",
            gutter: 20,
            offset: 6,
            justify: 'start'
		};
    },
	methods: {
        handleInputGutter(val) {
            if(val=='') {
                this.gutter = 0;
            } else {
                this.gutter = parseInt(val);
            }
        },
        handleInputOffset(val) {
            if(val=='') {
                this.offset = 0;
            } else {
                this.offset = parseInt(val);
            }
        },
        
       

        
	}
};
</script>

<style lang="less" scoped>
.el-row {
    width: 100%;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
