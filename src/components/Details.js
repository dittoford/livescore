import React from 'react'
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar'

class Details extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    let load = <p>Loading...</p>
    let homePossesion, awayPossesion
    let redCardHome, redCardAway, yellowCardHome, yellowCardAway
    let cornerHome, cornerAway
    let penaltyHome, penaltyAway
    let attackHome, attackAway
    let shotHome, shotAway

    if(this.props.detailMatch.techStats !== undefined){
        this.props.detailMatch.techStats.map((item, index) => {
          if(item.type === 25){
            homePossesion = item.home
            awayPossesion = item.away
          }
          else if(item.type === 2){
            cornerHome = item.away
            cornerAway = item.away
          }
          else if(item.type === 3){
            yellowCardHome = item.home
            yellowCardAway = item.away
          }
          else if(item.type === 4)
          {
            redCardHome = item.home
            redCardAway = item.away
          }
          else if(item.type === 8){
            penaltyHome = item.home
            penaltyAway = item.away
          }
          else if(item.type === 21){
            shotHome = item.home
            shotAway = item.away
          }
          else if(item.type === 23){
            attackHome = item.home
            attackAway = item.away
          }
          return null
        })
        load = ""
    }

    return(
      <div>
        {load}
        <div className="containerDetails" hidden={homePossesion === undefined ? true : false}>
          <ProgressBar>
            <ProgressBar label={homePossesion+"%"} animated="true" striped variant="primary" now={homePossesion} key={1} />
            <ProgressBar label={awayPossesion+"%"} animated="true" striped variant="warning" now={awayPossesion} key={2} />
          </ProgressBar>
          <div className="cardBody">
              <div className="cardTeam">{yellowCardHome} </div>
              <div className="cardScore">
                  <svg width="10" height="15">
                    <rect width="10" height="15" style={{fill:"rgb(255,255,0)",strokeWidth:"1",stroke:"rgb(255,255,0)"}} />
                  </svg>
              </div>
              <div className="cardTeam">{yellowCardAway} </div>
          </div>
          <div className="cardBody" style={{backgroundColor:"whitesmoke"}}>
              <div className="cardTeam">{redCardHome} </div>
              <div className="cardScore">
                  <svg width="10" height="15">
                    <rect width="10" height="15" style={{fill:"rgb(255,0,0)",strokeWidth:"1",stroke:"rgb(255,0,0)"}} />
                  </svg>
              </div>
              <div className="cardTeam">{redCardAway} </div>
          </div>
          <div className="cardBody">
              <div className="cardTeam">{attackHome} </div>
              <div className="cardScore"> Attack </div>
              <div className="cardTeam">{attackAway} </div>
          </div>
          <div className="cardBody" style={{backgroundColor:"whitesmoke"}}>
              <div className="cardTeam">{cornerHome} </div>
              <div className="cardScore"> Corner Kick </div>
              <div className="cardTeam">{cornerAway} </div>
          </div>
          <div className="cardBody">
              <div className="cardTeam">{penaltyHome} </div>
              <div className="cardScore"> Penalty </div>
              <div className="cardTeam">{penaltyAway} </div>
          </div>
          <div className="cardBody" style={{backgroundColor:"whitesmoke"}}>
              <div className="cardTeam">{shotHome} </div>
              <div className="cardScore"> Shot on Goal </div>
              <div className="cardTeam">{shotAway} </div>
          </div>
          <br/>
        </div>

        <Button variant="success" onClick={this.props.handleChanges}>Close</Button>
      </div>
    )
  }
}

export default Details
