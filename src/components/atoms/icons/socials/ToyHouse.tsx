interface IProps {
  house?: Color | 'currentColor';
  text?: Color;
}

function ToyHouse({ house = 'currentColor', text = 'white' }: IProps) {
  return (
    <svg
      viewBox='0 0 148 144'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      color='#999'
    >
      <path
        d='M24 143.5v-69H0l74-74L97.5 24V11.5h22v35l28 28h-23v69H24Z'
        fill={house}
      />
      <path
        d='M44 95v-7h44v19h17.5V88h9.5v48h-9.5v-22H88v22h-9.5V95h-11v41H57V95H44Z'
        fill={text}
        id='toyhouse-text'
      />
    </svg>
  );
}

export default ToyHouse;
