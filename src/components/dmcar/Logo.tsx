import logo from "@/assets/dmcar-logo.png";

export function Logo({
  size = 44,
  className = "",
  responsive = false,
}: {
  size?: number;
  className?: string;
  responsive?: boolean;
}) {
  if (responsive) {
    return (
      <img
        src={logo}
        alt="DMCAR Veículos Multimarcas"
        className={`rounded-md object-contain h-14 w-14 sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-32 lg:w-32 ${className}`}
      />
    );
  }
  return (
    <img
      src={logo}
      alt="DMCAR Veículos Multimarcas"
      width={size}
      height={size}
      className={`rounded-md ${className}`}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}
