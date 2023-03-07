import { Module } from '@nestjs/common';
import { MongoClient } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketGateway } from './socket/socket.gateway';
import { RoomService } from './room/room.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://guilherme-lobo:q1w2e3@cluster0.xx8w81f.mongodb.net/poker-plan?retryWrites=true&w=majority'),
    RoomModule],
  controllers: [AppController],
  providers: [AppService, SocketGateway, RoomService],
})
export class AppModule {}
