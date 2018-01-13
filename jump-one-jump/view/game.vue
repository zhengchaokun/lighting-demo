
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
            const cubes = [];

            const scene = new THREE.Scene();
            const renderer = new THREE.WebGLRenderer({canvas});
            renderer.setSize(innerWidth, innerHeight);
            renderer.shadowMapEnabled = true;

            const camera = new THREE.OrthographicCamera(innerWidth / -80, innerWidth / 80, innerHeight / 80, innerHeight / -80, -1000, 5000);
            camera.position.set(80,80,80);

            //添加cube,并移动镜头
            camera.lookAt(createCube(scene,cubes));

            //添加地面
            const ground = createGround();
            scene.add(ground);

            //辅助线
            scene.add(new THREE.AxesHelper(20));


            //添加光源
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
            scene.add(ambientLight);
            scene.add(createLight());

            canvas.addEventListener("touchstart",function () {
                createCube(scene,cubes);
            });

            function render() {
                //处理镜头切换的动画
                let {x,y,z} = cubes[cubes.length-1].position;

                let xMove = x<camera.lookAt.x?0.01:0;
                let zMove = z<camera.lookAt.z?0.01:0;

                camera.lookAt(x-xMove,y,z-zMove);


                renderer.render(scene,camera);
                requestAnimationFrame(render)
            }

            render();
        }
    }

    const originLookAt =  THREE.OrthographicCamera.prototype.lookAt;
    THREE.OrthographicCamera.prototype.lookAt = function (postion) {
        this.lookTo = postion;
        originLookAt.apply(this,arguments);
    };

    function createGround() {
        const planeGeometry = new THREE.PlaneGeometry(1000,1000,1,1);
        const planeMaterial = new THREE.MeshLambertMaterial({color: "#ffcbcf"});
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
        light.position.set(3, 10, 4);
        light.castShadow = true;

        return light;
    }

    function createCube(scene,cubes) {
        const cubeGeometry = new THREE.CubeGeometry(4,1.5,4);
        const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        // cube.castShadow = true;

        cube.position.x=4;
        cube.position.y=1.5/2;
        cube.position.z=5;

        //随机产生下一个cube
        if(cubes.length>0){
            let {x,y,z} = cubes[cubes.length-1].position;

            let diff = Math.random()*4+6;
            let flag = Math.random();
            cube.position.set(x-(flag>0.5?diff:0),y,z-(flag<=0.5?diff:0))
        }

        //大于6个时移除前面的
        if(cube>6){
            scene.remove(cube.shift())
        }

        cubes.push(cube);
        scene.add(cube);

        return cube.position;
    }
</script>
<style lang="less">
</style>
