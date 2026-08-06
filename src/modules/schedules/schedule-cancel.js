import { apiConfig } from "../../services/api-config.js"

export async function scheduleCancel({ id }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Falha ao cancelar o agendamento")
    }

    alert("Agendamento cancelado com sucesso!")
    return true
  } catch (error) {
    console.error(error)
    alert("Não foi possível cancelar o agendamento. Tente novamente mais tarde.")
    return false
  }
}