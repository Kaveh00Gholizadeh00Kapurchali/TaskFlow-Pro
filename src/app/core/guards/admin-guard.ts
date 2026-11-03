import { inject, Inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { AuthService } from "../services/auth-service";



export const adminGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const currentUser = auth.C_currentUser();

    if(!currentUser){
        router.createUrlTree(['/login'])
    }
    if(currentUser?.userRole === 'admin'){
        return true;
    }
    return router.createUrlTree(['/']);
}