import {SelectorService} from './selector.service.ts';
import {ActionsService} from './actions.service.ts';
import {CanvasService} from './canvas.service.ts';
import {MockService} from './mock.service.ts';
import {PixelsService} from './pixels.service.ts';

function main(): void {
    initializeUsingMock();
    initializeUsingCanvas();
}

function initializeUsingMock(): void {
    const selectorService = new SelectorService();

    const pixelsService = new PixelsService(selectorService);
    pixelsService.initialize();

    const mockService = new MockService(pixelsService);
    mockService.mock();
}

function initializeUsingCanvas(): void {
    const selectorService = new SelectorService();

    const canvasService = new CanvasService(selectorService);
    canvasService.initialize();

    const actionsService = new ActionsService(selectorService, canvasService);
    actionsService.initialize();
}

main();
