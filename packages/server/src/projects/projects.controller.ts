import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Get()
  getAllProjects() {
    return this.projectsService.getAllProjects();
  }
  @Get(':id')
  getProjectsById(@Param('id') id: string) {
    return this.projectsService.getProjectsById(Number(id));
  }
  @Post()
  async createProject(@Body() project: CreateProjectDto) {
    return this.projectsService.createProject(project);
  }
  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() project: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(Number(id), project);
  }
  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(Number(id));
  }
}
