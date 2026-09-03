import { AppService } from './app.service.js';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): {
        name: string;
        status: string;
    };
    getHealth(): {
        status: string;
    };
}
