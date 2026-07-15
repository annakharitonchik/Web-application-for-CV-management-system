import { IsNotEmpty } from 'class-validator';

export class AttributeDto {
  category: Category;
  @IsNotEmpty()
  name: string;
  dataType: Type;
}
export enum Category {
  Certification = 'CERTIFICATION',
  ProfessionalKnowledge = 'PROFESSIONAL_KNOWLEDGE',
  PersonalInformation = 'PERSONAL_INFORMATION',
  SoftSkills = 'SOFT_SKILLS',
}
export enum Type {
  String = 'STRING',
  Markdown = 'MARKDOWN',
  Image = 'IMAGE',
  Number = 'NUMBER',
  Date = 'DATE',
  Period = 'PERIOD',
  Boolean = 'BOOLEAN',
}
