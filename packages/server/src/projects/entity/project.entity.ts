import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Image } from '../../files/entity/img.entity';
@Entity()
class Projects {
  @PrimaryGeneratedColumn()
  public id: number;
  @OneToMany(() => Image, (image) => image.project)
  @JoinColumn()
  images: Image[];
  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public customerLink: string;
}

export default Projects;
