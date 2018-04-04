<template>
    <div class="table-fixed">
        <table cellpadding="0" cellspacing="0">
            <thead>
                <tr>
                    <th></th>
                    <th>{{columns[0]}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row,index) in value" :key="index">
                    <td :class="{'pdt20':index==0}" @click="toggleChecked(index)">
                        <div class="td-cell">
                            <img v-if="checked.indexOf(index)>-1" src="../images/radio-selected.svg" class="check-icon">
                        </div>
                    </td>
                    <td :class="{'pdt20':index==0}" v-for="(item,key,idx) in row" :key="idx" v-if="idx==0">{{ item }}</td>                    

                </tr>
            </tbody>
        </table>
        <div style="overflow-x:scroll;">
            <table cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th v-if="index>0" v-for="(item,index) in columns" :key="index">{{item}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row,index) in value" :key="index">
                        <td v-if="idx>0" v-for="(item,key,idx) in row" :key="idx" :class="{'pdt20':index==0}">{{item}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="bg">
            <div class="bg-gray"></div>
            <div class="bg-white"></div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                
            }
        },
        props: {
            columns: Array,
            value: Array,
            height: String,
            checked: Array,
            readonly: false
        },
        methods: {
            toggleChecked(index) {
                if(this.readonly) return;
                var idx = this.checked.indexOf(index);
                if(idx > -1) {
                    this.checked.splice(idx,1);
                } else {
                    this.checked.push(index);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .table-fixed {
        width: 100%;
        display: flex;
        border-top: solid 0.02rem #D7D7D7;
        position: relative;
    }
    .bg {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        z-index: -1;
    }
    .bg-gray {
        height: 0.6rem;
        background: #F8FAFB;
    }
    .bg-white {
        flex: 1;
        background: #fff;
    }
    .td-cell {
        width: 0.28rem; 
        display: inline-block;
    }
    table {
        background: #FFFFFF;
        // border-top: solid 0.02rem #D7D7D7;
        font-size: 0.26rem;
        line-height: 0.36rem;
        color: #787878;
        // min-width: 12.4rem;
        text-align: left;
        // position: relative;
    }
    table:first-child {
        // width: 100px;
    //     display: inline-block;
    // position: absolute;
    // left: 0;
    }
    table:last-child {
        flex: 1;
        min-width: 10.4rem;
    }
    thead {
        background: #F8FAFB;
        color: #9B9B9B;
        padding: 0.12rem 0.22rem 0.12rem 0.8rem;
    }
    th {
        height: 0.6rem;
        line-height: 0.6rem;
        font-weight: normal;
        padding: 0 0.15rem;                
    }
    tbody {
        padding-top: 0.3rem;
    }
    td {
        padding: 0 0.15rem;
        padding-bottom: 0.3rem;
    }
    .fixed-th {
        position: absolute;
        left: 0;
        width: 0.8rem;
        background: #F8FAFB;
    }
    td.fixed-radio {
        position: absolute;
        left: 0;
        width: 0.8rem;
        padding-left: 0.2rem;
        background: #fff;
    }
    .fixed {
        position: absolute;
        left: 0.8rem;
        background: #fff;
        min-width: 1.2rem;
    }
    th.fixed {
        background: #F8FAFB;
    }
    .pdt20 {
        padding-top: 0.2rem;
    }
   

    /* 设置滚动条的样式 */

::-webkit-scrollbar {
    width: 0.1rem;
    height: 0.08rem;
}

::-webkit-scrollbar-button {
    display: none
}

::-webkit-scrollbar-track{
    background-color: #000
}

::-webkit-scrollbar-track-piece {
    background-color: #FFFFFF;
}

::-webkit-scrollbar-thumb {
    margin-right: 0.2rem;
    background-color: #d7d7d7
}

::-webkit-scrollbar-thumb:hover {
    background-color: #aaa
}

::-webkit-scrollbar-corner {
    background-color: #535353
}

::-webkit-scrollbar-resizer {
    background-color: #FF6E00
}

::-webkit-scrollbar-thumb {
    border-radius: 0.06rem;
}
   
</style>

