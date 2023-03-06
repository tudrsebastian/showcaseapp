import { ProjectsController } from './projects.controller';
import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import Project from './entity/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
