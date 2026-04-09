type Props = {
  onClick?: () => void;
  className?: string;
}

const NovedadesButton = ({ onClick, className }: Props) => {
  return (
    <button 
      className={`novedades-button ${className || ''}`} 
      onClick={onClick}
      aria-label="Novedades"
    >
      <div className="novedades-button__stars">
        <svg 
          width="11" 
          height="12" 
          viewBox="0 0 8 9" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.84955 7.41741L3.5 8L3.15045 7.41741C2.39909 6.16514 1.30621 5.1531 0 4.5C1.30621 3.8469 2.39909 2.83485 3.15045 1.58259L3.5 1L3.84955 1.58259C4.60091 2.83486 5.69379 3.8469 7 4.5C5.69379 5.1531 4.60091 6.16514 3.84955 7.41741Z" fill="white" stroke="white" strokeWidth="0.2"/>
          <path d="M6.64981 2.75032L6.5 3L6.35019 2.75032C6.02818 2.21363 5.5598 1.7799 5 1.5C5.5598 1.2201 6.02818 0.786366 6.35019 0.24968L6.5 0L6.64981 0.24968C6.97182 0.786366 7.4402 1.2201 8 1.5C7.4402 1.7799 6.97182 2.21363 6.64981 2.75032Z" fill="white" stroke="white" strokeWidth="0.2"/>
          <path d="M6.64981 8.75032L6.5 9L6.35019 8.75032C6.02818 8.21363 5.5598 7.7799 5 7.5C5.5598 7.2201 6.02818 6.78637 6.35019 6.24968L6.5 6L6.64981 6.24968C6.97182 6.78637 7.4402 7.2201 8 7.5C7.4402 7.7799 6.97182 8.21363 6.64981 8.75032Z" fill="white" stroke="white" strokeWidth="0.2"/>
        </svg>
      </div>
      <span className="novedades-button__text">Novedades</span>
    </button>
  )
}

export default NovedadesButton