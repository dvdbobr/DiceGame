import React, { Component } from 'react'

export default class GameScoreInput extends Component {
    render() {
        console.log(this.props.pointsToWin);
        return (
            <input type={'number'}
                value={this.props.pointsToWin === 50 ? "" :this.props.pointsToWin}
                min={0} max={100}
                name={'pointsToWin'}
                onChange={this.props.inputsHandler}
                className="inputScore"
                disabled={this.props.disabled}
                placeholder="input score to win"
            />
        )
    }
}
