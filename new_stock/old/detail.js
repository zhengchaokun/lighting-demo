;App.detailView.wrap({

    afterRender: function (arg) {
        window.scrollTo(0, 0);
        if (arg && App.listView.notIList) {
            var list = App.listView.notIList;
            var resultObj = {};
            for (var i = 0; i < list.length; i++) {
                if (list[i].stock_code == arg) {
                    resultObj = list[i];
                    break;
                }
            }
            this.model.set('allocation_date', resultObj.allocation_date ? resultObj.allocation_date : "--");
            this.model.set('prod_name', resultObj.prod_name);
            this.model.set('stock_code', resultObj.stock_code);
            this.model.set('prod_code', resultObj.prod_code);
            this.model.set('issue_price', resultObj.issue_price ? (parseFloat(resultObj.issue_price)).toFixed(2) : '--');
            /*this.model.set('naps',resultObj.naps?resultObj.naps:'--');*/
            this.model.set('secu_market', resultObj.secu_market == 83 ? '上海证券交易所' : '深圳证券交易所');
            this.model.set('allot_max', resultObj.allot_max ? (parseFloat(resultObj.allot_max) / 10000).toFixed(2) : '--');
            this.model.set('issue_amount', resultObj.issue_amount ? (parseFloat(resultObj.issue_amount) / 10000).toFixed(2) : '--');
            this.model.set('distribution_date', resultObj.distribution_date ? resultObj.distribution_date : "--");
            this.model.set('indurstry', resultObj.indurstry ? resultObj.indurstry : "--");
            this.model.set('diluted_pe_ratio', resultObj.diluted_pe_ratio ? parseFloat(resultObj.diluted_pe_ratio).toFixed(2) : '--');
            this.model.set('issue_vol', resultObj.issue_vol ? (parseFloat(resultObj.issue_vol) / 10000).toFixed(2) : '--');
            this.$el.find(".gsjj").html(resultObj.brief_introduction);

        }
        else {
            // window.location.href = "#list";
        }

    }

    /* eventBind:function(){
     this.$el.find(".top").bind("tap",function(){

     })
     },
     */


})