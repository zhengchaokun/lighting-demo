const THREE = require("three");
const config = require("./config");
let a = function () {
    let scene = new THREE.Scene();

    let geometryCube = new THREE.CubeGeometry(config.cubeWidth, config.cubeHeight, config.cubeDeep);

    let plane = new THREE.PlaneGeometry(config.cubeWidth,config.cubeDeep);
    let texture = THREE.ImageUtils.loadTexture("res/bag.png");

    let material = new THREE.MeshLambertMaterial({color: config.cubeColor, map:texture});
    let planeMaterial=new THREE.MeshLambertMaterial({
        map:texture
    });
    let planeMesh = new THREE.Mesh(plane,planeMaterial);
    planeMesh.rotation.x = -Math.PI/2;
    planeMesh.position.y = config.cubeHeight/2;

    // scene.add(planeMesh);
    scene.add(new THREE.Mesh(geometryCube, material));
    return scene;
};

let cube = function (pic) {
    return function () {
        let geometryCube = new THREE.CubeGeometry(config.cubeWidth, config.cubeHeight, config.cubeDeep);
        let texture = THREE.ImageUtils.loadTexture(pic);
        let material = new THREE.MeshLambertMaterial({color: "#ddd", map:texture});
        return new THREE.Mesh(geometryCube, material);
    }
};

let cylinder = function () {
    let material = new THREE.MeshLambertMaterial({color: "#888"});
    let geometryCylinder = new THREE.CylinderGeometry( config.cubeWidth/2, config.cubeWidth/2, config.cubeHeight, 32 );
    return new THREE.Mesh(geometryCylinder, material);
};

module.exports = {
    models:[cube('res/wx/stool.png'),cube('res/wx/bag.png'),cylinder]
};