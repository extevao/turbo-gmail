import { Controller, Get, Post, Body } from '@nestjs/common';
import { CredenciaisGoogleService } from './credenciais-google.service';
import { CreateCredencialGoogleDto } from './dto/create-credencial-google.dto';

@Controller('google/credenciais')
export class CredenciaisGoogleController {
  constructor(private readonly service: CredenciaisGoogleService) {}

  @Post()
  create(@Body() body: CreateCredencialGoogleDto) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
