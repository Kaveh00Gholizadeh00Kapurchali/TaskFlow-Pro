import { Injectable, inject, OnInit, effect, signal } from "@angular/core";

import { IUser } from "../models/UserModel";

@Injectable({
    providedIn: 'root'
})

export class User{

    private readonly _STORAGE_KEY = 'registered_users'

    constructor(){
        effect(() => {

            const value = this.users;

            if(typeof localStorage !== 'undefined')
            {
                localStorage.setItem(this._STORAGE_KEY,JSON.stringify(value))
            }
        })

    }
    
    loadUser(): any[]{
        if(typeof localStorage === 'undefined') return [];
        const data = localStorage.getItem(this._STORAGE_KEY)
        return data ? JSON.parse(data) : [];
    }

    private users = signal<IUser[]>(this.loadUser());

    addUser(userName:string, userEmail:string, userRole: string){
        const newUser : IUser =
            {
                userId: Date.now(),
                userName: userName ,
                userEmail: userEmail,
                userRole: userRole
            };
        this.users.update(n_user => [...n_user, newUser])
    }
}