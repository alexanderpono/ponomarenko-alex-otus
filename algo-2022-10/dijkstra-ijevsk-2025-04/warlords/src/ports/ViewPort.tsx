import React from 'react';
import { render } from 'react-dom';

export class ViewPort {
    private context: CanvasRenderingContext2D = null;
    private canvas: HTMLCanvasElement = null;
    private width: number = 0;
    private height: number = 0;
    private canvasId: string = '';

    constructor(private domTarget: string) {}

    setSize = (w: number, h: number) => {
        this.width = w;
        this.height = h;
        this.canvasId = `${this.domTarget}-canvas`;
        render(
            <canvas id={this.canvasId} height={h} width={w}></canvas>,
            document.getElementById(this.domTarget)
        );
        return this;
    };

    createContext = () => {
        this.canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
        if (this.canvas === null) {
            console.log('canvas === null');
            return null;
        }
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        return this;
    };

    lineColor = (color: string) => {
        this.context.strokeStyle = color;
        return this;
    };

    fillColor = (color: string) => {
        this.context.fillStyle = color;
        return this;
    };

    lineWidth = (width: number) => {
        this.context.lineWidth = width;
        return this;
    };

    border = () => {
        return this.box(0, 0, this.canvas.width, this.canvas.height);
    };

    line = (x0: number, y0: number, x1: number, y1: number) => {
        this.context.beginPath();
        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);
        this.context.stroke();
        this.context.closePath();
        return this;
    };

    hLine = (x0: number, y0: number, len: number) => {
        return this.line(x0, y0, x0 + len, y0);
    };

    vLine = (x0: number, y0: number, len: number) => {
        return this.line(x0, y0, x0, y0 + len);
    };

    box = (x0: number, y0: number, w: number, h: number) => {
        this.context.strokeRect(x0, y0, w, h);
        return this;
    };

    drawCircle = (xPos: number, yPos: number, radius: number) => {
        const startAngle = 0 * (Math.PI / 180);
        const endAngle = 360 * (Math.PI / 180);
        this.context.beginPath();
        this.context.arc(xPos, yPos, radius, startAngle, endAngle, false);
        this.context.fill();
        this.context.stroke();
        return this;
    };

    font = (font: string) => {
        this.context.font = font;
        return this;
    };

    text = (x: number, y: number, text: string) => {
        this.context.fillText(text, x, y);
        return this;
    };

    sprite = (
        pic: InstanceType<typeof Image>,
        srcX: number,
        srcY: number,
        destX: number,
        destY: number,
        w: number,
        h: number
    ) => {
        this.context.drawImage(pic, srcX, srcY, w, h, destX, destY, w, h);
        return this;
    };

    clear = () => {
        this.context.clearRect(0, 0, this.width, this.height);
        return this;
    };

    static create = (domTarget: string): ViewPort => {
        return new ViewPort(domTarget);
    };
}
