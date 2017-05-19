
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
           stock_quote:function (stock) {
               var market = stock.secu_market,
                   flag;
               if (market == '90') {
                   flag =  "SZ";
               }
               else {
                   flag =  "SS";
               }
               location.href="https://minfo.gildata.com/mobileF10View/default_quotation.html?s="+stock.prod_code+"."+flag;
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
