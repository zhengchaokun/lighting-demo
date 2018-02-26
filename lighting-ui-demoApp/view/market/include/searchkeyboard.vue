<template>
    <!--键盘-->
    <div>
        <div style="width:750;height:440;background-color:#ffffff;position: absolute;" :style="{visibility: keyboardType == 'num' ? 'visible':'hidden'}" v-if="showKeyboard">
            <div class="keycover" :style="{left:item.left,top:item.top,height:item.height}" v-for="(item,i) in normallist">
                <text :style="{height:item.height}" :class="[selectStyle(item)]" :value="item.v" @click="onKeyClick(item.v)"></text>
            </div>
            <div class="keycover" style="position: absolute;width:150;height:110;left:450;top:330;">
                <text class="key6" @click="onKeyClick('ok')">确定</text>
            </div>
            
            <div style="position: absolute;width:150;height:110;left:600;top:0;border-left-width:1;border-top-width:1;border-color:#dddddd;align-items:center;background-color:#eeeeee;"@click="onKeyClick('delet')">
                <image style="width:60;height:60;margin-top:25;" src="images/hlkb_keyboard_btn_delet.png" resize="contain"></image>
            </div>
            <div class="keycover" style="height:110;left:600;top:330;background-color:#eeeeee;" @click="onKeyClick('down')">
                <text class="key5">隐藏</text>
            </div>
        </div>
        <div style="width:750;height:440;background-color:#cecece;position: absolute;" :style="{visibility: keyboardType != 'num' ? 'visible':'hidden'}" v-if="showKeyboard">
            <div class="keycoverqwert" :style="{left:item.left,top:item.top}" v-for="(item,i) in qwertlist">
                <text class="key3" :value="item.v" @click="onKeyClick(item.v)"></text>
            </div>
            <div style="width:100;height:78;left:15;top:246;background-color:#cdcfd6;" class="keycover2">
                <image style="width:50;height:50;margin-top:14;" src="images/hlkb_keyboard_btn_upcase.png" resize="contain"></image>
            </div>
            <div style="width:100;height:78;left:635;top:246;background-color:#cdcfd6;" class="keycover2">
                <image style="width:50;height:50;margin-top:14;" src="images/hlkb_keyboard_btn_delet.png" resize="contain" @click="onKeyClick('delet')"></image>
            </div>
            <text style="width:150;height:78;left:15;top:359;color:#ffffff;background-color:#cdcfd6;" class="key4" @click="setType('num')">123</text>
            <text style="width:300;height:78;left:170;top:359;color:#000000;background-color:#ffffff;" class="key4" @click="onKeyClick('')">清 空</text>
            <div style="width:100;height:78;left:475;top:359;background-color:#ffffff;" class="keycover2">
                <image style="width:50;height:50;margin-top:14;" src="images/hlkb_keyboard_btn_keyboard.png" resize="contain" @click="onKeyClick('down')"></image>
            </div>
            <text style="width:155;height:78;left:580;top:359;color:#ffffff;background-color:#4a90e2;" class="key4">搜索</text>
        </div>
    </div>
</template>
<style>
    .keycover{
        position: absolute;
        width:150;
        border-left-width:1;
        border-top-width:1;
        border-color:#dddddd;
    }
    .keycover2{
        position: absolute;
        border-left-width:1;
        border-top-width:1;
        border-right-width:1;
        border-bottom-width:4;
        border-left-color:#c0c0c0;
        border-top-color:#c0c0c0;
        border-right-color:#c0c0c0;
        border-bottom-color:#9e9e9e;
        border-radius:10;
        align-items:center;
    }
    .keycoverqwert{
        position: absolute;
        width:68.5;
        height:78;
    }
    .key1{
        width:150;
        padding-top:21.5;
        font-size:40;
        color:#000000;
        text-align:center;
        background-color:#ffffff;
    }
    .key1:active{
        width:150;
        padding-top:21.5;
        font-size:40;
        color:#ffffff;
        text-align:center;
        background-color:#eeeeee;
    }
    .key2{
        width:150;
        padding-top:32.5;
        font-size:40;
        color:#000000;
        text-align:center;
        background-color:#ffffff;
    }
    .key2:active{
        width:150;
        padding-top:32.5;
        font-size:40;
        color:#000000;
        text-align:center;
        background-color:#eeeeee;
    }
    .key3{
        width:68.5;
        height:78;
        font-size:40;
        padding-top:15;
        color:#000000;
        background-color:#ffffff;
        text-align:center;
        border-left-width:1;
        border-top-width:1;
        border-right-width:1;
        border-bottom-width:4;
        border-left-color:#c0c0c0;
        border-top-color:#c0c0c0;
        border-right-color:#c0c0c0;
        border-bottom-color:#9e9e9e;
        border-radius:10;
    }
    .key3:active{
            width:68.5;
            height:78;
            font-size:40;
            padding-top:15;
            color:#000000;
            background-color:#eeeeee;
            text-align:center;
            border-left-width:1;
            border-top-width:1;
            border-right-width:1;
            border-bottom-width:4;
            border-left-color:#c0c0c0;
            border-top-color:#c0c0c0;
            border-right-color:#c0c0c0;
            border-bottom-color:#9e9e9e;
            border-radius:10;
    }
    .key4{
            font-size:40;
            padding-top:15;
            text-align:center;
            border-left-width:1;
            border-top-width:1;
            border-right-width:1;
            border-bottom-width:4;
            border-left-color:#c0c0c0;
            border-top-color:#c0c0c0;
            border-right-color:#c0c0c0;
            border-bottom-color:#9e9e9e;
            border-radius:10;
            position: absolute;
    }
    .key6{
        height: 110;
        padding-top:35;
        width:150;
        background-color:#3399FF;
        color:#FFFFFF;
        font-size:40;
        text-align:center;
    }
    .key6:active{
        width:150;
        font-size:40;
        color:#ffffff;
        text-align:center;
        background-color:#eeeeee;
    }
    .key5{
        width:150;
        padding-top:35;
        font-size:40;
        color:#000000;
        text-align:center;
        background-color:#eeeeee;
    }
    .key5:active{
        width:150;
        padding-top:35;
        font-size:40;
        color:#ffffff;
        text-align:center;
        background-color:#eeeeee;
    }

</style>
<script>
    var getBaseURL = require('../../.././js/base-url.js').getBaseURL;
    module.exports = {
        data:function(){
            return{
                keyheight1:88,
                keyheight2:110,
                showKeyboard:true,
                keyboardType:'num',//type:num,qwert
                normallist:[
                    {left:'0',top:'0',height:'110',v:'600'},
                    {left:'0',top:'110',height:'110',v:'601'},
                    {left:'0',top:'220',height:'110',v:'000'},
                    {left:'0',top:'330',height:'110',v:'ABC'},
                    {left:'150',top:'0',height:'110',v:'1'},
                    {left:'150',top:'110',height:'110',v:'4'},
                    {left:'150',top:'220',height:'110',v:'7'},
                    {left:'150',top:'330',height:'110',v:'.'},
                    {left:'300',top:'0',height:'110',v:'2'},
                    {left:'300',top:'110',height:'110',v:'5'},
                    {left:'300',top:'220',height:'110',v:'8'},
                    {left:'300',top:'330',height:'110',v:'0'},
                    {left:'450',top:'0',height:'110',v:'3'},
                    {left:'450',top:'110',height:'110',v:'6'},
                    {left:'450',top:'220',height:'110',v:'9'},
                    {left:'600',top:'110',height:'110',v:'002'},
                    {left:'600',top:'220',height:'110',v:'300'}
                ],
                qwertlist:[],
                qwertlistvalue:['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'],
                baseUrl:""
            }
        },
        created:function(){
            this.baseUrl = getBaseURL(this);
            this.calculateList();
        },
        methods:{
            selectStyle:function(item){
                var type = "key1";
                if(item.height==this.keyheight2){
                    type = "key2";
                }
                if (item.v == "ABC") {
                    type = "key5";
                }
                return type;
            },
            onKeyClick:function(key){
                if(key!="ABC"&&key!="清空"&&key!="ok"&&key!="down"){
                    this.$emit('onKeyboardClick', key);
                }else if(key=="ABC"){//切换到qwert键盘
                    this.setType("qwert");
                }else if(key=="清空"){
                    this.$emit('onKeyboardClick', "");
                }else if(key=="ok"||key=="down"){//让键盘消失
                    //this.showKeyboard = false;
                    this.$emit('onKeyboardClick', key);
                }
            },
            openKeyboard:function(){
                console.log('open keyboard!');
                this.showKeyboard = true;
            },
            closeKeyboard:function(){
                this.showKeyboard = false;
            },
            calculateList:function(){//计算字母qwert全键盘的location信息
                //第一排有10个字母
                var marginleft = 10;
                var margintop = 20;
                var space = 5;
                var width = (750-65)/10;//总宽度减去所有间隔
                var height = (440 -20 -35 -35 -35 -3)/4;//去掉所有纵向间隔，算出高度是78
                var top = 0;
                for(var i=0;i<10;i++){
                    var result={};
                    result.left = marginleft+i*(width+space);
                    result.top = margintop+top;
                    result.v = this.qwertlistvalue[i];
                    this.qwertlist.push(result);
                }
                //第二排有9个字母
                top = 78+35;//按键高度+纵向间距
                marginleft = (750 - width*9 - 8*space)/2;
                for(var i=0;i<9;i++){
                    var result={};
                    result.left = marginleft+i*(width+space);
                    result.top = margintop+top;
                    result.v = this.qwertlistvalue[i+10];
                    this.qwertlist.push(result);
                }
                //第三排有7个字母
                top = (78+35)*2;
                marginleft = (750 - width*7 - 6*space)/2;
                for(var i=0;i<7;i++){
                    var result={};
                    result.left = marginleft+i*(width+space);
                    result.top = margintop+top;
                    result.v = this.qwertlistvalue[i+19];
                    this.qwertlist.push(result);
                }
            },
            setType:function(type){
                this.keyboardType = type;
            }
        }
    }
</script>
