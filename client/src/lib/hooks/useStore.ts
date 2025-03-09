import { useContext } from "react";
import { StoreContext } from "../stores/store";

export function useStore(projects?: Project[] | undefined) {
    return useContext(StoreContext);
}