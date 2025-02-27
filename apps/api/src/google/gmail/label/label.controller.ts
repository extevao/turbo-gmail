import { Body, Controller, Get, Post } from '@nestjs/common';
import { LabelService } from './label.service';
import { CreateLabelDto } from './dto/create-label.dto';

@Controller('google/gmail-label')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Get()
  findAll() {
    return this.labelService.findAll();
  }

  @Post()
  create(@Body() createLabelDto: CreateLabelDto) {
    return this.labelService.create(createLabelDto);
  }
}
