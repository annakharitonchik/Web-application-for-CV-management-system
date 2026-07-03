import {AttributeDto} from "../../dto/attribute.ts"
const Attribute =  ({attribute}: {attribute: AttributeDto}) => {

    return (
        <tr>
            <td>{attribute.name}</td>
            <td>{attribute.categories}</td>
            <td>{attribute.dataTypes}</td>
        </tr>
    )


}

export default Attribute