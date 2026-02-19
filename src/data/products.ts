import { Book, parsePrice } from "@/types/book";

export interface ProductDetail extends Book {
  slug: string;
  description: string;
  highlights: string[];
  pages: number;
  language: string;
  publisher: string;
  inStock: boolean;
}

const productList: ProductDetail[] = [
  {
    id: "/images/product-item1.jpg",
    slug: "simple-way-of-peace-life",
    title: "Simple Way of Peace Life",
    author: "Armor Ramsey",
    price: parsePrice("Rs. 1,200"),
    image: "/images/product-item1.jpg",
    description:
      "An inspiring guide that blends mindfulness, spirituality, and everyday routines to help you build a peaceful, purpose-driven life.",
    highlights: [
      "Paperback edition",
      "Ships in 2-3 business days",
      "Exclusive Burki Books bookmark included",
    ],
    pages: 286,
    language: "English",
    publisher: "Burki House Publishing",
    inStock: true,
  },
  {
    id: "/images/product-item2.jpg",
    slug: "great-travel-at-desert",
    title: "Great Travel at Desert",
    author: "Sanchit Howdy",
    price: parsePrice("Rs. 950"),
    image: "/images/product-item2.jpg",
    description:
      "A sweeping travel memoir capturing the resilience of explorers who crossed remote dunes and discovered timeless cultures.",
    highlights: [
      "Author-signed sticker inside",
      "Complimentary gift wrap",
      "Eligible for free Karachi/Lahore delivery",
    ],
    pages: 324,
    language: "English",
    publisher: "Nomad Press",
    inStock: true,
  },
  {
    id: "/images/product-item3.jpg",
    slug: "the-lady-beauty-scarlett",
    title: "The Lady Beauty Scarlett",
    author: "Arthur Doyle",
    price: parsePrice("Rs. 1,500"),
    image: "/images/product-item3.jpg",
    description:
      "A dramatic tale of courage, grace, and intrigue set in Victorian Lahore, filled with twists readers adore.",
    highlights: [
      "Hardcover gift edition",
      "Includes character art postcards",
      "Eligible for free nationwide shipping",
    ],
    pages: 412,
    language: "English",
    publisher: "Scarlett Press",
    inStock: true,
  },
  {
    id: "/images/product-item4.jpg",
    slug: "once-upon-a-time",
    title: "Once Upon a Time",
    author: "Klien Marry",
    price: parsePrice("Rs. 800"),
    image: "/images/product-item4.jpg",
    description:
      "A delightful anthology of bedtime tales perfect for young dreamers and nostalgic adults alike.",
    highlights: [
      "Illustrated pages",
      "Signed bookplate included",
      "Ships in eco packaging",
    ],
    pages: 208,
    language: "English",
    publisher: "Storyline Media",
    inStock: true,
  },
  {
    id: "/images/single-image.jpg",
    slug: "birds-gonna-be-happy",
    title: "Birds Gonna Be Happy",
    author: "Timbur Hood",
    price: parsePrice("Rs. 1,350"),
    image: "/images/single-image.jpg",
    description:
      "An uplifting novel about seeking joy in small moments, set against the bustling streets of Lahore.",
    highlights: [
      "Reader's guide included",
      "Perfect for book clubs",
      "Limited first-print cover",
    ],
    pages: 296,
    language: "English",
    publisher: "Burki House Publishing",
    inStock: true,
  },
  {
    id: "/images/tab-item1.jpg",
    slug: "portrait-photography",
    title: "Portrait Photography",
    author: "Adam Silber",
    price: parsePrice("Rs. 1,200"),
    image: "/images/tab-item1.jpg",
    description:
      "A practical handbook packed with tips on lighting, composition, and storytelling for portrait shooters.",
    highlights: [
      "Includes cheat sheets",
      "Bonus Lightroom presets",
      "Ships with protective sleeve",
    ],
    pages: 254,
    language: "English",
    publisher: "LensCraft",
    inStock: true,
  },
  {
    id: "/images/tab-item3.jpg",
    slug: "tips-of-simple-lifestyle",
    title: "Tips of Simple Lifestyle",
    author: "Bratt Smith",
    price: parsePrice("Rs. 1,100"),
    image: "/images/tab-item3.jpg",
    description:
      "A mindful living guide filled with actionable advice for decluttering, budgeting, and intentional routines.",
    highlights: [
      "Worksheets included",
      "Local print on recycled paper",
      "Eligible for bundle discount",
    ],
    pages: 318,
    language: "English",
    publisher: "Minimal House",
    inStock: true,
  },
  {
    id: "/images/tab-item4.jpg",
    slug: "just-felt-from-outside",
    title: "Just Felt from Outside",
    author: "Nicole Wilson",
    price: parsePrice("Rs. 950"),
    image: "/images/tab-item4.jpg",
    description:
      "A heartfelt memoir chronicling the author's journey of rediscovering home after years abroad.",
    highlights: [
      "Signed with author's note",
      "Includes playlist QR code",
      "Ships with art print",
    ],
    pages: 344,
    language: "English",
    publisher: "Wanderer Press",
    inStock: true,
  },
  {
    id: "/images/tab-item5.jpg",
    slug: "peaceful-enlightment",
    title: "Peaceful Enlightment",
    author: "Marmik Lama",
    price: parsePrice("Rs. 1,300"),
    image: "/images/tab-item5.jpg",
    description:
      "A reflective guide blending Eastern philosophies with modern mindfulness practices.",
    highlights: [
      "Clothbound edition",
      "Meditation exercises inside",
      "Eligible for gift wrap",
    ],
    pages: 268,
    language: "English",
    publisher: "Lotus Ink",
    inStock: true,
  },
  {
    id: "/images/tab-item7.jpg",
    slug: "life-among-the-pirates",
    title: "Life Among the Pirates",
    author: "Armor Ramsey",
    price: parsePrice("Rs. 1,400"),
    image: "/images/tab-item7.jpg",
    description:
      "An adventurous dive into maritime history, myths, and the golden age of pirates.",
    highlights: [
      "Foil-stamped cover",
      "Maps & timeline inside",
      "Ships in 2 days",
    ],
    pages: 352,
    language: "English",
    publisher: "Harbor House",
    inStock: true,
  },
  {
    id: "/images/tab-item8.jpg",
    slug: "simple-way-of-peace",
    title: "Simple Way of Peace",
    author: "Armor Ramsey",
    price: parsePrice("Rs. 1,000"),
    image: "/images/tab-item8.jpg",
    description:
      "Companion journal to the best-selling Peace Life title, filled with prompts and reflections.",
    highlights: [
      "Includes guided journal pages",
      "Ribbon bookmark",
      "Bundle pricing available",
    ],
    pages: 220,
    language: "English",
    publisher: "Burki House Publishing",
    inStock: true,
  },
];

const products = Object.fromEntries(productList.map((product) => [product.slug, product]));

export const allProducts = productList;

export default products;
