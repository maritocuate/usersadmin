interface Props {
    toggleBgColor: () => void
}

const ButtonBar = ({ toggleBgColor }: Props) => {
  return (
    <div style={{ marginBottom:'2rem' }}>
        <button
            onClick={toggleBgColor}
        >Color Rows</button>
    </div>
  )
}

export default ButtonBar