import { Module } from '@nestjs/common';
import { QuizService } from './services/quiz.service';
import { QuizController } from './controllers/quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question])],
  providers: [QuizService],
  controllers: [QuizController],
})
export class QuizModule {}
