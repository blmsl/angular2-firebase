import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToCollection'
})
export class ObjectToCollectionPipe implements PipeTransform {

  transform(value, args:string[]) : any {
    if(!value) return;
    let values = [];
    let objectValue;
    objectValue = Object.keys(value);
    objectValue.forEach((key)=>{
      values.push(value[key])
    });
    return values;
  }

}
