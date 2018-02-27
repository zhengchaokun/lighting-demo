
<template>
    <div style="background-color:#f0eff4;">
        <scroller>
            <lc-cell label="股票" :has-arrow="true">             
            </lc-cell>
        </scroller> 
    </div>
</template>
<script>
import App from "light";
import LcCell from "lighting-ui/packages/lc-cell";
    export default {
        components: { LcCell },
        data(){
            return {
            }
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>

</style>
