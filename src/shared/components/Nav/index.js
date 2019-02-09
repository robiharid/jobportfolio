import React from "react"
import { SideSheet, Paragraph, Button, Position } from "evergreen-ui"
import { Link } from "react-router-dom"
import { Profile } from "../../../pages/index"

const Nav = ({ isShown, setShown }) => {
  return (
    <div>
      <SideSheet
        position={Position.LEFT}
        isShown={isShown}
        onCloseComplete={() => setShown(false)}>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <Paragraph margin={40}>Home</Paragraph>
        </Link>
        <Link to="/about" style={{ textDecoration: 'none' }}>
          <Paragraph margin={40}>About</Paragraph>
        </Link>
        <Link to="/profile" style={{ textDecoration: 'none' }}>
          <Paragraph margin={40}>Profile</Paragraph>
        </Link>
      </SideSheet>
      <Button onClick={() => setShown(true)}>Show Basic Side Sheet</Button>
    </div>
  )
}

export default Nav
