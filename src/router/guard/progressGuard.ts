import type { Router } from 'vue-router';

import nProgress from 'nprogress';

export function createProgressGuard(router: Router) {
  router.beforeEach(async (to) => {
    nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    nProgress.done();
    return true;
  });
}
