import { iEventTypes } from './ieventTypes'

class eventType1 implements iEventTypes{
    mainSelector: string;
    eventSelector: string;
    scrapingEvent(): string {
        throw new Error('Method not implemented.');
    }
}