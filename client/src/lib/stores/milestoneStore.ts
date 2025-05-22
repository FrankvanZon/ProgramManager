import { makeAutoObservable } from 'mobx';

export default class MilestoneStore {
    id = 0;
    filterByMilestoneMin = -3;
    filterByMilestoneMax = 44;
    filterByMilestonePhase = "all";

    Milestones = [
        { phaseId: -99, phase: 'Cancelled', milestoneColor: 'error', milestone: 'Cancelled', programStatus: 'Cancelled' },

        { phaseId: -2, phase: 'VPC', milestoneColor: 'warning', milestone: 'Start', programStatus: 'Proposed' },
        { phaseId: -1, phase: 'VPC', milestoneColor: 'warning', milestone: 'Finish', programStatus: 'Proposed' },

        { phaseId: 0, phase: 'New', milestoneColor: 'primary', milestone: 'New', programStatus: 'New' },

        { phaseId: 1, phase: 'APC', milestoneColor: 'primary', milestone: 'PI', programStatus: 'Proposed' },
        { phaseId: 3, phase: 'APC', milestoneColor: 'primary', milestone: 'PS', programStatus: 'Proposed' },
        { phaseId: 5, phase: 'APC', milestoneColor: 'primary', milestone: 'PC', programStatus: 'Proposed' },
        { phaseId: 7, phase: 'APC', milestoneColor: 'primary', milestone: 'PR', programStatus: 'Proposed' },
        { phaseId: 9, phase: 'NPDL', milestoneColor: 'success', milestone: '<PI', programStatus: 'Proposed' },
        { phaseId: 11, phase: 'NPDL', milestoneColor: 'success', milestone: 'PI', programStatus: 'Proposed' },

        { phaseId: 2, phase: 'APC', milestoneColor: 'primary', milestone: 'PI', programStatus: 'Programmed' },
        { phaseId: 4, phase: 'APC', milestoneColor: 'primary', milestone: 'PS', programStatus: 'Programmed' },
        { phaseId: 6, phase: 'APC', milestoneColor: 'primary', milestone: 'PC', programStatus: 'Programmed' },
        { phaseId: 8, phase: 'APC', milestoneColor: 'primary', milestone: 'PR', programStatus: 'Programmed' },
        { phaseId: 10, phase: 'NPDL', milestoneColor: 'success', milestone: '<PI', programStatus: 'Programmed' },
        { phaseId: 12, phase: 'NPDL', milestoneColor: 'success', milestone: 'PI', programStatus: 'Programmed' },

        { phaseId: 20, phase: 'NPDL', milestoneColor: 'success', milestone: 'PS', programStatus: 'Committed' },
        { phaseId: 21, phase: 'NPDL', milestoneColor: 'success', milestone: 'AA', programStatus: 'Committed' },
        { phaseId: 22, phase: 'NPDL', milestoneColor: 'success', milestone: 'PPC', programStatus: 'Committed' },
        { phaseId: 23, phase: 'NPDL', milestoneColor: 'success', milestone: 'PV', programStatus: 'Committed' },
        { phaseId: 24, phase: 'NPDL', milestoneColor: 'success', milestone: 'SR', programStatus: 'Committed' },

        { phaseId: 30, phase: 'NPDL', milestoneColor: 'success', milestone: 'CR', programStatus: 'Released' },

        { phaseId: 40, phase: 'CIB', milestoneColor: 'secondary', milestone: 'CI', programStatus: 'Proposed' },
        { phaseId: 41, phase: 'CIB', milestoneColor: 'secondary', milestone: 'CRA', programStatus: 'Programmed' },
        { phaseId: 42, phase: 'CIB', milestoneColor: 'secondary', milestone: 'IPA', programStatus: 'Committed' },
        { phaseId: 43, phase: 'CIB', milestoneColor: 'secondary', milestone: 'RP', programStatus: 'Released' },
    ]

    MilestonesGrouped = Array.from(
        this.Milestones.reduce((map, milestone) => {
            const key = `${milestone.phase}|${milestone.milestone}`;
            if (!map.has(key)) {
                map.set(key, {
                    phase: milestone.phase,
                    milestone: milestone.milestone,
                    milestoneColor: milestone.milestoneColor,
                    phaseIds: [milestone.phaseId],
                });
            } else {
                map.get(key)!.phaseIds.push(milestone.phaseId);
            }
            return map;
        }, new Map<string, { phase: string; milestone: string; milestoneColor: string; phaseIds: number[] }>())
    ).map(([, value]) => value);

    constructor() {
        makeAutoObservable(this);
        this.loadIdFromLocalStorage();
    }

    loadIdFromLocalStorage() {
        const storedId = localStorage.getItem('milestoneId');
        const parsedId = storedId ? parseInt(storedId, 10) : NaN;

        if (!isNaN(parsedId) && parsedId > 0) {
            this.id = parsedId;
        } else {
            this.id = 0;
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

    setFilterForMilestoneId = (phase: string, milestone?: string, programStatus?: string) => {
        // First, try filtering by all given criteria (phase + optional milestone + optional programStatus)
        let filteredItems = this.Milestones.filter(item =>
            item.phase === phase &&
            (milestone ? item.milestone === milestone : true) &&
            (programStatus ? item.programStatus === programStatus : true)
        );

        this.filterByMilestonePhase = phase;

        if (filteredItems.length > 0) {
            this.filterByMilestoneMin = Math.min(...filteredItems.map(item => item.phaseId));
            this.filterByMilestoneMax = Math.max(...filteredItems.map(item => item.phaseId));
        }
        // Fallback: filter only by phase and optional programStatus
        else {
            filteredItems = this.Milestones.filter(item =>
                item.phase === phase &&
                (programStatus ? item.programStatus === programStatus : true)
            );

            this.filterByMilestoneMin = filteredItems.length > 0
                ? Math.min(...filteredItems.map(item => item.phaseId))
                : -3;

            this.filterByMilestoneMax = filteredItems.length > 0
                ? Math.max(...filteredItems.map(item => item.phaseId))
                : 44;
        }
    }

    resetFilters = () => {
        this.filterByMilestoneMin = -3
        this.filterByMilestoneMax = 44
    }

    currentMilestone = (id: number): string => {
        return this.Milestones.find(m => m.phaseId === id)?.milestone || 'new';
    }

    currentPhase = (id: number): string => {
        return this.Milestones.find(m => m.phaseId === id)?.phase || 'new';
    }

    currentProgramStatus = (id: number): string => {
        return this.Milestones.find(m => m.phaseId === id)?.programStatus || 'new';
    }

    getNextOrPreviousPhase = (phaseId: number, direction: string) => {
        const index = this.Milestones.findIndex(m => m.phaseId === phaseId);
        if (index === -1) return 0;

        if ((phaseId === 11 || phaseId === 12) && direction === 'next') return 20;

        const newIndex = direction === 'next' ? index + 1 : index - 1;
        return this.Milestones[newIndex].phaseId;
    };


}
