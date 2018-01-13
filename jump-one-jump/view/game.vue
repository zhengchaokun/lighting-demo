
<template>
    <div>
       <canvas ref="canvas"></canvas>
    </div>
</template>
<script>
    const THREE = require("three");
    export default {
        data(){
            return {}
        },
        mounted(){
            const canvas = this.$refs.canvas;

            const scene = new THREE.Scene();
            const renderer = new THREE.WebGLRenderer({canvas});
            renderer.setSize(innerWidth, innerHeight);
            const camera = new THREE.OrthographicCamera(innerWidth / -80, innerWidth / 80, innerHeight / 80, innerHeight / -80, 0, 5000);

            //添加地面
            scene.add(createGround());

            //添加光源
            const ambientLight = new THREE.AmbientLight(0x0c0c0c);
            scene.add(ambientLight);
            scene.add(createLight());

            renderer.render(scene,camera);
        }
    }

    function createGround() {
        const planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
        const planeMaterial =    new THREE.MeshLambertMaterial({color: 0xffffff});
        const plane = new THREE.Mesh(planeGeometry,planeMaterial);
        plane.receiveShadow  = true;

        plane.rotation.x=-0.5*Math.PI;
        plane.position.x=15;
        plane.position.y=0;
        plane.position.z=0;

        return plane;
    }

    function createLight() {
        const spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set( 40, 40, 40 );
        spotLight.castShadow = true;

        return spotLight;
    }
</script>
<style lang="less">
</style>
