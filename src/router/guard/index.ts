import router from '@/router';

import { createPermissionGuard } from './permissionGuard';
import { createStateGuard } from './stateGuard';
import { createProgressGuard } from './progressGuard';

export function setupRouterGuard() {
  createPermissionGuard(router);
  createStateGuard(router);
  createProgressGuard(router);
}
