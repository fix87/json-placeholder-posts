import { BaseEntity } from './base-entity';

export interface Post extends BaseEntity {
  userId: number;
  title: string;
  body: string;
}
