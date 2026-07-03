import type {Type} from "../attribute.ts";

export const dataTypesMapper = (categories: Type):string =>{
    let changedDataType : string = "";
    switch(categories){
        case 'STRING':
            changedDataType = "String"
            break;
        case   'MARKDOWN':
            changedDataType = "Markdown"
            break;
        case  'IMAGE':
            changedDataType = "Image"
            break
        case 'NUMBER':
            changedDataType = "Number"
            break;
        case 'DATE':
            changedDataType = "Date"
            break;
        case 'PERIOD':
            changedDataType = "Period"
            break;
        case 'BOOLEAN':
            changedDataType = "Boolean"
            break
    }
    return changedDataType
}


