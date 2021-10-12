import { FrontService } from './../../front.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-f-invoices',
  templateUrl: './f-invoices.component.html',
  styleUrls: ['./f-invoices.component.css']
})
export class FInvoicesComponent implements OnInit {

  constructor(private frontService: FrontService,
              private toastr: ToastrService,
              private modalService: NgbModal) {}

  invoices:any =[];
  closeResult: string = "";
  printInvoiceData :any = {};
  ngOnInit(): void {
    this.frontService.getInvoices().subscribe((data : any)=>{
        this.invoices = data.data;
        setTimeout(()=>{
          $('#invoiceTable').DataTable();
        },100)
      },(err)=>{
        this.toastr.error(err.error.msg,'Error',{timeOut:3000})
    })
  }

  showPrintInvoice(id:string, content : any){
    this.frontService.getInvoiceById(id).subscribe((data : any)=>{
      this.printInvoiceData = data.data;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason :any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }, (err)=>{

    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
