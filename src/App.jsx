import React from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import SingleDice from "./components/SingleDice"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [game, setGame] = React.useState(false)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setGame(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!game) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setGame(false)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <SingleDice 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {game && <Confetti />}
            <h1>Simple React game</h1>
            <p>Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>

            <div className="dice-container">
                {diceElements}
            </div>

            <button 
                className="roll-dice" 
                onClick={rollDice}>
                {game ? "New Game" : "Roll"}
            </button>
        </main>
    )
}