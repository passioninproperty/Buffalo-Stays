import type { Metadata } from 'next';
import Image from 'next/image';
import { getWhatsAppLink, SPACES_DATA, WHATSAPP_MESSAGES } from '@/lib/constants';
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_NAME, getAbsoluteUrl } from '@/lib/site';

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

export default function SpacesPage() {
  const spacesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: SPACES_DATA.map((space, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Accommodation',
        name: space.title,
        description: space.description,
        image: getAbsoluteUrl(space.image.startsWith('http') ? space.image : space.image),
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Buffalo',
          addressRegion: 'NY',
          addressCountry: 'US',
        },
        amenityFeature: space.amenities.map((amenity) => ({
          '@type': 'LocationFeatureSpecification',
          name: amenity,
          value: true,
        })),
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(spacesSchema) }} />
      <section className="py-20 px-6 lg:px-10 bg-[#F9F7F3]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl lg:text-6xl font-bold text-[#2D3142] leading-tight">
            Our Curated Spaces
          </h1>
          <p className="text-lg lg:text-xl text-[#2D3142]/70 max-w-2xl leading-relaxed">
            Discover a collection of premium, fully-furnished environments designed for extended comfort. Offering flexible long-term booking options perfectly suited for professionals, families, and relocators seeking a warm, authentic living experience.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 lg:px-10 bg-white shadow-sm border-t border-black/5 flex-1 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto">
          <h2 className="sr-only">Available Extended Stay Rentals in Buffalo, NY</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SPACES_DATA.map((space) => (
              <div key={space.id} className="bg-white p-5 rounded-3xl shadow-lg border border-black/5 flex flex-col group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out">
                <div className="relative w-full h-64 bg-slate-200 rounded-2xl mb-6 overflow-hidden">
                  <Image 
                    src={space.image}
                    alt={`${space.title} at Buffalo Stays featuring ${space.amenities.join(', ')} and a premium home-like setup for longer stays`}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm text-xs font-bold text-[#E07A5F] uppercase tracking-widest">
                    Available
                  </div>
                </div>
                <h3 className="font-bold text-2xl mb-3 px-2">{space.title}</h3>
                <div className="flex flex-wrap gap-2 mb-5 px-2">
                  {space.amenities.map(amenity => (
                    <span key={amenity} className="text-xs px-3 py-1.5 bg-[#F9F7F3] rounded-full font-bold uppercase tracking-wider text-[#2D3142]/80 shadow-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[#2D3142]/70 mb-8 px-2 flex-grow line-clamp-3 leading-relaxed">
                  {space.description}
                </p>
                <a
                  href={getWhatsAppLink(WHATSAPP_MESSAGES.spaceInquiry(space.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 text-center text-sm bg-[#E07A5F] text-white hover:bg-[#c96a50] rounded-full font-bold shadow-lg shadow-[#E07A5F]/20 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3]"
                >
                  Check Availability
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
