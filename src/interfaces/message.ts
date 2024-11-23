interface UserRef {
    userId:string;
    name: string;
}

export interface Message {
    _id?: string;
    tempId?: string;
    createdAt: Date;
    content: string;
    messageBy: UserRef;
    chatId:string;
    hasError?: boolean;
}
