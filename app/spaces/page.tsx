import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_NAME, getAbsoluteUrl } from '@/lib/site';
import SpacesClientCatalog from '@/components/SpacesClientCatalog';

interface Property {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  pricePerNight?: number;
  tags?: string[];
  gallery?: Array<{
    asset?: string;
    isFeatured?: boolean;
    photoTag?: string;
  }>;
  availabilityStatus?: string;
  summaryText?: string;
  specs?: {
    guests?: number;
    bedrooms?: number;
    beds?: number;
    bathrooms?: number;
  };
  amenityStatuses?: Array<{
    name: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Furnished Rentals & Extended Stay Spaces',
  description: 'Explore Buffalo Stays curated spaces with fully furnished rooms, flexible long-term booking, and WhatsApp availability checks.',
  alternates: {
    canonical: '/spaces',
  },
  openGraph: {
    title: `Furnished Rentals & Extended Stay Spaces | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: getAbsoluteUrl('/spaces'),
    images: [
      {
        url: SITE_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Furnished Rentals & Extended Stay Spaces | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [SITE_IMAGE],
  },
};

export default async function SpacesPage() {
  const query = `*[_type == "property"] {
    _id,
    title,
    "slug": slug.current,
    location,
    pricePerNight,
    tags,
    gallery[]{ "asset": image.asset->url, isFeatured, photoTag },
    availabilityStatus,
    summaryText,
    specs,
    amenityStatuses[]{ "name": amenityRef->title }
  }`;

  let properties: Property[] = [];
  try {
    properties = await client.fetch<Property[]>(
      query,
      {},
      {
        next: { revalidate: 60 },
      }
    );
  } catch (error) {
    console.error('Failed to fetch properties from Sanity:', error);
  }

  const spacesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: properties.map((space, index) => {
      const featuredImage = space.gallery?.find(img => img.isFeatured) || space.gallery?.[0];
      const imageUrl = featuredImage?.asset || getAbsoluteUrl(SITE_IMAGE);
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Accommodation',
          name: space.title,
          description: space.summaryText || '',
          image: imageUrl,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Buffalo',
            addressRegion: 'NY',
            addressCountry: 'US',
          },
          amenityFeature: (space.tags || []).map((tag) => ({
            '@type': 'LocationFeatureSpecification',
            name: tag,
            value: true,
          })),
        },
      };
    }),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(spacesSchema) }} />
      <section className="py-20 px-6 lg:px-10 bg-brand-bg-main">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-brand-text-main leading-tight">
            Our Curated Spaces
          </h1>
          <p className="text-lg lg:text-xl text-brand-text-main/70 max-w-2xl leading-relaxed">
            Discover a collection of premium, fully-furnished environments designed for extended comfort. Offering flexible long-term booking options perfectly suited for professionals, families, and relocators seeking a warm, authentic living experience.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 lg:px-10 bg-white shadow-sm border-t border-brand-border flex-1 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif sr-only">Available Extended Stay Rentals in Buffalo, NY</h2>
          <SpacesClientCatalog initialSpaces={properties} />
        </div>
      </section>
    </div>
  );
}
