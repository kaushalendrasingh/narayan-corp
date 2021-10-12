import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private adminAuth: AuthService) {}
  private APIURL = 'http://localhost:3030/api/admin';
  private APISERVER = 'https://enigmatic-hamlet-45263.herokuapp.com/api/admin';
  private headers = {
    headers: new HttpHeaders().set(
      'authorization',
      `${this.adminAuth.getAdminJwtToken()}`
    ),
  };

  getInvoices() {
    return this.http.get(`${this.APIURL}/invoices`, this.headers);
  }

  getDashBoardData() {
    return this.http.get(`${this.APIURL}/dashboard`, this.headers);
  }

  getMedicines() {
    return this.http.get(`${this.APIURL}/get-medicines`, this.headers);
  }

  getMedicineById(id: string) {
    return this.http.get(`${this.APIURL}/get-medicine/${id}`, this.headers);
  }

  getAgents() {
    return this.http.get(`${this.APIURL}/get-agents`, this.headers);
  }

  getAgentById(id: string) {
    return this.http.get(`${this.APIURL}/get-agent/${id}`, this.headers);
  }

  getInvoiceById(id: string) {
    return this.http.get(`${this.APIURL}/get-invoice/${id}`, this.headers);
  }

  addAgent(data: any) {
    return this.http.post(`${this.APIURL}/add-agent`, data, this.headers);
  }

  addMedicine(data: any) {
    return this.http.post(`${this.APIURL}/add-medicine`, data, this.headers);
  }

  updateMedicine(data: any) {
    return this.http.post(`${this.APIURL}/update-medicine`, data, this.headers);
  }

  updateAgent(data: any) {
    return this.http.post(`${this.APIURL}/update-agent`, data, this.headers);
  }

  deleteMedicine(id: string) {
    return this.http.delete(`${this.APIURL}/medicine/${id}`, this.headers);
  }

  deleteAgent(id: string) {
    return this.http.delete(`${this.APIURL}/agent/${id}`, this.headers);
  }

  deleteInvoice(id: string) {
    return this.http.delete(`${this.APIURL}/invoice/${id}`, this.headers);
  }

  changePassword(data: any) {
    return this.http.post(`${this.APIURL}/change-password`, data, this.headers);
  }

  generateReport(date: string) {
    return this.http.get(`${this.APIURL}/report/${date}`, this.headers);
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
