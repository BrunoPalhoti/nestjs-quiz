import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Quiz } from '../entities/quiz.entity';
import { CreateQuizDto } from '../dto/CreateQuiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  getAllQuiz(): Promise<CreateQuizDto[]> {
    return this.quizRepository.find();
  }

  createQuiz(quizData: CreateQuizDto): Promise<CreateQuizDto> {
    return this.quizRepository.save(quizData);
  }
}
