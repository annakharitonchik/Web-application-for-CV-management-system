import { IsNotEmpty } from 'class-validator';

export class ApplyDto {
  @IsNotEmpty()
  email: string;
}
