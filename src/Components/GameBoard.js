import React, { Component } from 'react'
import GameScoreInput from './GameScoreInput'
import Player from './Player'
// import dice1 from '../Images/dice-1.png'
export default class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pointsToWin: 20,
            dice: [1, 1],
            playerTurn: 1,
            playerScore1: 0,
            playerScore2: 0,
            hasWon: false,
            mode: ["on", "off"],
            diceScore1: 0,
            diceScore2: 0,
            player1Name: "PLAYER 1",
            player2Name: "PLAYER 2",
            disabled: false,
            playerNumber: 1,
            players: [
                {
                    name: "PLAYER 1",
                    currentScore: 0,
                    diceScore: 0
                },
                {
                    name: "PLAYER 2",
                    currentScore: 0,
                    diceScore: 0
                }
            ]
        }
    }

    newGame = () => {
        this.setState({
            pointsToWin: this.state.pointsToWin,
            dice: [1, 1],
            playerTurn: 1,
            playerScore1: 0,
            playerScore2: 0,
            hasWon: false,
            mode: ["on", "off"],
            diceScore1: 0,
            diceScore2: 0,
            player1Name: "PLAYER 1",
            player2Name: "PLAYER 2",
            disabled: false,
        })
    }
    roll = () => {
        let rand1 = Math.floor(Math.random() * 6 + 1)
        let rand2 = Math.floor(Math.random() * 6 + 1)
        let diceTotal = rand1 + rand2;
        // if (this.state.dice[0] === this.state.dice[1]) {
        //     this.setState({ diceScore1: 0 })
        //     console.log("stop");
        // }
        this.setState({ dice: [rand1, rand2] }, () => console.log(this.state.dice))
        console.log(this.state.playerScore + `${1}`);
        if (this.state.dice[0] + this.state.dice[1] !== 12 && this.state.playerTurn === 1) {
            console.log(this.state.dice)
            this.setState(prevState => ({ diceScore1: prevState.diceScore1 + diceTotal }))
        }
        else if (this.state.dice[0] + this.state.dice[1] !== 12 && this.state.playerTurn === 2) {
            console.log(this.state.dice)
            this.setState(prevState => ({ diceScore2: prevState.diceScore2 + diceTotal }))
        }

        else if (this.state.dice[0] + this.state.dice[1] === 12 && this.state.playerTurn === 1) {
            this.setState({ dice: [1, 1] })
            this.setState({ playerTurn: 2, playerNumber: 2 })
            this.setState({ diceScore1: 0 })
            this.setState({ hasRolled: false })
        }
        else if (this.state.dice[0] + this.state.dice[1] === 12 && this.state.playerTurn === 2) {
            this.setState({ dice: [1, 1] })
            this.setState({ playerTurn: 1, playerNumber: 1 })
            this.setState({ diceScore2: 0 })
            this.setState({ hasRolled: false })
        }
    }
    ChangePlayer = () => {
        let turn = this.state.playerTurn;
        turn = turn === 1 ? 2 : 1;
        this.setState({
            playerTurn: turn,
            playerNumber: turn
        });
    };
    componentDidUpdate() {
        if (this.state.playerScore1 >= this.state.pointsToWin && this.state.hasWon === false) {
            this.setState({ hasWon: true })
            this.setState({ player1Name: "Player 1 Wins" })
            this.setState({ disabled: true })
        }
        else if (this.state.playerScore2 >= this.state.pointsToWin && this.state.hasWon === false) {
            this.setState({ hasWon: true })
            this.setState({ player2Name: "Player 2 Wins" })
            this.setState({ disabled: true })
        }
        // if (this.state.dice[0] === this.state.dice[1] && this.state.playerTurn === 1) {
        //     this.setState({ dice: [1, 2] })
        //     this.setState({ playerTurn: 2 })
        //     this.setState({ diceScore1: 0 })
        //     console.log("stop player 1");
        // }
        // else if (this.state.dice[0] === this.state.dice[1] && this.state.playerTurn === 2) {
        //     this.setState({ dice: [1, 2] })
        //     this.setState({ playerTurn: 1 })
        //     this.setState({ diceScore2: 0 })
        //     console.log("stop player 2");
        // }
        // else (
        //     console.log("continue")
        // )


        // else{
        //     this.state.players.map(p => {
        //         this.setState({p.diceScore : this.state.dice[0] + this.state.dice[1]})
        //     })
        //     console.log(this.state.players);
        // }
        // console.log(this.state.dice);
    }
    hold = () => {
        if (this.state.playerScore1 < this.state.pointsToWin) {

            if (this.state.playerTurn === 1) {
                this.setState(prevState => ({ playerScore1: prevState.playerScore1 + this.state.diceScore1 }))
                this.setState({ diceScore1: 0 })
                this.setState({ playerTurn: 2,playerNumber:2 })
                
            }
            else {
                this.setState(prevState => ({ playerScore2: prevState.playerScore2 + this.state.diceScore2 }))
                this.setState({ diceScore2: 0 })
                this.setState({ playerTurn: 1,playerNumber:1 })
            }
        }

    }

    gameScoreToWinHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        // console.log(e.target.name, e.target.value)

    }
    render() {
        return (

            <div className="gameboard">
                {/* {
                    this.state.players.map(player => {
                        return <div key={player.name} className="switchPlayer" >
                            <Player
                                playerName={player.name}
                                playerScore={player.currentScore}
                                diceScore={player.diceScore}
                            />
                        </div>
                    })
                } */}
                <div className="divider"></div>
                <div className="switchPlayer" style={{ width: 100 + '%' }}>
                    <Player
                        playerName={this.state.player1Name}
                        playerScore={this.state.playerScore1}
                        diceScore={this.state.diceScore1}
                        playerTurn={this.state.playerTurn}
                        playerNumber={1}
                    />
                </div>

                <div style={{ width: 100 + '%' }}>
                    <Player
                        playerName={this.state.player2Name}
                        playerScore={this.state.playerScore2}
                        diceScore={this.state.diceScore2}
                        playerTurn={this.state.playerTurn}
                        playerNumber={2}
                    />
                </div>
                <GameScoreInput
                    value={this.state.pointsToWin}
                    inputsHandler={this.gameScoreToWinHandler}
                />
                <div className="diceCotainer">
                    <img src={`/Images/dice-${this.state.dice[0]}.png`} alt="" />
                    <img src={`/Images/dice-${this.state.dice[1]}.png`} alt="" />
                </div>
                <button className="newGame" onClick={this.newGame}>NEW GAME</button>
                <button disabled={this.state.disabled} className="roll" onClick={this.roll}>ROLL</button>
                <button disabled={this.state.disabled} className="hold" onClick={this.hold}>HOLD</button>







                {/* //this will change opacity of current players turn
                 <div className={this.state.mode[0]}>
                </div>
                <div className={this.state.mode[1]}>
                </div>  */}
            </div>

        )
    }
}
