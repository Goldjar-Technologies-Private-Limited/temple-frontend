"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerPrasadCart } from "@/hooks/temple/prasad/usePrasad";
import { useDeliveryAddresses } from "@/hooks/temple/address/useAddresses";
import { DeliveryAddress } from "@/models/temple/address.model";
import { Plus, CheckCircle2 } from "lucide-react";
import {
  CART_CHECKOUT_PRODUCTS as products,
  type PrasadamWeight as Weight,
} from "@/data/prasadam";

interface CheckoutDisplayItem {
  id: string | number;
  productId: number;
  name: string;
  image: string;
  weight: string;
  price: number;
  quantity: number;
}

/* =========================================================
   TYPES
========================================================= */

type CartItem = {
  productId: number;
  weight: Weight;
  quantity: number;
};

type PaymentMethod = "upi" | "card" | "cod";

/* =========================================================
   HELPERS
========================================================= */


function isValidWeight(weight: unknown): weight is Weight {
  return weight === "250gm" || weight === "500gm" || weight === "1kg";
}

function getWeightPrice(basePrice: number, weight: Weight) {
  switch (weight) {
    case "250gm":
      return basePrice * 0.5;

    case "500gm":
      return basePrice;

    case "1kg":
      return basePrice * 2;

    default:
      return basePrice;
  }
}

/* =========================================================
   PAGE
========================================================= */

export default function CheckoutPage() {
  const router = useRouter();
  const { cart: apiCart, isLoading: apiCartLoading, clearCart } = useCustomerPrasadCart();
  const { addresses: savedAddresses, createAddress } = useDeliveryAddresses();

  const [localCart, setLocalCart] = useState<CartItem[]>([]);
  const [localLoaded, setLocalLoaded] = useState(false);

  const [selectedAddressId, setSelectedAddressId] = useState<number | "new">("new");
  const [saveThisAddress, setSaveThisAddress] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-select default or first address if available
  useEffect(() => {
    if (savedAddresses && savedAddresses.length > 0) {
      const defaultAddr = savedAddresses.find((a) => a.isDefault) || savedAddresses[0];
      setSelectedAddressId(defaultAddr.id);
      applySavedAddress(defaultAddr);
    } else {
      setSelectedAddressId("new");
    }
  }, [savedAddresses]);

  const applySavedAddress = (addr: DeliveryAddress) => {
    setFullName(addr.recipientName || "");
    setPhone(addr.phoneNumber ? addr.phoneNumber.replace(/\D/g, "").slice(-10) : "");
    setEmail(addr.email || "");
    setAddress(addr.fullAddress || "");
    setLandmark(addr.landmark || "");
    setCity(addr.city || "");
    setState(addr.state || "");
    setPincode(addr.pincode || "");
  };

  const handleSelectAddress = (id: number | "new") => {
    setSelectedAddressId(id);
    if (id === "new") {
      setFullName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setLandmark("");
      setCity("");
      setState("");
      setPincode("");
    } else {
      const found = savedAddresses.find((a) => a.id === id);
      if (found) {
        applySavedAddress(found);
      }
    }
  };

  /* =========================================================
     LOAD LOCAL CART (Fallback)
  ========================================================= */

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("prasadam-cart");
      if (!savedCart) {
        setLocalCart([]);
        return;
      }
      const parsedCart = JSON.parse(savedCart);
      if (Array.isArray(parsedCart)) {
        const validCart: CartItem[] = parsedCart.filter(
          (item): item is CartItem =>
            typeof item?.productId === "number" &&
            isValidWeight(item?.weight) &&
            typeof item?.quantity === "number" &&
            Number.isFinite(item?.quantity) &&
            item.quantity > 0,
        );
        setLocalCart(validCart);
        return;
      }
    } catch (error) {
      console.error("Failed to load local cart:", error);
      setLocalCart([]);
    } finally {
      setLocalLoaded(true);
    }
  }, []);

  /* =========================================================
     CART ITEMS (API with Local Fallback)
  ========================================================= */

  const cartItems: CheckoutDisplayItem[] = useMemo(() => {
    // 1. Prefer API Cart
    if (apiCart && apiCart.items && apiCart.items.length > 0) {
      return apiCart.items.map((item) => ({
        id: item.cartItemId,
        productId: item.prasadId,
        name: item.prasadName,
        image: item.imageUrl || "/images/mohanthal.jpg",
        weight: `${item.weight} ${item.unit}`,
        price: item.price,
        quantity: item.quantity,
      }));
    }

    // 2. Fallback to Local Storage Cart
    const items: CheckoutDisplayItem[] = [];
    for (const cartItem of localCart) {
      const product = products.find((item) => item.id === cartItem.productId);
      if (!product || !isValidWeight(cartItem.weight)) continue;
      const price = getWeightPrice(product.price, cartItem.weight);
      items.push({
        id: `${cartItem.productId}-${cartItem.weight}`,
        productId: cartItem.productId,
        name: product.name,
        image: product.image,
        weight: cartItem.weight,
        price,
        quantity: cartItem.quantity,
      });
    }
    return items;
  }, [apiCart, localCart]);

  const loaded = !apiCartLoading || localLoaded;

  /* =========================================================
     TOTAL ITEMS
  ========================================================= */

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  /* =========================================================
     SUBTOTAL
  ========================================================= */

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const deliveryCharge = subtotal > 0 ? 50 : 0;

  const totalAmount = subtotal + deliveryCharge;

  /* =========================================================
     FORMAT PRICE
  ========================================================= */

  const formatPrice = (value: number) => {
    return value.toLocaleString("en-IN");
  };

  /* =========================================================
     PLACE ORDER
  ========================================================= */

  const handlePlaceOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      router.push("/prasadam");
      return;
    }

    if (
      !fullName.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {
      alert("Please fill all required delivery details.");
      return;
    }

    if (phone.length !== 10) {
      alert("Please enter a valid 10 digit mobile number.");
      return;
    }

    if (pincode.length !== 6) {
      alert("Please enter a valid 6 digit PIN code.");
      return;
    }

    setIsSubmitting(true);

    try {
      // If user typed a new address and opted to save it
      if (selectedAddressId === "new" && saveThisAddress) {
        try {
          await createAddress({
            recipientName: fullName.trim(),
            phoneNumber: phone.trim(),
            email: email.trim() || undefined,
            fullAddress: address.trim(),
            landmark: landmark.trim() || undefined,
            city: city.trim(),
            state: state.trim(),
            pincode: pincode.trim(),
            isDefault: savedAddresses.length === 0,
          });
        } catch (addrErr) {
          console.error("Failed to save new address to API:", addrErr);
        }
      }

      const order = {
        id: `ORD-${Date.now()}`,
        customer: {
          fullName,
          phone,
          email,
          address,
          landmark,
          city,
          state,
          pincode,
        },
        items: cartItems,
        paymentMethod,
        subtotal,
        deliveryCharge,
        totalAmount,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("last-prasadam-order", JSON.stringify(order));

      // Clear both local storage and server-side cart
      try {
        await clearCart();
      } catch (e) {
        console.error("Failed to clear server cart:", e);
      }

      localStorage.removeItem("prasadam-cart");
      localStorage.removeItem("prasadam-cart-weights");
      window.dispatchEvent(new Event("prasadam-cart-updated"));

      router.push("/prasadam/order-success");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (!loaded) {
    return (
      <main className="min-h-[100dvh] bg-[#fffaf3] lg:ml-[92px] lg:w-[calc(100%-92px)]" />
    );
  }

  /* =========================================================
     EMPTY CART
  ========================================================= */

  if (cartItems.length === 0) {
    return (
      <main className="min-h-[100dvh] bg-[#fffaf3] lg:ml-[92px] lg:w-[calc(100%-92px)]">
        <div className="flex min-h-[calc(100dvh-100px)] items-center justify-center px-4">
          <div className="max-w-[420px] text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-[#eadbc5] bg-white text-3xl">
              🛍️
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#641010]">
              Your cart is empty
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#81756c]">
              Add prasadam before continuing to checkout.
            </p>

            <button
              type="button"
              onClick={() => router.push("/prasadam")}
              className="mt-6 rounded-xl bg-[#a71919] px-7 py-3 text-sm font-bold text-white"
            >
              Explore Prasadam
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <main className="min-h-[100dvh] bg-[#fffaf3] pb-[175px] md:pb-12 lg:ml-[92px] lg:w-[calc(100%-92px)]">
      <form
        onSubmit={handlePlaceOrder}
        className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-5 px-3 py-4 sm:px-5 sm:py-6 md:px-6 lg:grid-cols-[minmax(0,1fr)_370px] lg:items-start lg:gap-8 lg:px-8 lg:py-8 xl:grid-cols-[minmax(0,1fr)_400px]"
      >
        {/* =================================================
            LEFT
        ================================================= */}

        <div className="space-y-5">
          {/* DELIVERY DETAILS */}

          <section className="rounded-[18px] border border-[#eadbc5] bg-[#fffdf8] p-4 shadow-[0_8px_25px_rgba(80,45,15,0.05)] sm:p-5 lg:p-6">
            <SectionHeading
              number="1"
              title="Delivery Details"
              subtitle="Where should we send your prasadam?"
            />

            {/* SAVED ADDRESS SELECTOR */}
            {savedAddresses.length > 0 && (
              <div className="mt-4 mb-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-[#5c5047] uppercase tracking-wider">
                    Select Saved Address
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSelectAddress("new")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#a71919] hover:underline"
                  >
                    <Plus size={14} /> Add New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {savedAddresses.map((addr) => {
                    const isSelected = selectedAddressId === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => handleSelectAddress(addr.id)}
                        className={`relative cursor-pointer rounded-xl border p-3 transition-all ${
                          isSelected
                            ? "border-[#b72c22] bg-[#fff6ee] shadow-[0_4px_14px_rgba(167,25,25,0.09)]"
                            : "border-[#e8decb] bg-white hover:border-[#cfb68d]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#443830]">
                              {addr.recipientName}
                            </span>
                            {addr.isDefault && (
                              <span className="rounded bg-[#ffe8d6] px-1.5 py-0.5 text-[9px] font-bold text-[#b55815]">
                                Default
                              </span>
                            )}
                          </div>
                          {isSelected && (
                            <CheckCircle2 size={16} className="text-[#a71919] shrink-0" />
                          )}
                        </div>

                        <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-[#75675c]">
                          {addr.fullAddress}
                          {addr.landmark ? `, ${addr.landmark}` : ""}
                        </p>

                        <p className="mt-1 text-[11px] font-semibold text-[#8a7a6e]">
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>

                        <p className="mt-1 text-[10px] text-[#9c8d80]">
                          📞 {addr.phoneNumber}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MANUAL FORM OR SELECTED ADDRESS DETAILS */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField
                label="Full Name"
                placeholder="Enter full name"
                value={fullName}
                onChange={setFullName}
                required
              />

              <InputField
                label="Mobile Number"
                placeholder="10 digit mobile number"
                value={phone}
                onChange={(value) =>
                  setPhone(value.replace(/\D/g, "").slice(0, 10))
                }
                inputMode="numeric"
                required
              />

              <InputField
                label="Email"
                placeholder="Email address (optional)"
                value={email}
                onChange={setEmail}
                type="email"
              />

              <InputField
                label="PIN Code"
                placeholder="6 digit PIN code"
                value={pincode}
                onChange={(value) =>
                  setPincode(value.replace(/\D/g, "").slice(0, 6))
                }
                inputMode="numeric"
                required
              />

              {/* ADDRESS */}

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[11px] font-bold text-[#5c5047]">
                  Full Address
                  <span className="text-[#a71919]"> *</span>
                </label>

                <textarea
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  required
                  rows={3}
                  placeholder="House / Flat / Building / Street"
                  className="w-full resize-none rounded-xl border border-[#dfd0bb] bg-white px-3.5 py-3 text-sm text-[#40372f] outline-none transition placeholder:text-[#aaa096] focus:border-[#c99435] focus:ring-2 focus:ring-[#c99435]/10"
                />
              </div>

              <InputField
                label="Landmark"
                placeholder="Nearby landmark"
                value={landmark}
                onChange={setLandmark}
              />

              <InputField
                label="City"
                placeholder="Enter city"
                value={city}
                onChange={setCity}
                required
              />

              <div className="sm:col-span-2">
                <InputField
                  label="State"
                  placeholder="Enter state"
                  value={state}
                  onChange={setState}
                  required
                />
              </div>

              {/* SAVE ADDRESS CHECKBOX (Only for new addresses) */}
              {selectedAddressId === "new" && (
                <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="save-address"
                    checked={saveThisAddress}
                    onChange={(e) => setSaveThisAddress(e.target.checked)}
                    className="h-4 w-4 rounded border-[#dfd0bb] text-[#a71919] focus:ring-[#c99435]"
                  />
                  <label htmlFor="save-address" className="text-xs font-semibold text-[#5c5047] cursor-pointer">
                    Save this address for future deliveries
                  </label>
                </div>
              )}
            </div>
          </section>

          {/* ===============================================
              PAYMENT
          =============================================== */}

          <section className="rounded-[18px] border border-[#eadbc5] bg-[#fffdf8] p-4 shadow-[0_8px_25px_rgba(80,45,15,0.05)] sm:p-5 lg:p-6">
            <SectionHeading
              number="2"
              title="Payment Method"
              subtitle="Choose how you want to pay."
            />

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <PaymentOption
                active={paymentMethod === "upi"}
                icon="₹"
                title="UPI"
                subtitle="GPay, PhonePe"
                onClick={() => setPaymentMethod("upi")}
              />

              <PaymentOption
                active={paymentMethod === "card"}
                icon="💳"
                title="Card"
                subtitle="Debit / Credit"
                onClick={() => setPaymentMethod("card")}
              />

              <PaymentOption
                active={paymentMethod === "cod"}
                icon="📦"
                title="Cash"
                subtitle="On Delivery"
                onClick={() => setPaymentMethod("cod")}
              />
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#eee0cc] bg-[#fff8eb] p-3">
              <span>🔒</span>

              <p className="text-[10px] leading-5 text-[#7c7066] sm:text-[11px]">
                Your payment information will be processed securely. Payment
                gateway integration will handle online payments.
              </p>
            </div>
          </section>

          {/* ===============================================
              MOBILE ORDER ITEMS
          =============================================== */}

          <section className="rounded-[18px] border border-[#eadbc5] bg-[#fffdf8] p-4 lg:hidden">
            <SectionHeading
              number="3"
              title="Order Items"
              subtitle={`${totalItems} ${
                totalItems === 1 ? "item" : "items"
              } selected`}
            />

            <div className="mt-4 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={`${item.productId}-${item.weight}`}
                  className="flex items-center gap-3 border-b border-[#f0e4d3] pb-3 last:border-0 last:pb-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-[#4d1616]">
                      {item.name}
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#81756c]">
                      {item.weight} • ₹{formatPrice(item.price)} ×{" "}
                      {item.quantity}
                    </p>
                  </div>

                  <strong className="text-xs text-[#a71919]">
                    ₹{formatPrice(item.price * item.quantity)}
                  </strong>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* =================================================
            DESKTOP ORDER SUMMARY
        ================================================= */}

        <aside className="hidden lg:sticky lg:top-[100px] lg:block">
          <div className="rounded-[18px] border border-[#eadbc5] bg-[#fffdf8] p-6 shadow-[0_10px_30px_rgba(80,45,15,0.07)]">
            <span className="text-[10px] font-bold uppercase tracking-[1.3px] text-[#c18b32]">
              Your Order
            </span>

            <h2 className="mt-1 text-[22px] font-bold text-[#561010]">
              Order Summary
            </h2>

            {/* PRODUCTS */}

            <div className="mt-5 space-y-3 border-b border-[#eee1cf] pb-5">
              {cartItems.map((item) => (
                <div
                  key={`${item.productId}-${item.weight}`}
                  className="flex items-center gap-3"
                >
                  <div className="relative h-12 w-12 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full rounded-lg object-cover"
                    />

                    <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#a71919] px-1 text-[8px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-[#4d1616]">
                      {item.name}
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#81756c]">
                      {item.weight} • ₹{formatPrice(item.price)} ×{" "}
                      {item.quantity}
                    </p>
                  </div>

                  <strong className="text-xs text-[#641010]">
                    ₹{formatPrice(item.price * item.quantity)}
                  </strong>
                </div>
              ))}
            </div>

            {/* PRICE */}

            <div className="space-y-3 border-b border-[#eee1cf] py-5">
              <PriceRow label="Subtotal" value={`₹${formatPrice(subtotal)}`} />

              <PriceRow
                label="Delivery"
                value={`₹${formatPrice(deliveryCharge)}`}
              />
            </div>

            {/* TOTAL */}

            <div className="flex items-center justify-between py-5">
              <div>
                <p className="text-xs font-bold text-[#40372f]">Total</p>

                <p className="text-[9px] text-[#918479]">
                  Inclusive of charges
                </p>
              </div>

              <strong className="text-xl font-bold text-[#a71919]">
                ₹{formatPrice(totalAmount)}
              </strong>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#a71919] px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(167,25,25,0.18)] transition hover:bg-[#821313] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Placing Order..."
                : `Pay ₹${formatPrice(totalAmount)}`}
            </button>

            <p className="mt-4 text-center text-[10px] text-[#8b7d72]">
              🔒 Secure &amp; trusted checkout
            </p>
          </div>
        </aside>

        {/* =================================================
            MOBILE BOTTOM BAR
        ================================================= */}

        <div className="fixed bottom-[calc(76px+env(safe-area-inset-bottom))] left-0 right-0 z-50 border-t border-[#eadbc5] bg-[#fffdf8]/95 p-3 shadow-[0_-8px_25px_rgba(70,40,15,0.08)] backdrop-blur-md sm:px-5 lg:hidden">
          <div className="mx-auto flex max-w-[760px] items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[9px] text-[#85776d]">Total Amount</p>

              <strong className="block text-lg font-bold text-[#641010]">
                ₹{formatPrice(totalAmount)}
              </strong>

              <span className="text-[9px] text-[#9b8e84]">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex min-h-[50px] min-w-[165px] items-center justify-center gap-2 rounded-xl bg-[#a71919] px-5 text-sm font-bold text-white shadow-md active:scale-[0.98] disabled:opacity-60"
            >
              {isSubmitting ? "Please wait..." : "Place Order"}

              {!isSubmitting && <span>→</span>}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

/* =========================================================
   HEADER
========================================================= */


/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#a71919] text-xs font-bold text-white">
        {number}
      </div>

      <div>
        <h2 className="text-lg font-bold text-[#561010] sm:text-xl">{title}</h2>

        <p className="mt-0.5 text-[10px] text-[#8a7d72] sm:text-[11px]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

type InputFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  inputMode?: "text" | "numeric" | "email" | "tel";
};

function InputField({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  type = "text",
  inputMode = "text",
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-bold text-[#5c5047]">
        {label}

        {required && <span className="text-[#a71919]"> *</span>}
      </label>

      <input
        type={type}
        inputMode={inputMode}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-[46px] w-full rounded-xl border border-[#dfd0bb] bg-white px-3.5 text-sm text-[#40372f] outline-none transition placeholder:text-[#aaa096] focus:border-[#c99435] focus:ring-2 focus:ring-[#c99435]/10"
      />
    </div>
  );
}

/* =========================================================
   PAYMENT OPTION
========================================================= */

function PaymentOption({
  active,
  icon,
  title,
  subtitle,
  onClick,
}: {
  active: boolean;
  icon: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex min-h-[74px] items-center gap-3 rounded-xl border p-3 text-left transition-all sm:flex-col sm:items-start ${active ? `border-[#a71919] bg-[#fff4ee] shadow-[0_4px_14px_rgba(167,25,25,0.08)]` : `border-[#eadbc5] bg-white hover:border-[#d5b97f]`}`}
    >
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fff0df] text-base font-bold text-[#a71919]">
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold text-[#4c4037]">{title}</p>

        <p className="mt-0.5 text-[9px] text-[#918479]">{subtitle}</p>
      </div>

      {active && (
        <span className="absolute right-2 top-2 grid h-4 w-4 place-items-center rounded-full bg-[#a71919] text-[8px] text-white">
          ✓
        </span>
      )}
    </button>
  );
}

/* =========================================================
   PRICE ROW
========================================================= */

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-xs">
      <span className="text-[#81756c]">{label}</span>

      <strong className="text-[#4b4038]">{value}</strong>
    </div>
  );
}
