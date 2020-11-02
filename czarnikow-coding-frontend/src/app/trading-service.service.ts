
    import { Injectable } from '@angular/core';  
    import { HttpClient,HttpHeaders }    from '@angular/common/http';  
import { environment } from 'src/environments/environment';
    @Injectable({  
      providedIn: 'root'  
    })  
      
    export class ServiceService {  
      
    constructor(private http: HttpClient) { }  
      httpOptions = {  
        headers: new HttpHeaders({  
          'Content-Type': 'application/json'  
        })  
      }    
      getData(){  
           
        return this.http.get(`${environment.apiUrl}/api/Trade`);  
      }  

      getCounterParties(){  
           
        return this.http.get(`${environment.apiUrl}/api/Counterparty`);  
      }  
      
      getDataByCounterparty(counterpartyId: number){  
           
        return this.http.get(`${environment.apiUrl}/api/Trade/GetByCounterparty?counterpartyId=${counterpartyId.toString()}`);  
      }  

      postData(formData){  
        return this.http.post(`${environment.apiUrl}/api/Trade`,formData);  
      }  
      
      putData(id,formData){  
        return this.http.put(`${environment.apiUrl}/api/Trade/${id}`,formData);  
      }  
      deleteData(id){  
        return this.http.delete(`${environment.apiUrl}/api/Trade/${id}`);  
      }  
        
    }  
