import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Projects from '../../projects/entity/project.entity';
@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Projects, (project) => project.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  project: Projects;
  @Column()
  filename: string;
  @Column()
  mimetype: string;
}
