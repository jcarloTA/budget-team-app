import { BudgetInterface } from "./budget.interface";


export interface RequestInterface {
    createdAt: string;
    updatedAt: string;
    id: number;
    requestedAmount: number,
    description: string,
    reason: string,
    requestDate: string,
    status: string,
    budget: BudgetInterface
}

export interface RequestCreateInterface {
    requestedAmount: number,
    description: string,
    reason: string,
    budgetId: number
}