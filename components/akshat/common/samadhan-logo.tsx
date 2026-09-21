import { cn } from "@/lib/utils";

interface SamadhanLogoIconProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export function SamadhanLogoIcon({
  size = 48,
  className = "",
}: SamadhanLogoIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Samadhan.ai Logo"
      width={size}
      height={size}
      className={cn("flex-shrink-0 object-contain", className)}
    />
  );
}

interface SamadhanLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
  horizontal?: boolean;
}

export function SamadhanLogo({
  size = "md",
  showText = true,
  showTagline = true,
  className = "",
  horizontal = false,
}: SamadhanLogoProps) {
  const iconSizes = { sm: 36, md: 52, lg: 72, xl: 96 };
  const textSizes = {
    sm: "text-lg",
    md: "text-2xl sm:text-3xl",
    lg: "text-3xl sm:text-4xl",
    xl: "text-4xl sm:text-5xl",
  };
  const taglineSizes = {
    sm: "text-[9px]",
    md: "text-xs sm:text-sm",
    lg: "text-sm sm:text-base",
    xl: "text-base sm:text-lg",
  };
  const iconPx = iconSizes[size];

  if (horizontal) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <SamadhanLogoIcon size={iconPx} />
        {showText && (
          <div className="flex flex-col">
            <h2
              className={cn(
                textSizes[size],
                "font-black tracking-tight text-slate-900 leading-none",
              )}
            >
              Samadhan<span className="text-teal-600">.ai</span>
            </h2>
            {showTagline && (
              <p
                className={cn(
                  taglineSizes[size],
                  "text-teal-700 font-medium tracking-wide mt-1",
                )}
              >
                Together for a Better Tomorrow
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <SamadhanLogoIcon size={iconPx} />
      {showText && (
        <div className="mt-2">
          <h2
            className={cn(
              textSizes[size],
              "font-black tracking-tight text-slate-900 leading-tight",
            )}
          >
            Samadhan<span className="text-teal-600">.ai</span>
          </h2>
          {showTagline && (
            <p
              className={cn(
                taglineSizes[size],
                "text-teal-700 font-semibold tracking-wide mt-0.5",
              )}
            >
              Together for a Better Tomorrow
            </p>
          )}
        </div>
      )}
    </div>
  );
}