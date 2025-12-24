import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'gltf';
import * as dat from 'dat.gui';


const idlePose = {
    _rootJoint_x: 0,_rootJoint_y: 0, _rootJoint_z: 0,
    b_Root_00_x: -2.35,b_Root_00_y: 0, b_Root_00_z: 0,
    b_Hip_01_x: 0,  b_Hip_01_y: -1.6, b_Hip_01_z: 0,

    b_Spine01_02_x: 0, b_Spine01_02_y: 0, b_Spine01_02_z: -1.58,
    b_Spine02_03_x: 0, b_Spine02_03_y: 0, b_Spine02_03_z: 0,
    b_Neck_04_x: 0,b_Neck_04_y: 0,b_Neck_04_z: 0.3,
    b_Head_05_x: 0,b_Head_05_y: 0,b_Head_05_z: -1,

    b_Tail01_012_x: 0, b_Tail01_012_y: 0, b_Tail01_012_z: 0.3,
    b_Tail02_013_x: 0.0, b_Tail02_013_y: 0.0, b_Tail02_013_z: -1,
    b_Tail03_014_x: 0.0, b_Tail03_014_y: 0.0, b_Tail03_014_z: -0.5,

    b_LeftUpperArm_09_x: 0,b_LeftUpperArm_09_y: 0,b_LeftUpperArm_09_z: -2,
    b_LeftForeArm_010_x: 0,b_LeftForeArm_010_y: 0,b_LeftForeArm_010_z: 0,
    b_LeftHand_011_x: 0,b_LeftHand_011_y: 0,b_LeftHand_011_z: 0.6,
    b_RightUpperArm_06_x: 0,b_RightUpperArm_06_y: 0,b_RightUpperArm_06_z: -2,
    b_RightForeArm_07_x: 0,b_RightForeArm_07_y: 0,b_RightForeArm_07_z: 0,
    b_RightHand_08_x: 0,b_RightHand_08_y: 0,b_RightHand_08_z: 0.6,

    b_LeftLeg01_015_x: 0.5, b_LeftLeg01_015_y: 0, b_LeftLeg01_015_z: -1.8,
    b_LeftLeg02_016_x: 0, b_LeftLeg02_016_y: 0, b_LeftLeg02_016_z: -2,
    b_LeftFoot01_017_x: 0.5, b_LeftFoot01_017_y: 0, b_LeftFoot01_017_z: 1.4,
    b_LeftFoot02_018_x: 0, b_LeftFoot02_018_y: 0, b_LeftFoot02_018_z: -0.3,
    b_RightLeg01_019_x: 2.6, b_RightLeg01_019_y: 3.2, b_RightLeg01_019_z: 1.34,
    b_RightLeg02_020_x: 0, b_RightLeg02_020_y: -0.05, b_RightLeg02_020_z: -2,
    b_RightFoot01_021_x: -0.4, b_RightFoot01_021_y: 0, b_RightFoot01_021_z: 1.4,
    b_RightFoot02_022_x: 0, b_RightFoot02_022_y: 0, b_RightFoot02_022_z: 0,
};



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(15, 5, 15);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 10, 7.5);
scene.add(light);

const leftLight = new THREE.DirectionalLight(0xffffff, 0.5);
leftLight.position.set(-5, -10, 7.5);
scene.add(leftLight);

const leftupLight = new THREE.DirectionalLight(0xffffff, 0.5);
leftupLight.position.set(-5, -10, -3.5);
scene.add(leftupLight);

const rightdownLight = new THREE.DirectionalLight(0xffffff, 0.5);
rightdownLight.position.set(5, -10, 7.5);
scene.add(rightdownLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();

const gui = new dat.GUI();
Object.keys(idlePose).forEach(key => {
    const [jointName, axis] = key.split('_');
    const folderName = jointName;

    if (!gui.__folders[folderName]) {
        gui.addFolder(folderName);
    }

    gui.__folders[folderName].add(idlePose, key, -6, 6).name(`${folderName} ${axis.toUpperCase()} Rotation`);
});

for (let folderName in gui.__folders) {
    gui.__folders[folderName].open();
}


// Thêm mặt phẳng tượng trưng cho đất
const groundGeometry = new THREE.PlaneGeometry(50, 50); // Kích thước mặt phẳng là 50x50
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Màu xanh lá
const ground = new THREE.Mesh(groundGeometry, groundMaterial);

// Đặt mặt phẳng nằm ngang và ở dưới chân con cáo
ground.rotation.x = -Math.PI / 2; // Xoay để mặt phẳng nằm ngang (vuông góc với trục Y)
ground.position.y = 0; // Đặt mặt phẳng ở độ cao y = 0, dưới chân con cáo
scene.add(ground);



function createTextSprite(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '24px Arial';
    context.fillStyle = 'white';
    context.fillText(text, 0, 24);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.5, 0.25, 1); // Điều chỉnh kích thước sprite
    return sprite;
}

// Hiển thị vector gốc (0, 0, 0) bằng mũi tên
const originArrowy = new THREE.ArrowHelper(
    new THREE.Vector3(0, 1, 0), // Hướng của mũi tên
    new THREE.Vector3(0, 0, 0), // Vị trí bắt đầu của mũi tên
    10, // Độ dài của mũi tên
    0xff0000 // Màu sắc của mũi tên
);
scene.add(originArrowy);
// Hiển thị vector gốc (0, 0, 0) bằng mũi tên
const originArrowx = new THREE.ArrowHelper(
    new THREE.Vector3(1, 0, 0), // Hướng của mũi tên
    new THREE.Vector3(0, 0, 0), // Vị trí bắt đầu của mũi tên
    10, // Độ dài của mũi tên
    0xff4444 // Màu sắc của mũi tên
);
scene.add(originArrowx);
// Hiển thị vector gốc (0, 0, 0) bằng mũi tên
const originArrowz = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, 1), // Hướng của mũi tên
    new THREE.Vector3(0, 0, 0), // Vị trí bắt đầu của mũi tên
    10, // Độ dài của mũi tên
    0xff1111// Màu sắc của mũi tên
);
scene.add(originArrowz);

const loader = new GLTFLoader();
loader.load('./models/Fox.glb', function(gltf) {
    const fox = gltf.scene;
    fox.scale.set(0.1, 0.1, 0.1);
    scene.add(fox);

    const skeleton = new THREE.SkeletonHelper(fox);
    skeleton.visible = true;
    scene.add(skeleton);

    fox.traverse((child) => {
        if (child.isBone) {
            // Tạo một sprite với tên của xương
            const boneLabel = createTextSprite(child.name);
            boneLabel.position.copy(child.position); // Đặt vị trí của sprite theo xương
            child.add(boneLabel); // Thêm label vào xương để theo dõi vị trí của nó

            console.log(`Tên khớp: ${child.name}, Vị trí:`, child.position);
        }
    });

    animate(fox);
}, undefined, function(error) {
    console.error('Error loading Fox.glb:', error);
});

function updateJoints(fox) {
    fox.traverse((child) => {
        if (child.name && idlePose.hasOwnProperty(`${child.name}_x`)) {
            child.rotation.set(
                idlePose[`${child.name}_x`] || 0,
                idlePose[`${child.name}_y`] || 0,
                idlePose[`${child.name}_z`] || 0
            );
        }
    });
}

function animate(fox) {
    requestAnimationFrame(() => animate(fox));
    updateJoints(fox);
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
