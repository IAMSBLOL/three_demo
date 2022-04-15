import { Mesh, AnimationMixer, TextureLoader } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
export const setSence = (scene: THREE.Scene, mixer:any) => {
//   const bg = new CubeTextureLoader()
//     .setPath('/')
//     .load([
//       'yuanxiagong.jpg',
//       'yuanxiagong.jpg',
//       'yuanxiagong.jpg',
//       'yuanxiagong.jpg',
//       'yuanxiagong.jpg',
//       'yuanxiagong.jpg'
//     ]);
//   console.log(bg)
  const texture = new TextureLoader().load('/bg.jpg');
  scene.background = texture

  const loader = new FBXLoader();

  loader.load('/fbx/Samba Dancing.fbx', function (FBX) {
    console.log(FBX, 'FBX')
    mixer.current = new AnimationMixer(FBX);

    const action = mixer.current.clipAction(FBX.animations[0]);
    action.play();
    // FBX.scale.set(0.1, 0.1, 0.1);
    FBX.traverse(function (item) {
      if (item instanceof Mesh) {
        item.castShadow = true;
        item.receiveShadow = true;
        // item.material.emissive = new Color(1, 1, 1);
        // item.material.emissiveIntensity = 1;
        // item.material.emissiveMap = item.material.map;
      }
    });
    FBX.translateY(-200)
    FBX.translateZ(-80)
    scene.add(FBX)
  }, undefined, function (error) {
    console.error(error);
  });
}
