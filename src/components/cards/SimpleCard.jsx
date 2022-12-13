import React from 'react'
import { Card } from '@mui/material'
import { styled, Box } from '@mui/system'

const CardRoot = styled(Card)(({textColor}) => ({
    height: '100%',
    color: textColor,
    width:"100%",
    padding: '10px 10px',
}))

const CardTitle = styled('div')(({ subtitle, textColor}) => ({
    fontSize: '2rem',
    fontWeight: '500',
    color: {textColor},
    textTransform: 'capitalize',
    marginBottom: !subtitle && "10px",
}))

const SimpleCard = ({ children, title, subtitle, icon, bgColor, textColor }) => {
    return (
        <CardRoot color = {textColor} elevation={10} style={{backgroundColor:bgColor}}>
            <CardTitle subtitle={subtitle}>
                {title} 
            </CardTitle>
            {subtitle && <Box color= {textColor} sx={{ mb: 2 }}>{subtitle}</Box>}
            {children}
        </CardRoot>
    )
}

export default SimpleCard
