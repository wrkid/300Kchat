export interface ChatMessage {
  username: string;
  userid: string;
  content: string;
  timestamp: Date;
}

export interface Message {
  _id: string;
  content: string;
}