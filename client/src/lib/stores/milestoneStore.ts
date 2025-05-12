import { makeAutoObservable } from 'mobx';

export default class MilestoneStore {
    id = 0;
    filterByMilestoneMin = -2;
    filterByMilestoneMax = 13;
    filterByMilestonePhase = "all";

    Phase = ['APC', 'APC', 'APC', 'APC', 'NPDL', 'NPDL', 'NPDL', 'NPDL', 'NPDL', 'NPDL', 'NPDL', 'NPDL', 'NPDL'];
    MilestoneColor = ['primary', 'primary', 'primary', 'primary', 'success', 'success', 'success', 'success', 'success', 'success', 'success', 'success', 'success'];
    Milestone = ['PI', 'PS', 'PC', 'PR', '<PI', 'PI', 'PS', 'AA', 'PPC', 'PV', 'SR', 'CR','CIB'];

    Milestones = [
        { phaseId: -1, phase: 'VPC', milestoneColor: 'warning', milestone: 'VPC' },
        { phaseId: 0, phase: 'APC', milestoneColor: 'primary', milestone: 'PI' },
        { phaseId: 1, phase: 'APC', milestoneColor: 'primary', milestone: 'PS' },
        { phaseId: 2, phase: 'APC', milestoneColor: 'primary', milestone: 'PC' },
        { phaseId: 3, phase: 'APC', milestoneColor: 'primary', milestone: 'PR' },
        { phaseId: 4, phase: 'NPDL', milestoneColor: 'success', milestone: '<PI' },
        { phaseId: 5, phase: 'NPDL', milestoneColor: 'success', milestone: 'PI' },
        { phaseId: 6, phase: 'NPDL', milestoneColor: 'success', milestone: 'PS' },
        { phaseId: 7, phase: 'NPDL', milestoneColor: 'success', milestone: 'AA' },
        { phaseId: 8, phase: 'NPDL', milestoneColor: 'success', milestone: 'PPC' },
        { phaseId: 9, phase: 'NPDL', milestoneColor: 'success', milestone: 'PV' },
        { phaseId: 10, phase: 'NPDL', milestoneColor: 'success', milestone: 'SR' },
        { phaseId: 11, phase: 'NPDL', milestoneColor: 'success', milestone: 'CR' },
        { phaseId: 12, phase: 'CIB', milestoneColor: 'secondary', milestone: 'CIB' },
    ]

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

    setFilterByMilestone = (phase: string, milestone: string) => {
        const matchingItem = this.Milestones.find(
            (item) => item.phase === phase && item.milestone === milestone
        );

        if (matchingItem) {
            this.filterByMilestoneMin = matchingItem.phaseId;
            this.filterByMilestoneMax = matchingItem.phaseId;
        } 
        
        else {
            const matchingItems = this.Milestones
                .filter((item) => item.phase === phase);

            this.filterByMilestoneMin = matchingItems.length > 0
                ? Math.min(...matchingItems.map(item => item.phaseId))
                : -1;

            this.filterByMilestoneMax = matchingItems.length > 0
                ? Math.max(...matchingItems.map(item => item.phaseId))
                : 12;
        }
    }

    setFilterByMilestonePhase = (filter: string) => {
        this.filterByMilestonePhase = filter

        const matchingItems = this.Milestones
            .filter((item) => item.phase === filter);

        this.filterByMilestoneMin = matchingItems.length > 0
            ? Math.min(...matchingItems.map(item => item.phaseId))
            : -1;

        this.filterByMilestoneMax = matchingItems.length > 0
            ? Math.max(...matchingItems.map(item => item.phaseId))
            : 12;
    }

    resetFilters = () => {
        this.filterByMilestoneMin=-2
        this.filterByMilestoneMax=13
        //console.log(this.filterByMilestoneMin);
        //console.log(this.filterByMilestoneMax);
    }
}
