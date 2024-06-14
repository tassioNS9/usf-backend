
export interface IUserAuthenticate{
    auth(cpf:string, password:string):Promise<any>
}