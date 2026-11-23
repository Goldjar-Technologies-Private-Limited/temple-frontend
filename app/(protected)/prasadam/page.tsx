"use client";

import { useCallback, useMemo, useState } from "react";
import TempleLoader from "@/components/common/TempleLoader";
import { useCustomerPrasadList, useCustomerPrasadCategories, useCustomerPrasadCart } from "@/hooks/temple/prasad/usePrasad";
import { CustomerPrasadItem, CustomerPrasadVariant } from "@/models/temple/prasad.model";

/* =====================================================
    HELPERS
===================================================== */

function formatVariantLabel(variant: CustomerPrasadVariant): string {
  return `${variant.weight} ${variant.unit}`;
}

/* =====================================================
    MAIN PAGE
===================================================== */

export default function PrasadamPage() {
  const { data: products, isLoading: isProductsLoading } = useCustomerPrasadList();
  const { categories: apiCategories, isLoading: isCategoriesLoading } = useCustomerPrasadCategories();
  const { cart, addToCart, updateQuantity, removeCartItem } = useCustomerPrasadCart();

  const [category, setCategory] = useState<string>("all");

  const [selectedVariants, setSelectedVariants] = useState<
    Record<number, number>
  >({});

  /* CATEGORIES LIST */

  const categoryOptions = useMemo(() => {
    const list = [{ id: "all", label: "All Offerings" }];
    if (apiCategories && apiCategories.length > 0) {
      apiCategories.forEach((cat) => {
        list.push({ id: cat, label: cat });
      });
    }
    return list;
  }, [apiCategories]);

  /* FILTER PRODUCTS */

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (category === "all") return products;

    return products.filter((product) => product.category?.toLowerCase() === category.toLowerCase());
  }, [category, products]);

  /* SELECTED CATEGORY HEADING */

  const categoryHeading = useMemo(() => {
    if (category === "all") {
      return "Explore Prasadam";
    }

    const selected = categoryOptions.find((item) => item.id.toLowerCase() === category.toLowerCase());

    return selected ? selected.label : "Prasadam";
  }, [category, categoryOptions]);

  /* SELECTED VARIANT HELPER */

  const getSelectedVariant = useCallback(
    (product: CustomerPrasadItem): CustomerPrasadVariant | undefined => {
      if (!product.variants || product.variants.length === 0) return undefined;
      const selectedId = selectedVariants[product.id];
      if (selectedId !== undefined) {
        const found = product.variants.find((v) => v.id === selectedId);
        if (found) return found;
      }
      return product.variants.find((v) => v.isAvailable) || product.variants[0];
    },
    [selectedVariants],
  );

  /* CART ITEM FINDER */

  const getCartItemForVariant = useCallback(
    (productId: number, variantId?: number) => {
      if (!cart?.items || !variantId) return undefined;
      return cart.items.find(
        (item) => item.prasadId === productId && item.variantId === variantId
      );
    },
    [cart],
  );

  /* CHANGE VARIANT / WEIGHT */

  const changeVariant = (productId: number, variantId: number) => {
    setSelectedVariants((previous) => ({
      ...previous,
      [productId]: variantId,
    }));
  };

  /* ADD OR INCREASE CART QUANTITY */

  const handleIncrease = async (product: CustomerPrasadItem, variant: CustomerPrasadVariant) => {
    const existing = getCartItemForVariant(product.id, variant.id);
    if (existing) {
      await updateQuantity(existing.cartItemId, existing.quantity + 1);
    } else {
      await addToCart({
        prasadId: product.id,
        variantId: variant.id,
        quantity: 1,
      });
    }
  };

  /* DECREASE CART QUANTITY */

  const handleDecrease = async (product: CustomerPrasadItem, variant: CustomerPrasadVariant) => {
    const existing = getCartItemForVariant(product.id, variant.id);
    if (!existing) return;

    if (existing.quantity <= 1) {
      await removeCartItem(existing.cartItemId);
    } else {
      await updateQuantity(existing.cartItemId, existing.quantity - 1);
    }
  };

  if (isProductsLoading || isCategoriesLoading) {
    return <TempleLoader message="Fetching Temple Prasad..." fullScreen />;
  }

  /* RENDER */

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#fffaf1] pb-12 text-[#332820] lg:ml-[92px] lg:w-[calc(100%-92px)]">
      <div className="mx-auto w-full max-w-[1500px]">
        {/* CATEGORY FILTERS */}
        <div className="flex gap-2 overflow-x-auto px-3 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-5 md:justify-center lg:justify-start lg:px-8">
          {categoryOptions.map((item) => {
            const active = category.toLowerCase() === item.id.toLowerCase();

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={active}
                className={`shrink-0 rounded-lg border px-4 py-2.5 text-xs font-semibold transition sm:px-5 sm:text-sm ${
                  active
                    ? "border-[#e87519] bg-[#e87519] text-white shadow-sm"
                    : "border-[#e5d7c4] bg-white text-[#66584b] hover:border-[#e87519] hover:text-[#b55d17]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* SECTION HEADING */}

        <div className="mb-4 flex items-end justify-between px-3 sm:px-5 lg:px-8">
          <div>
            <h2 className="text-lg font-bold text-[#641010] sm:text-xl">
              {categoryHeading}
            </h2>

            <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
              Sacred offerings, sweets and devotional gifts
            </p>
          </div>

          <span className="shrink-0 text-[10px] text-gray-500 sm:text-xs">
            {filteredProducts.length} products
          </span>
        </div>

        {/* PRODUCT GRID */}

        <section
          aria-label="Prasadam products"
          className="grid grid-cols-2 items-stretch gap-3 px-3 sm:grid-cols-3 sm:gap-4 sm:px-5 md:grid-cols-4 md:gap-4 md:px-6 lg:grid-cols-5 lg:gap-4 lg:px-8 xl:grid-cols-6"
        >
          {filteredProducts.map((product) => {
            const selectedVariant = getSelectedVariant(product);
            const cartItem = selectedVariant ? getCartItemForVariant(product.id, selectedVariant.id) : undefined;
            const quantity = cartItem?.quantity ?? 0;
            const currentPrice = selectedVariant ? selectedVariant.price : 0;
            const isAvailable = product.isAvailable && (!selectedVariant || selectedVariant.isAvailable);

            return (
              <article
                key={product.id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#e8e8e8] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-[#d8c5a3] hover:shadow-[0_6px_18px_rgba(0,0,0,0.09)]"
              >
                {/* PRODUCT IMAGE — FIXED SQUARE CONTAINER */}

                <div className="relative flex aspect-square w-full shrink-0 items-center justify-center bg-[#faf6ee] overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full rounded-lg object-cover object-center shadow-sm transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transform-none"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl text-[#d5a54c]/60">
                      🛕
                    </div>
                  )}
                </div>

                {/* DETAILS */}

                <div className="flex flex-1 flex-col p-2.5 sm:p-3">
                  {/* TITLE AND CATEGORY */}

                  <div className="flex items-start justify-between gap-1">
                    <h3
                      title={product.name}
                      className="min-w-0 flex-1 line-clamp-2 text-xs font-semibold leading-4 text-[#252525] sm:text-sm sm:leading-[18px]"
                    >
                      {product.name}
                    </h3>

                    <span
                      className="shrink-0 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[8px] font-semibold sm:text-[9px] bg-amber-50 text-amber-700"
                    >
                      {product.category || "Mahaprasad"}
                    </span>
                  </div>

                  {/* DESCRIPTION */}

                  <p
                    title={product.description}
                    className="mt-0.5 line-clamp-1 min-h-[14px] text-[10px] leading-[14px] text-gray-500 sm:text-[11px]"
                  >
                    {product.description}
                  </p>

                  {/* WEIGHT */}

                  <div className="mt-2">
                    <label
                      htmlFor={`weight-${product.id}`}
                      className="mb-1 block text-[10px] font-medium text-gray-600"
                    >
                      Select weight
                    </label>

                    <select
                      id={`weight-${product.id}`}
                      value={selectedVariant?.id ?? ""}
                      onChange={(event) =>
                        changeVariant(product.id, Number(event.target.value))
                      }
                      className="h-8 w-full rounded-md border border-gray-200 bg-white px-2 text-[11px] text-gray-700 outline-none focus:border-[#e87519] focus:ring-1 focus:ring-[#e87519] sm:text-xs"
                    >
                      {product.variants?.map((variant) => (
                        <option key={variant.id} value={variant.id}>
                          {formatVariantLabel(variant)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* PRICE */}

                  <div className="mt-3">
                    <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
                      <span className="text-base font-bold text-[#202020] sm:text-lg">
                        ₹{currentPrice.toLocaleString("en-IN")}
                      </span>

                      {selectedVariant && (
                        <span className="text-[10px] text-gray-400">
                          {formatVariantLabel(selectedVariant)} pack
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CART CONTROLS */}

                  <div className="mt-auto pt-3">
                    {!isAvailable ? (
                      <button
                        type="button"
                        disabled
                        className="flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-gray-200 px-1 text-[11px] font-bold text-gray-500 cursor-not-allowed sm:text-xs"
                      >
                        Out of Stock
                      </button>
                    ) : quantity === 0 ? (
                      <button
                        type="button"
                        disabled={!selectedVariant}
                        onClick={() => selectedVariant && handleIncrease(product, selectedVariant)}
                        className="flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-[#e87519] px-1 text-[11px] font-bold text-white transition hover:bg-[#cf5f0d] active:scale-[0.98] sm:text-xs"
                      >
                        <span>Add to Cart</span>
                      </button>
                    ) : (
                      <div className="flex h-9 w-full items-center justify-between overflow-hidden rounded-lg border border-[#e87519] bg-white">
                        <button
                          type="button"
                          onClick={() => selectedVariant && handleDecrease(product, selectedVariant)}
                          aria-label="Decrease quantity"
                          className="h-full flex-1 bg-[#fff7ef] text-lg font-semibold text-[#c45a0c] hover:bg-[#ffead8]"
                        >
                          −
                        </button>

                        <span
                          aria-live="polite"
                          className="flex-1 text-center text-xs font-bold text-gray-800"
                        >
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => selectedVariant && handleIncrease(product, selectedVariant)}
                          aria-label="Increase quantity"
                          className="h-full flex-1 bg-[#e87519] text-lg font-semibold text-white hover:bg-[#cf5f0d]"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* EMPTY STATE */}

        {filteredProducts.length === 0 && (
          <div className="px-4 py-16 text-center">
            <p className="text-3xl">🪔</p>
            <h3 className="mt-3 text-lg font-semibold text-[#641010]">
              No products found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Please select another category.
            </p>
          </div>
        )}

        {/* FOOTER */}

        <footer className="mt-10 flex items-center justify-center gap-2 px-4 text-[#c99435]">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#d8b66c] lg:w-24" />

          <span aria-hidden="true">❧ ❧ ❧</span>

          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#d8b66c] lg:w-24" />
        </footer>
      </div>
    </main>
  );
}
