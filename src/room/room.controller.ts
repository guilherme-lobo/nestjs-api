import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { Room } from './room.interface';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Post('/new')
  create(@Req() req, @Res() res) {
    return this.roomService.create(req.body);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: Room) {
    console.log("opa")
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')  
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
