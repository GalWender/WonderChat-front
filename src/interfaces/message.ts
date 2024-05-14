interface UserRef {
    userId:string;
    name: string;
}

export interface Message {
    _id: string;
    createdAt: Date;
    content: string;
    messageBy: UserRef;
    chatId:string;
}

