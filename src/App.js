import { useState, useEffect } from 'react'
import './App.css';
import SingleCard from './components/SingleCard'

  const cardImages = [
    {"src" : "/img/helmet-1.png",matched:false},
    {"src" : "/img/potion-1.png",matched:false},
    {"src" : "/img/ring-1.png",matched:false},
    {"src" : "/img/scroll-1.png",matched:false},
    {"src" : "/img/shield-1.png",matched:false},
    {"src" : "/img/sword-1.png",matched:false}
  ]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] =  useState(false)
  const [gameOverText, setGameOverText] = useState('')
 
 
  // handle Choice
const handleChoice = (card) => {
 choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

  // Reset Choices & increase Turn
  const resetTurn = () => {
    setDisabled(false)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
  }



//   shuffle cards
const shuffleCards = () => {
  const shuffledCards = [...cardImages, ...cardImages]
  .sort(() => Math.random() - 0.5)
  .map((card) => ({...card, id:Math.random() * 10}));
  
  setCards(shuffledCards)
  setTurns(0)
  setChoiceOne(null)
  setChoiceTwo(null)
  setGameOverText('')
}

useEffect(() => {
  if (choiceOne && choiceTwo){
      setDisabled(true)
    if (choiceOne.src === choiceTwo.src){
       setCards( prevCards => {
         return prevCards.map((card) => {
             if(card.src === choiceOne.src){
              return {...card, matched:true}
             } else{
               return card
             }
         })
       })
     resetTurn()
    } else {
     setTimeout(() => resetTurn(),1000)
    }
  }
  if(turns == 9){
      gameOver()
  }
},[choiceOne,choiceTwo])

// Game over
  const gameOver = () => {
    setGameOverText('Game Over')
    setTimeout(() => {
      shuffleCards()
    },3000)
  }

  // Start Game automatically
  useEffect(() => {
    shuffleCards()
  }, []) 
  
  
  return (
    <div className="App">
      <h2>Magic memory</h2>
      <p>{gameOverText}</p>
      <button onClick={() => {shuffleCards()}}>New Game</button>

      <div className='card-grid'>
      {cards.map(card => (
                <SingleCard card={card}
                   handleChoice={handleChoice} 
                   key={card.id}
                   disabled={disabled}
                   flipped={card === choiceOne || card === choiceTwo || card.matched}
                   />
                   ))}
      </div>
      <p className='turns'>Turns Remaining: {9 - turns}</p>

    </div>
  );
}

export default App;
