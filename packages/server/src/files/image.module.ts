import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entity/img.entity';
import Projects from '../projects/entity/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Projects])],
  controllers: [ImageController],
  providers: [],
})
export class ImageModule {}
