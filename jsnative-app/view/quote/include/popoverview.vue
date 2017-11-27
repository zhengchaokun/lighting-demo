<template>
	<div class="popoverview" >
      <div v-for="item in extraItems" @click="extraItemOnClick(item)">
        <text
          :value="item.title"
          style="margin: 20;font-size: 28;"
          :style="{color: item.color?item.color:'#666'}"
          ></text>
        <div style="background-color: #c6c7cc;height: 1;margin-left: 20;margin-right: 20;" v-if="item.index != extraItems.length - 1"></div>
      </div>
    </div>
</template>

<style>
  .popoverview {
    width: 160;
    border-width: 1;
    border-color: #c6c7cc;
    border-radius: 10;
    background-color: #fff;
  }
</style>

<script>
  module.exports = {
    props: {
      extraItems: {default: [{index: 0, title: '1分'}, 
        {index: 1, title: '5分'}, 
        {index: 2, title: '15分'}, 
        {index: 3, title: '30分'}, 
        {index: 4, title: '60分'}]},
    },
    data: function () {
      return {

      }
    },
    components: {

    },
    created: function () {

    },
    methods: {
      extraItemOnClick: function (item) {
        this.$emit('extraTabOnClick', item);
      }
    }
  }
</script>
