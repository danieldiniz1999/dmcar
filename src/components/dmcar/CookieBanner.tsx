import { useEffect, useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const accepted = window.localStorage.getItem("dmcar_cookies_accepted");
    if (!accepted) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    window.localStorage.setItem("dmcar_cookies_accepted", "1");
    setHide(true);
    setTimeout(() => setVisible(false), 300);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9998] bg-[#141414] border-t-2 border-gold transition-opacity duration-300"
      style={{ opacity: hide ? 0 : 1, paddingBottom: 0 }}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <p className="text-sm text-white/85 text-center md:text-left">
          🍪 Utilizamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa{" "}
          <a href="/privacidade" className="text-gold underline">Política de Privacidade</a>.
        </p>
        <div className="flex gap-2 shrink-0">
          <a href="/privacidade" className="btn-outline rounded-full px-4 py-2 text-xs">Saiba Mais</a>
          <button onClick={accept} className="btn-primary rounded-full px-5 py-2 text-xs">Aceitar Cookies</button>
        </div>
      </div>
    </div>
  );
}
