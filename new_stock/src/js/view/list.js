
;(function(){
  App.defineViewModel("#list",{
       data:{
           stocks:{
               not_issued:null,
               listed:null,
               issued_not_listed:null,
               purchase_today:null
           }
       },
       watch:{},
       methods:{
           stock_quote:function (code) {
               location.href="https://minfo.gildata.com/mobileF10View/default_quotation.html?s="+code
           },
           stock_detail:function (type,stock) {
               location.href="index.html?1=1#/detail?type="+type+"&stock="+stock.prod_code;
           }
       }
     },{
     ready:function(){
     },
     beforeRender:function (params) {
         var that = this;
         API.not_issued().then(function (data) {
             that.model.stocks.not_issued = data;
         });
         API.listed().then(function (data) {
             that.model.stocks.listed = data;
         });
         API.issued_not_listed().then(function (data) {
             that.model.stocks.issued_not_listed = data;
         });
         API.purchase_today().then(function (data) {
             that.model.stocks.purchase_today = data;
         })
     },
     afterRender:function (params){
     },
     beforeUnRender:function (){
     },
     afterUnRender:function (){
     }
  });
})();
