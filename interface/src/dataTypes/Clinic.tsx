import { StringLiteral } from "typescript";

export type Clinic = {
    "_id": string;
    "address line 1": string;
    "city": string;
    "clinic type": number;
    "name": string;
    "number": string[];
    "state": string;
    "url": string;
    "zipcode": number;
    "note"?: string;
    "lat": number;
    "lng": number;
};