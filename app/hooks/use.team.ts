import { useState } from "react";
import { fetchTeams } from "../services/team.service";
import { Alert } from "react-native";
import { TeamInterface } from "../interfaces/team.interface";




export const useTeam = () => {

    const [teams, setTeams] = useState<TeamInterface[]>([]); // Estado para almacenar los equipos
    const [loadingTeams, setLoadingTeams] = useState<boolean>(false); // Estado de carga

    // Obtener todos los equipos
    const getTeams = async () => {
        setLoadingTeams(true);
        try {
            const response = await fetchTeams();
            console.log("teams:", response);
            setTeams(response);
        } catch (error) {
            Alert.alert("Error", "Error al obtener los equipos");
        } finally {
            setLoadingTeams(false);
        }
    };

    return {
        teams,
        loadingTeams,
        getTeams
    };
}