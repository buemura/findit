import { getRepository, IsNull, Like, Not, Repository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';
import { Service } from '../models/Service';
import { ServiceCompleted } from '../models/ServiceCompleted';
import { User } from '../models/User';
import { NotFoundError } from '../errors/NotFoundError';

export class ServicesService {
  private servicesRepository: Repository<Service>;
  private servicesCompletedRepository: Repository<ServiceCompleted>;
  private usersRepository: Repository<User>;

  constructor() {
    this.servicesRepository = getRepository(Service);
    this.servicesCompletedRepository = getRepository(ServiceCompleted);
    this.usersRepository = getRepository(User);
  }

  async checkServiceExists(id: string) {
    const serviceExists = await this.servicesRepository.findOne({
      where: { id },
    });

    if (!serviceExists) {
      throw new NotFoundError('Service not found');
    }

    return serviceExists;
  }

  async showAllServices(where: any) {
    const {
      title = '%',
      category = '%',
      city = '%',
      state = '%',
      country = '%',
    } = where;

    if (Object.keys(where).length === 0) {
      return await this.servicesRepository.find({
        order: {
          updated_at: 'DESC',
        },
        relations: ['user'],
        where: {
          completed: false,
        },
      });
    }

    return await this.servicesRepository.find({
      relations: ['user'],
      where: {
        title: Like(`%${title}%`),
        category: Like(`%${category}%`),
        city: Like(`%${city}%`),
        state: Like(`%${state}%`),
        country: Like(`%${country}%`),
        completed: false,
      },
      order: {
        updated_at: 'DESC',
      },
    });
  }

  async showOneService(id: string) {
    return await this.servicesRepository.findOne(id, { relations: ['user'] });
  }

  async showServicesQuantity() {
    const [_, count] = await this.servicesRepository.findAndCount({
      withDeleted: true,
    });
    return count;
  }

  async showUserCompletedServicesCount(id: string) {
    const [_, count] = await this.servicesCompletedRepository.findAndCount({
      where: {
        user_id: id,
      },
    });
    return count;
  }

  async createService(serviceInfo: IServicesCreate) {
    const userExists = await this.usersRepository.findOne({
      where: { id: serviceInfo.user_id },
    });
    if (!userExists) {
      throw new NotFoundError('User associated not found');
    }

    const services = this.servicesRepository.create(serviceInfo);
    await this.servicesRepository.save(services);
    return services;
  }

  async completeService(serviceCompleted: IServicesCompleted) {
    const userExists = await this.usersRepository.findOne({
      where: { id: serviceCompleted.user_id },
    });
    if (!userExists) {
      throw new NotFoundError('User associated not found');
    }

    const completed = this.servicesCompletedRepository.create(serviceCompleted);
    await this.servicesCompletedRepository.save(completed);
    await this.servicesRepository.update(serviceCompleted.service_id, {
      completed: true,
    });
    return {
      status: StatusCodes.OK,
      message: 'Service completed successfully',
    };
  }

  async updateService(id: string, serviceInfo: IServicesCreate) {
    const serviceExists = await this.servicesRepository.findOne(id);
    if (!serviceExists) {
      throw new NotFoundError('Service not found');
    }

    await this.checkServiceExists(id);
    await this.servicesRepository.update(id, serviceInfo);
    return { status: StatusCodes.OK, message: `UPDATED service id ${id}` };
  }

  async deleteService(id: string) {
    const serviceToRemove = await this.servicesRepository.findOne(id);
    if (!serviceToRemove) {
      throw new NotFoundError('Service not found');
    }

    await this.servicesRepository.softRemove(serviceToRemove);
    return { status: StatusCodes.OK, message: `DELETED service id ${id}` };
  }

  async showAllServicesFromUser(id: string) {
    const userExists = await this.usersRepository.findOne({
      where: { id },
    });
    if (!userExists) {
      throw new NotFoundError('User associated not found');
    }
    return await this.servicesRepository.find({
      where: { user_id: id },
      order: {
        updated_at: 'DESC',
      },
      relations: ['user'],
      withDeleted: true,
    });
  }

  async showActiveServicesFromUser(id: string) {
    const userExists = await this.usersRepository.findOne({
      where: { id },
    });
    if (!userExists) {
      throw new NotFoundError('User associated not found');
    }
    return await this.servicesRepository.find({
      where: { user_id: id, completed: false },
      order: {
        updated_at: 'DESC',
      },
      relations: ['user'],
    });
  }

  async showInactiveServicesFromUser(id: string) {
    const userExists = await this.usersRepository.findOne({
      where: { id },
    });
    if (!userExists) {
      throw new NotFoundError('User associated not found');
    }

    return await this.servicesRepository.find({
      where: [
        { user_id: id, completed: true },
        { user_id: id, deleted_at: Not(IsNull()) },
      ],
      order: {
        updated_at: 'DESC',
      },
      relations: ['user'],
      withDeleted: true,
    });
  }
}
