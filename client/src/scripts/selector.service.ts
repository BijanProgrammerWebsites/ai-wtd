export class SelectorService {
    public get pixelsParent(): HTMLDivElement {
        return document.querySelector('#pixels')!;
    }

    public get pixels(): HTMLDivElement[] {
        return Array.from(document.querySelectorAll('.pixel'));
    }

    public getPixelByPosition(row: number, column: number): HTMLDivElement | null {
        return document.querySelector(`.pixel[data-row="${row}"][data-column="${column}"]`);
    }

    public get resetButton(): HTMLButtonElement {
        return document.querySelector('main .actions button.reset')!;
    }

    public get guessButton(): HTMLButtonElement {
        return document.querySelector('main .actions button.guess')!;
    }
}
