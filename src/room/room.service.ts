import { Inject, Injectable } from '@nestjs/common';
import { Schema, model, connect, Mongoose } from 'mongoose';
import { RoomModel, Room } from './room.interface';
import { Usuarios, UsuariosModel } from './usuarios.interface';

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
      open: true,
      usuarios: [user]
    }).then((res) => console.log("res"))
    return "/room/" + result;

  }

  findAll() {
    return RoomModel.find();
  }

  findOne(id: string) {
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

  async joinRoom(idUser: string, name: string, socketId: string) {
    let user: any = await RoomModel.find({'usuarios.name':idUser})
    if(user.length<1){
    user = [{name:idUser,card:0, socketId:socketId}]
    let res = await RoomModel.findOneAndUpdate({ name: name }, { $addToSet: { usuarios: user } }).exec()
    res['usuarios'] = res['usuarios'].concat(user)
    return [res]
    }
    return user
  
  }

  async leaveRoom(user: Usuarios, room: Room) {
    let res = await RoomModel.findOneAndUpdate({name:room.name}, { $pull: { usuarios: user } }).exec()
    res.usuarios = res.usuarios.filter((item)=>{
      if(user.name != item.name)
      return item
    })  


    return [res]
  }

  async playCard(user: Usuarios, room: Room) {
    const query = {
      name: room.name,
      "usuarios.name": user.name
    }
    const updateDoc = {
      $set: { 'usuarios.$.card': user.card }
    }
    let res = await RoomModel.findOneAndUpdate(query, updateDoc).exec()
    res.usuarios = res.usuarios.filter((item)=>{
      if(item.name == user.name)
        item.card = user.card
      return item
    })
    return [res]
  }
}
