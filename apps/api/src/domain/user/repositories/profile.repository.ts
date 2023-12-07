import { Profile } from '../entities';
import { FindOneProfileOption } from '../interfaces';

export abstract class ProfileRepository {
  abstract findOne(opt?: FindOneProfileOption): Profile | Promise<Profile>;
  abstract save(profile: Profile): Profile | Promise<Profile>;
}
