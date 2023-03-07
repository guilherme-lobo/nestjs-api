import { Inject, Injectable } from '@nestjs/common';
import { Schema, model, connect, Mongoose } from 'mongoose';
import { RoomModel, Room } from './room.interface';
import { Usuarios } from './usuarios.interface';

@Injectable()
export class RoomService {
  constructor() {
    connect('mongodb+srv://guilherme-lobo:q1w2e3@cluster0.xx8w81f.mongodb.net/poker-plan?retryWrites=true&w=majority')
  }

  create(user: Usuarios) {
    var randomChars = '0123456789';
    var result = '';
    for (var i = 0; i < randomChars.length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    RoomModel.create({
      name: result,
      open:true,
      usuarios: [user]
    }).then((res)=>console.log(res))
    return "/room/" + result;

  }

  findAll() {
    return RoomModel.find();
  }

  findOne(id: number) {
    return RoomModel.find({
      name: id
    });
  }

  update(id: number, room: Room) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }

  joinRoom(user: Usuarios, room: Room) {
    console.log(user)
    console.log(room)
   let res = RoomModel.updateOne(room,{$addToSet:{usuarios:user}}).exec()
    .then((res)=>{
      console.log(res)
      if(res.modifiedCount>0)
        return true
      return false
    })

    return res
  }

  leaveRoom(user: Usuarios, room: Room){
    let res = RoomModel.updateOne(room,{$unset:{usuarios:user}}).exec()
    .then((res)=>{
      if(res.modifiedCount>0)
        return true
      return false
    })

    return res
  }
  
  playCard(user: Usuarios, room: Room){
    const query = {
      name:room.name,
      "usuarios.name":user.name
    }
    const updateDoc = {
      $set: {'usuarios.$.card': user.card}
    }
    let res = RoomModel.updateOne(query,updateDoc).exec()
    .then((res)=>{
      console.log(res)
      if(res.modifiedCount>0)
        return true
      return false
    })

    return res
  }
}
