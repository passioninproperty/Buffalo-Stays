/**
 * DEPRECATED - App now utilizes live Sanity.io Content Lake fetching.
 * The mock properties array (SPACES_DATA) is kept here only for legacy references.
 */

const DEFAULT_WHATSAPP_NUMBER = '1234567890';

function normalizeWhatsAppNumber(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const digitsOnly = value.replace(/\D/g, '');
  return digitsOnly.length > 0 ? digitsOnly : undefined;
}

const configuredWhatsAppNumber = normalizeWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim());

export const WHATSAPP_NUMBER =
  configuredWhatsAppNumber ?? (process.env.NODE_ENV === 'development' ? DEFAULT_WHATSAPP_NUMBER : '');

export const WHATSAPP_MESSAGES = {
  universalInquiry:
    "Hi Buffalo Stays, I am interested in booking one of your spaces. Could you please share availability and details?",
  spaceInquiry: (spaceName: string) =>
    `Hi Buffalo Stays, I am interested in booking ${spaceName}. Could you please share availability and details?`,
} as const;

export const getWhatsAppLink = (message: string = WHATSAPP_MESSAGES.universalInquiry) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export type Space = {
  id: string;
  title: string;
  description: string;
  image: string;
  amenities: string[];
};

export const SPACES_DATA: Space[] = [
  {
    id: "1",
    title: "The Rust Studio",
    description: "A bright, open-plan space with terracotta accents and panoramic windows.",
    image: "https://picsum.photos/seed/buffalo-space1/800/600",
    amenities: ["Queen Bed", "Fast Wi-Fi"]
  },
  {
    id: "2",
    title: "The Urban Haven",
    description: "Quiet luxury in the heart of the city. Perfect for weekend getaways.",
    image: "https://picsum.photos/seed/buffalo-space2/800/600",
    amenities: ["King Bed", "Smart TV"]
  },
  {
    id: "3",
    title: "The Lofty Retreat",
    description: "Cozy loft with exposed beams and a plush reading nook.",
    image: "https://picsum.photos/seed/buffalo-space3/800/600",
    amenities: ["Double Bed", "Coffee Maker"]
  },
  {
    id: "4",
    title: "The Botanical Suite",
    description: "A serene, plant-filled apartment providing a calm oasis for longer stays.",
    image: "https://picsum.photos/seed/buffalo-space4/800/600",
    amenities: ["King Bed", "Kitchenette"]
  },
  {
    id: "5",
    title: "The Heritage Loft",
    description: "Exposed brick walls and historic charm meets modern premium furnishings.",
    image: "https://picsum.photos/seed/buffalo-space5/800/600",
    amenities: ["Queen Bed", "Workspace"]
  },
  {
    id: "6",
    title: "The Minimalist Flat",
    description: "Stripped-back luxury prioritizing space, light, and essential comfort.",
    image: "https://picsum.photos/seed/buffalo-space6/800/600",
    amenities: ["Double Bed", "Fast Wi-Fi"]
  }
];
