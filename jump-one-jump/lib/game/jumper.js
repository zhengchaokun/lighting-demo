const THREE = require("three");

const jumper=new THREE.Object3D();
const loader=new THREE.JSONLoader();

let head,foot,glass;

loader.load("model/cooss_head_1x.json",function(geo){
    const met=new THREE.MeshPhongMaterial();
    head=new THREE.Mesh(geo,met);
    head.castShadow=true;
    head.receiveShadow=true;
    jumper.add(head);
});loader.load("model/cooss_foot_1x.json",function(geo){
    const met=new THREE.MeshPhongMaterial();
    foot=new THREE.Mesh(geo,met);
    foot.castShadow=true;
    foot.receiveShadow=true;
    jumper.add(foot);
});
loader.load("model/cooss_glass_1x.json",function(geo){
    const met=new THREE.MeshPhongMaterial({color:0xff2222});
    glass=new THREE.Mesh(geo,met);
    glass.castShadow=true;
    glass.receiveShadow=true;
    jumper.add(glass);
});

let times=0,mSpeed=0,angle=0;
function prepare(evt) {
    if(evt){
        times=0;
    }
    times++;
    mSpeed=times*0.005;
    angle = Math.PI/times;

    let scale = 1+times*0.015;
    foot.scale.set(scale,scale,scale);
}

function jump(left) {
    if (left) {
        jumper.position.x -= mSpeed;
    } else {
        jumper.position.z -= mSpeed;
    }
    jumper.position.y += times*0.01;

    if (foot.scale.x > 1) {
        foot.scale.set(foot.scale.x-0.01,foot.scale.x-0.01,foot.scale.x-0.01);
    }
    times--;
    jumper.rotation.y += angle
}

module.exports = {
    jumper,
    prepare,
    jump
};