import PokemonCard from './PokemonCard'

function PokemonGrid({ items, selectedId, onSelectPokemon }) {
  if (items.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
        No Pokemon found matching your criteria.
      </div>
    )
  }

  return (
    <div className="pokemon-grid">
      {items.map((p) => (
        <PokemonCard 
          key={p.id}
          pokemon={p} 
          isSelected={p.id === selectedId} 
          onClick={() => onSelectPokemon(p.id)} 
        />
      ))}
    </div>
  )
}

export default PokemonGrid
