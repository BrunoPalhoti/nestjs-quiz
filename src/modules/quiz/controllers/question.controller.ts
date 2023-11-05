import { Body, Controller, Post } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { QuestionService } from '../services/question.service';
import { Question } from '../entities/question.entity';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post('')
  saveQuestion(@Body() questionData: CreateQuestionDto): Promise<Question> {
    return this.questionService.saveQuestion(questionData);
  }
}