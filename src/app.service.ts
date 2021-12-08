import { Injectable, Redirect } from '@nestjs/common';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { find } from 'rxjs';
import { setFlagsFromString } from 'v8';
import  * as config  from '../config.json';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(config);
    return 'Hello World!';
  }

  getNamesByRoom(): object{
    console.log(config);
    return config.pessoas ;
    }

  generateInviteLink(): string{
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < randomChars.length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    console.log(config)
     return "/invite/"+result;
   
  }

  getRoomById(idRoom): string{
    if(config.salas.find((sala)=>sala.idRoom==idRoom.idRoom)){
      
    return "sucessagem garantida"
    }
    return "deu erro"
  }

}
