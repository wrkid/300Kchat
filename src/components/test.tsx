import React, { useEffect } from 'react';

const getDate = () => +new Date() + 10000;

export function Test() {
  const [time] = React.useState(getDate());
  const [posts, setPosts] = React.useState(['awesome post']);

  useEffect(() => {
    const interval = setInterval(addPost, 2000)
    return () => clearInterval(interval);
  })

  const addPost = () => {
    setPosts(posts => [...posts, 'awesome post'])
  }

  const renderPosts = () => {
    return posts.map(el => {
      return (
        <li>{el}</li>
      )
    })
  }
  
  return (
    <div className='App'>
      <ul>
        {renderPosts()}
      </ul>
    </div>
  );
}