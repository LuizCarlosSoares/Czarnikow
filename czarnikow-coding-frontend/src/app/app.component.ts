 
import { Component } from '@angular/core'; 
import { FormGroup, FormControl,Validators } from '@angular/forms'; 
import { ServiceService } from './trading-service.service';


@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
export class AppComponent {  
  title ='czarnikow-coding-frontend';  
     
  constructor(private ServiceService: ServiceService) { }  
  data: any;  
  counterparties: any;
  TradeForm: FormGroup;  
  submitted = false;   
  EventValue: any = "Save";  
  showForm=false;
  
  ngOnInit(): void {  
    this.getdata();  
    this.getCounterpartiesData();  
  
    this.TradeForm = new FormGroup({       
      id: new FormControl(0),  
      counterpartyId:  new FormControl("",[Validators.required]),
      product: new FormControl("",[Validators.required]),        
      quantity: new FormControl("",[Validators.required]),  
      price:new FormControl("",[Validators.required]),  
      direction: new FormControl("",[Validators.required])     
    })    
  }  

  getdata() {  
    this.ServiceService.getData().subscribe((data: any[]) => {  
      this.data = data;  
    })  
  }  

  filter(event:any){

    this.getdataByCounterparty(event.target.value);
    this.TradeForm.controls['counterpartyId'].setErrors(null);
    this.TradeForm.controls["counterpartyId"].setValue(Number(event.target.value));

  }
  getCounterpartiesData() {  
    this.ServiceService.getCounterParties().subscribe((data: any[]) => {  
      this.counterparties = data; 
      this.counterparties.unshift({id:undefined, name:"Select--"})     
    })  
  }  

  getdataByCounterparty(counterpartyId:number) {  
    this.ServiceService.getDataByCounterparty(counterpartyId).subscribe((data: any[]) => {  
      this.data = data;  
    })  
  }  
  deleteData(id) {  
    this.ServiceService.deleteData(id).subscribe((data: any[]) => {  
      this.data = data;  
      this.getdata();  
    })  
  }  
  Save() {   
    this.submitted = true;  
    
     if (this.TradeForm.invalid) {  
            return;  
     }  
    

    this.ServiceService.postData(this.MapFormData()).subscribe((data: any[]) => {  
      this.data = data;  
      this.resetFrom();  
  
    })  
  } 
  
  public AddNew(){
    this.showForm = true;
    this.EventValue = "Save";
  }
  private MapFormData() :any {
    let Data: any = {};
    let counterparty: any = {};   
    if(isNaN(this.TradeForm.controls["counterpartyId"].value)){
      this.TradeForm.controls['counterpartyId'].setErrors({'incorrect': true});
    }
    Data.id = Number(this.TradeForm.controls["id"].value) ;
    counterparty.id = Number(this.TradeForm.controls["counterpartyId"].value);     
    Data.product = this.TradeForm.controls["product"].value;
    Data.quantity = Number(this.TradeForm.controls["quantity"].value);
    Data.price =  Number(this.TradeForm.controls["price"].value);
    Data.direction = Number(this.TradeForm.controls["direction"].value);
    Data.counterparty = counterparty;
    return Data
  }

  Update() {   
    this.submitted = true;  
    
    if (this.TradeForm.invalid) {  
     return;  
    }        
    this.ServiceService.putData(this.TradeForm.value.id,this.MapFormData()).subscribe((data: any[]) => {  
      this.data = data;  
      this.resetFrom();  
      this.showForm = false;
    })  
  }  
  
  EditData(Data) {  
    this.TradeForm.controls["id"].setValue(Data.id);  
    this.TradeForm.controls["product"].setValue(Data.product);      
    this.TradeForm.controls["quantity"].setValue(Number(Data.quantity));  
    this.TradeForm.controls["price"].setValue(Data.price);  
    this.TradeForm.controls["direction"].setValue(Number(Data.direction));  
    this.TradeForm.controls["counterpartyId"].setValue(Data.counterparty.id);     
    this.EventValue = "Update";  
    this.showForm = true;
  }  
  
  resetFrom()  
  {     
    this.getdata();  
    this.TradeForm.reset();  
    this.EventValue = "Save";  
    this.submitted = false; 
    this.showForm = false;  
  }  
}  
