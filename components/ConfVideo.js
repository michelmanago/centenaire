import React, {useState} from "react"
import ReactPlayer from 'react-player'





const  ConfVideo = () => {
    
    const [startPlaying, setstartPlaying] = useState(true)
    const [endPlaying, setendPlaying] = useState(false)
    
    
    
  

      return (
        <div className='player-wrapper'>
           <ReactPlayer
            className='react-player'

            url={"http://localhost:3000/static/videos/MGCPB0027796-InMemoriamConstantinAndronikof1%C3%A8repartie.mp4#t=20,25"}
            width='50%'
            height='50%'
            controls={true}

          />
          
        </div>
        
      )
    
  }

  export default ConfVideo;