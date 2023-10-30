import { getRepository, Repository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';
import { UserFeedback } from '../models/UserFeedback';
import { User } from '../models/User';
import { NotFoundError } from '../errors/NotFoundError';
import { BadRequestError } from '../errors/BadRequestError';

export class FeedbacksService {
  private usersFeedbacksRepository: Repository<UserFeedback>;
  private usersRepository: Repository<User>;

  constructor() {
    this.usersFeedbacksRepository = getRepository(UserFeedback);
    this.usersRepository = getRepository(User);
  }

  async showAllUsersFeedbacks() {
    return await this.usersFeedbacksRepository.find();
  }

  async showUserFeedbacks(id: string) {
    const userExists = await this.usersRepository.findOne(id);
    if (!userExists) {
      throw new NotFoundError('User not found');
    }

    return await this.usersFeedbacksRepository.find({
      where: {
        user_id: id,
      },
    });
  }

  async showUserFeedback(id: string, feedback_id: string) {
    const userExists = await this.usersRepository.findOne(id);
    if (!userExists) {
      throw new NotFoundError('User not found');
    }

    const feedback = await this.usersFeedbacksRepository.findOne({
      where: {
        id: feedback_id,
        user_id: id,
      },
    });

    if (!feedback) {
      throw new NotFoundError('Feedback not found');
    }

    return feedback;
  }

  async showUserAverageFeedbacks(id: string) {
    const userExists = await this.usersRepository.findOne(id);

    if (!userExists) {
      throw new NotFoundError('User not found');
    }

    const [avgScore] = await this.usersFeedbacksRepository.query(
      `SELECT ROUND(AVG(score), 1) AS avgScore FROM user_feedback WHERE user_id = '${id}'`,
    );

    if (!avgScore) {
      throw new NotFoundError('Feedback not found');
    }

    return avgScore;
  }

  async createUserFeedback(userId: string, feedbackInfo: IFeedbackCreate) {
    const userExists = await this.usersRepository.findOne(userId);
    if (!userExists) {
      throw new NotFoundError('User not found');
    }

    const feedback = this.usersFeedbacksRepository.create({
      user_id: userId,
      reviewer_id: feedbackInfo.reviewer_id,
      score: Number(feedbackInfo.score),
    });
    await this.usersFeedbacksRepository.save(feedback);

    return {
      status: StatusCodes.CREATED,
      message: `CREATE user id ${userId} feedback`,
    };
  }

  async updateUserFeedback(
    userId: string,
    feedback_id: string,
    feedbackInfo: IFeedbackCreate,
  ) {
    // Check if user exists
    const userExists = await this.usersRepository.findOne(userId);
    if (!userExists) {
      throw new NotFoundError('User not found');
    }

    // Check if feedback exists
    const feedbackExists = await this.usersFeedbacksRepository.findOne(
      feedback_id,
    );
    if (!feedbackExists) {
      throw new NotFoundError('Feedback not found');
    }

    await this.usersFeedbacksRepository.update(feedback_id, {
      score: Number(feedbackInfo.score),
    });

    return {
      status: StatusCodes.OK,
      message: `UPDATED user id ${userId} feedback`,
    };
  }
}
