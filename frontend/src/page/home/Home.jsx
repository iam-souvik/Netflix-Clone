import "./Home.css"
import React from 'react'
import Navbar from "../../components/Navbar/Navbar";
import Featured from "../../components/Featured/Featured";
import List from "../../components/List/List";


const Home = () => {
  return (
    <div className="home">
    
        
        
      <Navbar/>
      <Featured/>
      <List/>
      <List/>
      <List/>
      


      
    </div>
  )
}

export default Home
