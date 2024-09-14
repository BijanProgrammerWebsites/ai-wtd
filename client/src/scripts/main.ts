import {PixelsService} from './pixels.service.ts';
import {SelectorService} from './selector.service.ts';
import {ActionsService} from './actions.service.ts';

function main(): void {
    const selectorService = new SelectorService();

    const pixelsService = new PixelsService(selectorService);
    pixelsService.initialize();

    const actionsService = new ActionsService(selectorService, pixelsService);
    actionsService.initialize();
}

main();
