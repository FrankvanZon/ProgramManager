import { createContext } from "react";
import CounterStore from "./counterStore";
import YearStore from "./yearStore";
import { UiStore } from "./uiStore";
import MilestoneStore from "./milestoneStore";
import ProjectStore from "./projectStore";

interface Store{
    counterStore: CounterStore
    yearStore: YearStore
    uiStore : UiStore
    milestoneStore : MilestoneStore
    projectStore: ProjectStore
}

export const store: Store = {
    counterStore: new CounterStore(),
    yearStore: new YearStore(),
    uiStore: new UiStore(),
    milestoneStore: new MilestoneStore(),
    projectStore: new ProjectStore()
}

export const StoreContext = createContext(store);