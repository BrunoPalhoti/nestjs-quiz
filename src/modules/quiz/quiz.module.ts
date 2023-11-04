import { Module } from '@nestjs/common';
import { QuizService } from './services/quiz.service';
import { QuizController } from './controllers/quiz.controller';

@Module({
  providers: [QuizService],
  controllers: [QuizController],
})
export class QuizModule {}