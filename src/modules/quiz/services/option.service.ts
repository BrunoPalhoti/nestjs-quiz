import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '../entities/option.entity';
import { Repository } from 'typeorm';
import { CreateOptionDto } from '../dto/create-option.dto';
import { Question } from '../entities/question.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async createOptionToQuestion(
    optionData: CreateOptionDto,
    question: Question,
  ): Promise<Option> {
    const newOption = await this.optionRepository.save({
      text: optionData.text,
      isCorrect: optionData.isCorrect,
      questionId: question.id,
    });

    question.options = [...question.options, newOption];
    await question.save();

    return newOption;
  }
}
