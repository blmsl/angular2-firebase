import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash"

@Pipe({
  name: 'defineCityList',
  pure: true
})
export class DefineCityListPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!args) return null;
    let finalValue = [];
    let listCitisWithKeys = _.find(value,{country: args}).cities;
    Object.keys(listCitisWithKeys).forEach((key)=>{
      finalValue.push(listCitisWithKeys[key])
    });
    return finalValue;
  }

}
