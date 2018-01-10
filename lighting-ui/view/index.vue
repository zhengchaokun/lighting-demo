<template>
    <scroller>
        <div class="wrapper">
            <!-- <div v-for="(data,i) in datas" :key="i">
                <lc-cell :label="data.label" :link="data.path"></lc-cell>
            </div> -->
            <lc-cell :cell-style="style" :has-bottom-border="hasBottomBorder(i)" :has-top-border="hasTopBorder(i)" v-for="(data,i) in datas" :key="i" :label="data.label" :link="data.path"></lc-cell>
        </div>
    </scroller>
</template>

<script>
    import LcCell from 'lighting-ui/packages/lc-cell';
    import datas from '../lib/DATA.js';
    
    export default {
        components: { LcCell},
        data: () => ({
            datas:datas,
            style:{
            }
        }),
        methods: {
            hasTopBorder(i) {
                return i== this.datas.length-1 ? true : false;
            },
             hasBottomBorder(i) {
                return i== this.datas.length-1 ? false : true;
            }

        }
    };
</script>