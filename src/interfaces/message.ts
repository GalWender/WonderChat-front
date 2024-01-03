export interface Message {
    _id: string;
    createdAt: Date;
    content: string;
    messageBy: string;
    // messageTo: string[];
    chatId:string;
}
