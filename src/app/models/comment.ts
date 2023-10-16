import { BaseEntity } from './base-entity';

export interface Comment extends BaseEntity {
  postId: number;
  name: string;
  email: string;
  body: string;
}
