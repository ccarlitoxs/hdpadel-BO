export interface Event {
    id: string;
    title: string;
    start: Date;
    end: Date;
    court: string;
    status: "confirmed" | "pending";
    isFixedEvent: boolean;
}

export interface User {
    id: string;
    has_create_pass: boolean;
    password: string;
    username: string;
    role: "admin" | "owner";
}