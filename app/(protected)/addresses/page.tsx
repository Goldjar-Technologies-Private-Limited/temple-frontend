"use client";

import { useState } from "react";
import {
  MapPin,
  Plus,
  Trash2,
  Edit2,
  X,
  Phone,
  Mail,
  Loader2,
} from "lucide-react";
import { useDeliveryAddresses } from "@/hooks/temple/address/useAddresses";
import { DeliveryAddress, CreateDeliveryAddressPayload } from "@/models/temple/address.model";
import PullToRefresh from "@/components/PullToRefresh";
import TempleLoader from "@/components/common/TempleLoader";

export default function AddressesPage() {
  const {
    addresses,
    isLoading,
    refetch,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useDeliveryAddresses();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<DeliveryAddress | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Form State
  const [recipientName, setRecipientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const openAddModal = () => {
    setEditingAddress(null);
    setRecipientName("");
    setPhoneNumber("");
    setEmail("");
    setFullAddress("");
    setLandmark("");
    setCity("");
    setState("");
    setPincode("");
    setIsDefault(addresses.length === 0);
    setIsModalOpen(true);
  };

  const openEditModal = (addr: DeliveryAddress) => {
    setEditingAddress(addr);
    setRecipientName(addr.recipientName || "");
    setPhoneNumber(addr.phoneNumber ? addr.phoneNumber.replace(/\D/g, "").slice(-10) : "");
    setEmail(addr.email || "");
    setFullAddress(addr.fullAddress || "");
    setLandmark(addr.landmark || "");
    setCity(addr.city || "");
    setState(addr.state || "");
    setPincode(addr.pincode || "");
    setIsDefault(addr.isDefault || false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !phoneNumber.trim() || !fullAddress.trim() || !city.trim() || !state.trim() || !pincode.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (pincode.length !== 6) {
      alert("Please enter a valid 6-digit PIN code.");
      return;
    }

    setSubmitting(true);
    try {
      const payload: CreateDeliveryAddressPayload = {
        recipientName: recipientName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim() || undefined,
        fullAddress: fullAddress.trim(),
        landmark: landmark.trim() || undefined,
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        isDefault,
      };

      if (editingAddress) {
        await updateAddress(editingAddress.id, payload);
      } else {
        await createAddress(payload);
      }
      closeModal();
    } catch (err: any) {
      alert(err?.message || "Failed to save address. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (deletingId) return;
    if (!window.confirm("Are you sure you want to delete this delivery address?")) return;

    setDeletingId(id);
    try {
      await deleteAddress(id);
    } catch (err: any) {
      alert(err?.message || "Failed to delete address.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSetDefault = async (addr: DeliveryAddress) => {
    if (addr.isDefault) return;
    try {
      await setDefaultAddress(addr);
    } catch (err: any) {
      alert(err?.message || "Failed to set default address.");
    }
  };

  if (isLoading && addresses.length === 0) {
    return <TempleLoader message="Loading Saved Addresses..." fullScreen />;
  }

  return (
    <PullToRefresh onRefresh={refetch}>
      <main className="min-h-[100dvh] bg-[#fffaf1] pb-[105px] text-[#40372f] lg:ml-[92px] lg:w-[calc(100%-92px)] lg:pb-12">
        <div className="mx-auto w-full max-w-[1100px] px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-9">
          {/* HEADER HERO */}
          <section className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#741313_0%,#9d211a_55%,#bd5428_100%)] px-5 py-6 text-white shadow-[0_10px_30px_rgba(94,28,17,0.14)] sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-20 h-[190px] w-[190px] rounded-full border border-white/10 bg-white/[0.04]"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-20 right-20 h-[150px] w-[150px] rounded-full bg-[#f0c46c]/10"
            />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/10 text-[#ffe3a7]">
                  <MapPin size={21} strokeWidth={1.8} aria-hidden="true" />
                </div>

                <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.13em] text-[#f1cd82]">
                  DELIVERY PREFERENCES
                </p>

                <h1 className="mt-1 text-[23px] font-bold sm:text-[27px] lg:text-[31px]">
                  Saved Addresses
                </h1>

                <p className="mt-2 max-w-[620px] text-[11px] leading-5 text-white/75 sm:text-xs lg:text-[13px] lg:leading-6">
                  Manage your delivery locations for prasadam and spiritual offerings.
                </p>
              </div>

              <button
                type="button"
                onClick={openAddModal}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-bold text-[#8e1715] shadow-sm transition hover:bg-[#fff6ea] active:scale-95"
              >
                <Plus size={16} strokeWidth={2.5} />
                Add New Address
              </button>
            </div>
          </section>

          {/* ADDRESS LIST */}
          <section className="mt-6">
            {addresses.length === 0 ? (
              <div className="rounded-[20px] border border-[#eadfce] bg-[#fffdf9] p-8 text-center shadow-[0_4px_16px_rgba(74,42,16,0.035)] sm:p-12">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#fff4e2] text-2xl text-[#b74c25]">
                  📭
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#641010]">
                  No Addresses Saved Yet
                </h3>
                <p className="mt-1 text-xs text-[#8a7a6e]">
                  Add an address to enjoy quick and seamless checkout for prasadam delivery.
                </p>
                <button
                  type="button"
                  onClick={openAddModal}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#a71919] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#851313]"
                >
                  <Plus size={15} /> Add First Address
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
                {addresses.map((addr) => (
                  <article
                    key={addr.id}
                    className={`relative overflow-hidden rounded-[18px] border bg-[#fffdf9] p-4 shadow-[0_4px_16px_rgba(74,42,16,0.035)] transition-all sm:p-5 ${
                      addr.isDefault
                        ? "border-[#b72c22] ring-1 ring-[#b72c22]/15"
                        : "border-[#eadfce] hover:border-[#d5b98a]"
                    }`}
                  >
                    {/* TOP BAR */}
                    <div className="flex items-start justify-between gap-2 border-b border-[#f2e6d6] pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[#493b32] sm:text-base">
                            {addr.recipientName}
                          </h3>
                          {addr.isDefault && (
                            <span className="rounded-full bg-[#ffebe7] px-2 py-0.5 text-[9px] font-bold text-[#a71919]">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-[#817266]">
                          <Phone size={12} className="text-[#a71919]" />
                          {addr.phoneNumber}
                        </p>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(addr)}
                          aria-label={`Edit address for ${addr.recipientName}`}
                          className="grid h-8 w-8 place-items-center rounded-lg text-[#7c6c60] hover:bg-[#fff0e6] hover:text-[#a71919] transition"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === addr.id}
                          onClick={() => handleDelete(addr.id)}
                          aria-label={`Delete address for ${addr.recipientName}`}
                          className="grid h-8 w-8 place-items-center rounded-lg text-[#7c6c60] hover:bg-[#ffebee] hover:text-[#b42318] transition disabled:opacity-50"
                        >
                          {deletingId === addr.id ? (
                            <Loader2 size={14} className="animate-spin text-[#b42318]" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* ADDRESS BODY */}
                    <div className="pt-3">
                      <p className="text-xs leading-5 text-[#5e4f44]">
                        {addr.fullAddress}
                      </p>
                      {addr.landmark && (
                        <p className="mt-1 text-[11px] text-[#8e7e72]">
                          Landmark: {addr.landmark}
                        </p>
                      )}
                      <p className="mt-1 text-xs font-semibold text-[#7e6d61]">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      {addr.email && (
                        <p className="mt-1 flex items-center gap-1 text-[11px] text-[#9a897e]">
                          <Mail size={11} /> {addr.email}
                        </p>
                      )}
                    </div>

                    {/* BOTTOM STATUS TOGGLE */}
                    {!addr.isDefault && (
                      <div className="mt-4 pt-3 border-t border-[#f2e6d6]">
                        <button
                          type="button"
                          onClick={() => handleSetDefault(addr)}
                          className="text-[11px] font-bold text-[#b74c25] hover:text-[#911b15] transition"
                        >
                          Set as Default Address
                        </button>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* FOOTER */}
          <div className="mt-10 text-center lg:mt-12">
            <div className="flex items-center justify-center gap-2">
              <span className="h-px w-10 bg-[#ddc69b]" />
              <span className="text-[#b8893b]">❧</span>
              <span className="text-[#b8893b]">❧</span>
              <span className="text-[#b8893b]">❧</span>
              <span className="h-px w-10 bg-[#ddc69b]" />
            </div>
            <p className="mt-3 text-[12px] font-semibold text-[#7b251e]">
              🙏 Jai Shree Krishna
            </p>
          </div>
        </div>

        {/* MODAL / BOTTOM SHEET */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2b1712]/50 px-3 py-6 backdrop-blur-[3px] sm:px-4"
            onClick={closeModal}
          >
            <div
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-[540px] overflow-y-auto rounded-[24px] border border-[#eadfce] bg-[#fffdf9] p-5 shadow-[0_25px_80px_rgba(43,23,18,0.25)] sm:p-7"
            >
              <div className="flex items-center justify-between border-b border-[#f2e6d6] pb-3.5">
                <div>
                  <h2 className="text-lg font-bold text-[#641010]">
                    {editingAddress ? "Edit Delivery Address" : "Add New Address"}
                  </h2>
                  <p className="text-[11px] text-[#8e7e72]">
                    Please provide accurate details for prompt delivery
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close"
                  className="grid h-8 w-8 place-items-center rounded-full bg-[#f4e8d8] text-[#635348] hover:bg-[#ebd8c2]"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-[#5c5047] mb-1">
                    Recipient Full Name <span className="text-[#a71919]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="h-11 w-full rounded-xl border border-[#dfd0bb] bg-white px-3.5 text-xs text-[#40372f] outline-none focus:border-[#c99435]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#5c5047] mb-1">
                      Phone Number <span className="text-[#a71919]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      inputMode="numeric"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="10 digit number"
                      className="h-11 w-full rounded-xl border border-[#dfd0bb] bg-white px-3.5 text-xs text-[#40372f] outline-none focus:border-[#c99435]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#5c5047] mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="h-11 w-full rounded-xl border border-[#dfd0bb] bg-white px-3.5 text-xs text-[#40372f] outline-none focus:border-[#c99435]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5c5047] mb-1">
                    Full Street Address <span className="text-[#a71919]">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    placeholder="House / Flat / Building / Street"
                    className="w-full resize-none rounded-xl border border-[#dfd0bb] bg-white p-3 text-xs text-[#40372f] outline-none focus:border-[#c99435]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#5c5047] mb-1">
                      PIN Code <span className="text-[#a71919]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      inputMode="numeric"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="6 digit PIN code"
                      className="h-11 w-full rounded-xl border border-[#dfd0bb] bg-white px-3.5 text-xs text-[#40372f] outline-none focus:border-[#c99435]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#5c5047] mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Nearby landmark"
                      className="h-11 w-full rounded-xl border border-[#dfd0bb] bg-white px-3.5 text-xs text-[#40372f] outline-none focus:border-[#c99435]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#5c5047] mb-1">
                      City <span className="text-[#a71919]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="h-11 w-full rounded-xl border border-[#dfd0bb] bg-white px-3.5 text-xs text-[#40372f] outline-none focus:border-[#c99435]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#5c5047] mb-1">
                      State <span className="text-[#a71919]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State"
                      className="h-11 w-full rounded-xl border border-[#dfd0bb] bg-white px-3.5 text-xs text-[#40372f] outline-none focus:border-[#c99435]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="modal-default"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="h-4 w-4 rounded border-[#dfd0bb] text-[#a71919] focus:ring-[#c99435]"
                  />
                  <label htmlFor="modal-default" className="text-xs font-semibold text-[#5c5047] cursor-pointer">
                    Set as default delivery address
                  </label>
                </div>

                <div className="mt-5 flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                    className="flex-1 rounded-xl border border-[#dfd0bb] bg-white py-3 text-xs font-bold text-[#625247] transition hover:bg-[#fffaf0] disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 rounded-xl bg-[#a71919] py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#8e1515] active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-1.5"
                  >
                    {submitting && <Loader2 size={14} className="animate-spin" />}
                    {editingAddress ? "Update Address" : "Save Address"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </PullToRefresh>
  );
}
