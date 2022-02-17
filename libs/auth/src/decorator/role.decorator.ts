import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = Role;
export const hasRoles = (...hasRoles: Role[]) => SetMetadata(ROLES_KEY,  hasRoles );