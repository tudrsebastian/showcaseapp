import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Param,
  Get,
  Res,
} from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';

// import { Multer } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
import { Image } from './entity/img.entity';
import Projects from '../projects/entity/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Controller('/images')
export class ImageController {
  private static readonly UPLOAD_FOLDER = join(
    __dirname,
    '..',
    '..',
    'uploads',
  );
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    @InjectRepository(Projects)
    private projectsRepository: Repository<Projects>,
  ) {}

  @Get()
  async getImages() {
    const images = await this.imageRepository.find({
      relations: ['project'],
    });
    return images;
  }

  @Get(':filename')
  async getImage(
    @Res() res: Response,
    @Param('filename') filename: string,
  ): Promise<void> {
    const path = join(ImageController.UPLOAD_FOLDER, filename);
    res.sendFile(path);
  }
  @Post()
  @UseInterceptors(
    FilesInterceptor('images[]', 5, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadProductImages(
    @Param('projectId') projectId: number,
    @UploadedFiles() files,
  ) {
    const project = await this.projectsRepository.findOne({
      where: {
        id: projectId,
      },
      order: {
        id: 'DESC',
      },
    });
    console.log(files);
    files.forEach(async (file) => {
      const image = new Image();
      image.filename = file.filename;

      image.mimetype = file.mimetype;

      image.project = project;
      await this.imageRepository.save(image);
    });
    return files;
  }
}
