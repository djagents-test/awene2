"use client";

import { useState } from "react";

export default function FooterEmailForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return done ? (
    <p
      className="text-sm py-3"
      style={{ color: "rgba(243,236,251,0.8)", fontFamily: "var(--font-inter)" }}
    >
      ✓ Bienvenue dans le mouvement.
    </p>
  ) : (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setDone(true);
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre adresse email"
        required
        className="w-full px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-[#6F3FD6] transition-colors"
        style={{
          background: "rgba(255,255,255,0.08)",
          color: "#F3ECFB",
          fontFamily: "var(--font-inter)",
        }}
      />
      <button
        type="submit"
        className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
        style={{
          background: "linear-gradient(135deg, #F68B2C 0%, #E67520 100%)",
          fontFamily: "var(--font-inter)",
        }}
      >
        Rejoindre
      </button>
    </form>
  );
}
