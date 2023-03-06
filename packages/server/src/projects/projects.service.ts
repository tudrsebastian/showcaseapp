import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import Projects from './entity/project.entity';
@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectRepository: Repository<Projects>,
  ) {}

  getAllProjects() {
    return this.projectRepository.find({
      relations: ['images'],
    });
  }
  async getProjectsById(id: number) {
    const project = await this.projectRepository.findOne({
      where: {
        id,
      },
      relations: ['images'],
    });
    if (project) {
      return project;
    } else {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
  }
  async updateProject(id: number, project: UpdateProjectDto) {
    await this.projectRepository.update(id, project);
    const updatedProject = await this.projectRepository.findOne({
      where: { id },
    });
    if (updatedProject) {
      return updatedProject;
    } else {
      throw new HttpException('Project not found!', HttpStatus.NOT_FOUND);
    }
  }
  async createProject(project: CreateProjectDto) {
    const newProject = await this.projectRepository.create(project);
    await this.projectRepository.save(newProject);
    return newProject;
  }
  async deleteProject(id: number) {
    const deleteRes = await this.projectRepository.delete(id);
    if (!deleteRes.affected) {
      throw new HttpException('Project not found!', HttpStatus.NOT_FOUND);
    }
  }
}
