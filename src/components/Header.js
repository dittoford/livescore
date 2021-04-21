import React from 'react'
import Navbar from 'react-bootstrap/Navbar'

class Header extends React.Component{
  constructor(){
    super()
    this.state = {
      date: ""
    }
  }
  componentDidMount() {
    let rightNow = new Date()
    let res = rightNow.toISOString().slice(0,10)
    const dateTemp =  res.split("-")
    let month = ""
    if(dateTemp[1] === "0"){ month = "January" }
    else if(dateTemp[1] === "01"){ month = "February" }
    else if(dateTemp[1] === "02"){ month = "March" }
    else if(dateTemp[1] === "03"){ month = "April" }
    else if(dateTemp[1] === "04"){ month = "May" }
    else if(dateTemp[1] === "05"){ month = "June" }
    else if(dateTemp[1] === "06"){ month = "July" }
    else if(dateTemp[1] === "07"){ month = "August" }
    else if(dateTemp[1] === "08"){ month = "September" }
    else if(dateTemp[1] === "09"){ month = "October" }
    else if(dateTemp[1] === "10"){ month = "November" }
    else if(dateTemp[1] === '11'){ month = "December" }
    let dateString = dateTemp[2]+ " " + month + " " + dateTemp[0]

    this.setState({
      date: dateString
    })
  }

  render(){
    return(
      <div>
        <Navbar fixed="top" bg="primary" variant="dark">
          <Navbar.Brand href="#home">Scoreboard</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {this.state.date}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <br/><br/><br/>

      </div>
    )
  }
}

export default Header
