import { Button } from 'primereact/button';
import './NavBar.css'

function NavBarBtn (props)
{
      const {tab, onParentUpdate} = props;

      const handleClick = (event) =>
      {
            onParentUpdate(tab.id);
            switch (tab.id)
            {
                  case 1:
                        window.location.href = "/"
                        break;
                  case 2:
                        window.location.href = "/movies"
                        break;
                  case 3:
                        window.location.href = "/members"
                        break;
            }
      }

      return (
            <>
                  <Button id = {`btn${tab.id}`} className = 'navBarBtn' label = {tab.label} onClick = {handleClick}></Button>
            </>
      )
}

export default NavBarBtn;