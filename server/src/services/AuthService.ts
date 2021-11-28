import { getRepository, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
// import blacklist from '../middlewares/handleBlacklist';
import { EmailSender } from '../utils/emailSender';
import { BadRequestError } from '../errors/BadRequestError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { User } from '../models/User';

export class AuthService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  generateURL(route: string, id: string) {
    const baseURL = `${process.env.BASE_URL}:${process.env.PORT}`;
    return `${baseURL}${route}${id}`;
  }

  async registerUser({ name, email, password }: IAuthRegister) {
    const userExists = await this.usersRepository.findOne({
      email,
    });

    if (userExists) {
      throw new BadRequestError('Email already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    const url = this.generateURL('/api/auth/email-confirmation/', user.id);

    const destination = user.email;
    const subject = 'Email Confirmation';
    const text = `Hi! Please confirm your registration by clicking the URL below: ${url}`;
    const html = `<h1>Hi!</h1> Please confirm your registration by clicking the URL below:<br></br> <a href="${url}">${url}</a>`;

    const emailSender = new EmailSender();
    const emailSent = emailSender.sendMail(destination, subject, text, html);

    return {
      status: StatusCodes.CREATED,
      message: 'User registered successfully',
    };
  }

  async confirmRegistration(id: string) {
    const userExists = await this.usersRepository.findOne({ id });
    if (!userExists) {
      throw new BadRequestError('User not registered');
    }
    await this.usersRepository.update(id, { email_verified: true });
    return { status: StatusCodes.OK, message: 'User email verified' };
  }

  async loginUser({ email, password }: IAuthLogin) {
    const user = await this.usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new BadRequestError('Email not registered');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedError('Authentication Failed');
    }

    if (!user.email_verified) {
      throw new UnauthorizedError(
        `A confirmation email was sent to ${email}. Verify email first`,
      );
    }

    const payload = { id: user.id, email: user.email };
    const expiration = { expiresIn: '1h' };

    const token = jwt.sign(payload, process.env.JWT_SECRET, expiration);

    return {
      status: StatusCodes.OK,
      message: 'Authentication Successful',
      token,
    };
  }

  async logoutUser(token: string) {
    try {
      // const tokenInBlackList = await blacklist.tokenExists(token);

      // if (tokenInBlackList) {
      //   throw new BadRequestError('Already Logged out');
      // }

      // await blacklist.add(token);

      return { status: StatusCodes.OK, message: 'Signed out successfully' };
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
}
