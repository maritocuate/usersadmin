interface Props {
    toggleBgColor: () => void
    toggleOrderByCountry: () => void
}

const ButtonBar = ({ toggleBgColor, toggleOrderByCountry }: Props) => {
  return (
    <div style={{ marginBottom:'2rem' }}>
        <button
            onClick={toggleBgColor}
        >Color Rows</button>
        <button
            onClick={toggleOrderByCountry}
        >Order By Country</button>
    </div>
  )
}

export default ButtonBar