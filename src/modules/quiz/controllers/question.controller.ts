import {
  Body,
  Param,
  Controller,
  Get,
  NotFoundException,
  Post,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
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

  @Get('/:id')
  async findQuestionById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Question> {
    return await this.questionService.findQuestionById(id);
  }

  @Post('')
  @UsePipes(ValidationPipe)
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
