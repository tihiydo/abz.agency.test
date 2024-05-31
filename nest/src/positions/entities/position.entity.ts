import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({name: "positions"})
export class Position {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.position)
  users: User[];
}