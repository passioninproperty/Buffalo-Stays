import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_NAME, getAbsoluteUrl } from '@/lib/site';

interface Property {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  pricePerNight?: number;
  tags?: string[];
  gallery?: Record<string, unknown>[];
  availabilityStatus?: string;
  summaryText?: string;
  amenitiesInternetOffice?: string[];
  amenitiesBathroom?: string[];
  amenitiesBedroomLaundry?: string[];
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
    gallery,
    availabilityStatus,
    summaryText,
    amenitiesInternetOffice,
    amenitiesBathroom,
    amenitiesBedroomLaundry
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
    itemListElement: properties.map((space, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Accommodation',
        name: space.title,
        description: space.summaryText || '',
        image: space.gallery?.[0] 
          ? urlFor(space.gallery[0]).width(600).height(400).url() 
          : getAbsoluteUrl(SITE_IMAGE),
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
    })),
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-lg text-brand-text-main/60 font-serif">
                  No accommodations available at this time.
                </p>
              </div>
            ) : (
              properties.map((space) => {
                const imageUrl = space.gallery?.[0]
                  ? urlFor(space.gallery[0]).width(600).height(400).url()
                  : null;

                return (
                  <div key={space._id} className="bg-brand-bg-surface p-5 rounded-3xl shadow-lg border border-brand-border flex flex-col group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out">
                    <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden relative bg-slate-200 mb-6">
                      {imageUrl ? (
                        <Image 
                          src={imageUrl}
                          alt={`${space.title} at Buffalo Stays`}
                          fill
                          className="object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-brand-bg-main flex items-center justify-center text-brand-text-main/40 font-serif text-lg font-semibold">
                          No Image Available
                        </div>
                      )}
                      {space.availabilityStatus && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm text-xs font-bold text-brand-primary uppercase tracking-widest">
                          {space.availabilityStatus}
                        </div>
                      )}
                    </div>
                    <h3 className="font-serif font-bold text-2xl mb-3 px-2">{space.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-5 px-2">
                      {(space.tags && space.tags.length > 0
                        ? space.tags
                        : [
                            ...(space.amenitiesInternetOffice || []).slice(0, 1),
                            ...(space.amenitiesBathroom || []).slice(0, 1),
                            ...(space.amenitiesBedroomLaundry || []).slice(0, 1)
                          ].filter(Boolean).slice(0, 3)
                      ).map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1.5 bg-brand-bg-main rounded-full font-bold uppercase tracking-wider text-brand-text-main/80 shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-brand-text-main/70 mb-8 px-2 flex-grow line-clamp-2 min-h-[40px] leading-relaxed">
                      {space.summaryText || 'Discover a curated selection of warm, modern spaces designed for comfort, creativity, and extended stays.'}
                    </p>
                    <Link
                      href={`/spaces/${space.slug}`}
                      className="w-full py-4 text-center text-xs tracking-[0.1em] uppercase bg-brand-primary text-brand-bg-surface hover:bg-brand-primary-hover border border-brand-primary font-medium transition-colors duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary focus-visible:ring-offset-1 focus-visible:ring-offset-brand-bg-main"
                    >
                      View Details
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
