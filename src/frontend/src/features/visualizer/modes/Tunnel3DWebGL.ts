export class Tunnel3DWebGL {
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private animationId: number | null = null;
  private startTime: number = 0;
  private analyser: AnalyserNode | null = null;
  private isSupported: boolean = false;

  constructor(private canvas: HTMLCanvasElement) {
    this.init();
  }

  private init() {
    try {
      this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl') as WebGLRenderingContext;
      
      if (!this.gl) {
        console.warn('WebGL not supported');
        this.isSupported = false;
        return;
      }

      this.isSupported = true;
      this.setupShaders();
      this.startTime = Date.now();
    } catch (error) {
      console.error('Failed to initialize WebGL:', error);
      this.isSupported = false;
    }
  }

  private setupShaders() {
    if (!this.gl) return;

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform float time;
      uniform float audioLevel;
      uniform vec2 resolution;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        vec2 p = (uv - 0.5) * 2.0;
        
        float dist = length(p);
        float angle = atan(p.y, p.x);
        
        float tunnel = mod(dist * 10.0 - time * 2.0, 1.0);
        float rings = mod(angle * 8.0 + time, 6.28) / 6.28;
        
        float intensity = (1.0 - tunnel) * (1.0 - dist) * audioLevel;
        
        vec3 color1 = vec3(0.2, 0.6, 1.0);
        vec3 color2 = vec3(1.0, 0.3, 0.8);
        vec3 color = mix(color1, color2, rings);
        
        gl_FragColor = vec4(color * intensity, 1.0);
      }
    `;

    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    this.program = this.gl.createProgram();
    if (!this.program) return;

    this.gl.attachShader(this.program, vertexShader);
    this.gl.attachShader(this.program, fragmentShader);
    this.gl.linkProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      console.error('Program link error:', this.gl.getProgramInfoLog(this.program));
      return;
    }

    const positions = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ]);

    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

    const positionLocation = this.gl.getAttribLocation(this.program, 'position');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
  }

  private createShader(type: number, source: string): WebGLShader | null {
    if (!this.gl) return null;

    const shader = this.gl.createShader(type);
    if (!shader) return null;

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  setAnalyser(analyser: AnalyserNode) {
    this.analyser = analyser;
  }

  start() {
    if (!this.isSupported || this.animationId !== null) return;
    this.startTime = Date.now();
    this.render();
  }

  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private render = () => {
    if (!this.gl || !this.program) return;

    this.animationId = requestAnimationFrame(this.render);

    const time = (Date.now() - this.startTime) / 1000;
    let audioLevel = 0.5;

    if (this.analyser) {
      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      audioLevel = average / 255;
    }

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.useProgram(this.program);

    const timeLocation = this.gl.getUniformLocation(this.program, 'time');
    const audioLevelLocation = this.gl.getUniformLocation(this.program, 'audioLevel');
    const resolutionLocation = this.gl.getUniformLocation(this.program, 'resolution');

    this.gl.uniform1f(timeLocation, time);
    this.gl.uniform1f(audioLevelLocation, audioLevel);
    this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  };

  isWebGLSupported(): boolean {
    return this.isSupported;
  }

  dispose() {
    this.stop();
    if (this.gl && this.program) {
      this.gl.deleteProgram(this.program);
    }
    this.gl = null;
    this.program = null;
  }
}
