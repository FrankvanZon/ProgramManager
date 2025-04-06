import { makeAutoObservable } from 'mobx';

export default class MilestoneStore {
    id = 0;
    Phase = ['APC', 'APC', 'APC', 'APC', 'NPDL', 'NPDL', 'NPDL', 'NPDL', 'NPDL', 'NPDL', 'NPDL', 'NPDL', 'NPDL'];
    MilestoneColor = ['primary', 'primary', 'primary', 'primary', 'success', 'success', 'success', 'success', 'success', 'success', 'success', 'success', 'success'];
    Milestone = ['PI', 'PS', 'PC', 'PR', '<PI', 'PI', 'PS', 'AA', 'PPC', 'PV', 'SR', 'CR'];

    constructor() {
        makeAutoObservable(this);
        this.loadIdFromLocalStorage();
    }

    loadIdFromLocalStorage() {
        const storedId = localStorage.getItem('milestoneId');
        if (storedId) {
            this.id = parseInt(storedId, 10);
        } else {
            this.saveIdToLocalStorage();
        }
    }

    saveIdToLocalStorage() {
        localStorage.setItem('milestoneId', this.id.toString());
    }

    increment = (amount = 1) => {
        this.id += amount;
        this.saveIdToLocalStorage();
    }

    decrement = (amount = 1) => {
        this.id -= amount;
        this.saveIdToLocalStorage();
    }
}
