interface IProps {
  color?: Color | 'currentColor';
}

function Watermark({ color = 'currentColor' }: IProps) {
  return (
    <svg
      viewBox='30.829 172.788 424.185 165.19'
      width={424.185}
      height={165.19}
      color='#e2e2e2'
    >
      <defs>
        <style data-bx-fonts='Average'>
          {
            '@import url(https://fonts.googleapis.com/css2?family=Noto+Serif%3Aital%2Cwght%400%2C400&display=swap);'
          }
        </style>
      </defs>
      <path
        fill='none'
        strokeWidth='4'
        strokeLinecap='round'
        stroke={color}
        d='m51.903 294.884-.343 28.446 366.032-.685v-16.108'
      />
      <path
        fill='none'
        strokeWidth='4'
        strokeLinecap='round'
        stroke={color}
        d='m51.72 218.633 218.654-.685v-16.134'
        transform='rotate(180 161.047 210.224)'
      />
      <path
        fill='none'
        stroke={color}
        strokeWidth='4'
        strokeLinecap='round'
        d='m323.014 201.454 94.786.275-.032 20.982'
      />
      <path
        fill='none'
        stroke={color}
        strokeWidth='3'
        d='M258.489 322.8c.344-1.888-17.25-19.237-21.295-14.927-1.772 1.363-.591 6.827 14.597 14.762-7.921 5.411-15.176 12.308-14.101 14.803 2.332 1.263 17.512-5.42 20.799-14.638Z'
      />
      <path
        fill='none'
        strokeWidth='3'
        stroke={color}
        d='M228.394 323.17c.187-2.203-20.153-18.029-23.945-13.212-1.772 1.363.738 2.999 17.325 12.969-.065.729-16.016 11.548-16.478 14.959 1.63 1.016 16.951-6.503 23.098-14.716Z'
      />
      <path
        fill='none'
        strokeLinecap='round'
        stroke={color}
        strokeWidth='5'
        d='m122.008 190.278-20.681 12.201 14.476 9.307M145.714 192.86l-16.636 9.464 12.989 6.689'
      />
      <text
        fill={color}
        fontFamily='Average'
        fontSize='116'
        x={30.829}
        y={283.458}
      >
        {'spreekey'}
      </text>
    </svg>
  );
}

export default Watermark;
