import React from 'react'
import Details from './Details'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Ball from '../ball.jpg'

class Match extends React.Component{
  constructor(){
    super()
    this.state = {
      showDetails: false,
      time: "",
      matchData: [],
      homeTeamEvent: [],
      awayTeamEvent: [],
      score: "",
      detailMatch: []
    }
  }

  handleChange = () => {
      //If statement checking match length to prevent multiple fetch repetition
      if(this.state.detailMatch.length === 0){
        const requestOptions = {
           method: 'GET',
           headers: { 'Content-Type': 'application/json',
                      'X-Api-Key': '24578cdb-fc01-4794-9bb0-865dd8ac405c'}
       };
       fetch('https://client.elevenscore.com/api/football/match/matchdetail/'+this.state.matchData.gameId, requestOptions)
           .then(response => response.json())
           .then(data => this.setState({
             detailMatch: data
           }));
      }
      //state to Show or Hide Details component
      this.setState((prevState) => {
          return {
            showDetails: !prevState.showDetails
          }
      })

  }

  componentDidMount() {
    //Display Components
    const matchData = this.props.matchData

    let timeStart = matchData.matchTime.split("T")
    let timeCurrent = matchData.teeTime.split("T")
    let timeStartParse = timeStart[1].split(":")
    let timeCurrentParse = timeCurrent[1].split(":")
    let timeMinutes = (parseInt(timeCurrentParse[0]) * 60 + parseInt(timeCurrentParse[1])) - (parseInt(timeStartParse[0]) * 60 + parseInt(timeStartParse[1]));

    this.setState({
      matchData: this.props.matchData,
      homeTeamEvent: this.props.matchData.homeTeamEvent,
      awayTeamEvent: this.props.matchData.awayTeamEvent,
      time: timeMinutes
    })
  }

  render(){
    //inline Style
    const cardStyle = { margin: "1em" }
    const teamName  = {
      color: "grey",
      fontWeight: "bold",
      fontSize: "13px",
      margin: "auto"
    }

    return(
      <div>
        <Card style={cardStyle} className="cardMatch">
          <Card.Body>
            <h6>{this.state.matchData.eventName} </h6>
            <br/>
            <div className="cardBody">
              <div className="cardTeam">
                  <Card.Img
                    src={this.state.homeTeamEvent.logoUrl}
                    onError={(e)=>{e.target.onerror = null; e.target.src=Ball}}
                  />
                  <p style={teamName}> {this.state.homeTeamEvent.name}</p>
              </div>

              <div className="cardScore">
                  <Card.Title><b>{this.state.homeTeamEvent.score} - {this.state.awayTeamEvent.score}</b></Card.Title>
              </div>

              <div className="cardTeam">
                  <Card.Img
                    src={this.state.awayTeamEvent.logoUrl}
                    onError={(e)=>{e.target.onerror = null; e.target.src=Ball}}
                  />
                  <p style={teamName}>{this.state.awayTeamEvent.name}</p>
              </div>
            </div>
            <p>{this.state.time > 0 && this.state.time+"'"}  {this.state.matchData.statusName == "NotStarted" ? "Upcoming" : this.state.matchData.statusName} </p>
            <hr/>

            {!this.state.showDetails && <Button variant="primary" onClick={this.handleChange}><i>Match Details</i></Button>}
            {this.state.showDetails && <Details handleChanges={this.handleChange} detailMatch={this.state.detailMatch} />}
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Match
