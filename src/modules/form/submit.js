import dayjs from "dayjs"
import { scheduleNew } from "../../services/schedule-new.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const  selectedDate = document.getElementById("date")

const inputToday = dayjs().format("YYYY-MM-DD")


selectedDate.value = inputToday
selectedDate.min = inputToday


form.onsubmit = async (event) => {
  event.preventDefault()

  try {

    const name = clientName.value.trim()
    if(!name) {
      return alert("Por favor, insira o nome do cliente.")
    }

    const hourSelected = document.querySelector(".hour-selected")
    

    if(!hourSelected) {
      return alert("Por favor, selecione um horário.")
    }

    const [hour] = hourSelected.innerText.split(":")
   
    const when = dayjs(selectedDate.value).add(hour, "hour")

    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

    const createdSchedule = await scheduleNew({ id, name, when })
    if (createdSchedule) {
      const event = new CustomEvent("schedule:created", {
        detail: { date: selectedDate.value },
      })
      document.dispatchEvent(event)
      console.log(id, name, when)
    }

  } catch (error) {
    alert("Não foi possível enviar o formulário. Por favor, tente novamente mais tarde.")
  }
}