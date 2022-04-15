
import { HemisphereLight, DirectionalLight } from 'three'
export const addLight = (scene: THREE.Scene) => {
  console.log(scene)
  //   const light = new AmbientLight(0x404040, 2)
  //   scene.add(light)

  //   const Sun = new DirectionalLight(0xffffff, 1);
  //   Sun.position.set(20, 20, 20);
  //   Sun.castShadow = true;
  //   Sun.shadow.camera.near = 0.01;
  //   Sun.shadow.camera.far = 60;
  //   Sun.shadow.camera.top = 22;
  //   Sun.shadow.camera.bottom = -22;
  //   Sun.shadow.camera.left = -35;
  //   Sun.shadow.camera.right = 35;
  //   // //设置阴影分辨率
  //   Sun.shadow.mapSize.width = 2048; // default
  //   Sun.shadow.mapSize.height = 2048; // default
  //   // 阴影限制
  //   Sun.shadow.radius = 1;

  const hemiLight = new HemisphereLight('blue', 'red');
  hemiLight.position.set(0, 200, 0);
  scene.add(hemiLight);

  const dirLight = new DirectionalLight('#fff');
  dirLight.position.set(0, 200, 100);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 180;
  dirLight.shadow.camera.bottom = -100;
  dirLight.shadow.camera.left = -120;
  dirLight.shadow.camera.right = 120;
  scene.add(dirLight);
}
