import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'gltf';
import * as dat from 'dat.gui';


const idlePose = {
    _rootJoint_x: 1.1,_rootJoint_y: 0, _rootJoint_z: 0,
    b_Root_00_x: -2.5,b_Root_00_y: 0, b_Root_00_z: 0,
    b_Hip_01_x: 1.4, b_Hip_01_y: -1.57, b_Hip_01_z: 0.96,

    b_Spine01_02_x: 0.0, b_Spine01_02_y: 0.0, b_Spine01_02_z: -1,
    b_Spine02_03_x: 0.0, b_Spine02_03_y: 0.0, b_Spine02_03_z: 0.0,
    b_Neck_04_x: 0.0, b_Neck_04_y: 0.0, b_Neck_04_z: 0.8,
    b_Head_05_x: 0.0, b_Head_05_y: 0.0, b_Head_05_z: -1,

    b_LeftUpperArm_09_x: 0.0, b_LeftUpperArm_09_y: 0.0, b_LeftUpperArm_09_z: -1.5,
    b_LeftForeArm_010_x: 0.0, b_LeftForeArm_010_y: 0.0, b_LeftForeArm_010_z: 0.0,
    b_LeftHand_011_x: 0.0, b_LeftHand_011_y: 0.0, b_LeftHand_011_z: 0.8,
    b_RightUpperArm_06_x: 0.0, b_RightUpperArm_06_y: 0.0, b_RightUpperArm_06_z: -1.5,
    b_RightForeArm_07_x: 0.0, b_RightForeArm_07_y: 0.0, b_RightForeArm_07_z: 0.0,
    b_RightHand_08_x: 0.0, b_RightHand_08_y: 0.0, b_RightHand_08_z: 0.8,

    b_Tail01_012_x: 0, b_Tail01_012_y: 0, b_Tail01_012_z: 1.1,
    b_Tail02_013_x: 0.0, b_Tail02_013_y: 0.0, b_Tail02_013_z: -1,
    b_Tail03_014_x: 0.0, b_Tail03_014_y: 0.0, b_Tail03_014_z: -0.5,

    b_LeftLeg01_015_x: 0.0, b_LeftLeg01_015_y: -0.12, b_LeftLeg01_015_z: -2.2,
    b_LeftLeg02_016_x: -0.4, b_LeftLeg02_016_y: 0.0, b_LeftLeg02_016_z: -0.39,
    b_LeftFoot01_017_x: 0.0, b_LeftFoot01_017_y: 0.0, b_LeftFoot01_017_z: 0.0,
    b_LeftFoot02_018_x: 0.0, b_LeftFoot02_018_y: 0.0, b_LeftFoot02_018_z: 1.5,
    b_RightLeg01_019_x: 3, b_RightLeg01_019_y: 3.2, b_RightLeg01_019_z: 0.93,
    b_RightLeg02_020_x: 0.0, b_RightLeg02_020_y: 0.0, b_RightLeg02_020_z: -0.39,
    b_RightFoot01_021_x: 0.0, b_RightFoot01_021_y: 0.0, b_RightFoot01_021_z: 0.0,
    b_RightFoot02_022_x: 0.0, b_RightFoot02_022_y: 0.0, b_RightFoot02_022_z: 1.5
};

const targetPose1 = {
    _rootJoint_x: 0.6,_rootJoint_y: 0, _rootJoint_z: 0,
    b_Root_00_x: -2.5,b_Root_00_y: 0, b_Root_00_z: 0,
    b_Hip_01_x: 1.55, b_Hip_01_y: -1.57, b_Hip_01_z: 0.96,

    b_Spine01_02_x: 0.0, b_Spine01_02_y: 0.0, b_Spine01_02_z: -1.1,
    b_Spine02_03_x: 0.0, b_Spine02_03_y: 0.0, b_Spine02_03_z: 0.0,
    b_Neck_04_x: 0.0, b_Neck_04_y: 0.0, b_Neck_04_z: 0.8,
    b_Head_05_x: 0.0, b_Head_05_y: 0.0, b_Head_05_z: -1,

    b_RightUpperArm_06_x: -0.02, b_RightUpperArm_06_y: 0.0, b_RightUpperArm_06_z: -1.5,
    b_RightForeArm_07_x: 0.0, b_RightForeArm_07_y: 0.0, b_RightForeArm_07_z: 0.0,
    b_RightHand_08_x: 0.0, b_RightHand_08_y: 0.0, b_RightHand_08_z: 0.8,
    b_LeftUpperArm_09_x: 0.0, b_LeftUpperArm_09_y: 0.0, b_LeftUpperArm_09_z: -1.6,
    b_LeftForeArm_010_x: 0.0, b_LeftForeArm_010_y: 0.0, b_LeftForeArm_010_z: -0.5,
    b_LeftHand_011_x: 0.0, b_LeftHand_011_y: 0.0, b_LeftHand_011_z: 1.2,

    b_Tail01_012_x: 0, b_Tail01_012_y: 0, b_Tail01_012_z: 0.6,
    b_Tail02_013_x: 0.0, b_Tail02_013_y: 0.0, b_Tail02_013_z: -1,
    b_Tail03_014_x: 0.0, b_Tail03_014_y: 0.0, b_Tail03_014_z: -0.5,

    b_LeftLeg01_015_x: 0.2, b_LeftLeg01_015_y: -0.12, b_LeftLeg01_015_z: -1.7,
    b_LeftLeg02_016_x: -0.6, b_LeftLeg02_016_y: 0.0, b_LeftLeg02_016_z: -0.94,
    b_LeftFoot01_017_x: 0.0, b_LeftFoot01_017_y: 0.0, b_LeftFoot01_017_z: 0.7,
    b_LeftFoot02_018_x: 0.0, b_LeftFoot02_018_y: 0.0, b_LeftFoot02_018_z: 0.3,
    b_RightLeg01_019_x: 3.0, b_RightLeg01_019_y: 3.2, b_RightLeg01_019_z: 1.4,
    b_RightLeg02_020_x: 0.4, b_RightLeg02_020_y: 0.0, b_RightLeg02_020_z: -0.9,
    b_RightFoot01_021_x: 0.0, b_RightFoot01_021_y: 0.0, b_RightFoot01_021_z: 0.7,
    b_RightFoot02_022_x: 0.0, b_RightFoot02_022_y: 0.0, b_RightFoot02_022_z: 0.3
};


const targetPose = {
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

    gui.__folders[folderName].add(idlePose, key, -12, 12).name(`${folderName} ${axis.toUpperCase()} Rotation`);
});

for (let folderName in gui.__folders) {
    gui.__folders[folderName].open();
}

// Ground plane
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
scene.add(ground);

const loader = new GLTFLoader();
let fox;
loader.load('./models/Fox.glb', function(gltf) {
    fox = gltf.scene;
    fox.scale.set(0.1, 0.1, 0.1);
    scene.add(fox);

    // Set the initial pose to `idlePose` right after loading
    fox.traverse((child) => {
        if (child.name && idlePose.hasOwnProperty(`${child.name}_x`)) {
            child.rotation.set(
                idlePose[`${child.name}_x`],
                idlePose[`${child.name}_y`],
                idlePose[`${child.name}_z`]
            );
        }
    });

    animate(); // Start the animation loop
}, undefined, function(error) {
    console.error('Error loading Fox.glb:', error);
});
function createTextSprite(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '24px Arial';
    context.fillStyle = 'white';
    context.fillText(text, 0, 24);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.5, 0.25, 1);
    return sprite;
}


function interpolatePose() {
    const elapsed = Date.now() - transitionStartTime;
    const progressPhase1 = Math.min(elapsed / (transitionDuration / 2), 1); // First half: idlePose -> targetPose1
    const progressPhase2 = Math.min((elapsed - (transitionDuration / 2)) / (transitionDuration / 2), 1); // Second half: targetPose1 -> targetPose

    fox.traverse((child) => {
        if (child.name && idlePose.hasOwnProperty(`${child.name}_x`)) {
            const startX = idlePose[`${child.name}_x`];
            const startY = idlePose[`${child.name}_y`];
            const startZ = idlePose[`${child.name}_z`];

            const target1X = targetPose1[`${child.name}_x`];
            const target1Y = targetPose1[`${child.name}_y`];
            const target1Z = targetPose1[`${child.name}_z`];

            const targetX = targetPose[`${child.name}_x`];
            const targetY = targetPose[`${child.name}_y`];
            const targetZ = targetPose[`${child.name}_z`];

            if (progressPhase1 < 1) {
                // Phase 1: Interpolate between idlePose and targetPose1
                child.rotation.set(
                    startX + (target1X - startX) * progressPhase1,
                    startY + (target1Y - startY) * progressPhase1,
                    startZ + (target1Z - startZ) * progressPhase1
                );
            } else {
                // Phase 2: Interpolate between targetPose1 and targetPose
                child.rotation.set(
                    target1X + (targetX - target1X) * progressPhase2,
                    target1Y + (targetY - target1Y) * progressPhase2,
                    target1Z + (targetZ - target1Z) * progressPhase2
                );
            }
        }
    });

    if (progressPhase2 < 1) {
        requestAnimationFrame(interpolatePose); // Continue interpolating until reaching targetPose
    }
}


function animateHeadAndNeck() {
    const time = Date.now() * 0.002; // temps qui change 

    // Contrôler le mouvement du cou 
    if (fox) {
        fox.traverse((child) => {
            if (child.name === 'b_Neck_04') {
                child.rotation.y = Math.sin(time * 0.5) * 0.1; // L'agitation du cou de gauche à droite sur l'axe Y
                child.rotation.x = Math.sin(time * 0.3) * 0.05; // Agitation légère sur l'axe X
            }

            // Contrôler le mouvement de la tete
            if (child.name === 'b_Head_05') {
                child.rotation.y = Math.sin(time * 0.6) * 0.15; // L'agitation de la tête de gauche à droite sur l'axe Y
                child.rotation.x = Math.sin(time * 0.4) * 0.1; // Agitation légère de la tête de haut en bas sur l'axe X
            }
        });
    }
}


function animateTail() {
    const time = Date.now() * 0.002;

    if (fox) {
        fox.traverse((child) => {
            if (child.name.startsWith('b_Tail')) {
                const tailName = child.name; 

                // Contrôler le mouvement de la queue
                if (tailName === 'b_Tail01_012') {
                    child.rotation.y = Math.sin(time * 0.5) * 0.3; // Agitation de gauche à droite sur l'axe Z
                } else if (tailName === 'b_Tail02_013') {
                    child.rotation.y = Math.sin(time * 0.6) * 0.3; // Agitation un peu plus légère
                } else if (tailName === 'b_Tail03_014') {
                    child.rotation.y = Math.sin(time * 0.7) * 0.2; // Agitation la plus légère
                }
            }
        });
    }
}

/*function animateFrontLegs() {
    const elapsed = Date.now() - transitionStartTime;
    const progress = Math.min(elapsed / transitionDuration, 1);

    const reduceAngle = (5.5 * Math.PI) / 9; 

    if (fox) {
        fox.traverse((child) => {
            if (child.name.startsWith('b_RightUpperArm')) {
                const legName = child.name;

                // Điều khiển chuyển động của chân phải
                if (legName === 'b_RightUpperArm_06') {
                    const maxRotation = 0.5; // Giới hạn góc quay tối đa
                    const speed = 0.0005; // Tốc độ quay

                    // Sử dụng hàm sin để tạo ra chuyển động qua lại trong phạm vi [-maxRotation, maxRotation]
                    let rotation = Math.sin(progress * speed) * maxRotation;
                    rotation -= reduceAngle; 
                    child.rotation.z = rotation; 
                } 

                if (legName === 'b_LeftUpperArm_09') {
                    const maxRotation = 0.6;
                    const speed = 0.0009;


                    let rotation = Math.sin(progress * speed) * maxRotation;
                    rotation -= reduceAngle; 
                    child.rotation.z = rotation; 
                } 
            }
        });
    }
}
*/






/*function animate() {
    if (!transitionStartTime) transitionStartTime = Date.now();
    interpolatePose();  // Nội suy giữa idlePose và targetPose cho các bộ phận khác
    animateHeadAndNeck();  // Lắc đầu và cổ
    animateTail();  // Chuyển động đuôi
    animateFrontLegs();  // Điều khiển di chuyển độc lập 2 chân trước
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}*/


let idleStartTime = Date.now(); // Track when the idle period begins
let transitionStartTime = null; // Initialize as null, to be set after idle
const transitionDuration = 4000; // 8 seconds for full pose transition (4s each phase)
const idleDelay = 3000;          // 3 seconds idle period

function animate() {
    const elapsedIdleTime = Date.now() - idleStartTime;

    if (elapsedIdleTime < idleDelay) {
        // During idle period: keep idlePose and only animate the head and tail
        animateHeadAndNeck();
        animateTail();
    } else if (transitionStartTime === null) {
        // After idle period: set transition start time
        transitionStartTime = Date.now(); // Mark the start of transition
    }

    if (transitionStartTime !== null) {
        // Transition phase: interpolate from idlePose to targetPose through targetPose1
        interpolatePose();    // Interpolate body pose from idlePose to targetPose1 to targetPose
        animateHeadAndNeck(); // Keep head and neck animations active
        animateTail();        // Keep tail animation active
    }

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}





window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
