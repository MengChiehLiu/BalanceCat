// components/CardTemplate.js
import styles from "./CardTemplate.module.scss";

function CardTemplate({ children, backgroundStyle, style }) {
  return (
    <div className={styles.container} style={backgroundStyle}>
      <div className={styles.card} style={style}>
        {children}
      </div>
    </div>
  );
}

export default CardTemplate;
