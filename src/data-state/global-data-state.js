import { getCurrentUser } from "../storage-helpers";

export const boards = ["todo", "in__progress", "completed"];
export const colorClasses = ["color-1", "color-2", "color-3", "color-4"];
export let currentUser = getCurrentUser();
