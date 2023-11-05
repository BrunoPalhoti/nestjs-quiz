import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Quiz } from '../entities/quiz.entity';
import { CreateQuizDto } from '../dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async getAllQuiz(): Promise<Quiz[]> {
    return await this.quizRepository.find();
  }

  async getQuizById(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository
      .createQueryBuilder('quizes')
      .innerJoinAndSelect('quizes.questions', 'questions')
      .where('quizes.id = :id', { id })
      .select([
        'quizes.id',
        'quizes.title',
        'quizes.description',
        'quizes.isActive',
        'questions.id',
        'questions.question',
      ])
      .getOne();

    return quiz;
  }

  async createQuiz(quizData: CreateQuizDto): Promise<Quiz> {
    return await this.quizRepository.save(quizData);
  }
}
