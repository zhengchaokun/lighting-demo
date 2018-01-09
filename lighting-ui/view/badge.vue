<template>
  <div class="demo">
    <scroller>
      <lc-cell label="消息"
                title="[恭喜发财，大吉大利]"
                :link="link"
                :has-bottom-border="false"
                @LcCellClicked="LcCellClicked"
                :has-margin="false">
                  <lc-badge slot='value'></lc-badge>
      </lc-cell>
      <lc-cell label="订单"
                title="未处理"
                :link="link"
                :has-top-border="false"
                :has-bottom-border="false"
                @LcCellClicked="LcCellClicked"
                :has-margin="false">
                  <lc-badge text="8" slot='value'></lc-badge>
      </lc-cell>
      <lc-cell label="发现"
                title="好友"
                :link="link"
                :has-top-border="false"
                :has-bottom-border="false"
                @LcCellClicked="LcCellClicked"
                :has-margin="false">
                  <lc-badge text="99+" slot='value'></lc-badge>
      </lc-cell>
      <lc-cell label="发现"
                title="好友"
                :link="link"
                :has-top-border="false"
                @LcCellClicked="LcCellClicked"
                :has-margin="false">
                  <lc-badge text="NEW" slot='value'></lc-badge>
      </lc-cell>

    </scroller>
  </div>
</template>
<script>
    import LcBadge from 'lighting-ui/packages/lc-badge';
    import LcCell from 'lighting-ui/packages/lc-cell';

    export default {
        components: { LcBadge, LcCell },
        data(){
            return {
                link: '#/index'
            }
        },
        methods:{
            LcCellClicked(){
                console.log('clicked');
            }
        }
    }
</script>
<style lang="less">

</style>
