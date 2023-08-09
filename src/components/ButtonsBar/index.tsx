interface Props {
    toggleBgColor: () => void
    toggleOrderByCountry: () => void
    handleReset: () => void
}

const ButtonBar = ({ toggleBgColor, toggleOrderByCountry, handleReset }: Props) => {
  return (
    <div style={{ marginBottom:'2rem' }}>
        <button
            onClick={toggleBgColor}
        >Color Rows</button>
        <button
            onClick={toggleOrderByCountry}
        >Order By Country</button>
        <button
            onClick={handleReset}
        >Reset Users</button>
    </div>
  )
}

export default ButtonBar