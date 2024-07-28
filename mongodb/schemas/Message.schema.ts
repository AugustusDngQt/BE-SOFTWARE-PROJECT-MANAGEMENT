import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { IExecutor } from 'src/interfaces/executor.interface';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  conversation: string;

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
}

export const MessageSchema = SchemaFactory.createForClass(Message);
