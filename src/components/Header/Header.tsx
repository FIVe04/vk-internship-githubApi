import styles from './Header.module.css'
import githibLogo from '../../assets/github-logo.svg'

const Header = () => {
  return (
    <header className={styles.header}>
        <h1 className={styles.title}>Gihub Python Repositories</h1>
        <a className={styles.logoOuter} target='_blank' href='https://github.com/FIVe04/vk-internship-githubApi/'>
            <h2 className={styles.logoTitle}>@five04</h2>
            <img src={githibLogo} alt="Github Logo" className={styles.logo} />
        </a>
    </header>
  )
}

export default Header