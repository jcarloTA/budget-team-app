import { useState } from "react";
import { Alert } from "react-native";
import apiAxios from "../config/axios.config";
import { fetchBudgets, fetchBudgetsByTeamId } from "../services/budget.service";
import { BudgetInterface } from "../interfaces/budget.interface";

// Interfaz para un presupuesto (ajusta según la estructura de tu API)

export const useBudget = () => {
	const [budgets, setBudgets] = useState<BudgetInterface[]>([]); // Estado para almacenar los presupuestos
	const [loadingBudget, setLoadingBudget] = useState<boolean>(false); // Estado de carga
	const [budgetsByTeam, setBudgetByTeam] = useState<BudgetInterface[]>([]); // Estado para almacenar los presupuestos por equipo
	const [loadingBudgetByTeam, setLoadingBudgetByTeam] = useState<boolean>(false); // Estado de carga
	// Obtener todos los presupuestos
	const getBudgets = async () => {
		setLoadingBudget(true);
		try {
			const response = await fetchBudgets();
			setBudgets(response);
		} catch (error) {
			Alert.alert("Error", "Error al obtener los presupuestos");
		} finally {
			setLoadingBudget(false);
		}
	};

	const getBudgetsByTeamId = async (teamId: number) => {
		setLoadingBudgetByTeam(true);
		try {
			const response = await fetchBudgetsByTeamId(teamId);
			("Budgets by team:", response);
			setBudgetByTeam(response);
		} catch (error) {
			Alert.alert("Error", "Error al obtener los presupuestos por equipo");
		} finally {
			setLoadingBudgetByTeam(false);
		}
	}

	return {
		budgets,
		loadingBudget,
		getBudgets,
		budgetsByTeam,
		getBudgetsByTeamId,
		loadingBudgetByTeam,
	};
};
