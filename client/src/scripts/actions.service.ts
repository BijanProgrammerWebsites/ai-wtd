import {SelectorService} from './selector.service.ts';
import {PixelsService} from './pixels.service.ts';

export class ActionsService {
    public constructor(
        private selectorService: SelectorService,
        private pixelsService: PixelsService
    ) {}

    public initialize(): void {
        this.addResetButtonEventListeners();
        this.addGuessButtonEventListeners();
    }

    private addResetButtonEventListeners(): void {
        this.selectorService.resetButton.addEventListener('click', () => {
            this.pixelsService.reset();
        });
    }

    private addGuessButtonEventListeners(): void {
        this.selectorService.guessButton.addEventListener('click', async () => {
            const pixels = this.pixelsService.export();

            const response = await fetch('http://localhost:5000/api/v1/guess', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({pixels}),
            });

            const data = await response.json();

            alert(`Your number is ${data.guess}`);
        });
    }
}
