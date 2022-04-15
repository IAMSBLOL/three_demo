
import { useEffect, useRef } from 'react'
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  ShaderMaterial,
  Mesh,
  TextureLoader,
  Vector2
  //   MathUtils
} from 'three'
import WebGL from '@views/three/tool/webgl'
import shaders from './glsl';
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
  const time = useRef(0)
  const mesh = useRef<any>(null)
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
    const uniforms = {
      image: { type: 't', value: texture },
      resolution: { value: new Vector2(canvasIns.current?.width, canvasIns.current?.height) },
      time: { type: 'f', value: time.current },
      vtime: { type: 'f', value: time.current },
    };
    const material = new ShaderMaterial(
      {
        uniforms,
        vertexShader: shaders.vertex.default,
        fragmentShader: shaders.fragment.default
      }
    );
    mesh.current = new Mesh(geometry, material);

    scene.current.add(mesh.current);
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
          if (mesh.current) {
            const { uniforms } = (mesh.current.material as THREE.ShaderMaterial);
            time.current = performance.now();
            uniforms.time.value = Math.abs(time.current);
            uniforms.vtime.value = Math.abs(time.current);
            // console.log(uniforms)
          }
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
