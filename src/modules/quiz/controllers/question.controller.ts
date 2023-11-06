import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { QuestionService } from '../services/question.service';
import { QuizService } from '../services/quiz.service';
import { Question } from '../entities/question.entity';

@Controller('question')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
  ) {}

  @Get('')
  async getAllQuestions(): Promise<Question[]> {
    return await this.questionService.getAllQuestions();
  }

  @Post('')
  async createQuestion(
    @Body() questionData: CreateQuestionDto,
  ): Promise<CreateQuestionDto> {
    const quiz = await this.quizService.getQuizById(questionData.quizId);
    if (!quiz) {
      throw new NotFoundException(
        `Não existe quiz com o id: ${questionData.quizId}`,
      );
    }
    return this.questionService.createQuestion(questionData, quiz);
  }
}
