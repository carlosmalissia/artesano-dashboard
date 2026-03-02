export const ROLES = ['OWNER', 'ADMIN', 'VENDEDOR', 'CLIENTE'] as const;

export type Role = (typeof ROLES)[number];
