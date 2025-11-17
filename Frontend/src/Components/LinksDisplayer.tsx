import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Globe,
  Twitter,
} from "lucide-react";
import type { LinksInterface } from "@/types/userTypes";
import type { JSX } from "react";

const iconMap: Record<keyof LinksInterface, JSX.Element> = {
  instagram: <Instagram className="size-5" />,
  facebook: <Facebook className="size-5" />,
  youtube: <Youtube className="size-5" />,
  linkedin: <Linkedin className="size-5" />,
  website: <Globe className="size-5" />,
  twitter: <Twitter className="size-5" />,
};

const LinksDisplayer = ({ links }: { links: LinksInterface }) => {
  return (
    <div className="flex justify-center items-center gap-5 mt-2">
      {Object.entries(links).map(([key, value]) => {
        {
          if (!value?.trim()) return null;
        }

        return (
          <a
            key={key}
            href={value}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer "
            target="_blank"
          >
            {iconMap[key as keyof LinksInterface]}
          </a>
        );
      })}
    </div>
  );
};

export default LinksDisplayer;
