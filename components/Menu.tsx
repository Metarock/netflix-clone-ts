import { Button, MenuItem, Menu } from '@mui/material'
import React, { useState } from 'react'

const CustomMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  //   handle click
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="md:!hidden">
      <Button
        id="basic-button"
        aria-control={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className="!capitalize !text-white"
      >
        Browse
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Home</MenuItem>
        <MenuItem onClick={handleClose}>Tv Shows</MenuItem>
        <MenuItem onClick={handleClose}>Movie</MenuItem>
        <MenuItem onClick={handleClose}>New & Popular</MenuItem>
        <MenuItem onClick={handleClose}>My list</MenuItem>
      </Menu>
    </div>
  )
}

export default CustomMenu
