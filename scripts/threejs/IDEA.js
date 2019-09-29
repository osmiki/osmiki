//Check mobile browser
var md = new MobileDetect(window.navigator.userAgent);
var isMobile = false;
var mobileDevice; //
var mouseX, mouseY;



if (!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats, controls;
var camera, scene, renderer, spotlight;

var clock = new THREE.Clock();

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var mixers = [];

mobileCheck();
init();
animate();


function mobileCheck() {
	if (md.mobile()) {
		console.log("MOBILE!");
		isMobile = true;
	} else {
		console.log("NOT MOBILE!");
		isMobile = false;
	}
}

function init() {

	container = document.createElement('div');
	document.body.appendChild(container);



	camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 5000);

	camera.position.set(0, 4000, 4000);



	scene = new THREE.Scene();
    
    //배경까망
	scene.background = new THREE.Color(0x000000);

	//directional Light
	var directionalLight = new THREE.DirectionalLight(0xfff, 0.4);
    directionalLight.position.set(0,4000,4000);
	scene.add(directionalLight);

	var DLtargetobj = new THREE.Object3D();
	DLtargetobj.position.set(0, 3000, 0);
	scene.add(DLtargetobj);

	directionalLight.target = DLtargetobj;

	// Amb Light

	var Amblight = new THREE.AmbientLight(0xfff, 1.0);
	scene.add(Amblight);


	// Spot Light

	spotlight = new THREE.SpotLight("rgba(255, 255, 255, 1)");
	spotlight.position.set(-150, 3200, 0)
	spotlight.castShadow = true; // default false
	scene.add(spotlight);


	spotlight.shadow.mapSize.width = 256; // default
	spotlight.shadow.mapSize.height = 256; // default
	spotlight.shadow.camera.near = 100; // default
	spotlight.shadow.camera.far = 8000; // default





	//GLB loader

	// Instantiate a loader
	var loader = new THREE.GLTFLoader();

	// Load a glTF resource
	loader.load(
		// resource URL
		'/scripts/threejs/IDEA.glb',
		// called when the resource is loaded
		function (gltf) {
			gltf.scene.traverse(function (child) {
				if (child.isMesh) {

					child.castShadow = true;
					child.receiveShadow = false;
					child.material.flatShading = true;
					child.material.visible = true;
					child.material.shininess = 0;
					child.material.specular = new THREE.Color('0xfff');

				}
			});


			gltf.scene.scale.set(0.7, 0.7, 0.7);




			scene.add(gltf.scene);
			scene.add(gltf.animations); // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Scene
			gltf.asset; // Object


		});

	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;

	container.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);

	// stats
	//				stats = new Stats();
	//				container.appendChild( stats.dom );
	if (isMobile) {} else {
		document.addEventListener('mousemove', onDocumentMouseMove, false);
	}

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {

	mouseX = (event.clientX - windowHalfX);
	mouseY = (event.clientY - windowHalfY);

}

//
//framerate limit https://stackoverflow.com/questions/11285065/limiting-framerate-in-three-js-to-increase-performance-requestanimationframe/11295465

//Mobile Device Orientation control script////

///////////////////////////////////////
function animate() {

	setTimeout(function () {

		requestAnimationFrame(animate);

	}, 1000 / 50);
	if (mixers.length > 0) {

		for (var i = 0; i < mixers.length; i++) {

			mixers[i].update(clock.getDelta());

		}

	}





	if (isMobile) {
		//		controls.update();
		//		camera.position.x += controls.beta * 0.1;
		//		camera.position.y += controls.gamma * 0.1;
	} else {
        //마우스 인터렉션 감도 : 소수점
		camera.position.x += (mouseX - camera.position.x) * 0.1;
		camera.position.y += (-mouseY - camera.position.y + 1000) * 0.06;
        //위에 1000이 카메라 높이


	}
	var targetObject = new THREE.Object3D();
	targetObject.position.set(0, 900, -2500)
    
    //카메라 타겟 위치
    
	scene.add(targetObject);

	camera.lookAt(targetObject.position);




	renderer.render(scene, camera);


}
