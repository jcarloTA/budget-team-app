import { TeamInterface } from "./team.interface";

export interface BudgetInterface {
	createdAt: string;
	updatedAt: string;
	id: 2;
	allocatedAmount: string;
	startDate: string;
	endDate: string;
    team: TeamInterface
}
