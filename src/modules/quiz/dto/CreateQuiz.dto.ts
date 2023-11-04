import { IsNotEmpty, Length } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty({ message: 'O quiz deve ter um title ' })
  @Length(2, 255)
  title: string;

  @IsNotEmpty({ message: 'O quiz deve ter um description ' })
  @Length(3)
  description: string;
}
