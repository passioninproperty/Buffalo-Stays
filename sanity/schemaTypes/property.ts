import { defineField, defineType, type StringRule, type SlugRule } from 'sanity'

export const propertyType = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'amenities', title: 'Amenities' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    // --- DETAILS GROUP ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'details',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: {
        source: 'title',
      },
      validation: (Rule: SlugRule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Property',
      type: 'boolean',
      group: 'details',
      initialValue: false,
      description: 'Display this property in the featured section on the home page.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'details',
      description: 'e.g., Central London',
    }),
    defineField({
      name: 'pricePerNight',
      title: 'Price per Night (£)',
      type: 'number',
      group: 'details',
    }),
    defineField({
      name: 'minimumStay',
      title: 'Minimum Stay',
      type: 'number',
      group: 'details',
      initialValue: 30,
      description: 'Minimum nights required',
    }),
    defineField({
      name: 'availabilityStatus',
      title: 'Availability Status',
      type: 'string',
      group: 'details',
      initialValue: 'Available',
      options: {
        list: ['Available', 'Fully Booked', 'Coming Soon'],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'specs',
      title: 'Specs',
      type: 'object',
      group: 'details',
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
      group: 'details',
      rows: 3,
    }),
    defineField({
      name: 'detailedDescription',
      title: 'Detailed Description',
      type: 'text',
      group: 'details',
      rows: 8,
    }),

    // --- MEDIA GROUP ---
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'object',
          name: 'galleryItem',
          title: 'Gallery Item',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isFeatured',
              type: 'boolean',
              title: 'Set as Feature Cover Photo',
              description: 'Enable this to lock this image as the primary cover photo across listing grids',
              initialValue: false,
            }),
            defineField({
              name: 'photoTag',
              type: 'string',
              title: 'Custom Photo Tag/Label',
              description: 'e.g., Living Space, Bedroom, En-suite',
            }),
          ],
        },
      ],
    }),

    // --- AMENITIES GROUP ---
    defineField({
      name: 'amenityStatuses',
      title: 'Amenity Statuses',
      type: 'array',
      group: 'amenities',
      of: [
        {
          type: 'object',
          name: 'amenityStatus',
          title: 'Amenity Status',
          fields: [
            defineField({
              name: 'amenityRef',
              type: 'reference',
              to: [{ type: 'amenity' }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isAvailable',
              type: 'boolean',
              title: 'Amenity Available Status',
              initialValue: true,
              description: 'Toggle off to show this feature is currently not available or broken at this specific location',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'amenities',
      title: 'Property Amenities Inventory',
      type: 'array',
      group: 'amenities',
      of: [
        {
          type: 'object',
          name: 'propertyAmenity',
          title: 'Property Amenity Status',
          fields: [
            { name: 'amenity', type: 'reference', title: 'Amenity Reference', to: [{ type: 'amenity' }] },
            { name: 'isAvailable', type: 'boolean', title: 'Is Available at this Property', initialValue: true }
          ],
          preview: {
            select: {
              title: 'amenity.title',
              category: 'amenity.category.title',
              isAvailable: 'isAvailable'
            },
            prepare({ title, category, isAvailable }) {
              return {
                title: `${title} — ${isAvailable ? '✅ Available' : '❌ Not Included'}`,
                subtitle: category || 'Uncategorized'
              };
            }
          }
        }
      ]
    }),
  ],
})
