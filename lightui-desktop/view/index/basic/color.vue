
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
            <div class="w80">
                <div class="block">
                    <h4>主题配色</h4>
                    <el-row :gutter="20" class="mgt20">
                        <el-col :span="6">
                        <div class="demo-color-box-group">
                            <div class="demo-color-box bg-blue">Blue<div class="value">#0AA9F1</div></div>
                            <div class="demo-color-box bg-blue-light">Light Blue<div class="value">#46C5FF</div></div>
                            <div class="demo-color-box bg-blue-deep">Deep Blue<div class="value">#0997D8</div></div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                        <div class="demo-color-box-group">
                            <div class="demo-color-box bg-green">Green<div class="value">#0AA9F1</div></div>
                            <div class="demo-color-box bg-green-light">Light Green<div class="value">#46C5FF</div></div>
                            <div class="demo-color-box bg-green-deep">Deep Green<div class="value">#0997D8</div></div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                        <div class="demo-color-box-group">
                            <div class="demo-color-box bg-orange">Orange<div class="value">#0AA9F1</div></div>
                            <div class="demo-color-box bg-orange-light">Light Orange<div class="value">#46C5FF</div></div>
                            <div class="demo-color-box bg-orange-deep">Deep Orange<div class="value">#0997D8</div></div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                        <div class="demo-color-box-group">
                            <div class="demo-color-box bg-red">Red<div class="value">#0AA9F1</div></div>
                            <div class="demo-color-box bg-red-light">Light Red<div class="value">#46C5FF</div></div>
                            <div class="demo-color-box bg-red-deep">Deep Red<div class="value">#0997D8</div></div>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <el-row :gutter="20" class="w100 mgt40">
                    <el-col :span="6">
                        <div class="block">
                            <h4>文字配色</h4>
                            <el-row class="mgt20">
                                <el-col :span="24">
                                <div class="demo-color-box-group">
                                    <div class="demo-color-box bg-text">标题<div class="value">#303030</div></div>
                                    <div class="demo-color-box bg-text-light">正文<div class="value">#606060</div></div>
                                    <div class="demo-color-box bg-text-lighter">备注<div class="value">#909090</div></div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="block">
                            <h4>线条配色</h4>
                            <el-row class="mgt20">
                                <el-col :span="24">
                                <div class="demo-color-box-group">
                                    <div class="demo-color-box bg-line"><div class="value">#969FAC</div></div>
                                    <div class="demo-color-box bg-line-light"><div class="value">#B5C1D4</div></div>
                                    <div class="demo-color-box bg-line-lighter"><div class="value">#D2D9E3</div></div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="block">
                            <h4>背景配色</h4>
                            <el-row :gutter="20" class="mgt20">
                                <el-col :span="12">
                                    <div class="demo-color-box-group border">
                                        <div class="demo-color-box bg-gray-deep"><div class="value">#E3E8EF</div></div>
                                        <div class="demo-color-box bg-gray"><div class="value">#ECEFF5</div></div>
                                        <div class="demo-color-box bg-gray-light"><div class="value">#F5F7FA</div></div>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="demo-color-box-group border">
                                        <div class="demo-color-box bg-white-deep"><div class="value">#F9F9F9</div></div>
                                        <div class="demo-color-box bg-white"><div class="value">#FDFDFD</div></div>
                                        <div class="demo-color-box bg-white-light"><div class="value">#FFFFFF</div></div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    
                </el-row>
            </div>
            
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
      title: "色彩",
      desc:
        "Ligui 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。"
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>

.block {
    width: 100%;
}
.demo-color-box-group {
    border-radius: 4px;
}
.demo-color-box {
  border-radius: 4px;
  padding: 20px;
  height: 74px;
  box-sizing: border-box;
  color: #fff;
  font-size: 14px;
}


.bg-blue {
  background: #0AA9F1;
}
.bg-blue-light {
    background: #46C5FF;
}
.bg-blue-deep {
    background: #0997D8;
}

.bg-green {
  background: #7DCE23;
}
.bg-green-light {
    background: #97D84F;
}
.bg-green-deep {
    background: #66AB19;
}

.bg-orange {
  background: #F1AE40;
}
.bg-orange-light {
    background: #F4BE66;
}
.bg-orange-deep {
    background: #D89220;
}

.bg-red {
  background: #F77181;
}
.bg-red-light {
    background: #F98D9A;
}
.bg-red-deep {
    background: #DA5363;
}

.bg-text {
    background: #303030;
}
.bg-text-light {
    background: #606060;
}
.bg-text-lighter {
    background: #909090;
}

.bg-line {
    background: #969FAC;
}
.bg-line-light {
    background: #B5C1D4;
}
.bg-line-lighter {
    background: #D2D9E3;
}

.bg-gray-deep {
    background: #E3E8EF;
    color: #606060;
}
.bg-gray {
    background: #ECEFF5;
    color: #606060;
}
.bg-gray-light {
    background: #F5F7FA;
    color: #606060;
}

.bg-white-deep {
    background: #F9F9F9;
    color: #606060;
}
.bg-white {
    background: #FDFDFD;
    color: #606060;
}
.bg-white-light {
    background: #FFFFFF;
    color: #606060;
}


.border {
    border: solid 1px #D2D9E3;
}
.demo-color-box-group .demo-color-box {
  border-radius: 0;
}
.demo-color-box-group .demo-color-box:first-child {
  border-radius: 4px 4px 0 0;
}
.demo-color-box-group .demo-color-box:last-child {
  border-radius: 0 0 4px 4px;
}
</style>
