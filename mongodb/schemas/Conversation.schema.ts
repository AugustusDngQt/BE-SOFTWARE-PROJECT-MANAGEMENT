import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { IExecutor } from 'src/interfaces/executor.interface';
import { IParticipant } from 'src/interfaces/message/participant.interface';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema()
export class Conversation {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: SchemaTypes.Mixed })
  createdBy: IExecutor;

  @Prop({ type: SchemaTypes.Mixed })
  updatedBy: IExecutor;

  @Prop()
  deletedAt: Date;

  @Prop({ type: SchemaTypes.Mixed })
  deletedBy: IExecutor;

  @Prop({ type: SchemaTypes.Mixed, minlength: 2 })
  participants: IParticipant[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
