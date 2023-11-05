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

  async createQuiz(quizData: CreateQuizDto): Promise<Quiz> {
    return await this.quizRepository.save(quizData);
  }
}
