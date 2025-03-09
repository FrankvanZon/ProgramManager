import { makeAutoObservable } from 'mobx';

export default class MilestoeStore{
    id = 0;
    Phase = ['APC','APC','APC','APC', 'NPDL','NPDL','NPDL','NPDL','NPDL','NPDL','NPDL','NPDL', 'NPDL'];
    MilestoneColor = ['primary','primary','primary','primary', 'success','success','success','success','success','success','success','success', 'success'];
    Milestone = ['PI', 'PS', 'PC', 'PR', '<PI','PI', 'PS', 'AA', 'PPC', 'PV', 'SR','CR'];
    Counter = 0;

    constructor(){
        makeAutoObservable(this)
    }

    count = (amount =1)=>{
        this.Counter += amount
    }

    increment = (amount =1)=>{
        this.id += amount
    }

    decrement = (amount=1)=>{
        this.id -= amount 
    }
}