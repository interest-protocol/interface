import { FC, SVGAttributes } from 'react';

const UnknownCoin: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 950 950" fill="none" {...props}>
    <g filter="url(#filter0_i_2_16)">
      <circle cx="475" cy="475" r="475" fill="url(#paint0_linear_2_16)" />
    </g>
    <path
      d="M427.426 700.364V696.392C427.867 654.249 432.28 620.711 440.665 595.778C449.049 570.846 460.964 550.657 476.409 535.212C491.854 519.767 510.388 505.535 532.011 492.517C545.029 484.574 556.723 475.196 567.094 464.385C577.464 453.353 585.628 440.666 591.585 426.324C597.763 411.982 600.852 396.096 600.852 378.665C600.852 357.042 595.777 338.287 585.628 322.401C575.478 306.514 561.909 294.268 544.919 285.663C527.929 277.058 509.064 272.756 488.324 272.756C470.231 272.756 452.8 276.507 436.031 284.008C419.262 291.51 405.251 303.315 393.999 319.422C382.746 335.529 376.237 356.6 374.472 382.636H291.068C292.833 345.127 302.542 313.023 320.193 286.325C338.065 259.627 361.564 239.218 390.689 225.097C420.035 210.975 452.58 203.915 488.324 203.915C527.157 203.915 560.916 211.637 589.599 227.082C618.504 242.527 640.789 263.709 656.455 290.628C672.341 317.546 680.284 348.216 680.284 382.636C680.284 406.907 676.533 428.861 669.031 448.499C661.75 468.136 651.159 485.677 637.259 501.122C623.579 516.567 607.03 530.247 587.614 542.162C568.197 554.297 552.642 567.095 540.947 580.554C529.253 593.793 520.759 609.569 515.463 627.882C510.168 646.196 507.299 669.032 506.858 696.392V700.364H427.426ZM469.79 896.295C453.462 896.295 439.451 890.448 427.757 878.754C416.063 867.06 410.216 853.049 410.216 836.722C410.216 820.394 416.063 806.383 427.757 794.689C439.451 782.995 453.462 777.148 469.79 777.148C486.117 777.148 500.128 782.995 511.822 794.689C523.517 806.383 529.364 820.394 529.364 836.722C529.364 847.533 526.606 857.462 521.09 866.509C515.794 875.555 508.623 882.836 499.577 888.352C490.751 893.648 480.822 896.295 469.79 896.295Z"
      fill="black"
    />
    <circle cx="675.5" cy="780.5" r="28.5" fill="black" />
    <circle cx="274.5" cy="780.5" r="28.5" fill="black" />
    <circle cx="675.5" cy="166.5" r="28.5" fill="black" />
    <circle cx="274.5" cy="166.5" r="28.5" fill="black" />
    <circle cx="797.5" cy="649.5" r="28.5" fill="black" />
    <circle cx="155.5" cy="649.5" r="28.5" fill="black" />
    <circle cx="797.5" cy="301.5" r="28.5" fill="black" />
    <circle cx="155.5" cy="301.5" r="28.5" fill="black" />
    <circle cx="843.5" cy="475.5" r="28.5" fill="black" />
    <circle cx="107.5" cy="475.5" r="28.5" fill="black" />
    <circle cx="475.5" cy="107.5" r="59.5" fill="black" />
    <defs>
      <filter
        id="filter0_i_2_16"
        x="0"
        y="0"
        width="950"
        height="950"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="44"
          operator="erode"
          in="SourceAlpha"
          result="effect1_innerShadow_2_16"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="46.5" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_16" />
      </filter>
      <linearGradient
        id="paint0_linear_2_16"
        x1="83.5"
        y1="313.5"
        x2="950"
        y2="596.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#AD8700" />
        <stop offset="0.275067" stopColor="#FFDA58" />
        <stop offset="0.48837" stopColor="white" />
        <stop offset="0.791123" stopColor="#FFDE6B" />
        <stop offset="1" stopColor="#997B0F" />
      </linearGradient>
    </defs>
  </svg>
);

export default UnknownCoin;
