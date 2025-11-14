import React from "react";
import * as LucideIcons from "lucide-react";
import clsx from "clsx";

type IconProps = {
  iconName: string; // ex: "Link"
  size?: string;
  color?: string;
};

const DynamicLucideIcon: React.FC<IconProps> = ({ iconName, size = '20', color = "currentColor" }) => {
  // Trouve le composant correspondant dans LucideIcons
  const IconComponent = (LucideIcons as any)[iconName];

  // Si le nom n’existe pas, on affiche une icône par défaut
  if (!IconComponent) {
    const DefaultIcon = LucideIcons.HelpCircle;
    return <DefaultIcon className={clsx(`w-${size} h-${size} font-light`)} color={color} />;
  }

  return <IconComponent className={clsx(`w-${size} h-${size} font-light`)} color={color} />;
};

export default DynamicLucideIcon;
