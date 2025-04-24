import { Dispatch, SetStateAction, useState } from 'react'

import { Task as ITask } from '../app'
import { ButtonDelete } from './button-delete'
import styles from './task.module.css'

interface Props {
  id: string
  description: string
  checked: boolean
  tasks: ITask[]
  setTasks: Dispatch<SetStateAction<ITask[]>>
}

export function Task({ id, description, checked, tasks, setTasks }: Props) {
  const [isDone, setIDone] = useState(checked)

  function handleCheckTask(value: boolean) {
    const newTasks = tasks.map((item) =>
      item.id === id ? { ...item, checked: value } : item,
    )

    setTasks(newTasks)
    setIDone(!isDone)
  }

  function handleDeleteTask() {
    const filteredTasks = tasks.filter((item) => item.id !== id)
    setTasks(filteredTasks)
  }

  return (
    <div className={styles.task}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={isDone}
          onChange={(event) => handleCheckTask(event.target.checked)}
          className={styles.hiddenInput}
        />
        <span className={styles.customCheckbox}>
          {isDone && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
            >
              <path
                d="M8.43059 0.342093L4.09865 4.67403L1.61618 2.19156L0.780273 3.02747L4.09865 6.34584L9.26649 1.178L8.43059 0.342093Z"
                className={styles.iconChecked}
              />
            </svg>
          )}
        </span>
      </label>

      <p
        className={`${styles.description} ${isDone && styles.descriptionChecked}`}
      >
        {description}
      </p>

      <ButtonDelete onClick={handleDeleteTask} />
    </div>
  )
}
