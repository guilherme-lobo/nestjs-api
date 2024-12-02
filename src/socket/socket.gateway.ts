import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { RoomService } from '../room/room.service';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: Server
  public allClients = []
  public socketId = ''
  constructor(
    public roomService: RoomService
  ) { }

  handleConnection(socket: Socket) {
    this.socketId = socket.id
    this.allClients.push(socket);
  }

  handleDisconnect(socket: Socket) {
    console.log('HANDLE DISCONNECT');
  }

  @SubscribeMessage('joinRoom')
  async onJoinRoom(@MessageBody() body: any,socket: Socket) { 
    const end = await this.roomService.joinRoom(body.usuarios, body.room,this.socketId)
    return this.broadcast('move',end)
  }

  @SubscribeMessage('leaveRoom')
  async onLeaveRoom(@MessageBody() body: any) {
    const end = await this.roomService.leaveRoom(body.usuarios, body.room)
    return this.broadcast('move', end )

  }

  @SubscribeMessage('playCard')
  async onPlayCard(@MessageBody() body: any, socket: Socket) {
      const end = await this.roomService.playCard(body.usuarios, body.room)
      this.broadcast('move', end)
  }
  @SubscribeMessage('showUp')
  async showUp(@MessageBody() body: any, socket: Socket) {
    console.log(body)
      this.broadcast('showUp', body)
  }

  private broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify(message);
    for (let c of this.allClients) {
      c.emit(event, broadCastMessage);
    }
  }
}
