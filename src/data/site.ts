
import type { NavItem } from "../types";

export const site = {
  name: "Sony Complex Alumni",
  tagline: "Association",
  motto: "Staying connected, giving back, and growing together.",
  address: "Sony Complex, Your City, Country",
  phone: "+000 000 000 000",
  email: "info@sonyalumni.org",
  hours: "Monday – Friday: 8:00 AM – 5:00 PM",
};

export const topLinks = [
  { label: "Events", to: "/events" },
  { label: "Directory", to: "/directory" },
  { label: "Giving", to: "/giving" },
  { label: "Careers", to: "/careers" },
  { label: "Admin", to: "/admin" },
];

export const nav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contacts", to: "/contact" },
];

export const footer = {
  groups: [
    {
      title: "Chapters",
      links: [
        "Regional Chapters",
        "Class Groups",
        "Professional Groups",
        "Student Alumni Liaison",
        "Overseas Alumni",
        "Women in Alumni",
      ],
    },
    {
      title: "Quick Links",
      links: [
        "About Us",
        "Membership",
        "Events",
        "Giving",
        "Alumni Directory",
        "News & Stories",
      ],
    },
  ],
  newsletterText:
    "Sign up to hear about reunions, events and alumni news.",
};
