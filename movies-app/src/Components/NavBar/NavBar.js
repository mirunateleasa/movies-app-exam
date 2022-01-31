import { useState } from "react";
import NavBarBtn from "./NavBarBtn";
import './NavBar.css'
import { Navigate, useNavigate } from "react-router-dom";

function NavBar (props)
{
      const tabs = [
            {id: 1, label: 'Home', command: (event) => {Navigate("/");}},
            {id: 2, label: 'Movies', command: (event) => {Navigate("/movies");}}
      ]

      const [activeIndex, setActiveIndex] = useState(props)

      const barUpdateClick = (tabId) =>
      {
            setActiveIndex(tabId);
      }

      return (
                  <div id="containerNavBar">
                        {
                              tabs.map (tab => <NavBarBtn key = {tab.id} tab = {tab} onParentUpdate = {barUpdateClick}></NavBarBtn>)
                        }
                  </div>
      )
}     

export default NavBar