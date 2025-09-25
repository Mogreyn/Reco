// ============================
// Product & related types
// ============================

export interface ProductAttributeValue {
  id: string;
  value: string;
}

export interface ProductAttribute {
  id: string;
  name: string;
  key: string;
  required: boolean;
  values?: ProductAttributeValue[]; // ← додали
}

export interface ProductOption {
  id: string;
  value: string;
}

export interface ProductBrand {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  website?: string | null;
  description?: string;
  status?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string | null;
  parentId?: string | null;
  isActive?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  sku: string;
  stock: boolean;
  status: string;

  mainImage: string | null;
  images: string[];

  comparePrice?: number;
  translations?: Record<string, any>;
  seoTitle?: string | null;
  seoDescription?: string | null;
  weight?: number | null;
  dimensions?: Record<string, any> | null;

  brand?: ProductBrand | null;
  category?: ProductCategory | null;

  attributes: ProductAttribute[]; // тепер включає values
  selectedOptions: ProductOption[];
}

// ============================
// Cart
// ============================
export type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
};

export interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateCartItemQuantity: (
    productId: string,
    quantity: number,
    size?: string
  ) => void;
  cartTotal: number;
  cartCount: number;
}
