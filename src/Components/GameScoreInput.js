import React, { Component } from 'react'

export default class GameScoreInput extends Component {
    render() {
        return (
            <input type={'number'}
                value={this.props.pointsToWin}
                min={0} max={100}
                name={'pointsToWin'}
                onChange={this.props.inputsHandler}
                className="inputScore"
                placeholder="input score to win"
            />
        )
    }
}
