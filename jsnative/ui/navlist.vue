<template>
  <div class="nav-head">
    <text class="nav-head-text"
          v-for='list in navLists'
          @click="onclicklist(list)"
          :class="{'on':list.index==selectedIndex}"
    >{{list.name}}</text>
      <div  @click="h()">
          <text>111111111111</text>
      </div>
  </div>
</template>

<style scoped>
  .nav-head{background: #fff; flex-direction: row; }
  .nav-head-text{color: #646d88; height: 70px; font-size: 24; padding-right: 10px; padding-left: 10px; margin-left:10px; margin-right:10px; justify-content: center;}
  .on{color:#457fca; border-bottom-style:solid; border-bottom-width:2px; border-bottom-color:#457fca; }

</style>

<script>
  export default {
    data: function () {
      return {
        selectedIndex: 0,
        color:'#646d88',
        selectedColor:'#457fca'
      }
    },
    props: ['navLists'],
    mounted(){
      this.select(this.selectedIndex);
    },
    methods: {
      onclicklist: function (e) {
          alert(123)
        this.selectedIndex = e.index;
          console.log(this.selectedIndex)
          console.log(e.index)
        this.select(e.index);
        this.$emit('navListOnClick', e);
      },
      select: function(index) {
        for(var i = 0; i < this.navLists.length; i++) {
          var navList = this.navLists[i];
          if(i == index){
            navList.color = this.selectedColor;
          }
          else {
            navList.color = this.color;
          }
        }
      }

    }
  }
</script>
