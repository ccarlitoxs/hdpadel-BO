import { Timestamp } from "firebase/firestore";

export interface Event {
    id?: string;
    title?: string;
    start?: Date;
    end?: Date;
    court?: string;
    status?: "confirmed" | "pending";
    isFixedEvent?: boolean;
    fixedEventId?: string;
    confirm_shift_id?: string;
}

export interface EventResponse {
    id?: string;
    owner?: string;
    start_date?: Timestamp;
    end_date?: Timestamp;
    court?: string;
    status?: "confirmed" | "pending";
    confirm_shift_id?: string;
}

export interface FixedEventResponse {
    id: string;
    day_of_week: "1" | "2" | "3" | "4" | "5" | "6" | "7";
    start_time: string;
    end_time: string;
    court: string;
    owner: string;
}

export interface User {
    id: string;
    has_create_pass: boolean;
    password: string;
    username: string;
    role: "admin" | "owner";
}