const THREE = require("three");

function createJumper(){
    const meshBox=new THREE.Object3D();
    const loader=new THREE.JSONLoader();
    loader.load("model/cooss_body.json",function(geo){
        const met=new THREE.MeshPhongMaterial();
        const mesh=new THREE.Mesh(geo,met);

        mesh.castShadow=true;
        mesh.receiveShadow=true;
        meshBox.add(mesh);
    });
    loader.load("model/cooss_glass.json",function(geo){
        const met=new THREE.MeshPhongMaterial({color:0xff2222});
        const mesh=new THREE.Mesh(geo,met);

        mesh.castShadow=true;
        mesh.receiveShadow=true;
        meshBox.add(mesh);
    });
    meshBox.position.y=100;
    meshBox.rotation.y=-Math.PI;
    meshBox.scale.set(0.06,0.06,0.06)
    return meshBox;
}

module.exports = {
    createJumper
};