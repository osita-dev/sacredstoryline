import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

/* ===========================
   Extend Window for Paystack
=========================== */
declare global {
  interface Window {
    PaystackPop: {
      setup: (options: any) => {
        openIframe: () => void;
      };
    };
  }
}

const amounts: number[] = [10, 25, 50, 100];

type PopupType = "success" | "error" | "info";

interface PopupState {
  show: boolean;
  type: PopupType;
  message: string;
}

const DonationSection: React.FC = () => {
  const [selected, setSelected] = useState<number>(25);
  const [custom, setCustom] = useState<string>("");
  const [recurring, setRecurring] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const [popup, setPopup] = useState<PopupState>({
    show: false,
    type: "info",
    message: "",
  });

  // ===========================
  // Exchange rate (USD → NGN)
  // Replace with live backend rate in production
  // ===========================
  const EXCHANGE_RATE = 1600; // 1 USD = 1600 NGN

  const isCustom = custom !== "";
  const finalAmount: number = Number(isCustom ? custom : selected);

  /* ===========================
     Load Paystack Script
  =========================== */
  const loadPaystackScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (document.getElementById("paystack-script")) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.id = "paystack-script";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  /* ===========================
     Handle Donation
  =========================== */
  const handleDonate = async () => {
    const loaded = await loadPaystackScript();

    if (!loaded) {
      return setPopup({
        show: true,
        type: "error",
        message: "Payment system failed to load. Please try again.",
      });
    }

    if (!finalAmount || finalAmount <= 0 || isNaN(finalAmount)) {
      return setPopup({
        show: true,
        type: "error",
        message: "Enter a valid donation amount.",
      });
    }

    if (!email) {
      return setPopup({
        show: true,
        type: "error",
        message: "Please enter your email address.",
      });
    }

    // ===========================
    // Convert USD → NGN
    // Paystack requires NGN kobo
    // ===========================
    const ngnAmount = finalAmount * EXCHANGE_RATE;
    const amountInKobo = Math.round(ngnAmount * 100);

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email,
      amount: amountInKobo,
      currency: "NGN",
      ref: "DON_" + Date.now(),
      metadata: { recurring },

      onClose: () => {
        setPopup({
          show: true,
          type: "info",
          message: "Transaction was not completed.",
        });
      },

      callback: (response: { reference: string }) => {
        setPopup({
          show: true,
          type: "success",
          message: `Donation successful! Reference: ${response.reference}`,
        });

        // TODO: Send reference to backend for verification
      },
    });

    handler.openIframe();
  };

  return (
    <section id="donate" className="py-24 sm:py-32 bg-secondary/50">
      <div className="container mx-auto px-6 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-card rounded-2xl p-8 sm:p-12 shadow-lg border"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Make a Difference Today
            </h2>
            <p className="text-muted-foreground">
              Your support keeps Sacred Storyline alive and growing.
            </p>
          </div>

          {/* Email */}
          <div className="mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 px-4 rounded-lg border bg-background focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Preset Amounts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {amounts.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setSelected(amt);
                  setCustom("");
                }}
                className={`py-3 rounded-lg border transition-all ${
                  selected === amt && !isCustom
                    ? "bg-primary text-white border-primary"
                    : "bg-background border-border hover:border-primary/40"
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-6">
            <input
              type="number"
              placeholder="Custom amount"
              value={custom}
              onChange={(e) => {
                setCustom(e.target.value);
                setSelected(0);
              }}
              className="w-full py-3 px-4 rounded-lg border bg-background focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Recurring Toggle */}
          <label className="flex items-center gap-3 mb-8 cursor-pointer">
            <button
              onClick={() => setRecurring(!recurring)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                recurring ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  recurring ? "translate-x-5" : ""
                }`}
              />
            </button>
            <span className="text-sm text-muted-foreground">
              Make this a monthly donation
            </span>
          </label>

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            className="w-full bg-primary text-white font-semibold text-lg py-4 rounded-lg hover:brightness-110 transition-all"
          >
            Donate ${finalAmount} (₦{(finalAmount * EXCHANGE_RATE).toLocaleString()})
            {recurring ? " / month" : ""}
          </button>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Secure & encrypted. You can cancel anytime.
          </p>
        </motion.div>
      </div>

      <Popup popup={popup} setPopup={setPopup} />
    </section>
  );
};

/* ===========================
   Popup Component
=========================== */

interface PopupProps {
  popup: PopupState;
  setPopup: React.Dispatch<React.SetStateAction<PopupState>>;
}

const Popup: React.FC<PopupProps> = ({ popup, setPopup }) => {
  if (!popup.show) return null;

  const colors: Record<PopupType, string> = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl"
      >
        <div
          className={`w-full h-2 rounded-t-xl mb-4 ${colors[popup.type]}`}
        />

        <p className="text-gray-800 mb-6">{popup.message}</p>

        <button
          onClick={() => setPopup({ ...popup, show: false })}
          className="w-full bg-primary text-white py-3 rounded-lg hover:brightness-110"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default DonationSection;