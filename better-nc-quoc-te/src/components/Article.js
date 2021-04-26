import React, {useLayoutEffect} from 'react'

const Article = ({ title, content, link, index, date }) => {
 
  useLayoutEffect(() => {
    setTimeout(() => {
      document.querySelector(`.ar${index}`).style.opacity = 0.8
    }, 1200)
  })

  return (
    <article className={`article collapse ar${index}`} style={{opacity: 0}}>
        <p className="date">
          {date}
       </p>
      <input type="checkbox" id={link}></input>
      
      <label for={link}>
        <h2>
          {title}
          <span id="collapseIcon">
            {`<`}
          </span>
        </h2>
        
      </label>
      <div className="contentBox">
        <a href={link.slice(43, -1)}>Link: {link.slice(43, -1)}</a>

        {content.map(paragraph => {
          return <p>{ paragraph }</p>
        })}
      </div>
    </article>
  )
}

export default Article