import { scheduleCancel } from "./schedule-cancel.js"

document.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("cancel-icon")) return

  const item = event.target.closest("li")
  if (!item) return

  const { id } = item.dataset
  if (!id) return

  const isConfirm = confirm("Tem certeza que deseja cancelar este agendamento?")
  if (!isConfirm) return

  const deleted = await scheduleCancel({ id })
  if (deleted) {
    console.log("Agendamento cancelado com sucesso!")
    document.dispatchEvent(new CustomEvent("schedule:deleted"))
  }
})