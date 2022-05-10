
// import { Vector3 } from 'three'
export const setCamera = (camera:THREE.PerspectiveCamera) => {
  console.log(camera.position)
  camera.lookAt(0, 0, 0)
  //   camera.position = new Vector3(0, 0, 0);
  camera.translateZ(200)
  //   camera.translateY(10)
  //   camera.translateX(10)
}
