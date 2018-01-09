<template>
    <div class="wrapper">
        <lc-grid :list="list" :border="true"></lc-grid>
    </div>
</template>

<script>
    import Light from "light";
    import { LcGrid } from 'lighting-ui';
    import DATA from 'DATA'

    export default {
        components:{LcGrid},
        data: () => ({
            list: DATA
        }),
        methods: {

        }
    };
</script>