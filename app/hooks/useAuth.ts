import { useState, useEffect } from 'react';
import { getDataToken, removeToken } from '../utils/storage'; // Métodos para manejar AsyncStorage

const useAuth = () => {

  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // // Verifica si hay un token guardado al cargar el componente
  // useEffect(() => {
  //   const checkAuthToken = async () => {
  //     const token = await getDataToken(); // Obtiene el token del almacenamiento
  //     if (token) {
  //       setIsAuthenticated(true);
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //   };

  //   checkAuthToken();
  // }, [router]);

  // // Función para cerrar sesión
  // const logout = async () => {
  //   await removeToken(); // Elimina el token
  //   setIsAuthenticated(false);
  //   router.replace('(auth)'); // Redirige al login después de hacer logout
  // };

  // return { isAuthenticated, logout };
};

export default useAuth;
