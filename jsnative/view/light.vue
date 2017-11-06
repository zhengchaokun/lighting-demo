<template>
    <div>
        <div style="flex-direction: column;">
            <sub-view></sub-view>
            <tabbar :tabItems="tabItems" @tabBarOnClick="tabBarOnClick"></tabbar>

            <!--<div class="nav-Bottom">
                <div class="nav-list" @click="jump('#/light/index',1)">
                    <image class="nav-list-img" src="http://gtms01.alicdn.com/tps/i1/TB1qw.hMpXXXXagXXXX9t7RGVXX-46-46.png" v-if="index!=1"></image>
                    <image class="nav-list-img" src="http://gtms04.alicdn.com/tps/i4/TB16jjPMpXXXXazXVXX9t7RGVXX-46-46.png" v-if="index==1"></image>
                    <text class="nav-list-tit" :class="{'active':index==1}">首 页</text>
                </div>
                <div class="nav-list" @click="jump('#/light/index',2)" :class="{'active':index==2}">
                    <image class="nav-list-img" src="http://gtms01.alicdn.com/tps/i1/TB1qw.hMpXXXXagXXXX9t7RGVXX-46-46.png" v-if="index!=2"></image>
                    <image class="nav-list-img" src="http://gtms04.alicdn.com/tps/i4/TB16jjPMpXXXXazXVXX9t7RGVXX-46-46.png" v-if="index==2"></image>
                    <text class="nav-list-tit">关 于</text>
                </div>
                <div class="nav-list" @click="jump('#/light/index',3)" :class="{'active':index==3}">
                    <image class="nav-list-img" src="http://gtms01.alicdn.com/tps/i1/TB1qw.hMpXXXXagXXXX9t7RGVXX-46-46.png" v-if="index!=3"></image>
                    <image class="nav-list-img" src="http://gtms04.alicdn.com/tps/i4/TB16jjPMpXXXXazXVXX9t7RGVXX-46-46.png" v-if="index==3"></image>
                    <text class="nav-list-tit">联系我们</text>
                </div>
            </div>-->

        </div>
    </div>
</template>


<script>


    module.exports = {
        data: function () {
            return {
                index:1,
                dir: 'examples',
                tabItems: [
                    {
                        index: 0,
                        title: 'tab1',
                        titleColor: '#000000',
                        icon: '',
                        image: 'http://gtms01.alicdn.com/tps/i1/TB1qw.hMpXXXXagXXXX9t7RGVXX-46-46.png',
                        selectedImage: 'http://gtms04.alicdn.com/tps/i4/TB16jjPMpXXXXazXVXX9t7RGVXX-46-46.png',
                        src: '/light/index',
                        visibility: 'visible'
                    },
                    {
                        index: 1,
                        title: 'tab2',
                        titleColor: '#000000',
                        icon: '',
                        image: 'http://gtms03.alicdn.com/tps/i3/TB1LEn9MpXXXXaUXpXX9t7RGVXX-46-46.png',
                        selectedImage: 'http://gtms02.alicdn.com/tps/i2/TB1qysbMpXXXXcnXXXX9t7RGVXX-46-46.png',
                        src: '/light/index2',
                        visibility: 'hidden'
                    },
                    {
                        index: 2,
                        title: 'tab3',
                        titleColor: '#000000',
                        icon: '',
                        image: 'http://gtms01.alicdn.com/tps/i1/TB1B0v5MpXXXXcvXpXX9t7RGVXX-46-46.png',
                        selectedImage: 'http://gtms04.alicdn.com/tps/i4/TB1NxY5MpXXXXcrXpXX9t7RGVXX-46-46.png',
                        src: '/light/index3',
                        visibility: 'hidden'
                    }
                ]
            }
        },
        components: {
            tabbar: require('../ui/tabbar.vue')
        },
        methods: {
            tabBarOnClick: function (e) {
                console.log('tabBarOnClick', e.index)
            },
            jump(link,index){
                App.router.push(link);
                this.index=index;
            }
        }
    }
</script>
<style scoped>

</style>
