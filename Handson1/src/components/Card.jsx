
import styles from "./Card.module.css";
/**
* Card component with image, title, description, optional click
handler,
* children for extra content, style overrides, and accessibility
features.
*/
const Card = ({
  imageSrc,
  title,
  description,
  onClick,
  children,
  styleOverrides,
}) => {
  const handleKeyDown = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <div
      className={styles.card}
      style={styleOverrides}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <img src={imageSrc} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {children}
      </div>
    </div>
  );
};

export default Card;
