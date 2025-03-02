import { makeAutoObservable } from 'mobx';

export default class YearStore{
    Year = 2025;
    events: string[] = [
        `Initial count is${this.Year}`
    ]

    constructor(){
        makeAutoObservable(this)
    }

    increment = (amount =1)=>{
        this.Year += amount
        this.events.push(`Increment by ${amount} - count is now ${this.Year}`)
    }

    decrement = (amount=1)=>{
        this.Year -= amount
        this.events.push(`Decrement by ${amount} - count is now ${this.Year}`)
    }

    get Q1() {
        return `${this.Year % 100}Q1`
    }

    get Q2() {
        return `${this.Year % 100}Q2`
    }

    get Q3() {
        return `${this.Year % 100}Q3`
    }

    get Q4() {
        return `${this.Year % 100}Q4`
    }


    get eventCount(){
        return this.events.length
    }
}