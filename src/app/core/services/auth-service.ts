import { Injectable, computed, effect, inject, signal } from "@angular/core";

import { IUser, UserRole } from "../models/UserModel";

import { UserService } from "./create-user-service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})

export class AuthService{

    private readonly _SESSION_KEY = 'current_user';

    private router = inject(Router);
    private userService = inject(UserService);

    private currentUser = signal<IUser|null>(this.loadSession())
    readonly C_currentUser = this.currentUser.asReadonly();

    readonly isLoggedIn = computed(() => this.currentUser() !== null);

    constructor(){

        effect(() => {
            const user = this.currentUser();
            if (typeof localStorage === 'undefined') return;

            if(user){
                localStorage.setItem(this._SESSION_KEY, JSON.stringify(user));
            }else{
                localStorage.removeItem(this._SESSION_KEY);
            }
        });
    }

    private loadSession(): IUser | null {
        if(typeof localStorage === 'undefined') return null;

        const stored = localStorage.getItem(this._SESSION_KEY);

        if(!stored) return null;

        try{
            return JSON.parse(stored);
        } catch{
            return null;
        }
    }

    login(userName:string, userPassword:string) : boolean {
        const found = this.userService.C_users().find((u) => u.userName === userName && u.userPassword === userPassword);

        if(!found) return false;

        this.currentUser.set(found);
        return true;
    }

    changeUserRole(userId: number, newRole:UserRole): boolean {
        const currentUser = this.currentUser();

        if(!currentUser || currentUser.userRole !== 'admin'){
            return false;
        }
        if(currentUser.userId === userId){
            return false;
        }

        const userExists = this.userService.C_users().some((user) => user.userId === userId)

        if(!userExists){
            return false;
        }
        this.userService.updateUserRole(userId, newRole);
        return true;

    }

    logOut(): void{
        this.currentUser.set(null);
        this.router.navigate(['/login']);
    }

}