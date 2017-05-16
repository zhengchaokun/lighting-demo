App.listView.wrap({
    /* listnotITpl:_.template(' <tr style="border-top: 1px solid #eee;"><th>申购代码</th><th>发行价<br>市盈率</th><th>申购上限<br>需配市值</th><th>网上发行量</th>\
     </tr><%for(var key in result){%>\
     <tr style="background-color:#F9F9F9;"><td  style="height:30px;color:blue"> <%=key%> </td><td colspan=3></td></tr>\
     <%for(var j=0;j<result[key].length;j++){%>\
     <tr flag=<%=result[key][j].stock_code%>><td><span><%=result[key][j].prod_name%></span><br><span><%=result[key][j].prod_code%></span></td>\
     <td><span><%=isNaN(parseFloat(result[key][j].issue_price).toFixed(2))?"--":parseFloat(result[key][j].issue_price).toFixed(2)%></span><br><span><%=isNaN(parseFloat(result[key][j].diluted_pe_ratio).toFixed(2))?"--":parseFloat(result[key][j].diluted_pe_ratio).toFixed(2)%></span></td>\
     <td><span><%=parseFloat(result[key][j].allot_max).toFixed(2)%></span><br><span><%=parseFloat(result[key][j].worth_value).toFixed(2)%></span></td>\
     <td><%=isNaN(parseFloat(result[key][j].issue_vol).toFixed(2))?"--":(parseFloat(result[key][j].issue_vol)/10000).toFixed(2)%>万</td></tr><%}}%>'),
     listITpl:_.template( '<tr style="border-top: 1px solid #eee;"><th>股票代码</th><th>发行价<br>市盈率</th><th>发行日</th><th>中签率</th></tr>\
     <%_.each(lists,function(row){%><tr stock_code=<%=row.stock_code%>><td><span><%=row.prod_name%></span><br><span><%=row.stock_code%></span></td><td><span><%=parseFloat(row.issue_price).toFixed(2)%></span><br><span style="color:red"><%=parseFloat(row.diluted_pe_ratio).toFixed(2)%></span></td><td><span><%=row.distribution_date%></span></span></td><td><span style="color:red;"><%=parseFloat(row.lot_rate_online).toFixed(2)%>%</td></tr><%})%>'), */
    groupByDate: function (list) {
        var result = {};
        for (var i = 0; i < list.length; i++) {
            if (result[list[i].allocation_date]) {
                result[list[i].allocation_date].push(list[i]);
            }
            else {
                result[list[i].allocation_date] = [];
                result[list[i].allocation_date].push(list[i]);
            }
        }
        return result;
    },
    getnotIssuedList: function () {
        App.OpenAPI.get("//open.hscloud.cn/info/v2/query/new_share/not_issued", null, function (ret) {
            var list = ret.data[0]['10104011'];
            App.listView.model.set("second", '(' + list.length + '只)');
            for (var i = list.length - 1; i >= 0; i--) {
                if (!list[i].distribution_date) {
                    list.splice(i, 1);
                }
            }
            var html = App.listView.listnotITpl({lists: list});
            for (var i = 0; i < list.length; i++) {
                App.listView.notIList.push(list[i]);
            }
            $(".issue").html(html);
            App.listView.eventBind();
        })

    },
    listnotITpl: _.template('<% for(var i=0;i<lists.length;i++){if(i==0){%> <div class="content"><%}else{%><div style="margin-top:8px" class="content"><%}%>\
                       <div flag=<%=lists[i].stock_code%> class="fristLine"><%=lists[i].prod_name%><span>&nbsp;&nbsp;<%=lists[i].prod_code%></span><span class="stockCode">></span></div>\
                       <div class="common" >\
                           <div class="fristDiv">申购日期</div>\
                           <div class="secondDiv" ><%=lists[i].distribution_date?lists[i].distribution_date:"--"%></div>\
                       </div>\
                       <div class="common" >\
                           <div class="fristDiv" >申购价格(元)</div>\
                           <div class="secondDiv" style="color:red"><%=isNaN(parseFloat(lists[i].issue_price).toFixed(2))?"--":parseFloat(lists[i].issue_price).toFixed(2)%></div>\
                       </div>\
                        <div class="common">\
                           <div  class="fristDiv">申购顶格(元)</div>\
                           <div class="secondDiv">--</div>\
                       </div></div><%}%>'),
    getIssuedList: function () {
        App.OpenAPI.get("//open.hscloud.cn/info/v2/query/new_share/listed", null, function (ret) {
            var list = ret.data[0]['10104012'];
            var searchCode = '//open.hscloud.cn/quote/v1/real?en_prod_code=';
            App.listView.model.set("third", '(' + list.length + '只)');
            for (var i = 0; i < list.length; i++) {
                searchCode = searchCode + list[i].stock_code;
                var market = list[i].secu_market;
                if (market == '90') {
                    searchCode = searchCode + ".SZ";
                    list[i].code = list[i].stock_code + ".SZ";
                }
                else {
                    searchCode = searchCode + ".SS";
                    list[i].code = list[i].stock_code + ".SS";
                }
                if (i != list.length - 1) {
                    searchCode = searchCode + ","
                }
            }
            App.OpenAPI.get(searchCode, null, function (ret) {
                var result = ret.data.snapshot;
                var index = result.fields.indexOf('last_px');
                for (var i = 0; i < list.length; i++) {
                    var temp = list[i].code;
                    if (result[temp]) {
                        list[i].last_px = result[temp][index];
                    }
                }
                var html = App.listView.listIdTpl({lists: list});
                $(".issued").html(html);
                App.listView.eventIBind();

            })


        })

    },
    listIdTpl: _.template('<% for(var i=0;i<lists.length;i++){if(i==0){%> <div  class="content"><%}else{%><div style="margin-top:8px" class="content"><%}%>\
                       <div stock_code=<%=lists[i].code%> class="fristLine"><%=lists[i].prod_name%><span>&nbsp;&nbsp;<%=lists[i].prod_code%></span><span class="stockCode">></span></div>\
                       <div class="common" >\
                           <div class="fristDiv">发行价(元)</div>\
                           <div class="secondDiv"><%=isNaN(parseFloat(lists[i].issue_price).toFixed(2))?"--":parseFloat(lists[i].issue_price).toFixed(2)%></div>\
                       </div>\
                       <div class="common" >\
                           <div class="fristDiv" >当前价(元)</div>\
                           <div class="secondDiv"><%=lists[i].last_px>=0?lists[i].last_px:"--"%></div>\
                       </div>\
                        <div class="common">\
                           <div  class="fristDiv">市盈率(%)</div>\
                           <div class="secondDiv" style="color:red"><%=isNaN(parseFloat(lists[i].diluted_pe_ratio).toFixed(2))?"--":parseFloat(lists[i].diluted_pe_ratio).toFixed(2)%></div>\
                       </div></div><%}%>'),
    getIssueingList: function () {
        App.OpenAPI.get("//open.hscloud.cn/info/v2/query/new_share/issued_not_listed", null, function (ret) {
            var list = ret.data[0]['10104013'];

            App.listView.model.set("first", '(' + list.length + '只)');
            var html = App.listView.listIingTpl({lists: list});
            for (var i = 0; i < list.length; i++) {
                App.listView.notIList.push(list[i]);
            }
            $(".issueing").html(html);
            App.listView.eventBind();

        })

    },
    listIingTpl: _.template('<% for(var i=0;i<lists.length;i++){if(i==0){%> <div class="content"><%}else{%><div style="margin-top:8px" class="content"><%}%>\
                       <div flag=<%=lists[i].stock_code%> class="fristLine"><%=lists[i].prod_name%><span >&nbsp;&nbsp;<%=lists[i].prod_code%></span><span class="stockCode">></span></div>\
                       <div class="common">\
                           <div class="fristDiv">中签公布日期</div>\
                           <div class="secondDiv"><%=!lists[i].allocation_date?"--":lists[i].allocation_date%></div>\
                       </div>\
                        <div class="common">\
                           <div  class="fristDiv">发行价(元)</div>\
                           <div class="secondDiv"><%=isNaN(parseFloat(lists[i].issue_price).toFixed(2))?"--":parseFloat(lists[i].issue_price).toFixed(2)%></div>\
                       </div></div><%}%>'),


    getpurchase_todayList: function () {
        App.OpenAPI.get("//open.hscloud.cn/info/v2/query/new_share/purchase_today", null, function (ret) {
            var list = ret.data[0]['10104010'];

            App.listView.model.set("num", '(' + list.length + '只)');
            var html = App.listView.purchase_todayTpl({lists: list});
            for (var i = 0; i < list.length; i++) {
                App.listView.notIList.push(list[i]);
            }
            $(".purchase_today").html(html);
            App.listView.eventBind();

        })

    },
    purchase_todayTpl: _.template('<% for(var i=0;i<lists.length;i++){if(i==0){%> <div class="content"><%}else{%><div style="margin-top:8px" class="content"><%}%>\
                       <div flag=<%=lists[i].stock_code%> class="fristLine"><%=lists[i].prod_name%><span >&nbsp;&nbsp;<%=lists[i].prod_code%></span><span class="stockCode">></span></div>\
                       <div class="common">\
                           <div class="fristDiv">中签公布日期</div>\
                           <div class="secondDiv"><%=!lists[i].allocation_date?"--":lists[i].allocation_date%></div>\
                       </div>\
                        <div class="common">\
                           <div  class="fristDiv">发行价(元)</div>\
                           <div class="secondDiv"><%=isNaN(parseFloat(lists[i].issue_price).toFixed(2))?"--":parseFloat(lists[i].issue_price).toFixed(2)%></div>\
                       </div></div><%}%>'),


    eventIBind: function () {
        this.$el.find('div[stock_code]').bind("tap", function () {
            var code = $(this).attr('stock_code');
            window.location.href = 'https://light.hscloud.cn/apps/quote/index.html#quote/' + code;
        })
    },
    eventBind: function () {
        this.$el.find(' div[flag]').bind("tap", function () {
            window.location.href = "index.html?view=detail#detail/" + $(this).attr('flag');
        })
        this.$el.find(".top").bind("tap", function () {
            window.location.href = "infor.html";
        })
    },


    afterRender: function () {
        var i = 0;
        var aa = setInterval(function () {
            $('body').scrollTop(1 * i);
            i = i + 1;
            if (i == 81) {
                clearInterval(aa)
            }
        }, 10)
        /*$("html,body").animate({ scrollTop: 80 }, 1500); */
        App.listView.notIList = [];
        this.getIssueingList();
        this.getnotIssuedList();
        this.getIssuedList();
        this.getpurchase_todayList();

    }

})