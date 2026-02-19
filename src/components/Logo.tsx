interface LogoProps {
  theme?: "light" | "dark";
  className?: string;
}

const palette = {
  light: {
    icon: "bg-white/10 text-white border-white/30",
    primary: "text-white",
    secondary: "text-white/70",
    tagline: "text-white/60",
  },
  dark: {
    icon: "bg-teal/10 text-teal border-teal/30",
    primary: "text-dark",
    secondary: "text-dark/70",
    tagline: "text-gray",
  },
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function Logo({ theme = "dark", className }: LogoProps) {
  const colors = palette[theme];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "h-14 w-14 rounded-2xl border flex items-center justify-center font-heading text-3xl",
          colors.icon
        )}
      >
        B
      </div>
      <div className="leading-tight">
        <div className="flex items-baseline gap-2">
          <span className={cn("font-heading text-2xl tracking-[0.35em]", colors.primary)}>BURKI</span>
          <span className={cn("font-heading text-lg tracking-[0.35em]", colors.secondary)}>BOOKS</span>
        </div>
        <p className={cn("uppercase text-[10px] tracking-[0.4em] mt-1", colors.tagline)}>
          From Classics to Curiosity — We Have It All
        </p>
      </div>
    </div>
  );
}
