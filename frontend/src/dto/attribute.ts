export class AttributeDto {
    id: number;
    category: Category;
    name: string;
    dataType: Type;
}

export class AttributeDtoView {
    key: number;
    category: string;
    name: string;
    dataType: string;
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
