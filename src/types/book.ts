export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  oldPrice?: number;
  image: string;
}

export interface CartItem extends Book {
  quantity: number;
}

export function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
}

export function formatPrice(price: number): string {
  return `Rs. ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
