import { getRepository, Repository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/User';
import { ServiceCompleted } from '../models/ServiceCompleted';
import { NotFoundError } from '../errors/NotFoundError';

export class UsersService {
  private usersRepository: Repository<User>;
  private servicesCompletedRepository: Repository<ServiceCompleted>;

  constructor() {
    this.usersRepository = getRepository(User);
    this.servicesCompletedRepository = getRepository(ServiceCompleted);
  }

  async checkUserExists(id: string) {
    const userExists = await this.usersRepository.find({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundError('User not found');
    }

    return userExists;
  }

  async showAllUsers() {
    return await this.usersRepository.find();
  }

  async showOneUser(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async showUsersCount() {
    const [list, count] = await this.usersRepository.findAndCount();
    return count;
  }

  async showUserCompletedServicesCount(id: string) {
    const [list, count] = await this.servicesCompletedRepository.findAndCount({
      where: {
        user_id: id,
      },
    });
    return count;
  }

  async getProfileImage(id: string) {
    const userExists = await this.checkUserExists(id);

    const { user_photo } = userExists[0];

    return user_photo;
  }

  async updateUser(id: string, userInfo: IUsersUpdate) {
    const userExists = await this.usersRepository.findOne(id);

    if (!userExists) {
      throw new Error('User does not exist!');
    }

    await this.usersRepository.update(id, userInfo);

    return { status: StatusCodes.OK, message: `UPDATED user id ${id}` };
  }

  async uploadProfileImage(id: string, filename: string) {
    await this.checkUserExists(id);
    await this.usersRepository.update(id, { user_photo: filename });
    return {
      status: StatusCodes.OK,
      message: `UPDATED user id ${id} profile photo`,
    };
  }

  async deleteUser(id: string) {
    await this.usersRepository.delete(id);
    return { status: StatusCodes.OK, message: `DELETED user id ${id}` };
  }
}
