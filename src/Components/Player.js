import React, { Component } from 'react'

export default class Player extends Component {
    render() {
        let playerMode;

        if (this.props.playerTurn === this.props.playerNumber) {
            playerMode = 'on'
        } else {
            playerMode = 'off'
        }
        return (
            <div className={`playerContainer ${playerMode}`}>
                <h1>{this.props.playerName}</h1>
                <h1>{this.props.playerScore}</h1>
                <div className="diceScore">
                    <h3>dice score</h3>
                    <h2>{this.props.diceScore}</h2>
                </div>
            </div>
        )
    }
}
