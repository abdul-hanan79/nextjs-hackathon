import React from 'react'

const AuctionTimer = (props:any) => {
    return (
        <div className='auction-timer text-center'>
            <p className='auction-timer-heading'>Auction ends in</p>
            <div className='d-flex gap-4  justify-content-center'>
                <div>
                    <p className='number'>{props.hours}</p>
                    <span className="time">Hours</span>
                </div>
                <div>  <span className='semicolon'> : </span>   </div>
                <div>
                    <p className='number'>{props.min}</p>
                    <span className="time">Minutes</span>
                </div>

                <div>  <span className='semicolon'> : </span>   </div>
                <div>
                    <p className='number'>{props.sec}</p>
                    <span className="time">Seconds</span>
                </div>

            </div>
        </div>
    )
}

export default AuctionTimer
