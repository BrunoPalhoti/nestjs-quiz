import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Question } from '../entities/question.entity';
import { Quiz } from '../entities/quiz.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async getAllQuestions(): Promise<Question[]> {
    return await this.questionRepository
      .createQueryBuilder('questions')
      .leftJoinAndSelect('questions.quiz', 'quiz')
      .select([
        'questions.id',
        'questions.question',
        'quiz.id',
        'quiz.isActive',
      ])
      .getMany();
  }

  async findQuestionById(id: number): Promise<Question> {
    return await this.questionRepository.findOne({
      where: { id },
      relations: ['quiz', 'options'],
    });
  }

  async createQuestion(
    questionData: CreateQuestionDto,
    quiz: Quiz,
  ): Promise<CreateQuestionDto> {
    const newQuestion = await this.questionRepository.save({
      question: questionData.question,
      quizId: quiz.id,
    });

    quiz.questions = [...quiz.questions, newQuestion];
    await quiz.save();

    const response = {
      question: newQuestion.question,
      quizId: newQuestion.quizId,
    };

    return response;
  }
}
