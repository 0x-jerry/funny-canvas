class Camera {
  fov: number = 200;
  width: number = 200;
  height: number = 200;

  constructor(w: number, h: number, fov: number) {
    this.width = w;
    this.height = h;
    this.fov = fov;
  }

  to2d(x: number, y: number, z: number) {
    const scale = this.fov / (this.fov + z);
    const x2d = x * scale + this.width / 2;
    const y2d = y * scale + this.height / 2;

    return {
      x: x2d,
      y: y2d,
    };
  }
}

export default {
  Camera
}
