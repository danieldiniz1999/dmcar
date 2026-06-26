import logo from "@/assets/dmcar-logo.png.asset.json";

export function Logo({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={logo.url}
      alt="DMCAR Veículos Multimarcas"
      width={size}
      height={size}
      className={`rounded-md ${className}`}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}
