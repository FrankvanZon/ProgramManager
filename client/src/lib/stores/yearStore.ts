import { makeAutoObservable } from 'mobx';

export default class YearStore{
    Year = 2025;
    quarters = [1, 2, 3, 4];

    constructor(){
        makeAutoObservable(this)
    }

    increment = (amount =1)=>{
        this.Year += amount
    }

    decrement = (amount=1)=>{
        this.Year -= amount 
    }

    YearQuarter(quarter: number){
        return this.Year % 100 *100+ quarter
    }


    get Q1() {
        return this.Year % 100 *100+1
    }

    get Q2() {
        return this.Year % 100 *100+2
    }

    get Q3() {
        return this.Year % 100 *100+3
    }

    get Q4() {
        return this.Year % 100 *100+4
    }

    Quarter(value:  number) {
        const year = (this.Year %100 + Math.floor(value / 4))*100;
        const quarter = this.quarters[value % 4];
        return year+quarter
    }

    InverseQuarter(combined: number) {
        const year = Math.floor(combined/100) 
        const yearIndex = (year - (this.Year-2000))*4
        const quarter = combined - year*100
        const quarterIndex = quarter -1
        const value = yearIndex+quarterIndex;
        return value;
      }

}