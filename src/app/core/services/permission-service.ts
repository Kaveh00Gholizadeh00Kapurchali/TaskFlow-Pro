import { Injectable, inject } from "@angular/core";

import { AuthService } from "./auth-service";
import {  permisson, RolePermisson} from "../models/PermissionModel";

@Injectable({
    providedIn : 'root',
})

export class PermissionService{
    private readonly auth = inject(AuthService);

    hasPermission(permission: permisson):boolean{
        const currentUser = this.auth.C_currentUser();

        if(!currentUser){
            return false;
        }

        const permissions = RolePermisson[currentUser.userRole];
         return  permission.includes(permission);
    }
}