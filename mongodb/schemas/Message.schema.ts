import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { IExecutor } from 'src/interfaces/executor.interface';
import { v4 as uuidv4 } from 'uuid';
export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true, default: uuidv4 })
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
