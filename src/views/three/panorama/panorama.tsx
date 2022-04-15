
import './panorama.module.less'
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Euler,
  Quaternion,
  Clock

//   MathUtils
} from 'three'

import { PointerLockControls } from '../tool/PointerLockControls'
import WebGL from '@views/three/tool/webgl'
import { setCamera, addLight, setSence, addGeometry } from './func'
import { useEffect, useRef } from 'react'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
const clock = new Clock();

const Panorama = (): JSX.Element => {
  const canvasIns = useRef<HTMLCanvasElement|null>(null)
  const glRender = useRef<THREE.WebGLRenderer | null>(null)
  const camera = useRef<THREE.PerspectiveCamera>(new PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    1800
  ))
  const scene = useRef<THREE.Scene>(new Scene())

  const mixer = useRef<THREE.AnimationMixer | null>()

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

        const renderCvs = () => {
          glRender.current?.render(scene.current, camera.current)
        }

        setSence(scene.current, mixer)
        setCamera(camera.current)
        addLight(scene.current)
        addGeometry(scene.current, renderCvs)
        renderCvs()
        const quaternion = new Quaternion();
        const a = new Euler(0, 0.01, 0, 'XYZ');
        quaternion.setFromEuler(a);
        // const rotateCamare = () => {
        //   camera.current.applyQuaternion(quaternion)
        //   requestAnimationFrame(rotateCamare)
        //   renderCvs()
        // }
        // rotateCamare()

        const controls = new PointerLockControls(camera.current, canvasIns.current);
        // console.log(controls)
        const composer = new EffectComposer(glRender.current);
        // const firstpersion = new (Three as any).FirstPersonControls()
        const renderPass = new RenderPass(scene.current, camera.current);
        composer.addPass(renderPass);

        const glitchPass = new GlitchPass();
        composer.addPass(glitchPass);

        const rendera = () => {
          renderCvs()
          console.log(1)
          // composer.render();
          const delta = clock.getDelta();

          //   console.log(delta, 'delta')

          if (mixer.current) mixer.current.update(delta);
          requestAnimationFrame(rendera)
        }
        rendera()
        // console.log(MathUtils.damp(1, 30, 20, 1))
        window.document.body.addEventListener('click', function () {
          controls.lock()
        }, false)
        window.document.body.click()
      }
    }
  }, [])
  return (
    <div styleName='Panorama'>

      <canvas ref={canvasIns} className='canvas'/>
    </div>
  )
}

export default Panorama
