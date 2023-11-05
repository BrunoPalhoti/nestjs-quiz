import { IsNotEmpty, Length } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @Length(2, 255)
  question: string;
}
