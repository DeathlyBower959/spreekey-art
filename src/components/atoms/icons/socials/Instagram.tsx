interface IProps {
  color?: Color;
}

function Instagram({ color }: IProps) {
  return (
    <svg viewBox='0 0 220 220' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M148 12H74c-34.242 0-62 27.758-62 62v74c0 34.242 27.758 62 62 62h74c34.242 0 62-27.758 62-62V74c0-34.242-27.758-62-62-62Z'
        stroke='url(#a)'
        strokeWidth={23}
      />
      <circle cx={111} cy={111} r={45.5} stroke='url(#b)' strokeWidth={19} />
      <circle
        cx={168.5}
        cy={53.5}
        r={12.5}
        fill='url(#c)'
        id='instagram-circle'
      />
      <defs>
        <linearGradient
          id='a'
          x1={111}
          y1={12}
          x2={111}
          y2={210}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={color || '#6A31AD'} />
          <stop offset={0.516} stopColor={color || '#C42867'} />
          <stop offset={1} stopColor={color || '#E19739'} />
        </linearGradient>
        <linearGradient
          id='b'
          x1={111}
          y1={56}
          x2={111}
          y2={166}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={color || '#9E208C'} />
          <stop offset={1} stopColor={color || '#C45947'} />
        </linearGradient>
        <linearGradient
          id='c'
          x1={168.5}
          y1={41}
          x2={168.5}
          y2={66}
          gradientUnits='userSpaceOnUse'
        >
          <stop />
          <stop offset={0} stopColor={color || '#991AA7'} />
          <stop offset={1} stopColor={color || '#AF1B8B'} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Instagram;
