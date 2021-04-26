import React, {useState} from 'react'
import updateService from '../services/updateService'

const Search = ({postsDispatch, setSearch, pageNum}) => {
    const [query, setQuery] = useState('')

    async function searchPosts(query, pageNum, url) {
        postsDispatch({type: 'CLEAR_POSTS'})
        postsDispatch({type: 'SEARCHING_POSTS', searching: true})
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
            const post = await updateService.getBlogContent("https://young-savannah-41699.herokuapp.com/" + links[i])
            console.log(links[i])
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

          setSearch()
      }

    return (
      <form onSubmit={() => searchPosts(query, pageNum )}>
        <label>
          <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
}

export default Search
