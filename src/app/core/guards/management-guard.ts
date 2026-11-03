import { inject, Inject } from "@angular/core";

import { AuthService } from "../services/auth-service";
import { CanActivateFn,  Router } from "@angular/router";

export const managementGuard : CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const currentUser = auth.C_currentUser();

    if(!currentUser){
        return router.createUrlTree(['/login']);
    }

    const isManager : boolean = currentUser.userRole === 'admin' || currentUser.userRole === 'manager';

    if(isManager){
        return true;
    }
    return router.createUrlTree(['/']);
};