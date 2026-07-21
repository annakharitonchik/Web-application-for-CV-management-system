import { type PositionDto, PositionDtoView } from '../../../dto/position.ts';

const TransformPositionDto = (positions: PositionDto[]): PositionDtoView[] => {
  return positions.map((position) => ({
    key: position.id,
    name: position.name,
    description: position.description,
    isPublic: position.isPublic,
    attributes: position.attributes,
  }));
};
export default TransformPositionDto;
