import { CanActivateFn } from '@angular/router';

export const authsessionGuard: CanActivateFn = (route, state) => {
  return true;
};
