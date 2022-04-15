import {
  SphereBufferGeometry,
  Mesh,
  TextureLoader,
  MeshLambertMaterial,
  DoubleSide
} from 'three'

export const addGeometry = async (scene: THREE.Scene, callback:()=>void) => {
  const geometry = new SphereBufferGeometry(50, 60, 60);
  geometry.scale(-1, 1, 1);

  const spaceTextture: any = await new Promise(function (resolve, reject) {
    new TextureLoader().load(
      '/360.jpg',
      function (texture: any) {
        resolve(texture)
      },
      undefined,
      function (err: any) {
        reject(err)
      }
    );
  })

  const material = new MeshLambertMaterial({
    map: spaceTextture,
    // wireframe: true,
    side: DoubleSide
  });
  const mesh = new Mesh(geometry, material)
  scene.add(mesh)
  callback()
  console.log(mesh.layers, 3434)
  mesh.layers.set(1)
}
