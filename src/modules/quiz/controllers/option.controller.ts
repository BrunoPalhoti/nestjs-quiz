import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { OptionService } from '../services/option.service';
import { QuestionService } from '../services/question.service';
import { CreateOptionDto } from '../dto/create-option.dto';

@Controller('question/option')
export class OptionController {
  constructor(
    private optionService: OptionService,
    private questionService: QuestionService,
  ) {}

  @Post('')
  @UsePipes(ValidationPipe)
  //falta add o tipo do retorno
  async createOptionToQuestion(@Body() optionData: CreateOptionDto) {
    const question = await this.questionService.findQuestionById(
      optionData.questionId,
    );

    if (!question) {
      throw new NotFoundException(
        `Não existe questão com o id: ${optionData.questionId}`,
      );
    }

    const option = await this.optionService.createOptionToQuestion(
      optionData,
      question,
    );

    // depois que add o tipo do retorno ver como vai ficar aqui
    return { question, option };
  }
}
