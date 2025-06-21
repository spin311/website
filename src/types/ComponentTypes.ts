import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type Link = {
  text: string;
  href: string;
  icon: IconDefinition;
  link?: boolean;
  internal?: boolean;
};

export type Section = {
  id: string;
  icon: IconDefinition;
  text: string;
  link?: boolean;
  href?: string;
};

export type NotificationMessage = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

export type ExperienceType = {
  title: string;
  company: string;
  desc: string[];
  years: string;
  website: string;
  logo: string;
};

export type ProjectType = {
  id: number;
  extensionId?: string;
  name: string;
  ghName: string;
  ghUrl: string;
  type: string;
  description: string;
  img: string;
  website: string | null;
  download_link?: string;
  stars: number;
  forks: number;
  users?: number;
  rating?: number;
  created_at: string | null;
};

export type RepositoryType = {
  name: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
};

export type Mail = {
  subject: string;
  sender: string;
  contact: string;
  body: string;
};

export type UninstallBody = {
  extension_name: string;
  reason: string;
  contact?: string;
  message?: string;
};

export interface MailResponse {
  Message?: string;
}
