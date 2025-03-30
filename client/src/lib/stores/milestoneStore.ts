import { makeAutoObservable } from 'mobx';

export default class MilestoneStore{
    id = 0;
    Phase = ['APC','APC','APC','APC', 'NPDL','NPDL','NPDL','NPDL','NPDL','NPDL','NPDL','NPDL', 'NPDL'];
    MilestoneColor = ['primary','primary','primary','primary', 'success','success','success','success','success','success','success','success', 'success'];
    Milestone = ['PI', 'PS', 'PC', 'PR', '<PI','PI', 'PS', 'AA', 'PPC', 'PV', 'SR','CR'];
    

    constructor(){
        makeAutoObservable(this)
    }

    increment = (amount =1)=>{
        this.id += amount
    }

    decrement = (amount=1)=>{
        this.id -= amount 
    }
}