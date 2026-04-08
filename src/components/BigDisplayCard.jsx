import { useState, useEffect } from 'react'
import { apiFetch } from '../utils/pokemon'

function BigDisplayCard({ id }) {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true)
      try {
        const data = await apiFetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchPokemon()
  }, [id])

  if (loading) {
    return <div className="big-card">Loading...</div>
  }

  if (!pokemon) return null

  return (
    <div className="big-card">
      <img 
        className="big-card-img" 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} 
        alt={pokemon.name} 
      />
      <h2 className="big-card-name">{pokemon.name}</h2>
      <div className="big-card-types">
        {pokemon.types.map(t => (
          <span key={t.type.name} className={`type-tag type-${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </div>
      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-label">Height</div>
          <div className="stat-value">{pokemon.height / 10}m</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Weight</div>
          <div className="stat-value">{pokemon.weight / 10}kg</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Exp</div>
          <div className="stat-value">{pokemon.base_experience}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Ability</div>
          <div className="stat-value">{pokemon.abilities[0].ability.name}</div>
        </div>
      </div>
    </div>
  )
}

export default BigDisplayCard
