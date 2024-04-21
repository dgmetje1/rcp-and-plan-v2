export const languages = ["en", "es", "fr", "ca"] as const;
export type Language = (typeof languages)[number];
