import * as tf from '@tensorflow/tfjs';
import {Canvas, PencilBrush} from 'fabric';

import {SelectorService} from './selector.service.ts';

export class CanvasService {
    private canvas!: Canvas;

    public constructor(private selectorService: SelectorService) {}

    public initialize() {
        this.canvas = new Canvas(this.selectorService.canvas);

        this.canvas.isDrawingMode = true;

        const brush = new PencilBrush(this.canvas);
        brush.color = '#000000';
        brush.width = 12;
        this.canvas.freeDrawingBrush = brush;

        this.canvas.backgroundColor = '#ffffff';
        this.canvas.renderAll();
    }

    public reset() {
        this.canvas.clear();
        this.canvas.backgroundColor = '#ffffff';
        this.canvas.renderAll();
    }

    public export() {
        const pixels = this.populateScaledCanvas();

        const tensor = tf.browser.fromPixels(pixels, 1).sub(255).mul(-1);

        return Array.from(tensor.dataSync());
    }

    private populateScaledCanvas() {
        const ctx = this.selectorService.canvas.getContext('2d')!;
        const ctxScaled = this.selectorService.scaledCanvas.getContext('2d')!;

        ctxScaled.save();
        ctxScaled.clearRect(0, 0, ctxScaled.canvas.height, ctxScaled.canvas.width);
        ctxScaled.scale(28.0 / ctx.canvas.width, 28.0 / ctx.canvas.height);
        ctxScaled.drawImage(this.selectorService.canvas, 0, 0);

        ctxScaled.getImageData(0, 0, 28, 28);
        ctxScaled.restore();
        return this.selectorService.scaledCanvas;
    }
}
