import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../admin.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
})
export class InvoicesComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  invoices: any = [];
  closeResult: string = '';
  printInvoiceData: any = {};
  ngOnInit(): void {
    this.adminService.getInvoices().subscribe(
      (data: any) => {
        this.invoices = data.data;
        setTimeout(() => {
          $('#invoiceTable').DataTable();
        }, 100);
      },
      (err) => {
        this.toastr.error(err.name, 'Error', { timeOut: 3000 });
      }
    );
  }

  showPrintInvoice(id: string, content: any) {
    this.adminService.getInvoiceById(id).subscribe(
      (data: any) => {
        this.printInvoiceData = data.data;
        this.modalService
          .open(content, { ariaLabelledBy: 'modal-basic-title' })
          .result.then(
            (result) => {
              this.closeResult = `Closed with: ${result}`;
            },
            (reason: any) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
          );
      },
      (err) => {
        this.toastr.error(err.name, 'Error', { timeOut: 3000 });
      }
    );
  }

  deleteInvoice(id: string) {
    this.adminService.deleteInvoice(id).subscribe(
      (data: any) => {
        this.router.navigate(['admin/dashboard']);
        this.toastr.success('Carpet deleted Successfully', 'Success', {
          timeOut: 3000,
        });
      },
      (err: any) => {
        this.router.navigate(['admin/dashboard']);
        this.toastr.error(err.name, 'Error', { timeOut: 3000 });
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
