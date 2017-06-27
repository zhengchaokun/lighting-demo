
<template>

    <div id="news">
        <section class="main">

            <div class="news">
                <h3>{{info.title}}</h3>
                <span class="time mt40">{{info.media}} <time class="ml10">{{info.date}}</time></span>
                <div class="line mt40"></div>
                <div class="newsCont mt40">
                    <p v-html="info.content"></p>
                </div>
            </div>

            <!--底部导航-->
            <div class="bottom">
                <ul class="nav-Bottom">
                    <li><img src="images/comment.png"><br>评论</li>
                    <li><img src="images/collection.png"><br>收藏</li>
                    <li><img src="images/share.png"><br>分享</li>
                </ul>
            </div>
        </section>
    </div>

</template>
<script>
    export default {
        data:function () {
            return {
                info:{}
            }
        },
        watch:{},
        methods:{},
        beforeRender:function () {
            window.detail_info.content = window.detail_info.content.replace(/\n/ig,"<br/>");
            this.info = window.detail_info;
        }
    }
</script>
<style lang="less">

</style>
