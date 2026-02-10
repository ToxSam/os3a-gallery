// src/components/VRMViewer/utils/shaders.js

export const vertexShader = `
uniform float u_intensity;
uniform float u_time;
uniform vec3 u_color1;
uniform vec3 u_color2;
varying vec2 vUv;
varying float vDisplacement;
varying vec3 vColor;

void main() {
    vUv = uv;
    vec3 newPosition = position + normal * u_intensity * sin(position.y * 10.0 + u_time);
    vDisplacement = sin(position.y * 10.0 + u_time);
    
    // Smoother gradient for sphere
    float mixValue = position.y * 0.5 + 0.5;  // normalize y position
    mixValue = smoothstep(0.0, 1.0, mixValue);
    vColor = mix(u_color1, u_color2, mixValue);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}`;

export const fragmentShader = `
uniform float u_intensity;
uniform float u_time;
varying vec2 vUv;
varying float vDisplacement;
varying vec3 vColor;

void main() {
    float distort = 2.0 * vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time);
    vec3 finalColor = vColor * (1.0 + distort * 0.1);
    gl_FragColor = vec4(finalColor, 1.0);
}`;