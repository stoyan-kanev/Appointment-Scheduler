import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import {AuthService} from '../services/auth.services';

export const barberGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return auth.verifyToken().pipe(
        map(() => true),
        catchError(() => {
            router.navigate(['/barber-login']);
            return of(false);
        })
    );
};
