export function Img({value}){
  return <img className="icon" src={`https://randomuser.me/api/portraits/thumb/men/${value}.jpg`} alt={'photo'}/>;
}

export function Email({ value }) {
  return <a href={'mailto:' + value}>{value}</a>;
}

export function Phone({ value }) {
  return <a href={'tel:' + value}>{value}</a>
}

export function Site({ value }) {
  return <a href={'http://' + value}>{value}</a>;
}