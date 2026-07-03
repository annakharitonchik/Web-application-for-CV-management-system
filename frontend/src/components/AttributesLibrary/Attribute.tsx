import {AttributeDto} from "../../dto/attribute.ts"
import {categoriesMapper} from "../../dto/mappers/categoriesMapper.ts";

const Attribute =  ({attribute}: {attribute: AttributeDto}) => {

    return (
        <tr>
            <td>{attribute.name}</td>
            <td>{categoriesMapper(attribute.categories)}</td>
            <td>{attribute.dataTypes}</td>
        </tr>
    )


}

export default Attribute