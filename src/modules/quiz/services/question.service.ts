import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Question } from '../entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async saveQuestion(questionData: CreateQuestionDto): Promise<Question> {
    return await this.questionRepository.save(questionData);
  }
}
