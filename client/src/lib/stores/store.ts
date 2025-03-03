import { createContext } from "react";
import CounterStore from "./counterStore";
import YearStore from "./yearStore";
import { UiStore } from "./uiStore";
import MilestoeStore from "./milestoneStore";
import ProjectStore from "./projectStore";

interface Store{
    counterStore: CounterStore
    yearStore: YearStore
    uiStore : UiStore
    milestoneStore : MilestoeStore
    projectStore: ProjectStore
}

export const store: Store = {
    counterStore: new CounterStore(),
    yearStore: new YearStore(),
    uiStore: new UiStore(),
    milestoneStore: new MilestoeStore(),
    projectStore: new ProjectStore()
}

export const StoreContext = createContext(store);