export interface Event {
    id: string;
    title: string;
    start: Date;
    end: Date;
    court: string;
    status: "confirmed" | "pending";
    isFixedEvent: boolean;
}