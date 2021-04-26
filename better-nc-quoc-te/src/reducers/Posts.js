import React from 'react'

const postsReducer = (state, action) => {
    switch (action.type) {
      case 'STACK_POSTS':
        return { ...state, posts: state.posts.concat(action.post) }
      case 'FETCHING_POSTS':
        return { ...state, fetching: action.fetching }
      case 'SEARCHING_POSTS':
        return { ...state, searching: action.searching}
      case 'CLEAR_POSTS':
        return { ...state, posts: []}
      default:
        return state;
    }
  }

export default postsReducer