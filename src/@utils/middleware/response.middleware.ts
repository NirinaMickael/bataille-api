export class Resp<T>{
    private readonly data : T
    constructor(data : T){
         this.data = data;
    }
    response(){
        return {
            success:true,
            data :this.data,
        }
    }
}
