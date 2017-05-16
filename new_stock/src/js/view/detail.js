
;(function(){
  App.defineViewModel("#detail",{
       data:{
           stock:null
       },
       watch:{},
       methods:{}
     },{
     ready:function(){
     },
     beforeRender:function (params) {
         var that =this;
         API[params.type]().then(function (data) {
             data.forEach(function (stock) {
                 if(stock.prod_code===params.stock){
                     that.model.stock =stock;
                 }
             })
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
