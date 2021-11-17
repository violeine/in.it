import canvasSketch from 'canvas-sketch';
import { lerp } from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';
const settings = {
  dimensions: [2048, 2048]
};

function dots(ctx, x, y, color) {
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, 2 * Math.PI, false);
  ctx.lineWidth = 10;
  ctx.fillStyle = color;
  ctx.fill();
}
const dotsScheme = {
  red: `#f8444d`,
  purple: `#9267ff`,
  blue: `#46c6f8`,
  green: `#50ca8d`,
  yellow: `#ffd552`,
  orange: `#ff9251`,
  white: `#cdcfee`,
  // black: '#11121e'
}
const sketch = () => {
  function grid() {
    const points = [];
    const count = 15;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1); //count explode when div with 0 lol
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          pos: [u, v],
          color: random.pick(Object.values(dotsScheme))
        })
      }
    }
    return points;
  }
  const points = grid();
  const margin = 150;
  return ({ context, width, height }) => {
    context.fillStyle = '#11121e';
    context.fillRect(0, 0, width, height);
    points.forEach(({ pos: [x, y], color }) => {
      const u = lerp(margin, width - margin, x)
      const v = lerp(margin, height - margin, y)
      dots(context, u, v, color);
    });
  };
};

canvasSketch(sketch, settings);
