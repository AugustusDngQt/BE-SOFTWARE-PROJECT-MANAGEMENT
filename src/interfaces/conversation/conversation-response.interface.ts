export interface IConversationParticipant {
  id: string;
  name: string;
  email: string;
}

export interface IConversationResponse {
  id: string;
  title: string;
  participants: IConversationParticipant[];
}
