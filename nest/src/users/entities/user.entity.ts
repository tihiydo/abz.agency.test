import { Position } from 'src/positions/entities/position.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({name: "users"})
export class User {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({nullable: true})
  photo: string;

  @ManyToOne(() => Position, (position) => position.users)
  position: Position;
}
