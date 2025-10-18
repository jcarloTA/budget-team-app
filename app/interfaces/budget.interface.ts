import { TeamInterface } from "./team.interface";

export interface BudgetInterface {
	createdAt: string;
	updatedAt: string;
	id: number;
	allocatedAmount: string;
	startDate: string;
	endDate: string;
    team: TeamInterface
}
