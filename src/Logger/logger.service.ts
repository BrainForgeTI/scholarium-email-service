import { Injectable } from "@nestjs/common";

@Injectable()
export class LoggerService {
    private static instance: LoggerService;
    private readonly logger: string[];

    private constructor() {
        this.logger = [];
    }

    public static getLogger(): LoggerService {
        if(!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }

    log(message: string): void {
        const timestamp = new Date().toISOString();
        const formatandoMessagem = `${timestamp}: ${message}`
        this.logger.push(formatandoMessagem);
        console.log(formatandoMessagem);
    }

    public getLogger(): any {
        return this.logger;
    }
}