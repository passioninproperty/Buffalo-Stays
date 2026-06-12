import { type SchemaTypeDefinition } from 'sanity'
import { propertyType } from './property'
import { amenityType } from './amenity'
import { amenityCategoryType } from './amenityCategory'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [propertyType, amenityType, amenityCategoryType],
}

export const types: SchemaTypeDefinition[] = [propertyType, amenityType, amenityCategoryType]
