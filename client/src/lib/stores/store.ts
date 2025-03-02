import { createContext } from "react";
import CounterStore from "./counterStore";
import YearStore from "./yearStore";
import { UiStore } from "./uiStore";

interface Store{
    counterStore: CounterStore
    yearStore: YearStore
    uiStore : UiStore
}

export const store: Store = {
    counterStore: new CounterStore(),
    yearStore: new YearStore(),
    uiStore: new UiStore()
}

export const StoreContext = createContext(store);