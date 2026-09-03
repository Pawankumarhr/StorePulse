import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Rating } from '../../ratings/entities/rating.entity.js';
import type { User } from '../../users/entities/user.entity.js';

@Entity('stores')
@Index('IDX_stores_owner_id', ['ownerId'])
@Index('UQ_stores_owner_id', ['ownerId'], { unique: true })
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 400 })
  address: string;

  @Column({ name: 'owner_id' })
  ownerId: number;

  @ManyToOne('User', (user: User) => user.stores, { nullable: false })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany('Rating', (rating: Rating) => rating.store)
  ratings: Rating[];
}
