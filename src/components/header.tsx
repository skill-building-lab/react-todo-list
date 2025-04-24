import RocketPNG from '../assets/rocket.png'
import styles from './header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={RocketPNG} alt="rocket" />

      <div>
        <strong className={styles.first}>to</strong>
        <strong className={styles.second}>do</strong>
      </div>
    </header>
  )
}
