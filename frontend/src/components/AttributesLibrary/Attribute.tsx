import {AttributeDto} from "../../dto/attribute.ts"
import {categoriesMapper} from "../../dto/mappers/categoriesMapper.ts";
import {dataTypesMapper} from "../../dto/mappers/dataTypesMapper.ts";

const Attribute =  ({attribute}: {attribute: AttributeDto}) => {

    return (
        <tr>
            <td>{attribute.name}</td>
            <td>{categoriesMapper(attribute.categories)}</td>
            <td>{dataTypesMapper(attribute.dataTypes)}</td>
        </tr>
    )


}

export default Attribute