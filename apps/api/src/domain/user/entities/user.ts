import { randomUUID } from 'crypto';
import { IUserCreate } from '../interfaces';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: IUserCreate) {
    this.id = randomUUID();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
