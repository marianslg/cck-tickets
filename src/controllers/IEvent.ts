export interface IEvent {
    id: number
    url: string
    event?: string | null,
    name?: string,
    soldOut?: number,
    eventDate?: string,
    eventTime?: string,
    reserve?: string
}