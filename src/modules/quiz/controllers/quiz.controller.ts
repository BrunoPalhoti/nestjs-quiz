import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { CreateQuizDto } from '../dto/CreateQuiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('/')
  getAllQuiz(): Promise<CreateQuizDto[]> {
    return this.quizService.getAllQuiz();
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createQuiz(@Body() quizData: CreateQuizDto): Promise<CreateQuizDto> {
    return this.quizService.createQuiz(quizData);
  }
}
