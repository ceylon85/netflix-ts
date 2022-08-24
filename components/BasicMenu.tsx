import { ChevronDownIcon } from '@heroicons/react/outline'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

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
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="!text-[#e50914] !text-normal !font-bold"
            >
                메뉴
                <ChevronDownIcon className='w-4 !font-bold' onClick={handleClose} />
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
                <MenuItem onClick={handleClose}>홈</MenuItem>
                <MenuItem onClick={handleClose}>TV 프로그램</MenuItem>
                <MenuItem onClick={handleClose}>영화</MenuItem>
                <MenuItem onClick={handleClose}>최신 등록 콘텐츠</MenuItem>
                <MenuItem onClick={handleClose}>내가 찜한 콘텐츠</MenuItem>
            </Menu>
        </div>
    )
}