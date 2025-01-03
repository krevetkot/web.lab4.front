import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  koef = 125;

  isItHit(x: number, y: number, r: number): boolean {
    x = parseFloat(x.toString());
    return (
      (x >= 0 && x <= r && y >= 0 && y <= r) || // in rectangle
      (x >= 0 && y >= x / 2 - r / 2 && y <= 0) || // in triangle
      (x * x + y * y <= r * r && x <= 0 && y <= 0) // in circle
    );
  }

  drawArea(R: number, canvas: HTMLCanvasElement, points: any[]): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(1, -1);

    // Draw areas
    ctx.fillStyle = 'rgb(255,146,51)';
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -this.koef / 2);
    ctx.lineTo(this.koef, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, this.koef);
    ctx.lineTo(this.koef, this.koef);
    ctx.lineTo(this.koef, 0);
    ctx.arc(0, 0, this.koef, Math.PI, (3 * Math.PI) / 2, false);
    ctx.closePath();
    ctx.fill();

    // Draw axis
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(-canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, 0);
    ctx.moveTo(0, -canvas.height / 2);
    ctx.lineTo(0, canvas.height / 2);
    ctx.stroke();

    // Draw points
    points.forEach((point) => {
      this.drawPoint(
        this.isItHit(point.x, point.y, R),
        point.x,
        point.y,
        R,
        ctx
      );
    });

    ctx.translate(-canvas.width / 2, -canvas.height / 2);
  }

  drawPoint(isHit: boolean, x: number, y: number, r: number, ctx: CanvasRenderingContext2D): void {
    if (r === 0 || x === undefined || x === null) return;

    const SCALE_FACTOR = this.koef / r;
    ctx.beginPath();
    ctx.arc(x * SCALE_FACTOR, y * SCALE_FACTOR, 5, 0, Math.PI * 2);
    ctx.fillStyle = isHit ? 'rgb(78,255,51)' : 'rgb(255,51,51)';
    ctx.fill();
  }
}
