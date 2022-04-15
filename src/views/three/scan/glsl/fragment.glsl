#ifdef GL_ES
precision lowp float;
#endif

#ifdef GL_ES
precision lowp float;
#endif

uniform sampler2D image;
uniform float time;
varying vec2 vUv;
uniform vec2 resolution;

void main() {
    vec2 uv = vUv;

    float yyyy = uv.y;

    vec3 finalColor = vec3(yyyy, 0.5, 0.1);

    vec2 uvv = uv + 0.2;

    gl_FragColor = texture2D(image, uvv) * vec4(finalColor, 1);

}
