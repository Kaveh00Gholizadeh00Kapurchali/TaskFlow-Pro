import { Injectable, inject, OnInit, effect, signal } from "@angular/core";

import { IUser } from "../models/UserModel";

@Injectable({
    providedIn: 'root'
})

export class UserService{

    private users = signal<IUser[]>(this.loadUsers());
    private readonly _STORAGE_KEY = 'registered_users'

    constructor(){
        effect(() => {

            const value = this.users();

            if(typeof localStorage !== 'undefined')
            {
                localStorage.setItem(this._STORAGE_KEY,JSON.stringify(value))
            }
        })

    }
    
    // داخل سرویس
private loadUsers(): IUser[] {
  const stored = localStorage.getItem(this._STORAGE_KEY);
  if (!stored) return [];   // <-- کلید امضای این
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    // اگه به هر دلیلی JSON خراب بود، لوگ کن و خالی برگردون
    console.error('Failed to parse stored users:', error);
    return [];
  }
}

    

    addUser(userdata: Omit<IUser, 'userId'>){
        const newUser : IUser =
            {
                userId: Date.now(),
                ...userdata  // همه داده هارو بجز id از خود مدل میگیره خودش
            };
        this.users.update(n_user => [...n_user, newUser])
    }
}