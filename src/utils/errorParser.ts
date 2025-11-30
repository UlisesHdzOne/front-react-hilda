import { ApiErrorResponse, AxiosErrorResponse } from "../types";
// aqui no se usa el ApiError checa si esta bien asi o hay que crear la inteface en el types
/**
 * Normaliza cualquier error de la API a un mensaje legible para el usuario
 */
export function parseApiError(error: unknown): string {
  // Caso 1: Error de Axios con respuesta del backend
  const axiosError = error as AxiosErrorResponse;

  if (axiosError?.response?.data) {
    const apiError = axiosError.response.data;
    const errorData = apiError.error;

    // Caso 1A: error es un string
    if (typeof errorData === "string") {
      return errorData;
    }

    // Caso 1B: error es un objeto ApiErrorResponse
    if (typeof errorData === "object" && errorData !== null) {
      const errorResponse = errorData as ApiErrorResponse;

      // Prioridad 1: detalles de validación específicos
      if (
        Array.isArray(errorResponse.details) &&
        errorResponse.details.length > 0
      ) {
        return errorResponse.details[0].message;
      }

      // Prioridad 2: mensaje general
      if (errorResponse.message) {
        return errorResponse.message;
      }

      // Prioridad 3: error field
      if (errorResponse.error) {
        return errorResponse.error;
      }

      // Prioridad 4: status code con mensaje genérico
      if (errorResponse.statusCode) {
        return getHttpErrorMessage(errorResponse.statusCode);
      }
    }
  }

  // Caso 2: Error de red o timeout
  if (
    axiosError?.code === "NETWORK_ERROR" ||
    axiosError?.code === "ECONNABORTED"
  ) {
    return "Error de conexión. Verifica tu internet e intenta nuevamente.";
  }

  // Caso 3: Error genérico
  if (error instanceof Error) {
    return error.message;
  }

  // Caso 4: Error desconocido
  return "Ha ocurrido un error inesperado. Por favor, intenta nuevamente.";
}

/**
 * Devuelve mensajes amigables para códigos HTTP comunes
 */
function getHttpErrorMessage(statusCode: number): string {
  const messages: Record<number, string> = {
    400: "Solicitud incorrecta",
    401: "No autorizado. Por favor, inicia sesión nuevamente.",
    403: "No tienes permisos para realizar esta acción",
    404: "Recurso no encontrado",
    409: "El recurso ya existe",
    422: "Datos de entrada inválidos",
    429: "Demasiadas solicitudes. Por favor, espera un momento.",
    500: "Error interno del servidor",
    502: "Servicio no disponible temporalmente",
    503: "Servicio en mantenimiento",
  };

  return messages[statusCode] || `Error del servidor (${statusCode})`;
}

/**
 * Hook para manejar errores de forma consistente en componentes
 */
export function useErrorHandler() {
  const handleError = (error: unknown, customMessage?: string): string => {
    console.error("API Error:", error);

    const parsedMessage = parseApiError(error);
    return customMessage ? `${customMessage}: ${parsedMessage}` : parsedMessage;
  };

  return { handleError, parseApiError };
}
