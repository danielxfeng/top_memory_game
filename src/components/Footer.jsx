import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.item}>
      <span>&copy; 2024</span>
      <a
        className="a a-no-change a-underline"
        href="https://github.com/danielxfeng/top_memory_game"
        target="_blank"
        rel="noopener noreferrer"
      >
        Fancy Memory Game
      </a>
    </p>
    <p className={styles.item}>
      Made by ❤️<em>Daniel</em>❤️
    </p>
  </footer>
);

export default Footer;
