import { useContext } from "react";
import { StoreContext } from "../stores/store";

export function useStore(_projects?: Project[] | undefined) {
    return useContext(StoreContext);
}