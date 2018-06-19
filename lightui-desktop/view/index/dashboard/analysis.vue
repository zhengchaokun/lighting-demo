
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
        </div>
    </div>
</template>

<script>
import top from "../../../ui/top.vue";
const API = require("../../../lib/api");
export default {
	components: {
		top
	},
    data(){
        return {
            title: '图表页',
            desc: '丰富多彩的效果，'
        }
    }
}
</script>
<style lang="less">

</style>
