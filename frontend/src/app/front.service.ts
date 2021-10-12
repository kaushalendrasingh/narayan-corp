import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FrontService {
  constructor(private http: HttpClient, private auth: AuthService) {}
  private APIURL = 'http://localhost:3030/api/user';
  private APISERVER = 'https://enigmatic-hamlet-45263.herokuapp.com/api/user';

  private headers = {
    headers: new HttpHeaders().set(
      'authorization',
      `${this.auth.getJwtToken()}`
    ),
  };
  getInvoices() {
    return this.http.get(`${this.APIURL}/invoices`, this.headers);
  }
  getMedicines() {
    return this.http.get(`${this.APIURL}/get-medicines`, this.headers);
  }
  getMedicinesForSales() {
    return this.http.get(`${this.APIURL}/sales`, this.headers);
  }
  getMedicinesById(id: string) {
    return this.http.get(`${this.APIURL}/get-medicine/${id}`, this.headers);
  }
  getInvoiceById(id: string) {
    return this.http.get(`${this.APIURL}/get-invoice/${id}`, this.headers);
  }
  madeSale(data: any) {
    return this.http.post(`${this.APIURL}/made-sale/`, data, this.headers);
  }
  addMedicine(data: any) {
    return this.http.post(`${this.APIURL}/add-medicine/`, data, this.headers);
  }
  updateMedicine(data: any) {
    return this.http.post(
      `${this.APIURL}/update-medicine/`,
      data,
      this.headers
    );
  }
  deleteRequirement() {
    return this.http.get(`${this.APIURL}/delete-requirement/`, this.headers);
  }
  generateRequirement() {
    return this.http.get(`${this.APIURL}/get-requirement/`, this.headers);
  }
  addRequirement(data: any) {
    return this.http.post(
      `${this.APIURL}/add-requirement/`,
      data,
      this.headers
    );
  }
}
