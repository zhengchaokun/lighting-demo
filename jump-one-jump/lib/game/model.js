const THREE = require("three");
const config = require("./config");
let a = function () {
    let scene = new THREE.Scene();

    let geometryCube = new THREE.CubeGeometry(config.cubeWidth, config.cubeHeight, config.cubeDeep);

    let plane = new THREE.PlaneGeometry(config.cubeWidth, config.cubeDeep);
    let texture = THREE.ImageUtils.loadTexture("res/bag.png");

    let material = new THREE.MeshLambertMaterial({color: config.cubeColor, map: texture});
    let planeMaterial = new THREE.MeshLambertMaterial({
        map: texture
    });
    let planeMesh = new THREE.Mesh(plane, planeMaterial);
    planeMesh.rotation.x = -Math.PI / 2;
    planeMesh.position.y = config.cubeHeight / 2;

    // scene.add(planeMesh);
    scene.add(new THREE.Mesh(geometryCube, material));
    return scene;
};

let picMap = {};
let cube = function (pic) {
    let texture = picMap[pic];

    if(!texture){
        texture = THREE.ImageUtils.loadTexture(pic);
        picMap[pic] = texture;
    }
    return function () {
        let geometryCube = new THREE.CubeGeometry(config.cubeWidth, config.cubeHeight, config.cubeDeep);

        let material = new THREE.MeshLambertMaterial({color: "#ddd", map: texture});
        return new THREE.Mesh(geometryCube, material);
    }
};

function threeBox(res) {

    let texture = picMap[res];

    if(!texture){
        texture = THREE.ImageUtils.loadTexture(res);
        picMap[res] = texture;
    }
    return function () {
        const y = new THREE.BoxGeometry(config.cubeWidth, config.cubeHeight, config.cubeDeep),
            k = new THREE.MeshLambertMaterial({map: texture});
        mapUv(428, 428, y, 1, 0, 0, 280, 148);
        mapUv(428, 428, y, 2, 0, 148, 280, 428);
        mapUv(428, 428, y, 4, 280, 148, 428, 428);
        return new THREE.Mesh(y, k)
    }
}

let cylinder = function () {
    let material = new THREE.MeshLambertMaterial({color: "#888"});
    let geometryCylinder = new THREE.CylinderGeometry(config.cubeWidth / 2, config.cubeWidth / 2, config.cubeHeight, 32);
    return new THREE.Mesh(geometryCylinder, material);
};

function mapUv(e, t, i, n, a, o, s, h, l) {
    let c = 1 / e, u = 1 / t;
    if (i.faces[n] instanceof THREE.Face3) {
        d = i.faceVertexUvs[0][2 * n];
        4 !== n || l ? (d[0].x = a * c, d[0].y = o * u, d[1].x = a * c, d[1].y = h * u, d[2].x = s * c, d[2].y = o * u) : (d[0].x = a * c, d[0].y = o * u, d[2].x = a * c, d[2].y = h * u, d[1].x = s * c, d[1].y = o * u);
        let d = i.faceVertexUvs[0][2 * n + 1];
        4 !== n || l ? (d[0].x = a * c, d[0].y = h * u, d[1].x = s * c, d[1].y = h * u, d[2].x = s * c, d[2].y = o * u) : (d[2].x = a * c, d[2].y = h * u, d[1].x = s * c, d[1].y = h * u, d[0].x = s * c, d[0].y = o * u)
    }
}

module.exports = {
    models: [/*cube('res/wx/stool.png'), cube('res/wx/bag.png'), cylinder, threeBox("res/wx/store_top.png"), threeBox("res/wx/tit.png"), threeBox("res/wx/sing.png"), */threeBox("res/wx/express.png")]
};