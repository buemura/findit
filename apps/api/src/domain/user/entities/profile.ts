import { randomUUID } from 'crypto';
import { IProfileCreate } from '../interfaces';

export class Profile {
  id: string;
  userId: string;
  imageUrl?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  occupation?: string;
  aboutMe?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: IProfileCreate) {
    this.id = randomUUID();
    this.userId = props.userId;
    this.imageUrl = props.imageUrl;
    this.city = props.city;
    this.state = props.state;
    this.country = props.country;
    this.phone = props.phone;
    this.occupation = props.occupation;
    this.aboutMe = props.aboutMe;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
