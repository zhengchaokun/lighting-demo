const THREE = require("three");

const config = {
    background: "#fcd9d3", // 背景颜色
    ground: -0.5, // 地面y坐标
    fallingSpeed: 0.5, // 游戏失败掉落速度
    cubeColor: "#fff",
    cubeWidth: 3, // 方块宽度
    cubeHeight: 1, // 方块高度
    cubeDeep: 3, // 方块深度
    jumperColor: "#3f3857",
    jumperWidth: 1, // jumper宽度
    jumperHeight: 2, // jumper高度
    jumperDeep: 1, // jumper深度
    mSpeed:0.005,
    ySpeed:0.01,
};

let Game = function (options) {
    this.options = options;

    // 游戏状态
    this.score = 0;
    this.size = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    this.scene = new THREE.Scene();

    this.cameraPos = {
        current: new THREE.Vector3(0, 0, 0), // 摄像机当前的坐标
        next: new THREE.Vector3() // 摄像机即将要移到的位置
    };
    this.camera = new THREE.OrthographicCamera(this.size.width / -80, this.size.width / 80, this.size.height / 80, this.size.height / -80, 0, 5000);
    this.camera.position.set(100, 100, 100);

    this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas:this.options.canvas
    });

    this.cubes = []; // 方块数组
    this.cubeStat = {
        nextDir: 'left' // 下一个方块相对于当前方块的方向: 'left' 或 'right'
    };
    this.jumperStat = {
        ready: false, // 鼠标按完没有
        mSpeed: 0, // xSpeed根据鼠标按的时间进行赋值
        ySpeed: 0  // ySpeed根据鼠标按的时间进行赋值
    };
    this.falledStat = {
        location: -1, // jumper所在的位置
        distance: 0 // jumper和最近方块的距离
    };
    this.fallingStat = {
        speed: 0.2, // 游戏失败后垂直方向上的掉落速度
        end: false // 掉到地面没有
    };
};
Game.prototype = {
    init: function () {
        this.renderer.setSize(this.size.width, this.size.height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        //添加最强地表
        const planeGeometry = new THREE.PlaneGeometry(1000,1000,1,1);
        const planeMaterial =    new THREE.MeshLambertMaterial({color: config.background});
        const plane = new THREE.Mesh(planeGeometry,planeMaterial);
        plane.receiveShadow  = true;
        plane.rotation.x=-0.5*Math.PI;
        plane.position.x=0;
        plane.position.y=-config.cubeHeight/2;
        plane.position.z=0;
        this.scene.add(plane);

        //直射光
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 1, 100 );
        directionalLight.position.set( 20, 10, -10 );
        // directionalLight.castShadow = true;
        // directionalLight.shadow.mapSize.width = 1000;
        // directionalLight.shadow.mapSize.height = 1000;

        // directionalLight.shadow.camera.near = 5;
        // directionalLight.shadow.camera.far = 100;
        // directionalLight.shadow.camera.bottom = -1;
        // directionalLight.shadow.camera.top = 10;
        // directionalLight.shadow.camera.left = -10 ;
        // directionalLight.shadow.camera.right = 5;
        this.scene.add( directionalLight );

        //聚光灯
        const spotLight = new THREE.SpotLight( 0xffffff, 0.5 );
        spotLight.angle = 0.6;
        spotLight.penumbra = 0.05;
        spotLight.decay = 2;
        spotLight.distance = 200;
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 10;
        spotLight.shadow.camera.far = 30;
        spotLight.name = "spotLight";
        this.scene.add( spotLight );

        //散射光
        const ambientLight = new THREE.AmbientLight(0xFFFFFF,0.4);
        this.scene.add(ambientLight);

        let that = this;
        function touchStart(evt) {
            let foot = that.jumper.getObjectByName("foot");
            if (!that.jumperStat.ready && foot.scale.x<2) {

                that.jumperStat.mSpeed+=config.mSpeed;//横向速度
                that.jumperStat.ySpeed+=config.ySpeed;//竖向速度

                //下肢变粗
                foot.scale.set(
                    foot.scale.x+0.01,
                    foot.scale.y+0.01,
                    foot.scale.z+0.01
                );

                //盒子变压缩
                that.cubes[that.cubes.length-2].scale.z+=0.001
                that.cubes[that.cubes.length-2].scale.x+=0.001
                that.cubes[that.cubes.length-2].scale.y-=0.005

                that.render(that.scene, that.camera);
                requestAnimationFrame(touchStart);
            }
        }
        function touchEnd() {
            triggerJump.call(that)
        }
        that.renderer.domElement.addEventListener("touchstart",touchStart);
        that.renderer.domElement.addEventListener("touchend", touchEnd);

        that.start();
    },
    // 基于更新后的摄像机位置，重新设置摄像机坐标
    _updateCamera: function () {
        let self = this;
        let c = {
            x: self.cameraPos.current.x,
            y: self.cameraPos.current.y,
            z: self.cameraPos.current.z
        };
        let n = {
            x: self.cameraPos.next.x,
            y: self.cameraPos.next.y,
            z: self.cameraPos.next.z
        };
        if (c.x > n.x || c.z > n.z) {
            self.cameraPos.current.x -= 0.1;
            self.cameraPos.current.z -= 0.1;
            if (self.cameraPos.current.x - self.cameraPos.next.x < 0.05) {
                self.cameraPos.current.x = self.cameraPos.next.x
            }
            if (self.cameraPos.current.z - self.cameraPos.next.z < 0.05) {
                self.cameraPos.current.z = self.cameraPos.next.z
            }
            self.camera.lookAt(new THREE.Vector3(c.x, 0, c.z));
            self.render();
            requestAnimationFrame(function () {
                self._updateCamera()
            })
        }
    },
    // 新增一个方块, 新的方块有2个随机方向
    _createCube: function () {
        let material = new THREE.MeshLambertMaterial({color: config.cubeColor});
        let geometry = new THREE.CubeGeometry(config.cubeWidth, config.cubeHeight, config.cubeDeep);
        let mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        if (this.cubes.length) {
            let random = Math.random();
            this.cubeStat.nextDir = random > 0.5 ? 'left' : 'right';
            mesh.position.x = this.cubes[this.cubes.length - 1].position.x;
            mesh.position.y = this.cubes[this.cubes.length - 1].position.y;
            mesh.position.z = this.cubes[this.cubes.length - 1].position.z;
            if (this.cubeStat.nextDir === 'left') {
                mesh.position.x = this.cubes[this.cubes.length - 1].position.x - 4 * Math.random() - 6
            } else {
                mesh.position.z = this.cubes[this.cubes.length - 1].position.z - 4 * Math.random() - 6
            }
        }
        mesh.receiveShadow = true;

        this.cubes.push(mesh);
        // 当方块数大于6时，删除前面的方块，因为不会出现在画布中
        if (this.cubes.length > 6) {
            this.scene.remove(this.cubes.shift())
        }
        this.scene.add(mesh);
        // 每新增一个方块，重新计算摄像机坐标
        if (this.cubes.length > 1) {
            let lastIndex = this.cubes.length - 1;
            let pointA = {
                x: this.cubes[lastIndex].position.x,
                z: this.cubes[lastIndex].position.z
            };
            let pointB = {
                x: this.cubes[lastIndex - 1].position.x,
                z: this.cubes[lastIndex - 1].position.z
            };
            let pointR = new THREE.Vector3();
            pointR.x = (pointA.x + pointB.x) / 2;
            pointR.y = 0;
            pointR.z = (pointA.z + pointB.z) / 2;
            this.cameraPos.next = pointR
        }

        //调整jumper的朝向
        // if(this.cubeStat.nextDir === "left"){
        //     this.jumper.rotation.y = Math.PI/2;
        // }else{
        //     this.jumper.rotation.y = 0;
        // }
        //调整jumper的朝向
        const that = this;
        function justPosition(dist) {
            if(dist-that.jumper.rotation.y>0.1){
                that.jumper.rotation.y+=0.1
                that.render()
                requestAnimationFrame(function () {
                    justPosition(dist)
                })
            }
            if(dist-that.jumper.rotation.y<-0.1){
                that.jumper.rotation.y-=0.1
                that.render()
                requestAnimationFrame(function () {
                    justPosition(dist)
                })
            }
        }
        if(this.cubes.length>1 && this.cubeStat.nextDir === "left"){
            justPosition(Math.PI/2)
        }else{
            justPosition(0)
        }

        let {x,y,z} = mesh.position;
        this.scene.getObjectByName("spotLight").position.set( 20+x, 12+y, -10+z );
        this.scene.getObjectByName("spotLight").target = mesh;
    },
    render: function () {
        this.renderer.render(this.scene, this.camera)
    },
    start: function () {
        this.score = 0;
        this.cameraPos = {
            current: new THREE.Vector3(0, 0, 0),
            next: new THREE.Vector3()
        };
        this.fallingStat = {
            speed: 0.2,
            end: false
        };
        // 删除所有方块
        let length = this.cubes.length;
        for (let i = 0; i < length; i++) {
            this.scene.remove(this.cubes.pop())
        }
        // 删除jumper
        this.scene.remove(this.jumper);
        this.jumper = require("./game/jumper").createJumper();
        this.scene.add(this.jumper);

        // 显示的分数设为 0
        this._createCube();
        this._createCube();

        this._updateCamera()
    },
};


function triggerJump() {
    let that = this;
    that.jumperStat.ready = true;
    if (that.jumper.position.y >= that.jumper.horizontal) {
        if (that.cubeStat.nextDir === 'left') {
            that.jumper.position.x -= that.jumperStat.mSpeed;
        } else {
            that.jumper.position.z -= that.jumperStat.mSpeed;
        }
        that.jumper.position.y += that.jumperStat.ySpeed;
        that.jumperStat.ySpeed-=config.ySpeed;

        //转圈
        that.jumper.rotation.y-=Math.PI/(that.jumperStat.mSpeed/config.mSpeed);

        //下肢变细
        let foot = that.jumper.getObjectByName("foot");
        if(foot.scale.x>=1){
            foot.scale.set(
                foot.scale.x-0.01,
                foot.scale.y-0.01,
                foot.scale.z-0.01
            );
        }

        ////盒子回弹
        let box = that.cubes[that.cubes.length-2];
        if(box.scale.z>1){
            box.scale.z-=0.001
            box.scale.x-=0.001
            box.scale.y+=0.005
        }

        that.render();
        requestAnimationFrame(function () {
            triggerJump.call(that);
        })
    } else {
        that.jumperStat.ready = false;
        that.jumperStat.mSpeed = 0;
        that.jumperStat.ySpeed = 0;

        that.jumper.position.y = that.jumper.horizontal;
        that.jumper.rotation.y += Math.PI*2;

        const jumpResult = checkJumpResult.call(that);
        if (jumpResult===1) {
            // 掉落成功，进入下一步
            that.score++;
            that._createCube();
            that._updateCamera();

            if (that.options.success) {
                that.options.success(that.score)
            }
        } else {
            // 掉落失败，进入失败动画
            if (jumpResult === 0) {
                animationFall.call(that,'none')
            } else if (jumpResult === -10) {
                if (that.cubeStat.nextDir === 'left') {
                    animationFall.call(that,'leftTop')
                } else {
                    animationFall.call(that,'rightTop')
                }
            } else if (jumpResult === 10) {
                if (that.cubeStat.nextDir === 'left') {
                    if (that.jumper.position.x < that.cubes[that.cubes.length - 1].position.x) {
                        animationFall.call(that,'leftTop')
                    } else {
                        animationFall.call(that,'leftBottom')
                    }
                } else {
                    if (that.jumper.position.z < that.cubes[that.cubes.length - 1].position.z) {
                        animationFall.call(that,'rightTop')
                    } else {
                        animationFall.call(that,'rightBottom')
                    }
                }
            }
        }
    }
}
function checkJumpResult() {
    if (this.cubes.length > 1) {
        // jumper 的位置
        let pointO = {
            x: this.jumper.position.x,
            z: this.jumper.position.z
        };
        // 当前方块的位置
        let pointA = {
            x: this.cubes[this.cubes.length - 1 - 1].position.x,
            z: this.cubes[this.cubes.length - 1 - 1].position.z
        };
        // 下一个方块的位置
        let pointB = {
            x: this.cubes[this.cubes.length - 1].position.x,
            z: this.cubes[this.cubes.length - 1].position.z
        };
        let distanceS, // jumper和当前方块的坐标轴距离
            distanceL;  // jumper和下一个方块的坐标轴距离

        // 判断下一个方块相对当前方块的方向来确定计算距离的坐标轴
        if (this.cubeStat.nextDir === 'left') {
            distanceS = Math.abs(pointO.x - pointA.x);
            distanceL = Math.abs(pointO.x - pointB.x);
        } else {
            distanceS = Math.abs(pointO.z - pointA.z);
            distanceL = Math.abs(pointO.z - pointB.z);
        }
        let should = config.cubeWidth / 2 + config.jumperWidth / 2;
        let result = 0;
        if (distanceS < should) {
            // 落在当前方块，将距离储存起来，并继续判断是否可以站稳
            this.falledStat.distance = distanceS;
            result = distanceS < config.cubeWidth / 2 ? -1 : -10
        } else if (distanceL < should) {
            this.falledStat.distance = distanceL;
            // 落在下一个方块，将距离储存起来，并继续判断是否可以站稳
            result = distanceL < config.cubeWidth / 2 ? 1 : 10
        } else {
            result = 0
        }
        return result;
    }
}
function animationFall(dir){
    let self = this
    let offset = self.falledStat.distance - config.cubeWidth / 2
    let rotateAxis = 'z' // 旋转轴
    let rotateAdd = self.jumper.rotation[rotateAxis] + 0.1 // 旋转速度
    let rotateTo = self.jumper.rotation[rotateAxis] < Math.PI / 2 // 旋转结束的弧度
    let fallingTo = config.ground + config.jumperWidth / 2 + offset

    if (dir === 'rightTop') {
        rotateAxis = 'x'
        rotateAdd = self.jumper.rotation[rotateAxis] - 0.1
        rotateTo = self.jumper.rotation[rotateAxis] > -Math.PI / 2
        self.jumper.translate.z = offset
    } else if (dir === 'rightBottom') {
        rotateAxis = 'x'
        rotateAdd = self.jumper.rotation[rotateAxis] + 0.1
        rotateTo = self.jumper.rotation[rotateAxis] < Math.PI / 2
        self.jumper.translate.z = -offset
    } else if (dir === 'leftBottom') {
        rotateAxis = 'z'
        rotateAdd = self.jumper.rotation[rotateAxis] - 0.1
        rotateTo = self.jumper.rotation[rotateAxis] > -Math.PI / 2
        self.jumper.translate.x = -offset
    } else if (dir === 'leftTop') {
        rotateAxis = 'z'
        rotateAdd = self.jumper.rotation[rotateAxis] + 0.1
        rotateTo = self.jumper.rotation[rotateAxis] < Math.PI / 2
        self.jumper.translate.x = offset
    } else if (dir === 'none') {
        rotateTo = false
        fallingTo = config.ground
    } else {
        throw Error('Arguments Error')
    }
    if (!self.fallingStat.end) {
        if (rotateTo) {
            self.jumper.rotation[rotateAxis] = rotateAdd
        } else if (self.jumper.position.y > fallingTo) {
            self.jumper.position.y -= config.fallingSpeed
        } else {
            self.fallingStat.end = true
        }
        self.render()
        requestAnimationFrame(function () {
            animationFall.call(self,dir)
        })
    } else {
        if (self.options.fail) {
            self.options.fail()
        }
    }
}

module.exports = Game;