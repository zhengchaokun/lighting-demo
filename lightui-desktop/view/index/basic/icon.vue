
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
            <ul class="icon-list">
                <li><span><i class="el-icon-arrow-down"></i>el-icon-arrow-down</span></li>
                <li><span><i class="el-icon-arrow-left"></i>el-icon-arrow-left</span></li>
                <li><span><i class="el-icon-arrow-right"></i>el-icon-arrow-right</span></li>
                <li><span><i class="el-icon-arrow-up"></i>el-icon-arrow-up</span></li>
                <li><span><i class="el-icon-caret-bottom"></i>el-icon-caret-bottom</span></li>
                <li><span><i class="el-icon-caret-left"></i>el-icon-caret-left</span></li>
                <li><span><i class="el-icon-caret-right"></i>el-icon-caret-right</span></li>
                <li><span><i class="el-icon-caret-top"></i>el-icon-caret-top</span></li>
                <li><span><i class="el-icon-check"></i>el-icon-check</span></li>
                <li><span><i class="el-icon-circle-check"></i>el-icon-circle-check</span></li>
                <li><span><i class="el-icon-circle-close"></i>el-icon-circle-close</span></li>
                <li><span><i class="el-icon-circle-cross"></i>el-icon-circle-cross</span></li>
                <li><span><i class="el-icon-close"></i>el-icon-close</span></li>
                <li><span><i class="el-icon-upload"></i>el-icon-upload</span></li>
                <li><span><i class="el-icon-d-arrow-left"></i>el-icon-d-arrow-left</span></li>
                <li><span><i class="el-icon-d-arrow-right"></i>el-icon-d-arrow-right</span></li>
                <li><span><i class="el-icon-d-caret"></i>el-icon-d-caret</span></li>
                <li><span><i class="el-icon-date"></i>el-icon-date</span></li>
                <li><span><i class="el-icon-delete"></i>el-icon-delete</span></li>
                <li><span><i class="el-icon-document"></i>el-icon-document</span></li>
                <li><span><i class="el-icon-edit"></i>el-icon-edit</span></li>
                <li><span><i class="el-icon-information"></i>el-icon-information</span></li>
                <li><span><i class="el-icon-loading"></i>el-icon-loading</span></li>
                <li><span><i class="el-icon-menu"></i>el-icon-menu</span></li>
                <li><span><i class="el-icon-message"></i>el-icon-message</span></li>
                <li><span><i class="el-icon-minus"></i>el-icon-minus</span></li>
                <li><span><i class="el-icon-more"></i>el-icon-more</span></li>
                <li><span><i class="el-icon-picture"></i>el-icon-picture</span></li>
                <li><span><i class="el-icon-plus"></i>el-icon-plus</span></li>
                <li><span><i class="el-icon-search"></i>el-icon-search</span></li>
                <li><span><i class="el-icon-setting"></i>el-icon-setting</span></li>
                <li><span><i class="el-icon-share"></i>el-icon-share</span></li>
                <li><span><i class="el-icon-star-off"></i>el-icon-star-off</span></li>
                <li><span><i class="el-icon-star-on"></i>el-icon-star-on</span></li>
                <li><span><i class="el-icon-time"></i>el-icon-time</span></li>
                <li><span><i class="el-icon-warning"></i>el-icon-warning</span></li>
                <li><span><i class="el-icon-delete2"></i>el-icon-delete2</span></li>
                <li><span><i class="el-icon-upload2"></i>el-icon-upload2</span></li>
                <li><span><i class="el-icon-view"></i>el-icon-view</span></li>
            </ul>
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
      title: "图标",
      desc:
        "一套常用的图标集合。直接通过设置类名为 el-icon-iconName 来使用即可。",
      show: true,
      show2: true,
      show3: true,
      activeName: "first"
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0;
    border: solid 1px #eaeefb;
    border-radius: 4px;
    li {
        float: left;
        width: 16.66%;
        text-align: center;
        height: 120px;
        line-height: 120px;
        color: #666;
        font-size: 13px;
        transition: color .15s linear;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        margin-right: -1px;
        margin-bottom: -1px;
        span {
            display: inline-block;
            line-height: normal;
            vertical-align: middle;
            font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;
            color: #99a9bf;
        }
        i {
            display: block;
            font-size: 24px;
            margin-bottom: 15px;
            color: #8492a6;
        }
    }
}
.el-row {
  width: 100%;
}
.el-tabs {
  width: 80%;
}
</style>
