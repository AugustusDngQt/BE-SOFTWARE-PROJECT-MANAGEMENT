import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { IExecutor } from 'src/interfaces/executor.interface';
import { IParticipant } from 'src/interfaces/message/participant.interface';
import { v4 as uuidv4 } from 'uuid';
export type ConversationDocument = HydratedDocument<Conversation>;

@Schema()
export class Conversation {
  @Prop({ required: true, default: uuidv4 })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
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

const ConversationSchema = SchemaFactory.createForClass(Conversation);

ConversationSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export { ConversationSchema };
