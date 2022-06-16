import React from 'react'

const YoutubeEmbed = ({ embedUrl }) => {
  const newUrl = embedUrl.replace('watch?v=', 'embed/')
  return (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={newUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  )

}

export default YoutubeEmbed