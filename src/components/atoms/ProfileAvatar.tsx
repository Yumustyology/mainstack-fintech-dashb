import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  initials?: string | null;
  size?: number | string;
  className?: string;
};

const ProfileAvatar: React.FC<Props> = ({ initials, size = 32, className }) => {
  const isEmpty = !initials || initials.trim().length === 0;
  const dimensionStyle: React.CSSProperties =
    typeof size === "number"
      ? { width: `${size}px`, height: `${size}px` }
      : { width: size as string, height: size as string };

  const base = cn(
    "flex items-center justify-center rounded-full font-semibold flex-shrink-0 text-base",
    className
  );

  const bgClass = isEmpty ? "bg-[#F3F6F7]" : "bg-gradient-to-br from-[#5C6670] to-[#131316] text-white";

  return (
    <div className={cn(base, bgClass)} style={dimensionStyle}>
      {!isEmpty ? <span>{initials}</span> : null}
    </div>
  );
};

export default ProfileAvatar;
