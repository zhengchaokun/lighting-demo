const THREE = require("three");

function createJumper(){
    const meshBox=new THREE.Object3D();
    const loader=new THREE.JSONLoader();
    loader.load("model/cooss_head_1x.json",function(geo){
        const met=new THREE.MeshPhongMaterial();
        const mesh=new THREE.Mesh(geo,met);

        mesh.castShadow=true;
        mesh.receiveShadow=true;
        meshBox.add(mesh);
    });loader.load("model/cooss_foot_1x.json",function(geo){
        const met=new THREE.MeshPhongMaterial();
        const mesh=new THREE.Mesh(geo,met);

        mesh.castShadow=true;
        mesh.receiveShadow=true;
        meshBox.add(mesh);
    });
    loader.load("model/cooss_glass_1x.json",function(geo){
        const met=new THREE.MeshPhongMaterial({color:0xff2222});
        const mesh=new THREE.Mesh(geo,met);

        mesh.castShadow=true;
        mesh.receiveShadow=true;
        meshBox.add(mesh);
    });
    return meshBox;
}

let speedY=0,speedM=0,isPrepare=true;
function moveJumperPrepare(jumper) {
    if(isPrepare){
        jumper.scale.y -= 0.01;
        speedY+=0.01;
        speedM+=0.01;

        requestAnimationFrame(function () {
            moveJumperPrepare(jumper)
        })
    }
}

function moveJumperStart(jumper) {
    isPrepare = false;


}

module.exports = {
    createJumper
};