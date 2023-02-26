import React from 'react'

const Counter = (props:any) => {
    return (
        <div className='counter-div'>
            <h3 className='counter-heading'>{props.number}+</h3>
            <p className='paragraph counter-para text-light'>{props.name}</p>
        </div>
    )
}

export default Counter
