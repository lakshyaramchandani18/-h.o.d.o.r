import { useState, useEffect, useCallback, useMemo } from 'react'
import BigDisplayCard from './components/BigDisplayCard'
import PokemonGrid from './components/PokemonGrid'
import { apiFetch, GEN_RANGES } from './utils/pokemon'

const PAGE_SIZE = 30;

function App() {
  const [allPokemon, setAllPokemon] = useState([])
  const [filtered, setFiltered] = useState([])
  const [selectedId, setSelectedId] = useState(1)
  const [selectedGen, setSelectedGen] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await apiFetch('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0')
        setAllPokemon(data.results.map((p, i) => ({
          id: i + 1,
          name: p.name,
          url: p.url
        })))
      } catch (e) {
        console.error(e)
      }
    }
    fetchList()
  }, [])

  const applyFilters = useCallback(async () => {
    const [genMin, genMax] = GEN_RANGES[selectedGen]
    let baseFiltered = allPokemon.filter(p => {
      const inGen = p.id >= genMin && p.id <= genMax;
      const matchQ = !searchQuery || p.name.includes(searchQuery.toLowerCase()) || String(p.id).includes(searchQuery);
      return inGen && matchQ;
    })

    if (typeFilter) {
      try {
        const data = await apiFetch(`https://pokeapi.co/api/v2/type/${typeFilter}`)
        const typeIds = new Set(data.pokemon.map(p => {
          const parts = p.pokemon.url.split('/').filter(Boolean)
          return parseInt(parts[parts.length - 1])
        }))
        baseFiltered = baseFiltered.filter(p => typeIds.has(p.id))
      } catch (e) {
        console.error(e)
      }
    }

    setFiltered(baseFiltered)
    setCurrentPage(1)
  }, [allPokemon, searchQuery, typeFilter, selectedGen])

  useEffect(() => {
    if (allPokemon.length > 0) {
      applyFilters()
    }
  }, [allPokemon, searchQuery, typeFilter, selectedGen, applyFilters])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, currentPage])

  const generations = [
    'ALL', 'GEN I', 'GEN II', 'GEN III', 'GEN IV', 'GEN V', 'GEN VI', 'GEN VII', 'GEN VIII', 'GEN IX'
  ]

  const types = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 
    'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ]

  return (
    <>
      <header>
        <h1 className="title">Pokédex</h1>
        <div className="controls">
          <input 
            type="text" 
            placeholder="Search Pokemon..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All Types</option>
            {types.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>
      </header>

      <div className="tabs">
        {generations.map((gen, idx) => (
          <button 
            key={gen} 
            className={`tab ${selectedGen === idx ? 'active' : ''}`}
            onClick={() => setSelectedGen(idx)}
          >
            {gen}
          </button>
        ))}
      </div>

      <main className="main-layout">
        <BigDisplayCard id={selectedId} />
        
        <div>
          <PokemonGrid 
            items={currentItems} 
            selectedId={selectedId} 
            onSelectPokemon={setSelectedId} 
          />

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="page-btn" 
                disabled={currentPage <= 1}
                onClick={() => {
                  setCurrentPage(p => p - 1)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                Prev
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button 
                className="page-btn" 
                disabled={currentPage >= totalPages}
                onClick={() => {
                  setCurrentPage(p => p + 1)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default App
