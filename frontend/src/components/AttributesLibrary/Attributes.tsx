import {AttributeDto} from "../../dto/attribute.ts";
import Attribute from './Attribute.tsx'

const Attributes =  ({attributes}: {attributes: AttributeDto[]}) => {

    return attributes.map(attribute => (
        <Attribute key={attribute.id} attribute = {attribute}/>
    ));
}

export default Attributes