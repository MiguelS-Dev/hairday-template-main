import dayjs from "dayjs"
import { openingHours } from "../../utils/opening-hours.js"

let selectedHourLi = null

export function hoursLoad({ date, dailySchedules = [] }) {
  const hoursList = document.getElementById("hours")
  if (!hoursList) return

  selectedHourLi = null
  hoursList.innerHTML = ""
  attachHoursClickHandler(hoursList)

  const bookedHours = new Set(
    dailySchedules.map((schedule) => dayjs(schedule.when).format("H:mm"))
  )

  const opening = openingHours.map((hour) => {
    const [scheduleHour] = hour.split(":")

    const scheduleDateTime = dayjs(date)
      .set("hour", Number(scheduleHour))
      .set("minute", 0)
      .set("second", 0)
      .set("millisecond", 0)

    const isHourPast = scheduleDateTime.isBefore(dayjs())
    const isHourBooked = bookedHours.has(hour)

    return { hour, available: !isHourPast && !isHourBooked, booked: isHourBooked }
  })

  opening.forEach(({ hour, available, booked }) => {
    const normalizedHour = hour.length === 4 ? `0${hour}` : hour

    if (normalizedHour === "09:00") {
      hourHeaderAdd("Manhã", hoursList)
    } else if (normalizedHour === "12:00") {
      hourHeaderAdd("Tarde", hoursList)
    } else if (normalizedHour === "18:00") {
      hourHeaderAdd("Noite", hoursList)
    }

    const li = document.createElement("li")
    li.classList.add("hour")
    li.classList.add(available ? "hour-available" : "hour-unavailable")
    if (booked) {
      li.classList.add("hour-booked")
      li.setAttribute("title", "Horário já agendado")
    }
    li.textContent = hour
    li.dataset.hour = hour

    hoursList.append(li)
  })
}

function hourHeaderAdd(title, container) {
  const header = document.createElement("li")
  header.classList.add("hour-period")
  header.textContent = title

  container.append(header)
}

function attachHoursClickHandler(hoursList) {
  if (hoursList.dataset.clickHandlerAttached) return

  hoursList.addEventListener("click", (event) => {
    const hourLi = event.target.closest("li.hour")
    if (!hourLi || hourLi.classList.contains("hour-unavailable")) return

    if (selectedHourLi) {
      selectedHourLi.classList.remove("hour-selected")
    }

    hourLi.classList.add("hour-selected")
    selectedHourLi = hourLi
  })

  hoursList.dataset.clickHandlerAttached = "true"
}