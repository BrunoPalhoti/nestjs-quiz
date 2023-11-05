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

  getAllQuiz(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

  createQuiz(quizData: CreateQuizDto): Promise<Quiz> {
    return this.quizRepository.save(quizData);
  }
}
