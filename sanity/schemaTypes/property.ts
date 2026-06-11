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
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'label',
              title: 'Label / Room Type',
              type: 'string',
              description: 'Label of this photo (e.g. Kitchen, Living Space, Bedroom)',
              options: {
                list: [
                  { title: 'Exterior', value: 'Exterior' },
                  { title: 'Living Space', value: 'Living Space' },
                  { title: 'Kitchen', value: 'Kitchen' },
                  { title: 'Dining Area', value: 'Dining Area' },
                  { title: 'Bedroom', value: 'Bedroom' },
                  { title: 'Bathroom', value: 'Bathroom' },
                  { title: 'Patio / Balcony', value: 'Patio / Balcony' },
                  { title: 'Other', value: 'Other' },
                ],
              },
            }),
          ],
        },
      ],
    }),

    // --- AMENITIES GROUP ---
    defineField({
      name: 'amenitiesBathroom',
      title: 'Bathroom Amenities',
      type: 'array',
      group: 'amenities',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Hairdryer', value: 'Hairdryer' },
          { title: 'Cleaning products', value: 'Cleaning products' },
          { title: 'Shampoo', value: 'Shampoo' },
          { title: 'Hot water', value: 'Hot water' },
          { title: 'Shower gel', value: 'Shower gel' },
        ],
      },
    }),
    defineField({
      name: 'amenitiesBedroomLaundry',
      title: 'Bedroom and Laundry Amenities',
      type: 'array',
      group: 'amenities',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Washing machine', value: 'Washing machine' },
          { title: 'Free dryer – In unit', value: 'Free dryer – In unit' },
          { title: 'Essentials (Towels, bed sheets, soap, toilet paper)', value: 'Essentials' },
          { title: 'Hangers', value: 'Hangers' },
          { title: 'Bed linen', value: 'Bed linen' },
          { title: 'Cotton linen', value: 'Cotton linen' },
          { title: 'Room-darkening blinds', value: 'Room-darkening blinds' },
          { title: 'Iron', value: 'Iron' },
          { title: 'Clothes drying rack', value: 'Clothes drying rack' },
          { title: 'Clothes storage: wardrobe', value: 'Clothes storage: wardrobe' },
        ],
      },
    }),
    defineField({
      name: 'amenitiesEntertainment',
      title: 'Entertainment Amenities',
      type: 'array',
      group: 'amenities',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'TV', value: 'TV' },
          { title: 'Pool table', value: 'Pool table' },
        ],
      },
    }),
    defineField({
      name: 'amenitiesFamily',
      title: 'Family Amenities',
      type: 'array',
      group: 'amenities',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Cot', value: 'Cot' },
          { title: 'Board games', value: 'Board games' },
        ],
      },
    }),
    defineField({
      name: 'amenitiesHeatingCooling',
      title: 'Heating and Cooling Amenities',
      type: 'array',
      group: 'amenities',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Portable fans', value: 'Portable fans' },
          { title: 'Heating', value: 'Heating' },
          { title: 'Air conditioning', value: 'Air conditioning' },
        ],
      },
    }),
    defineField({
      name: 'amenitiesSafety',
      title: 'Home Safety Amenities',
      type: 'array',
      group: 'amenities',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Noise decibel monitors on property', value: 'Noise decibel monitors on property' },
          { title: 'Smoke alarm', value: 'Smoke alarm' },
          { title: 'Carbon monoxide alarm', value: 'Carbon monoxide alarm' },
          { title: 'Fire extinguisher', value: 'Fire extinguisher' },
          { title: 'First aid kit', value: 'First aid kit' },
        ],
      },
    }),
    defineField({
      name: 'amenitiesInternetOffice',
      title: 'Internet and Office Amenities',
      type: 'array',
      group: 'amenities',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Wifi', value: 'Wifi' },
          { title: 'Dedicated workspace', value: 'Dedicated workspace' },
        ],
      },
    }),
    defineField({
      name: 'amenitiesKitchenDining',
      title: 'Kitchen and Dining Amenities',
      type: 'array',
      group: 'amenities',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Kitchen (Space where guests can cook meals)', value: 'Kitchen' },
          { title: 'Fridge', value: 'Fridge' },
          { title: 'Microwave', value: 'Microwave' },
          { title: 'Cooking basics (Pots, pans, oil, salt, pepper)', value: 'Cooking basics' },
          { title: 'Crockery and cutlery', value: 'Crockery and cutlery' },
          { title: 'Mini fridge', value: 'Mini fridge' },
          { title: 'Electric cooker', value: 'Electric cooker' },
          { title: 'Oven', value: 'Oven' },
          { title: 'Kettle', value: 'Kettle' },
          { title: 'Coffee maker', value: 'Coffee maker' },
          { title: 'Wine glasses', value: 'Wine glasses' },
          { title: 'Toaster', value: 'Toaster' },
          { title: 'Baking sheet', value: 'Baking sheet' },
          { title: 'Blender', value: 'Blender' },
          { title: 'Rice cooker', value: 'Rice cooker' },
          { title: 'Barbecue utensils', value: 'Barbecue utensils' },
          { title: 'Dining table', value: 'Dining table' },
          { title: 'Coffee', value: 'Coffee' },
        ],
      },
    }),
    defineField({
      name: 'amenitiesLocation',
      title: 'Location Features',
      type: 'array',
      group: 'amenities',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Private entrance', value: 'Private entrance' },
          { title: 'Separate street or building entrance', value: 'Separate street or building entrance' },
        ],
      },
    }),
    defineField({
      name: 'amenitiesOutdoor',
      title: 'Outdoor Amenities',
      type: 'array',
      group: 'amenities',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Private patio or balcony', value: 'Private patio or balcony' },
          { title: 'Outdoor furniture', value: 'Outdoor furniture' },
          { title: 'Outdoor dining area', value: 'Outdoor dining area' },
          { title: 'BBQ grill', value: 'BBQ grill' },
        ],
      },
    }),
    defineField({
      name: 'amenitiesParking',
      title: 'Parking and Facilities',
      type: 'array',
      group: 'amenities',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Free parking on premises', value: 'Free parking on premises' },
          { title: 'Free on-street parking', value: 'Free on-street parking' },
        ],
      },
    }),
    defineField({
      name: 'amenitiesServices',
      title: 'Services',
      type: 'array',
      group: 'amenities',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Pets allowed', value: 'Pets allowed' },
          { title: 'Long-term stays allowed (28 days or more)', value: 'Long-term stays allowed' },
          { title: 'Self check-in', value: 'Self check-in' },
          { title: 'Keypad', value: 'Keypad' },
          { title: 'Housekeeping – available at extra cost', value: 'Housekeeping' },
        ],
      },
    }),
    defineField({
      name: 'amenitiesUnavailable',
      title: 'Not Included / Unavailable Amenities',
      type: 'array',
      group: 'amenities',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Exterior security cameras on property', value: 'Exterior security cameras' },
          { title: 'Air conditioning', value: 'Air conditioning' },
        ],
      },
    }),
  ],
})
