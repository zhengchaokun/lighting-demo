
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
            const camera = new THREE.OrthographicCamera(innerWidth / -80, innerWidth / 80, innerHeight / 80, innerHeight / -80, -1000, 5000);
            camera.position.set(80,80,80);
            camera.lookAt(0,0,0)

            //添加地面
            const ground = createGround();
            scene.add(ground);

            //辅助线
            scene.add(new THREE.AxesHelper(20));

            //添加cube
            scene.add(createCube());

            //添加光源
            const ambientLight = new THREE.AmbientLight(0x0c0c0c);
            scene.add(ambientLight);
            scene.add(createLight());

            function render() {
                // ground.rotation.x+=0.01;
                renderer.render(scene,camera);
                requestAnimationFrame(render)
            }

            render();
        }
    }

    function createGround() {
        const planeGeometry = new THREE.PlaneGeometry(20,20,1,1);
        const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        const plane = new THREE.Mesh(planeGeometry,planeMaterial);
        plane.receiveShadow  = true;

        plane.rotation.x=-0.5*Math.PI;
        plane.position.x=0;
        plane.position.y=0;
        plane.position.z=0;

        return plane;
    }

    function createLight() {
        let light = new THREE.DirectionalLight(0xffffff, 1.1);
        light.position.set(5, 4, 2);
        light.castShadow = true;

        return light;
    }

    function createCube() {
        const cubeGeometry = new THREE.CubeGeometry(4,1.5,4);
        const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;

        cube.position.x=4;
        cube.position.y=1.5/2;
        cube.position.z=5;
        return cube;
    }
</script>
<style lang="less">
</style>
