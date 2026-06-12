import { defineField, defineType, type StringRule, type ReferenceRule } from 'sanity'

export const amenityType = defineType({
  name: 'amenity',
  title: 'Amenity',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'amenityCategory' }],
      validation: (Rule: ReferenceRule) => Rule.required(),
    }),
  ],
})
