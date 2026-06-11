import { defineField, defineType, type StringRule, type SlugRule } from 'sanity'

export const propertyType = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule: SlugRule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Central London',
    }),
    defineField({
      name: 'pricePerNight',
      title: 'Price per Night (£)',
      type: 'number',
    }),
    defineField({
      name: 'minimumStay',
      title: 'Minimum Stay',
      type: 'number',
      initialValue: 30,
      description: 'Minimum nights required',
    }),
    defineField({
      name: 'availabilityStatus',
      title: 'Availability Status',
      type: 'string',
      initialValue: 'Available',
      options: {
        list: ['Available', 'Fully Booked', 'Coming Soon'],
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'specs',
      title: 'Specs',
      type: 'object',
      fields: [
        defineField({
          name: 'guests',
          title: 'Guests',
          type: 'number',
        }),
        defineField({
          name: 'bedrooms',
          title: 'Bedrooms',
          type: 'number',
        }),
        defineField({
          name: 'beds',
          title: 'Beds',
          type: 'number',
        }),
        defineField({
          name: 'bathrooms',
          title: 'Bathrooms',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'summaryText',
      title: 'Summary Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'detailedDescription',
      title: 'Detailed Description',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
