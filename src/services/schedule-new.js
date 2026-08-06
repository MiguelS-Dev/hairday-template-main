import { apiConfig } from "./api-config.js"

export async function scheduleNew({ id, name, when }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, when }),
    })

    if (!response.ok) {
      throw new Error("Falha ao criar agendamento")
    }

    const createdSchedule = await response.json()
    alert("Agendamento realizado com sucesso!")
    return createdSchedule
  } catch (error) {
    console.error(error)
    alert("Não foi possível agendar o horário. Por favor, tente novamente mais tarde.")
    return null
  }
}