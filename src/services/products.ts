import type { Product } from "@/types/types";

// ============
// Базовые настройки
// ============
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

interface FetchOptions extends RequestInit {
  body?: any;
}

// Универсальный fetch
async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { body, ...rest } = options;

  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers || {})
    },
    ...rest,
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(
      `API error [${response.status}] ${response.statusText}: ${errText}`
    );
  }

  return response.json();
}

// ============================
// Types
// ============================
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  orderNumber?: string;
  customerId?: string;
  status?: string;
  paymentStatus?: string;
  paymentMethod: "card" | "cash" | "liqpay" | "other";
  shippingMethod: string;
  items: OrderItem[];
  subTotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount?: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  trackingNumber?: string;
  deliveredAt?: string;
  customerNotes?: string;
  adminNotes?: string;
}

// ============================
// Normalizer (API → фронт)
// ============================
function normalizeProduct(p: any): Product {
  // Создаем словарь selectedOptions по attributeId
  const optionsByAttrId: Record<string, { id: string; value: string }[]> = {};

  if (Array.isArray(p.selectedOptions)) {
    for (const opt of p.selectedOptions) {
      // Если у объекта есть поле attributeId от бекенда
      const attrId = opt.attributeId || "default";
      if (!optionsByAttrId[attrId]) optionsByAttrId[attrId] = [];
      optionsByAttrId[attrId].push({ id: opt.id, value: opt.value });
    }
  }

  // Detect if backend options are not linked to attributes (no attributeId fields)
  const optionsLackAttributeLink = Array.isArray(p.selectedOptions)
    ? p.selectedOptions.every((opt: any) => opt.attributeId == null)
    : false;

  return {
    id: p.id,
    name: p.name,
    price: Number(p.price) || 0,
    description: p.description,
    sku: p.sku,
    stock: Boolean(p.stock),
    status: p.status,
    mainImage: p.mainImage ?? "",
    images: p.images ?? [],
    comparePrice: p.comparePrice ? Number(p.comparePrice) : undefined,
    translations: p.translations,
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
    weight: p.weight,
    dimensions: p.dimensions,
    brand: p.brand
      ? {
          id: p.brand.id,
          name: p.brand.name,
          slug: p.brand.slug,
        }
      : null,
    category: p.category
      ? {
          id: p.category.id,
          name: p.category.name,
          slug: p.category.slug,
        }
      : null,
      attributes: Array.isArray(p.attributes)
      ? p.attributes.map((attr: any) => ({
          id: attr.id,
          name: attr.name,
          key: attr.key,
          required: attr.required,
          // Prefer explicit values from API if present; fallback to selectedOptions mapping
          values: Array.isArray(attr.values) && attr.values.length
            ? attr.values.map((v: any) => ({ id: v.id, value: v.value }))
            : (
                // If options are not linked by attributeId and there is only one attribute,
                // assign all selectedOptions to this single attribute.
                optionsLackAttributeLink && Array.isArray(p.attributes) && p.attributes.length === 1
                  ? (p.selectedOptions ?? [])
                  : (p.selectedOptions ?? []).filter((opt: any) => opt.attributeId === attr.id)
              ).map((opt: any) => ({ id: opt.id, value: opt.value })),
        }))
      : [],
    
    
    selectedOptions: Array.isArray(p.selectedOptions)
      ? p.selectedOptions.map((opt: any) => ({
          id: opt.id,
          value: opt.value,
        }))
      : [],
  };
}


// ============================
// API функции
// ============================

// Все продукты
export async function fetchProducts(): Promise<Product[]> {
  const raw = await apiFetch<any>(`/products`);
  const products = raw.products ?? raw.data;

  if (!products) {
    throw new Error("Invalid response format: no products");
  }

  return products.map(normalizeProduct);
}

// Один продукт по id
export async function fetchProductById(id: string): Promise<Product | null> {
  // Try detailed endpoint first
  try {
    const raw = await apiFetch<any>(`/products/${encodeURIComponent(id)}`);
    const p = raw.data ?? raw.product ?? raw;
    if (p) {
      const normalized = normalizeProduct(p);
      // If attributes are present, use it; otherwise fallback to list
      if (Array.isArray(normalized.attributes) && normalized.attributes.length > 0) {
        return normalized;
      }
    }
  } catch (_) {
    // ignore, fallback below
  }

  // Fallback: fetch from list where attributes are included
  try {
    const list = await fetchProducts();
    const fromList = list.find((prod) => prod.id === id) || null;
    return fromList ?? null;
  } catch (_) {
    return null;
  }
}

// Создать заказ
export async function createOrder(order: Order): Promise<any> {
  return apiFetch(`/orders`, {
    method: "POST",
    body: order
  });
}
