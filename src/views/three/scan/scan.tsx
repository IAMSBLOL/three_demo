
import { useEffect, useRef } from 'react'
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,

  //   MathUtils
} from 'three'
import WebGL from '@views/three/tool/webgl'
import { OrbitControls } from '../tool/OrbitControls'
import './scan.module.less'

const Scan = (): JSX.Element => {
  const glRender = useRef<THREE.WebGLRenderer | null>(null)
  const camera = useRef<THREE.PerspectiveCamera>(new PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    1800
  ))
  const scene = useRef<THREE.Scene>(new Scene())
  const canvasIns = useRef<HTMLCanvasElement | null>(null)

  // const controls = useRef<any>(null)

  const addBox = async () => {
    const geometry = new SphereGeometry(45, 32, 32);
    const texture: THREE.Texture = await new Promise(function (resolve, reject) {
      new TextureLoader().load('/bg.jpg', function (texture: any) {
        resolve(texture)
      },
      undefined,
      function (err: any) {
        reject(err)
      })
    })

    const material = new MeshBasicMaterial({ color: '#fff', map: texture });
    const sphere = new Mesh(geometry, material);

    scene.current.add(sphere);
  }

  useEffect(() => {
    if (canvasIns.current) {
      if (WebGL.isWebGLAvailable()) {
        glRender.current = new WebGLRenderer({
          antialias: true,
          canvas: canvasIns.current,

          alpha: true
        });

        glRender.current.setPixelRatio(window.devicePixelRatio)
        glRender.current.setSize(window.innerWidth, window.innerHeight)

        camera.current.lookAt(0, 0, 0)
        camera.current.translateZ(150)

        addBox()

        const controls = new OrbitControls(camera.current, canvasIns.current);
        controls.update();

        const renderCvs = () => {
          glRender.current?.render(scene.current, camera.current)
        }
        const rendera = () => {
          renderCvs()
          controls.update();
          requestAnimationFrame(rendera)
        }
        rendera()
      }
    }
  }, [])
  return (
    <div styleName='scan'>
      <canvas ref={canvasIns} className='canvas' />
    </div>
  )
}

export default Scan
