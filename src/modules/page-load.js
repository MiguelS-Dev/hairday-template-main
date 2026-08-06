import { schedulesDay } from "./schedules/load.js"

const selectDate = document.getElementById("date")

document.addEventListener("DOMContentLoaded", function () {
  schedulesDay()
  if (selectDate) {
    selectDate.addEventListener("change", schedulesDay)
  }

  document.addEventListener("schedule:created", () => {
    schedulesDay()
  })

  document.addEventListener("schedule:deleted", () => {
    schedulesDay()
  })
})

