import './App.css'
import Banner from './components/Banner/Banner'
import { Panier } from './components/Panier/Panier'


const App = () => {
  return (
    <div>
      <Banner title="La maison Jungle" />
      <Panier>
        <button>Ajouter au panier</button>
      </Panier> 
    </div>
  )
}




export default App
