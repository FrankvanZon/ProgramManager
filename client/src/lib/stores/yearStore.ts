import { makeAutoObservable } from 'mobx';

export default class YearStore {
    Year = 2025;
    quarters = [1, 2, 3, 4];

    constructor() {
        makeAutoObservable(this);
        this.loadYearFromLocalStorage();
    }

    loadYearFromLocalStorage() {
        const storedYear = localStorage.getItem('year');
        if (storedYear) {
            this.Year = parseInt(storedYear, 10);
        } else {
            this.saveYearToLocalStorage();
        }
    }

    saveYearToLocalStorage() {
        localStorage.setItem('year', this.Year.toString());
    }

    increment = (amount = 1) => {
        this.Year += amount;
        this.saveYearToLocalStorage();
    }

    decrement = (amount = 1) => {
        this.Year -= amount;
        this.saveYearToLocalStorage();
    }

    YearQuarter(quarter: number) {
        return this.Year % 100 * 100 + quarter;
    }

    get Q1() {
        return this.Year % 100 * 100 + 1;
    }

    get Q2() {
        return this.Year % 100 * 100 + 2;
    }

    get Q3() {
        return this.Year % 100 * 100 + 3;
    }

    get Q4() {
        return this.Year % 100 * 100 + 4;
    }

    // Shifted by 1 year, so slider scale goes from Y-1, Y, Y+1
    Quarter(value: number) {
        const year = ((this.Year - 1) % 100 + Math.floor(value / 4)) * 100;
        const quarter = this.quarters[value % 4];
        return year + quarter;
    }

    InverseQuarter(combined: number) {
        const year = Math.floor(combined / 100);
        const yearIndex = (year - (this.Year - 2000)) * 4;
        const quarter = combined - year * 100;
        const quarterIndex = quarter - 1;
        const value = yearIndex + quarterIndex + 4;
        return value;
    }
}
