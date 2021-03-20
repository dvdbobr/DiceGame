import React, { Component } from 'react'
import GameScoreInput from './GameScoreInput'
import Player from './Player'

const initialState = {
    pointsToWin: 50,
    dice: [1, 1],
    playerTurn: 1,
    playerScore1: 0,
    playerScore2: 0,
    diceScore1: 0,
    diceScore2: 0,
    player1Name: "PLAYER 1",
    player2Name: "PLAYER 2",
    hasWon: false,
    disabled: false,
    inputPh: "input score to win"
}
export default class GameBoard extends Component {

    state = {
        ...initialState,
        winAmount1: 0,
        winAmount2: 0
    }
    newGame = () => {
        this.setState({ ...initialState })
    }
    roll = () => {
        let rand1 = Math.floor(Math.random() * 6 + 1)
        let rand2 = Math.floor(Math.random() * 6 + 1)
        let diceTotal = rand1 + rand2;

        this.setState({ dice: [rand1, rand2] })
        if (this.state.dice[0] + this.state.dice[1] !== 12 && this.state.playerTurn === 1)
            this.setState(prevState => ({ diceScore1: prevState.diceScore1 + diceTotal }))

        else if (this.state.dice[0] + this.state.dice[1] !== 12 && this.state.playerTurn === 2)
            this.setState(prevState => ({ diceScore2: prevState.diceScore2 + diceTotal }))

        else if (this.state.dice[0] + this.state.dice[1] === 12 && this.state.playerTurn === 1) {
            this.setState({
                dice: [1, 1],
                playerTurn: 2,
                diceScore1: 0,
                hasRolled: false
            })
        }
        else if (this.state.dice[0] + this.state.dice[1] === 12 && this.state.playerTurn === 2) {
            this.setState({
                dice: [1, 1],
                playerTurn: 1,
                diceScore2: 0,
                hasRolled: false
            })
        }
    }

    componentDidUpdate() {
        if (this.state.playerScore1 >= this.state.pointsToWin && this.state.hasWon === false) {
            this.setState({
                hasWon: true,
                player1Name: "Player 1 Wins",
                disabled: true,
            })
            this.setState(prevState => ({ winAmount1: prevState.winAmount1 + 1 }))
        }
        else if (this.state.playerScore2 >= this.state.pointsToWin && this.state.hasWon === false) {
            this.setState({
                hasWon: true,
                player1Name: "Player 2 Wins",
                disabled: true,
            })
            this.setState(prevState => ({ winAmount2: prevState.winAmount2 + 1 }))
        }
    }
    hold = () => {
        if (this.state.playerTurn === 1) {
            this.setState(prevState => ({ playerScore1: prevState.playerScore1 + this.state.diceScore1 }))
            this.setState({ diceScore1: 0 })
            this.setState({ playerTurn: 2 })

        }
        else {
            this.setState(prevState => ({ playerScore2: prevState.playerScore2 + this.state.diceScore2 }))
            this.setState({ diceScore2: 0 })
            this.setState({ playerTurn: 1 })
        }
    }

    gameScoreToWinHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <div className="gameboard">
                <div className="switchPlayer">
                    <Player
                        playerName={this.state.player1Name}
                        playerScore={this.state.playerScore1}
                        diceScore={this.state.diceScore1}
                        playerTurn={this.state.playerTurn}
                        playerNumber={1}
                        winAmount={this.state.winAmount1}
                    />
                </div>

                <div className="switchPlayer">
                    <Player
                        playerName={this.state.player2Name}
                        playerScore={this.state.playerScore2}
                        diceScore={this.state.diceScore2}
                        playerTurn={this.state.playerTurn}
                        playerNumber={2}
                        winAmount={this.state.winAmount2}
                    />
                </div>
                <GameScoreInput
                    pointsToWin={this.state.pointsToWin}
                    inputsHandler={this.gameScoreToWinHandler}
                    disabled={this.state.disabled}
                    inputPh={this.state.inputPh}
                />
                <div className="diceCotainer">
                    <img src={`/Images/dice-${this.state.dice[0]}.png`} alt="" />
                    <img src={`/Images/dice-${this.state.dice[1]}.png`} alt="" />
                </div>
                <button className="newGame" onClick={this.newGame}>NEW GAME</button>
                <button disabled={this.state.disabled} className="roll" onClick={this.roll}>ROLL</button>
                <button disabled={this.state.disabled} className="hold" onClick={this.hold}>HOLD</button>
            </div>
        )
    }
}
