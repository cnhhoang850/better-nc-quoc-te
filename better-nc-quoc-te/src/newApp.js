import './App.css';
import updateService from './services/updateService'
import React, { useEffect, useReducer, useState} from 'react'
import postsReducer from './reducers/Posts'
import Article from './components/Article'
import Header from './components/Header'
import Loading from './components/Loading'
import Search from './components/Search'

function App() {
  const [postIndex, setIndex] = useState(1)
  const [searchNum, setSearch] = useState(0)
  const [postsData, postsDispatch] = useReducer(postsReducer,{ posts:[], fetching: true, searching: false})


  async function fetchPosts(index, url) {
    postsDispatch({ type: 'FETCHING_POSTS', fetching: true })
    const links = await updateService.getBlogLinks( url + 'http://nghiencuuquocte.org', index)

    for (let i = 0; i < links.length; i++) {
      const post = await updateService.getBlogContent(url + links[i])
      
      postsDispatch({
        type: 'STACK_POSTS', post
      })
    }
    postsDispatch({ type: 'FETCHING_POSTS', fetching: false })
    setIndex(postIndex + 1)
  } 

  async function searchPosts(query, pageNum, url) {
    postsDispatch({type: 'FETCHING_POSTS', fetching: true})
    const links = await updateService
      .getSearchLinks(
        updateService.searchQuery(
          "https://young-savannah-41699.herokuapp.com/http://nghiencuuquocte.org",
          query,
          pageNum
          )
      )
    
      for (let i = 0; i < links.length; i++) {
        const post = await updateService.getBlogContent(url + links[i])

        postsDispatch(
          {
            type: 'STACK_POSTS',
            post
          }
        )

        postsDispatch(
          {
            type: 'FETCHING_POSTS',
            fetching: false
          }
        )

        
      }
  }
  
  useEffect(() => {
    if (postsData.searching === false) {
      postsDispatch({ type: 'FETCHING_POSTS', fetching: true })
      fetchPosts(1 , "https://young-savannah-41699.herokuapp.com/")
    }
  }, [])


  if (postsData.posts.length === 0) {
    return (
      <div className="container" data-scroll-container>
        <Header />
        <div className="posts-container">
          <Loading />
        </div>
      </div>
    )
  } 

  return (
    <>
    <div className="container" >
      <Header />
      
      <div className="posts-container" >
          <Search
            postsDispatch={postsDispatch}
            setSearch={() => setSearch(searchNum + 1)}
            pageNum={searchNum}
          />
        
        {postsData.posts.map((article, index) => {
          const { title, link, content, date } = article
          
          return (
            <>
              <Article
              className="article"
              title={title}
              link={link}
              content={content}
              key={index}
              index={index}
              date={date}
              />
            </>
          )
        })}

      </div>
      {postsData.fetching && (
        <Loading />
      )}
      {!postsData.fetching && (
        <div className="button-container">
        <button className="button-center" onClick={() => fetchPosts(postIndex, "https://young-savannah-41699.herokuapp.com/")}>
            <span>
              {"-> Tải thêm"}
            </span>  
        </button>
        </div>
      )}
    </div>
    <div className="footer">
      @Mọi nội dung thuộc về www.nghiencuuquocte.com
    </div>
    </>
  )
} 

export default App;
