import { Schema, model, connect } from 'mongoose';
import { Usuarios, UsuarioSchema } from "./usuarios.interface";

export interface Room {
    name:String,
    usuarios:Array<Usuarios>,
    open: Boolean
}


const RoomSchema = new Schema<Room>({
    name: { type: String, required: true },
    usuarios: { type:[UsuarioSchema], required: true },
    open: {type:Boolean,default:true}
  });

export const RoomModel = model<Room>('Room', RoomSchema);
