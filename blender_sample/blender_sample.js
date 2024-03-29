//https://qiita.com/nannany_tis/items/c92d9f05588c751077b1
//ここの丸パクリ

window.addEventListener('load', init);

function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas')
    });
    // ウィンドウサイズ設定
    //width = document.getElementById('main_canvas').getBoundingClientRect().width;
    width = 640;
    //height = document.getElementById('main_canvas').getBoundingClientRect().height;
    height = 480;

    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    console.log(window.devicePixelRatio);
    console.log(width + ", " + height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(400, 800, 200);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Load GLTF or GLB
    const loader = new THREE.GLTFLoader();
    const url = 'https://shirayanagihiroshi.github.io/hatomochi/blender_sample/blender_sample.glb';
    let model = null;
    loader.load(
        url,
        function (gltf) {
            model = gltf.scene;
            // model.name = "model_with_cloth";
            model.scale.set(150.0, 150.0, 150.0);
            model.position.set(0, 0, 0);
            scene.add(gltf.scene);

            // model["test"] = 100;
        },
        function (error) {
            console.log('An error happened');
            console.log(error);
        }
    );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;


    // 平行光源
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 2; // 光の強さを倍に
    light.position.set(1, 1, 1);
    // シーンに追加
    scene.add(light);

    // 初回実行
    tick();

    function tick() {
        controls.update();

        if (model != null) {
            console.log(model);
        }
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}
