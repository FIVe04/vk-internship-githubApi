import styles from './Header.module.css'
import githibLogo from '../../assets/github-logo.svg'

const Header = () => {
  return (
    <header className={styles.header}>
        <h1 className={styles.title}>Gihub Python Repositories</h1>
        <div className={styles.logoOuter}>
            <h2 className={styles.logoTitle}>@five04</h2>
            <img src={githibLogo} alt="Github Logo" className={styles.logo} />
        </div>
    </header>
  )
}

export default Header