import { AttributeDto, AttributeDtoView } from '../../../dto/attribute.ts';
import { categoryMapper } from '../../../dto/mappers/categoryMapper.ts';
import { dataTypeMapper } from '../../../dto/mappers/dataTypeMapper.ts';

const TransformAttributeDto = (
  attributes: AttributeDto[],
): AttributeDtoView[] => {
  return attributes.map((attribute) => ({
    key: attribute.id,
    name: attribute.name,
    category: categoryMapper(attribute.category),
    dataType: dataTypeMapper(attribute.dataType),
  }));
};
export default TransformAttributeDto;
