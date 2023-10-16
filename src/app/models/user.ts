import { Address } from './address';
import { BaseEntity } from './base-entity';
import { Company } from './company';

export interface User extends BaseEntity {
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
