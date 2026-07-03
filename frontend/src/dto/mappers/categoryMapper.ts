import type {Category} from "../attribute.ts";

export const categoryMapper = (category: Category):string =>{
    let changedCategory : string = "";
    switch(category){
        case 'CERTIFICATION':
            changedCategory = "Certification"
            break;
        case   'PROFESSIONAL_KNOWLEDGE':
            changedCategory ="Professional knowledge"
            break;
        case  'PERSONAL_INFORMATION':
            changedCategory = "Personal information"
            break
        case 'SOFT_SKILLS':
            changedCategory = "Soft skills"
            break
    }
return changedCategory
}




