import {Unit} from "@prisma/client"


export interface IUnit{
    create(name : string, tel: string , address : string, neighborhood : string, city  : string, state : string ):Promise<Unit>
   // update(name: string, tel: string ,address: string,neighborhood: string,city: string,state: string): Promise<Unit>
}


