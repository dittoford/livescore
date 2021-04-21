import React from 'react'
import Match from './Match'
import Spinner from 'react-bootstrap/Spinner'

class Livescore extends React.Component{
  constructor(){
    super()
    this.state = {
        data: []
    }
  }

  componentDidMount() {
    //Get today's date and turn them to suit API query (ex: 20210419)
    let rightNow = new Date();
    let res = rightNow.toISOString().slice(0,10).replace(/-/g,"");

    const requestOptions = {
       method: 'GET',
       headers: { 'Content-Type': 'application/json',
                  'X-Api-Key': '24578cdb-fc01-4794-9bb0-865dd8ac405c'}
   };
   fetch('https://client.elevenscore.com/api/football/match/matchfixtures?date='+res, requestOptions)
       .then(response => response.json())
       .then(data => this.setState({
         data: data
       }));
  }

  render(){
    let dataDisplay = (<Spinner animation="border" role="status" variant="primary">
                        <span className="sr-only">Loading...</span>
                       </Spinner>)

    if(this.state.data.result !== undefined){
        let dataTemp = this.state.data.result
        // Changing the status number of NotStarted from 1 to 5 for easier sorting; Ongoing match will be displayed first before NotStarted
        dataTemp = dataTemp.map(item => {
          let newStatus = item.status
          if(newStatus === 1){ newStatus = 7}
          return {...item, status: newStatus}
        })
        dataTemp.sort((a,b) => a.status - b.status);

        dataDisplay = dataTemp.map( (item, index) => {
            return <Match key={index} matchData={item} />
        })
    }

    return(
      <div>
        {dataDisplay}
      </div>
    )
  }
}

export default Livescore
