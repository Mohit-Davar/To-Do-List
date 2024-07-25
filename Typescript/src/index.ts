const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector("#new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

interface Task {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}
const tasks: Task[] = loadTasks()
tasks.forEach(addListTask)

form?.addEventListener("submit", e => {
  e.preventDefault()
  if (input?.value == "" || input?.value == null) return
  const newTask: Task = {
    id: String(Math.floor(Math.random() * 10)),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask)
  addListTask(newTask)
  saveTasks(tasks)
  input.value = ""
})

function addListTask(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement('input')
  checkbox.type = "checkbox"
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks(tasks)
  })
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}
function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}