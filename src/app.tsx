import './global.css'

import { useMemo, useState } from 'react'

import styles from './app.module.css'
import ClipboardPNG from './assets/clipboard.png'
import PlusPNG from './assets/plus.png'
import { Header } from './components/header'
import { Task } from './components/task'

export type Task = {
  id: string
  description: string
  checked: boolean
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [description, setDescription] = useState('')

  const createdTasksSize = useMemo(() => tasks.length, [tasks])
  const doneTasksSize = useMemo(
    () => tasks.filter((item) => item.checked).length,
    [tasks],
  )

  function handleCreateTask() {
    if (description === '') {
      alert('Necesssário entrar com uma tarefa.')
      return
    }

    const id = crypto.randomUUID()
    const newTask: Task = {
      id,
      description,
      checked: false,
    }

    setTasks((state) => [...state, newTask])
    setDescription('')
  }

  return (
    <div>
      <Header />

      <div className={styles.wraper}>
        <div className={styles.header}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button onClick={handleCreateTask}>
            Criar
            <img src={PlusPNG} alt="Plus" />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.summary}>
            <div className={styles.created}>
              <span>Tarefas criadas</span>
              <span>{createdTasksSize}</span>
            </div>

            <div className={styles.done}>
              <span>Conluídas</span>
              <span>{`${doneTasksSize} de ${createdTasksSize}`}</span>
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className={styles.empty}>
              <img src={ClipboardPNG} alt="Clipboard" />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          ) : (
            <div className={styles.list}>
              {tasks.map((item) => {
                return (
                  <Task
                    key={item.id}
                    id={item.id}
                    description={item.description}
                    checked={item.checked}
                    tasks={tasks}
                    setTasks={setTasks}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
