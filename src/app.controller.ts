import { Controller, Get, Param, Res} from '@nestjs/common';
import { config } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nomes/:idRoom')
  findNamesByRoom(@Param() idRoom): object{
    console.log(idRoom)
    return this.appService.getNamesByRoom();
  }

  @Get('invite')
  getLinkInvite(@Res() res){
   res.status(200).redirect(this.appService.generateInviteLink());
  }

  @Get('invite/:idRoom')
  getRoomById(@Param() idRoom): string{
    return this.appService.getRoomById(idRoom);
  }
  
}
