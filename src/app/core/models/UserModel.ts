import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {signal} from '@angular/core';

export interface user{
    userId: number;
    userName: string;
    userEmail: string;
    userRole: string; // e.g., "admin", "user", "manager" 
}