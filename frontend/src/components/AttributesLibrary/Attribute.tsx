import {AttributeDto} from "../../dto/attribute.ts"
import {categoryMapper} from "../../dto/mappers/categoryMapper.ts";
import {dataTypeMapper} from "../../dto/mappers/dataTypeMapper.ts";

const Attribute =  ({attribute}: {attribute: AttributeDto}) => {

    return (
        <tr>
            <td>{attribute.name}</td>
            <td>{categoryMapper(attribute.category)}</td>
            <td>{dataTypeMapper(attribute.dataType)}</td>
        </tr>
    )


}

export default Attribute