
;(function(){
  App.defineViewModel("#list",{
       data:{
           stocks:{
               not_issued:null,
               listed:null,
               issued_not_listed:null,
           }
       },
       watch:{},
       methods:{
           stock_quote:function (code) {
               location.href="https://minfo.gildata.com/mobileF10View/default_quotation.html?s="+code
           },
           stock_detail:function (type,stock) {
               location.href="index.html?type=view#/detail?type="+type+"&stock="+stock.prod_code;
           }
       }
     },{
     ready:function(){
         var that = this;
         API.not_issued().then(function (data) {
             that.model.stocks.not_issued = data.data[0]['10104011'];
         });
         API.listed().then(function (data) {
             that.model.stocks.listed = data.data[0]['10104012'];
         });
         API.issued_not_listed().then(function (data) {
             that.model.stocks.issued_not_listed = data.data[0]['10104013'];
         })
     },
     beforeRender:function (params) {
     },
     afterRender:function (params){
     },
     beforeUnRender:function (){
     },
     afterUnRender:function (){
     }
  });
})();
