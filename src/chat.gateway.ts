import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MessagesService } from './messages/messages.service';

interface IMessageRecieved {
  message: string;
  conversationId: string;
  senderId: string;
}
interface IMessageSended {
  message: string;
  senderId: string;
}

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private messagesService: MessagesService,
  ) {}
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    const roomName: string = client.handshake.query.conversationId;

    const { sockets } = this.io.sockets;
    const authHeader = client.handshake.headers['authorization'];
    if (authHeader) {
      try {
        const token = authHeader.split(' ')[1];
        const decoded = this.jwtService.verify(token, {
          secret: this.configService.get<string>('SECRET_KEY_ACCESS_TOKEN'),
        });
        client.join(roomName);
        const room = this.io.sockets.adapter.rooms.get(roomName).keys();
        console.log('room', room);

        client.data = decoded;
      } catch (error) {
        console.log(error);

        client.emit('error', {
          message: 'Unauthorized',
        });
        // send error message to client
        client.disconnect();
      }
    } else {
      client.emit('error', {
        message: 'Unauthorized',
      });
      client.disconnect();
    }
    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
    client.leave(client.handshake.query.conversationId);
  }

  @SubscribeMessage('sendDataServer')
  async receiveMessageFromClient(client: any, data: IMessageRecieved) {
    this.logger.log(`Message received from client id: ${client.id}`);
    console.log(data);
    await this.messagesService.create(data);

    const dataSendToClient: IMessageSended = {
      message: data.message,
      senderId: data.senderId,
    };
    this.sendMessageToClient(client, dataSendToClient);
    return {
      event: 'pong',
      data: 'Wrong data that will make the test fail',
    };
  }

  sendMessageToClient(client: any, data: IMessageSended) {
    this.logger.log(`Message received from client id: ${client.id}`);
    console.log(data);
    client.broadcast
      .to(client.handshake.query.conversationId)
      .emit('sendDataClient', data);
    return {
      event: 'pong',
      data: 'Wrong data that will make the test fail',
    };
  }

  handleEmitSendMessage() {}
}
