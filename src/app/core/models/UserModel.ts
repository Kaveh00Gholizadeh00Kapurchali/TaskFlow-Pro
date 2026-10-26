import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {signal} from '@angular/core';

 

export interface IUser{
    userId: number;
    userName: string;
    userPassword: string;
    userEmail: string;
    userRole: string ;
         
}