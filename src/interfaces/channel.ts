export interface Channel {
    _id: string;
    logoSrc: string;
    participantsIds: string[];
    name:string;
    isDirectMessages?:boolean;
}