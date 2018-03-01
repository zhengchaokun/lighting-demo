
<template>

 <div>
    <list style="margin-bottom:80;background-color:#F9F4EA;" isOpenMove="true" @insertCell="insertCell" @moveStateEnded="moveStateEnded">
      <header>
        <div class="header">
          <text class="check"></text>
          <text class="name">名称代码</text>
          <text class="top">置顶</text>
          <text class="drag">拖动</text>
        </div>
      </header>
      <cell v-for="item in stocklist">
            <editlistItem :stockCode="item.prod_code_all" :stockName="item.prod_name"  :hqtypecode="item.hq_type_code" ref="editlistItem" ></editlistItem>
            <div style="height: 1;background-color: #EAEAEA;margin-top: 5;margin-bottom: 5" ref="bottomSepeator"></div>
      </cell>
    </list>
    <div class="edit_bottom" ref="edit_bottom">
        <text class="checkall" @click="checkAll">{{checkAllStr}}</text>
        <text class="delete" :style="{color:deleteColor}" @click="deleteEvent">{{deleteStr}}</text>
    </div>
  </div>
</template>

<style>
  .header {
    flex-direction:row;
    border-top-width: 1;
    border-bottom-width: 1;
    border-top-color: #ddd;
    border-bottom-color: #ddd;
    width: 750px;
    height: 72px;
    align-items: center;
    background-color: #F9F4EA;
  }
  .check{
    flex:13;
    text-align: left;
    font-size: 24px;
  }
  .name{
    flex:45;
    text-align: left;
    font-size: 28px;
  }
  .top{
    flex:18;
    text-align: center;
    font-size: 28px;
  }
  .drag{
    flex:24;
    text-align: center;
    font-size: 28px;
  }

  .edit_bottom{
    flex-direction:row;
    align-items: center;
    position: fixed;
    background-color: #F9F4EA;
    border-top-width: 2;
    border-top-color: #ddd;
    width: 750px;
    height: 80px;
    bottom: 0px;
    left: 0px;
  }
  .checkall{
    flex:10;
    text-align: center;
    border-right-width: 2;
    border-right-color:#bfc3c7;
    font-size: 30px;
  }
  .delete{
    flex:40;
    text-align: center;
    font-size: 30px;
  }
</style>

<script>
  var quoteDc = weex.requireModule('dataCenter');
  var head = weex.requireModule('head');
  var animation = weex.requireModule('animation');
  var dom =weex.requireModule('dom');
 // var system = weex.requireModule('system');
  var getAbbreviation = require('./include/common-api.js').common.getAbbreviation;
  module.exports = {
    data:function(){

      return {
        stocklist:[],
        reqParams:'',
        deleteStr:"删除",
        checkAllStr:"全选",
        deleteColor:'#999999',
        deletedArray:[],
        myStockData:[],
        isCheckAllClicked:false,
        selectedStatusArray:[],
        listHeight:800
      }
    },
    methods: {
      getRealtimeList:function(e,callback){
        quoteDc.loadRealtimeList({'en_prod_code':e,'fields':'prod_name,last_px,px_change,px_change_rate,hq_type_code'},callback);
      },

      loadMyStocksList:function(){
        var self = this;
        quoteDc.getMyStocks(function(res){
            var oriData = res;//"XSHE-000558,XSHG-600000,XNAS-NTES,XSHE-002094";
            var stocksArr = oriData.split(",");
            self.reqParams = "";
            self.stocklist = [];
            for(var i in stocksArr){
                if (self.reqParams.length > 0){
                  self.reqParams += ","
                }
                var idx = stocksArr[i].lastIndexOf('-');
                var marketT = "", key = "",simpleKey="";
                if (idx > 0){
                  marketT = stocksArr[i].substring(0, idx);
                  key = stocksArr[i].substring(idx+1) + "." + marketT;
                }
                self.reqParams +=  key;
            }
            //test
            //system.showTip("mystock="+self.reqParams+"stocklist="+JSON.stringify(self.stocklist));
            self.myStockData=stocksArr;
            self.onUpdate();
        });
      },
      onUpdate:function(){
        var self = this;
            self.getRealtimeList(self.reqParams, function(data){
              //test
              //system.showTip("snapshot="+JSON.stringify(data.data.snapshot)+"stocklist="+JSON.stringify(self.stocklist));
              self.stocklist = [];
              //console.log("allan="+JSON.stringify(data));
              var ss = data.data.snapshot;
              var fields = ss.fields;
              for (var a in ss) {
                  var tmp = {};
                  if ("fields" == a) {
                      continue;
                  }

                  tmp['prod_name'] = ss[a][fields.indexOf('prod_name')];
                  tmp['prod_code'] = a.split('.')[0];
                  tmp['prod_code_all'] = a;
                  tmp['hq_type_code'] = ss[a][fields.indexOf("hq_type_code")];
                  tmp['last_px'] = ss[a][fields.indexOf('last_px')];
                  tmp['px_change_rate'] = ss[a][fields.indexOf('px_change_rate')];
                  if (parseFloat(tmp['px_change_rate']) > 0){
                      tmp['color'] = "red";
                  }else{
                      tmp['color'] = "green";
                  }
                  if(a.indexOf("null")!=-1){
                      var sstp = getAbbreviation(tmp.hq_type_code);
                      tmp["prod_code_all"] =tmp.prod_code+(sstp.length>0?("."+sstp):'');
                  }
                  self.stocklist.push(tmp);
              }

          });
      },
      checkAll:function(e){
         // var editItem = this.$vm("editItem");
         // editItem.onCheckItem();
         var length =this.$refs.editlistItem.length;
         this.isCheckAllClicked=!this.isCheckAllClicked;
         for(var i=0;i<length;i++){
            this.$refs.editlistItem[i].$emit('changeCellSelectedStatus',this.isCheckAllClicked);
         }

         if(this.isCheckAllClicked){
           this.checkAllStr="取消全选";
           this.deleteStr="删除("+length+")";
           this.deleteColor="#fa5d5d";
           for (var i = 0; i < this.stocklist.length; i++) {
             var tmp={};
             var item =this.stocklist[i];
             tmp.stockCode =item.prod_code_all;
             tmp.stockName =item.prod_name;
             tmp.hq_type_code =item.hq_type_code;
             this.deletedArray.push(tmp);
            }
         }else{
           this.deleteStr="删除";
           this.deleteColor="#999999";
           this.checkAllStr="全选";
           this.deletedArray.splice(0,this.deletedArray.length);
         }


       },
       indexOfItem:function(e,arr,field){
          for (var i = 0; i < arr.length; i++) {
            var item =arr[i];
            if(item[field]==e[field])
              return i;
          }
          return -1;
       },
       deleteEvent:function(){
       // console.log("deletedArray ="+this.deletedArray);
         for(var key in this.deletedArray){
            var item =this.deletedArray[key];
            var k = item.hq_type_code.split('.')[0]  + "-" + item.stockCode.split('.')[0];
            var index=this.myStockData.indexOf(k);
             //console.log("deleteitem="+k+" deletedIndex ="+index);
            this.myStockData.splice(index, 1);
            //console.log("deleteitem="+k+" deletedArray ="+this.myStockData);
            //uilist
            var tmp={};
            tmp["prod_code_all"] =item.stockCode;
            var uiIndex =this.indexOfItem(tmp,this.stocklist,'prod_code_all');
            this.stocklist.splice(uiIndex,1);
            //this.$refs.editlistItem[uiIndex].$emit('changeCellSelectedStatus', false);
         }
         //change check状态
         for(var i=0;i<this.stocklist.length;i++){
            this.$refs.editlistItem[i].$emit('changeCellSelectedStatus',false);
         }
          this.deletedArray.splice(0,this.deletedArray.length);
         //保存数据
         this.deleteStr="删除";
         this.deleteColor="#999999";
         var str = this.myStockData.join(',');
         quoteDc.saveMyStocks(str, null);
       },
       translate:function(el,translateY,callback){
          animation.transition(el,{
            duration:250,
            styles:{
              transform:'translateY('+translateY+')',
            },
            timingFunction: 'ease-out',
          },function(){
             //数据切换
             if(callback)
             callback();
          });
       },
       insertCell:function(e){


        var toIndex=e.toIndex;

        var fromIndex=e.fromIndex;

        var stockItem =this.stocklist[fromIndex];

        if(fromIndex>=toIndex){ //向上拖动
           //uilist
          this.stocklist.splice(toIndex,0,stockItem);//插入当前点击的item
          this.stocklist.splice(fromIndex+1,1);//删除多余的item

          //modellist
          var stockItemStr = stockItem.hq_type_code.split('.')[0]  + "-" + stockItem.prod_code;
          this.myStockData.splice(toIndex, 0,stockItemStr);
          this.myStockData.splice(fromIndex+1,1);
        }else{
          //向下拖动

            //uilist
          this.stocklist.splice(toIndex+1,0,stockItem);//插入当前点击的item
          this.stocklist.splice(fromIndex,1);//删除多余的item

          //modellist
          var stockItemStr = stockItem.hq_type_code.split('.')[0]  + "-" + stockItem.prod_code;
          this.myStockData.splice(toIndex+1, 0,stockItemStr);
          this.myStockData.splice(fromIndex,1);
        }
       }
       ,moveStateEnded:function(e){

         var toIndex=e.toIndex;
         var fromIndex=e.fromIndex;

         for(var i=0;i<this.stocklist.length;i++){
            var item=this.stocklist[i];
            var tmp={};
            tmp["stockCode"] =item.prod_code_all;
            var index = this.indexOfItem(tmp,this.selectedStatusArray,'stockCode');
            if(this.isCheckAllClicked){
                this.$refs.editlistItem[i].$emit('changeCellSelectedStatus',true);
            }else {
                if(index!=-1){
                  this.$refs.editlistItem[i].$emit('changeCellSelectedStatus',true);
                }else{
                  this.$refs.editlistItem[i].$emit('changeCellSelectedStatus',false);
                }
            }

         }

         //this.$refs.editlistItem[fromIndex].$emit('changeCellSelectedStatus',this.toOriginStatus);

         var str = this.myStockData.join(',');
         quoteDc.saveMyStocks(str, null);
       }
    },
    components: {
      editlistItem: require('./include/editlistItem.vue')
    },
    created:function(){
        var that=this;
        head.setTitle({"title": "编辑自选"});
        this.loadMyStocksList();

        this.$on('pressCheckBox', function(e) {
            if(e.selectedStatus){
              that.deletedArray.push(e.item);
              var check ={};
              check.stockCode=e.item.stockCode;
              check.checkStatus=true;
              that.selectedStatusArray.push(check);
            }else{
              var index = that.indexOfItem(e.item,that.deletedArray,'stockCode');
              that.deletedArray.splice(index,1);
              that.selectedStatusArray.splice(index,1);
            }
            if(that.deletedArray.length>0){
               that.deleteStr="删除("+that.deletedArray.length+")";
               that.deleteColor="#fa5d5d";
            }else{
                that.deleteStr="删除";
                that.deleteColor="#999999";
            }
        });

       this.$on('pressOnTop',function(e){

        var tmp={};
        tmp["prod_code_all"] =e.item.stockCode;
        var Index =this.indexOfItem(tmp,this.stocklist,'prod_code_all');

        var stockItem =this.stocklist[Index];

        //uilist
        this.stocklist.splice(Index,1);
        this.stocklist.splice(0,0,stockItem);
        //在头部insert一个Item

         //modellist
        var stockItemStr = stockItem.hq_type_code.split('.')[0]  + "-" + stockItem.prod_code;
        this.myStockData.splice(Index,1);
        this.myStockData.splice(0,0,stockItemStr);

        for(var i=0;i<this.stocklist.length;i++){
            var item=this.stocklist[i];
            var tmp={};
            tmp["stockCode"] =item.prod_code_all;
            var index = this.indexOfItem(tmp,this.selectedStatusArray,'stockCode');
            if(this.isCheckAllClicked){
                this.$refs.editlistItem[i].$emit('changeCellSelectedStatus',true);
            }else{
                if(index!=-1){
                  this.$refs.editlistItem[i].$emit('changeCellSelectedStatus',true);
                }else{
                  this.$refs.editlistItem[i].$emit('changeCellSelectedStatus',false);
                }
            }

         }
         var str = this.myStockData.join(',');
         quoteDc.saveMyStocks(str, null);
       })
    }
  }
</script>
