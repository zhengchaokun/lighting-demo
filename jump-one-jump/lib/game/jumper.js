const THREE = require("three");

function createJumper() {
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
        foot.name = "foot";
        jumper.add(foot);
    });
    loader.load("model/cooss_glass_1x.json",function(geo){
        const met=new THREE.MeshPhongMaterial({color:0xff2222});
        glass=new THREE.Mesh(geo,met);
        glass.castShadow=true;
        glass.receiveShadow=true;
        jumper.add(glass);
    });

    jumper.horizontal = 1.49;
    jumper.position.y = jumper.horizontal;

    jumper.castShadow = true;
    jumper.scale.set(0.8,0.8,0.8)
    return jumper;
}
module.exports = {
    createJumper
};