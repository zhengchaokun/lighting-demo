<!-- Created by 徐成豪 2017.5.17 -->

<template>
  <div :style="{backgroundColor:tabBarBackgroundColor,borderBottomColor: lineColor,borderBottomWidth:1}">
  <scroller show-scrollbar="false" scroll-direction="horizontal" style="flex-direction: row;" :style="{ width: width, height: height}">
    <div class="tabbar" append="tree" :height="height">
      <div v-for="(item, k) in tabItems">
        <tabitem
          :index="item.index"
          :title="item.title"
          :titleColor="item.titleColor"
          :fontSize="fontSize"
          :backgroundColor="tabBarBackgroundColor"
          :itemWidth="width / tabItems.length - 20"
          :itemHeight="height"
          :indicatorVisibility="item.indicatorVisibility"
          :indicatorColor="item.indicatorColor"
          :fixed="fixed"
          :icon="indexOfExtra == k"
          :iconurl="iconurl"
          @tabItemOnClick="tabItemOnClick"
          ></tabitem>
      </div>
    </div>
  </scroller>
  </div>
</template>

<style>
  .tabbar {
    flex-direction: row;
  }
  .bottomline {
    height: 1;
  }
</style>

<script>
  module.exports = {
    props: {
      fixed: { default: true },
      width: { default: 750 },
      height: { default: 60 },
      selectedIndex:{default: 0 },
      tabItems: { default: [
        {index: 0, title: 'tab1', titleColor: ''}, 
        {index: 1, title: 'tab2', titleColor: ''}, 
        {index: 2, title: 'tab3', titleColor: ''}, 
        {index: 3, title: 'tab4', titleColor: ''}, 
        {index: 4, title: 'tab5', titleColor: ''}
      ] },
      selectedColor: { default: '#F9821E' },
      titleColor: { default: '#000' },
      fontSize: { default: 32 },
      backgroundColor: { default: '#F9F4EA' },
      indexOfExtra: { default: -1 },
      iconurl:{default: ''},
      tabBarBackgroundColor:{default:'#F9F4EA'},
      lineColor:{default: '#d6d6d9'},
    },
    data: function () {
      return {
        selectedIndex: 0,
        titleOfExtra: "",
        hasExtraTab: false,
      }
    },
    components: {
      tabitem: require('./tabitem.vue')
    },
    created: function () {
      if (this.indexOfExtra != -1) {
        this.hasExtraTab = true;
        this.titleOfExtra = this.tabItems[this.indexOfExtra].title;
      }
      this.$on('select', function(params) {
        for(var i = 0; i < this.tabItems.length; i++) {
          var tabItem = this.tabItems[i];
          if(i == params.index){
            tabItem.title = params.title;
            tabItem.titleColor = this.selectedColor;
            tabItem.indicatorColor = this.selectedColor;
          }
          else {
            tabItem.titleColor = this.titleColor;
            tabItem.indicatorColor = this.tabBarBackgroundColor;
          }
        }
      });
      if (this.selectedIndex < this.tabItems.length && this.selectedIndex > -1){
        this.$emit('select', this.tabItems[this.selectedIndex]);
      }
      
    },
    methods: {
      tabItemOnClick: function (e) {
        if (this.hasExtraTab && e.index != this.indexOfExtra) {
          this.tabItems[this.indexOfExtra].title = this.titleOfExtra;
        }
        this.$emit('select', e);
        this.$emit('tabBarOnClick', e);
      },
    }
  }
</script>
