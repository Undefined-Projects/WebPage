type Props = {
  scale: number
}

const Logo = (props: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={100 * props.scale} height={100 * props.scale} viewBox="0 0 350 320" fill="none">
      <path d="M0 0V228.401H25.4394V20.4621H294.212V0H0Z" fill="#6A73FF" />

      <mask id="mask0_57_246" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="295" height="229">
        <path d="M0 0V228.401H25.4394V20.4621H294.212V0H0Z" fill="#6A73FF" />
      </mask>

      <g mask="url(#mask0_57_246)">
        <g filter="url(#filter0_f_57_246)">
          <path d="M-24.8892 -18.8031V238.909H0.0720825V1.70853H299.74V-18.8031H-24.8892Z" fill="#3A46FF" />
        </g>
      </g>

      <path d="M211.256 272.09H42.0288V291.999H234.484V258.264H331.817V80.1888H305.825V234.484H211.256V272.09Z" fill="#6A73FF" />

      <mask id="mask1_57_246" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="42" y="80" width="290" height="212">
        <path d="M211.256 272.09H42.0284V291.999H234.483V258.264H331.817V80.1888H305.824V234.484H211.256V272.09Z" fill="#6A73FF" />
      </mask>

      <g mask="url(#mask1_57_246)">
        <g filter="url(#filter1_f_57_246)">
          <path d="M235.596 291.999H29.3152L63.0501 315.226H255.505V281.491H352.838V103.416L330.717 77.9766V257.711H235.596V291.999Z" fill="#3A46FF" />
        </g>
      </g>

      <g filter="url(#filter2_i_57_246)">
        <ellipse cx="164.8" cy="139.916" rx="18.25" ry="18.25" fill="#00FFFD" />
      </g>

      <defs>
        <filter id="filter0_f_57_246" x="-35.7892" y="-29.7031" width="346.429" height="279.512" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="5.45" result="effect1_foregroundBlur_57_246" />
        </filter>

        <filter id="filter1_f_57_246" x="12.2152" y="60.8766" width="357.723" height="271.45" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="8.55" result="effect1_foregroundBlur_57_246" />
        </filter>

        <filter id="filter2_i_57_246" x="146.55" y="121.666" width="38.5" height="38.4999" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0107577 0 0 0 0 0.798922 0 0 0 0 0.792736 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_57_246" />
        </filter>
      </defs>
    </svg>
  );
}

export default Logo