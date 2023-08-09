interface Props {
    toggleBgColor: () => void
    toggleOrderByCountry: () => void
    handleReset: () => void
    setFilterCountry: (filter:string) => void
}

const ButtonBar = ({ toggleBgColor, toggleOrderByCountry, handleReset, setFilterCountry }: Props) => {
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
        <input
          placeholder="Filter by Country"
          type="text"
          style={{ padding:'0.5rem 0.25rem' }}
          onChange={e => setFilterCountry(e.target.value)}
        />
    </div>
  )
}

export default ButtonBar