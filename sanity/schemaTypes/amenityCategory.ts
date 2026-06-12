import { defineField, defineType, type StringRule } from 'sanity'

export const amenityCategoryType = defineType({
  name: 'amenityCategory',
  title: 'Amenity Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required(),
    }),
  ],
})
