import { Injectable, inject, OnInit, effect, signal } from "@angular/core";

import { IUser } from "../models/UserModel";

@Injectable({
    providedIn: 'root'
})

export class UserService{

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

    addUser(userdata: Omit<IUser, 'userId'>){
        const newUser : IUser =
            {
                userId: Date.now(),
                ...userdata  // همه داده هارو بجز id از خود مدل میگیره خودش
            };
        this.users.update(n_user => [...n_user, newUser])
    }
}