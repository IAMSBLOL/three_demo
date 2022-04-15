varying vec2 vUv;
// uniform float vtime;
void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    vUv = uv;

    vec3 pos = position;
    // pos.x = pos.x + sin(vtime);
    // pos.y = pos.y + cos(vtime);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
