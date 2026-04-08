function PokemonCard({ pokemon, isSelected, onClick }) {
  return (
    <div 
      className={`pokemon-card ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
    >
      <img 
        className="card-img" 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
        alt={pokemon.name}
        loading="lazy"
        onError={(e) => { e.target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png' }}
      />
      <div className="card-name">{pokemon.name}</div>
    </div>
  )
}

export default PokemonCard
