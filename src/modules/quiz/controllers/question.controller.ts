import { Body, Controller, Post } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { QuestionService } from '../services/question.service';
import { QuizService } from '../services/quiz.service';

@Controller('question')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
  ) {}

  @Post('')
  async createQuestion(
    @Body() questionData: CreateQuestionDto,
  ): Promise<CreateQuestionDto> {
    const quiz = await this.quizService.getQuizById(questionData.quizId);
    if (quiz) {
      return await this.questionService.createQuestion(questionData, quiz);
    }
  }
}
