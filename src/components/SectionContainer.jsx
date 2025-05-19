import React from 'react'

export default function SectionContainer({ children, containerColor, backgroundColor='transparent', padding, className }) {
    console.log(backgroundColor);
    console.log({ padding });
    const pd = padding ? padding * 2 : 24
    console.log({ pd });
    
    return (
        <div style={{ width: '100%', backgroundColor: containerColor }}>
            <div style={{ maxWidth: `calc(1500px - ${ padding ? padding * 2 : 24 }px)`, backgroundColor: backgroundColor, margin: 'auto' }}>
                {children}
            </div>
        </div>
    )
}
