<template>
    <div class="card">
        <!-- H5 -->
        <div
            class="card-content"
            v-if="type == 0"
            @click="onCardClicked">
                <h4 :title="data.show_name">{{data.show_name}}</h4>
                <span :title="data.app_describe">{{data.app_describe || '暂无描述'}}</span>
                <i>ID: {{data.id}}</i>
                <div class="line"></div>
                <div class="tag spot-green">{{getCompStatus()}}</div>
                <template v-if="parsedTagsArr.length>0">
                    <div class="tag spot-blue" v-for="(tag, index) in parsedTagsArr" :key="index">{{tag}}</div>
                </template>
        </div>
        <div class="card-menu" v-if="type == 0 && edit == true">
            <span class="card-menu-item" v-if="!isBuy" @click="onEditClicked"><img src="images/card-edit.svg" alt="edit"><span>编辑</span></span>
            <span class="card-menu-item" v-if="showDelete" @click="onDeleteClicked"><img src="images/card-delete.svg" alt="delete"><span>删除</span></span>
            <span class="card-menu-item disabled" v-if="showDisDelete" @click="onDisDeleteClicked"><img src="images/card-delete-disabled.svg" alt="delete"><span>删除</span></span>
        </div>
        <!-- APP -->
        <div
            class="card-content"
            v-if="type == 1"
            @click="onCardClicked">
                <h4 :title="data.show_name">{{data.show_name}}</h4>
                <span :title="data.app_describe">{{data.app_describe || '暂无描述'}}</span>
                <i>ID: {{data.id}}</i>
                <div class="line"></div>
                <div class="tag spot-green" v-if="getAppSystem()">{{getAppSystem()}}</div>
                <div class="tag spot-blue" v-for="(tag, index) in data.appTag" :key="index">{{tag}}</div>
        </div>
        <div class="card-menu" v-if="type == 1 && edit == true">
            <span class="card-menu-item" @click="onEditClicked"><img src="images/card-edit.svg" alt="edit"><span>编辑</span></span>
            <span class="card-menu-item" @click="onDeleteClicked"><img src="images/card-delete.svg" alt="delete"><span>删除</span></span>
        </div>
    </div>
</template>

<style scoped lang="less">
    .card {
        display: inline-block;
        position: relative;
        width: 260px;
        margin-top: 20px;
        margin-right: 20px;
        border: 1px solid #D2D9E3;
        border-radius: 2px;
        cursor: pointer;
        vertical-align: bottom;
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 2px 4px 0 #B5C1D4;
            transition: transform 0.1s ease-out;
        }
    }
    .card-content {
        height: 140px;
        padding: 12px 10px 8px;
    }
    .card-content h4{
        font-size: 18px;
        color: #303030;
        letter-spacing: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .card-content span{
        display: block;
        margin-top: 8px;
        font-size: 14px;
        color: #646464;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .card-content i{
        display: block;
        margin-top: 6px;
        font-size: 12px;
        font-style: normal;
        color: #9B9B9B;
        letter-spacing: -0.9px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .card-content .line{
        width: 100%;
        margin: 6px 0;
    }
    .card-content .tag{
        display: inline-block;
        margin-left: 6px;
        margin-right: 18px;
        font-size: 12px;
        color: #909090;
        letter-spacing: 0;
    }
    .card-content .tag:before{
        content:'';
        position: relative;
        right: 2px;
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 12px;
        right: 4px;
        top: 2px;

    }
    .spot-green:before{
        background-color: #7DCE23;
    }

    .spot-red:before{
        background-color: #F77181;
    }

    .spot-blue:before{
        background-color: #85C0E9;
    }

    .spot-yellow:before{
        background-color: #F1AE40;
    }

    .card-menu{
        height: 40px;
        background-color: #F5F7FA;
        display: flex;
        justify-content: center;
    }

    .card-menu-item {
        flex: 1;
        display: flex;
        justify-content: center;
        line-height: 45px;
        font-size: 14px;
        color: #0AA9F1;
        letter-spacing: 0;
        position: relative;
    }
    .card-menu-item.disabled{
        cursor: not-allowed;
        color: #dddddd;
    }
    .card-menu-item img{
        display: inline-block;
    }
    .card-menu-item span{
        display: none;
    }
    .card-menu-item:hover img{
        display: none;
    }
    .card-menu-item:hover span{
        display: inline-block;
    }    
    .card-menu-item:after {
        content: '|';
        position: absolute;
        left: 100%;
        color: #D2D9E3;
    }

    .card-menu-item:last-child::after {
        content: '';
    }
</style>

<script>
    export default {
        props:{
            type: {
                type: [String,Number],
                default: 0
            },
            edit: {
                type: Boolean,
                default: false
            },
            data: Object
        },
        computed:{
            isBuy(){
                if(this.data.is_buy == '1'){
                    return true
                }else{
                    return false
                }
            },
            showDelete(){
                if(this.data.store_status!='2'){
                    return true;
                }else{
                    return false;
                }
            },
            showDisDelete(){
                if(this.data.store_status!='2' && this.data.inst_num > 0){
                    return true;
                }else{
                    return false;
                }
            },
            parsedTagsArr() {
                debugger
                let arr = [];
                if(this.data.tagsArr && this.data.tagsArr.length>0) {
                    this.data.tagsArr.forEach(function(item, idx) {
                        switch (item) {
                            case 'ios':
                                arr[idx] = 'iOS';
                                break;
                            case 'android':
                                arr[idx] = 'Android';
                                break;
                            case 'formal':
                                arr[idx] = '正式';
                                break;
                            case 'test':
                                arr[idx] = '测试';
                                break;
                            default:
                                break;
                        }
                    })
                }
                return arr;
                
            }
        },
        methods:{
            onCardClicked(e){
                let _this = this;
                this.$emit('cardClicked', _this.data);
            },
            onEditClicked(e){
                let _this = this;
                this.$emit('editClicked', _this.data);
            },
            onDeleteClicked(e){
                let _this = this;
                this.$emit('deleteClicked', _this.data);
            },
            onDisDeleteClicked(e){
                let _this = this;
                this.$emit('disDeleteClicked',  _this.data);
            },
            getCompStatus(){
                if(this.data.app_status == 1){
                    return '未发布';
                }
                if(this.data.app_status == 3 && this.data.store_status != 2){
                    return '已发布';
                }
                if(this.data.app_status == 3 && this.data.store_status == 2){
                    return '已上架';
                }
            },
            getAppSystem(){
                if(this.data.type == 'android'){
                    return 'Android'
                }
                if(this.data.type == 'ios'){
                    return 'iOS'
                }
                return undefined;
            }
        }
    }
</script>