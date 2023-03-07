import { Schema, model, connect } from 'mongoose';

export interface Usuarios {
    name:String,
    card:Number,
}

export const UsuarioSchema = new Schema<Usuarios>({
    name: { type: String, required: true },
    card: { type: Number, required: false}
  });

export const UsuariosModel = model<Usuarios>('Usuarios', UsuarioSchema);

