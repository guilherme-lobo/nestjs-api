import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'socket.io'
import { RoomService } from '../room/room.service';

@WebSocketGateway()
export class SocketGateway {
  public server: Server

  constructor(
    public roomService: RoomService
  ) { }

  @SubscribeMessage('joinRoom')
  onJoinRoom(@MessageBody() body: any) {
    return this.roomService.joinRoom(body.usuarios, body.room)
  }

  @SubscribeMessage('leaveRoom')
  onLeaveRoom(@MessageBody() body: any){
    return this.roomService.leaveRoom(body.usuarios, body.room)
  }

  @SubscribeMessage('playCard')
  onPlayCard(@MessageBody() body: any) {
    return this.roomService.playCard(body.usuarios, body.room)
  }
}
