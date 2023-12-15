export interface Chat {
    _id: string;
    participantsIds: string[];
    name:string;
    isDirectMessages?:boolean;
}