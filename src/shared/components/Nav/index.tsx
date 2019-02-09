/// <reference path="./interfaces.d.ts" />

import React from "react"
import { SideSheet, Paragraph, Position } from "evergreen-ui"
import { Link } from "react-router-dom"
import firebase from "../../../firebase"

const Nav = ({ isShown, setShown, navOptions }: NavPropsInterface) => {
  let user = ""
  try {
    user = firebase.auth().currentUser.displayName
  } catch {
    user = "Not Found"
  }

  return (
    <div>
      <SideSheet
        position={Position.LEFT}
        isShown={isShown}
        onCloseComplete={() => setShown(false)}>
        <Paragraph margin={20}>Welcome {user}</Paragraph>

        {navOptions.map(option => (
          <Link
            to={option.link}
            style={{ textDecoration: "none" }}
            onClick={() => setShown(false)}>
            <Paragraph margin={20}>{option.label}</Paragraph>
          </Link>
        ))}
      </SideSheet>
    </div>
  )
}

export default Nav
