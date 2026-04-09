type Props = {}

const Hero = (props: Props) => {
  return (
    <div className="hero">
      <div className="heroBackgroundContainer">
        <img src="banner.png" className="heroBackgroundImg"/>
      </div>
      <div className="heroTextContainer">
        <h1 className="heroTitle">Undefined Club</h1>
        <p className="heroParagraph">Define your undefined.</p>
        <div className="heroCTAContainer">
          <button className="heroCTA">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="heroCTAIcon">
              <path d="M18.7434 9.5567C18.9001 9.48759 19.033 9.37406 19.1257 9.23015C19.2185 9.08624 19.267 8.91829 19.2652 8.74709C19.2634 8.5759 19.2115 8.40898 19.1158 8.26702C19.0201 8.12506 18.8848 8.0143 18.7268 7.94845L11.2272 4.53245C10.9992 4.42845 10.7515 4.37463 10.5009 4.37463C10.2503 4.37463 10.0027 4.42845 9.77467 4.53245L2.27592 7.94495C2.12014 8.01317 1.98762 8.12531 1.89457 8.26766C1.80151 8.41 1.75195 8.57638 1.75195 8.74645C1.75195 8.91651 1.80151 9.08289 1.89457 9.22523C1.98762 9.36758 2.12014 9.47972 2.27592 9.54795L9.77467 12.9674C10.0027 13.0714 10.2503 13.1253 10.5009 13.1253C10.7515 13.1253 10.9992 13.0714 11.2272 12.9674L18.7434 9.5567Z" stroke="#333AA6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.25 8.75V14" stroke="#333AA6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.25 10.9375V14C5.25 14.6962 5.80312 15.3639 6.78769 15.8562C7.77226 16.3484 9.10761 16.625 10.5 16.625C11.8924 16.625 13.2277 16.3484 14.2123 15.8562C15.1969 15.3639 15.75 14.6962 15.75 14V10.9375" stroke="#333AA6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Aprende
          </button>
          <button className="heroSecondaryCTA">Nosotros</button>
        </div>
      </div>
    </div>
  )
}

export default Hero