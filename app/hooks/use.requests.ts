import { useState } from "react";
import { Alert } from "react-native";
import apiAxios from "../config/axios.config";
import { createRequest, fetchRequests, fetchRequestsByBudgetId } from "../services/request.service";
import { RequestInterface } from "../interfaces/request.interface";

// Interfaz para un presupuesto (ajusta según la estructura de tu API)

export const useRequest = () => {
    const [requests, setRequests] = useState<RequestInterface[]>([]); // Estado para almacenar los presupuestos
    const [requestsByBudget, setRequestsByBudget] = useState<RequestInterface[]>([]); // Estado para almacenar los presupuestos por equipo
    const [loadingRequest, setLoadingRequests] = useState<boolean>(false); // Estado de carga
    const [loadingCreateRequest, setLoadingCreateRequest] = useState<boolean>(false); // Estado de carga
    const [loadingRequestByBudget, setLoadingRequestByBudget] = useState<boolean>(false); // Estado de carga
    // Obtener todos los presupuestos
    const getRequests = async () => {
        setLoadingRequests(true);
        try {
            const response = await fetchRequests();
            console.log("requests:", response);
            setRequests(response);
        } catch (error) {
            Alert.alert("Error", "Error al obtener los requests");
        } finally {
            setLoadingRequests(false);
        }
    };

    const getRequestsByBudgetId = async (budgetId: number) => {
        setLoadingRequestByBudget(true);
        try {
            const response = await fetchRequestsByBudgetId(budgetId);
            console.log("requests by budget:", response);
            setRequestsByBudget(response);
        } catch (error) {
            Alert.alert("Error", "Error al obtener los requests por budget");
        } finally {
            setLoadingRequestByBudget(false);
        }
    }

    const createRequestPost = async (requestData: any) => {
     
        setLoadingCreateRequest(true);
        try {
            const response = await createRequest(requestData);
            console.log("create requests:", response);

            return response;
        } catch (error) {
            Alert.alert("Error", "Error al obtener los requests");
        } finally {
            setLoadingCreateRequest(false);
        }
    }

    return {
        requests,
        loadingRequest,
        loadingCreateRequest,
        getRequests,
        createRequestPost,
        requestsByBudget,
        loadingRequestByBudget,
        getRequestsByBudgetId
    };
};
