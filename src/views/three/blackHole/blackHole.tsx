import { useEffect, useRef } from 'react'
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Quaternion,
  Euler,
  AxesHelper,
  TextureLoader,
  AnimationMixer,
  Clock,
  PointLight,
  Color,

} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import './blackHole.module.less'

const Test = (): JSX.Element => {
  const canvasIns = useRef<HTMLCanvasElement | null>(null)
  const glRender = useRef<THREE.WebGLRenderer | null>(null)
  const camera = useRef<THREE.PerspectiveCamera>(new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  ))
  const scene = useRef<THREE.Scene>(new Scene())
  const gltfSpace = useRef<any>(null)
  const gltfBlackHole = useRef<any>(null)
  const isStop = useRef(false)
  const animationId = useRef(0)
  const startGlitchPass = useRef(false)

  const mixer = useRef<THREE.AnimationMixer | null>()

  useEffect(() => {
    if (canvasIns.current) {
      glRender.current = new WebGLRenderer({
        antialias: true,
        canvas: canvasIns.current,

        alpha: true
      });
      const clock = new Clock();
      const composer = new EffectComposer(glRender.current);
      const renderPass = new RenderPass(scene.current, camera.current);
      composer.addPass(renderPass);
      const glitchPass = new GlitchPass();
      composer.addPass(glitchPass);

      glRender.current.setPixelRatio(window.devicePixelRatio)
      glRender.current.setSize(window.innerWidth, window.innerHeight)
      composer.setSize(window.innerWidth, window.innerHeight);

      const renderCvs = () => {
        glRender.current?.render(scene.current, camera.current)

        if (startGlitchPass.current) {
          composer.render();
        }
      }
      camera.current.position.z = 2;

      const axesHelper = new AxesHelper(15);
      scene.current.add(axesHelper);

      const light = new PointLight(new Color('rgb(255, 255, 255)'), 1, 10);
      light.position.set(0, 0.5, 0);
      scene.current.add(light);

      const loader = new GLTFLoader();

      loader.load('/blackhole (1)/scene.gltf', function (gltf) {
        console.log(gltf, 'blackhole')

        gltfBlackHole.current = gltf

        mixer.current = new AnimationMixer(gltf.scene);
        mixer.current.clipAction(gltf.animations[0]).play();

        // gltf.scene.traverse((child:any) => {
        //   console.log(child, 'child')
        //   if (child.material) {
        //     child.material.opacity = 0.8
        //   }
        // });
      }, undefined, function (error) {
        console.error(error);
      });

      loader.load('/nss/scene.gltf', function (gltf) {
        console.log(gltf, 'FBX')

        gltf.scene.position.x = -1.5
        gltf.scene.position.y = -1.5
        gltf.scene.position.z = 1.3

        scene.current.add(gltf.scene);

        gltfSpace.current = gltf
        setTimeout(() => {
          startGlitchPass.current = true
        }, 6000)
        setTimeout(() => {
          scene.current.remove(gltf.scene)
          scene.current.add(gltfBlackHole.current.scene)
          camera.current.position.z = 4;
          camera.current.position.y = 0.7;
          startGlitchPass.current = false
        }, 6500)
        // setTimeout(() => {
        //   cancelAnimationFrame(animationId.current)
        // }, 10000)
      }, undefined, function (error) {
        console.error(error);
      });

      const bgTexture = new TextureLoader().load('/space2.jpg',
        function () {
          console.log('yes')
        }
      );

      scene.current.environment = bgTexture
      scene.current.background = bgTexture

      const quaternion = new Quaternion();
      // const axias = new THREE.Vector3(0, 1, 0)
      const a = new Euler(0, -0.004, 0, 'XYZ');
      quaternion.setFromEuler(a);

      const rerender = () => {
        renderCvs()
        if (mixer.current) mixer.current.update(clock.getDelta());
        animationId.current = requestAnimationFrame(rerender)

        if (camera.current.position.z < 0.5) {
          isStop.current = true
        }
        if (!isStop.current) {
          camera.current.position.z -= 0.005;
          camera.current.position.applyQuaternion(quaternion)
        } else {
          camera.current.position.applyQuaternion(quaternion)
        }

        camera.current.lookAt(0, 0, 0)
      }

      rerender()
    }
  }, [])
  return (
    <div styleName='blackHole'>
      <canvas ref={canvasIns} className='canvas' />
    </div>
  )
}

export default Test
