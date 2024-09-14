import {SelectorService} from './selector.service.ts';

export class PixelsService {
    private readonly ROWS_COUNT = 28;
    private readonly COLUMNS_COUNT = 28;

    private isDrawing: boolean = false;

    public constructor(private selectorService: SelectorService) {}

    public initialize(): void {
        this.addDocumentEventListeners();

        this.deletePixels();
        this.createPixels();
    }

    public reset(): void {
        this.isDrawing = false;

        this.deletePixels();
        this.createPixels();
    }

    public export(): number[] {
        return this.selectorService.pixels.map((pixel) => {
            return +(pixel.dataset.color || '0');
        });
    }

    private addDocumentEventListeners(): void {
        document.addEventListener('mousedown', () => {
            this.isDrawing = true;
        });

        document.addEventListener('mouseup', () => {
            this.isDrawing = false;
        });
    }

    private deletePixels(): void {
        this.selectorService.pixelsParent.innerHTML = '';
    }

    private createPixels(): void {
        for (let row = 0; row < this.ROWS_COUNT; row++) {
            for (let column = 0; column < this.COLUMNS_COUNT; column++) {
                this.selectorService.pixelsParent.appendChild(this.createPixel(row, column));
            }
        }
    }

    private createPixel(row: number, column: number): HTMLDivElement {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');

        pixel.dataset.row = row.toString();
        pixel.dataset.column = column.toString();

        this.updatePixelColor(pixel, 0);

        pixel.addEventListener('mousemove', () => {
            if (!this.isDrawing) {
                return;
            }

            this.updatePixelColor(pixel, 255);

            const lowColor = 20;
            const mediumColor = 60;

            this.updatePixelColor(this.selectorService.getPixelByPosition(row - 1, column - 1), lowColor);
            this.updatePixelColor(this.selectorService.getPixelByPosition(row - 1, column), mediumColor);
            this.updatePixelColor(this.selectorService.getPixelByPosition(row - 1, column + 1), lowColor);

            this.updatePixelColor(this.selectorService.getPixelByPosition(row, column - 1), mediumColor);
            this.updatePixelColor(this.selectorService.getPixelByPosition(row, column + 1), mediumColor);

            this.updatePixelColor(this.selectorService.getPixelByPosition(row + 1, column - 1), lowColor);
            this.updatePixelColor(this.selectorService.getPixelByPosition(row + 1, column), mediumColor);
            this.updatePixelColor(this.selectorService.getPixelByPosition(row + 1, column + 1), lowColor);
        });

        return pixel;
    }

    private updatePixelColor(pixel: HTMLDivElement | null, color: number): void {
        if (!pixel) {
            return;
        }

        color = Math.min(255, color + +(pixel.dataset.color || '0'));

        pixel.dataset.color = color.toString();

        if (color === 0) {
            pixel.style.backgroundColor = `var(--surface-2)`;
        } else {
            pixel.style.backgroundColor = `rgb(${color}, ${color}, ${color})`;
        }
    }
}
