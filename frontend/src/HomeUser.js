import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactSpeedometer from "react-d3-speedometer";
import { useParams } from "react-router-dom";

const HomeUser = () => {
  const [cantidadgas, setTemperature] = useState(0); // Estado para almacenar el valor de temperatura
  const { userHome } = useParams(); // Obtener el parámetro 'userHome' de la URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar la solicitud HTTP a la API con el 'id' correspondiente al home del usuario (userHome)
        const response = await axios.get(
          `http://localhost:1880/gaspornodo?id=1`
        );

        console.log("Respuesta de la API:", response.data);

        // Verificar si la respuesta contiene al menos un elemento en el array
        if (response.data && response.data.length > 0) {
          // Acceder al primer elemento del array para obtener el objeto con la información
          const firstElement = response.data[0];

          // Verificar si 'temperatura' está presente en el objeto obtenido
          if (firstElement && firstElement.cantidadgas !== undefined) {
            // Actualizar el estado con el valor de 'temperatura' del primer elemento
            setTemperature(firstElement.cantidadgas);
          } else {
            console.error(
              "La propiedad 'temperatura' no está presente en el objeto obtenido."
            );
          }
        } else {
          console.error("La respuesta no contiene elementos válidos.");
        }
      } catch (error) {
        console.error("Error al obtener el valor:", error);
      }
    };

    // Llamar a fetchData al montar el componente
    fetchData();

    // Configurar un intervalo para realizar actualizaciones periódicas
   const intervalId = setInterval(fetchData, 2000); // Realizar la solicitud cada 5 segundos (5000 milisegundos)

    // Retornar una función de limpieza para detener el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [userHome]); // Ejecutar useEffect cada vez que 'userHome' cambie

  return (
    <div>
      <h2>Bienvenido, Usuario</h2>
      <div style={{ width: "300px", height: "200px" }}>
        <ReactSpeedometer
          maxValue={4000}
          value={cantidadgas}
          needleColor="blue"
          startColor="green"
          segments={4}
          endColor="red"
        />
      </div>
    </div>
  );
};

export default HomeUser;
