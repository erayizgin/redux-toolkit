import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchPostsBySubredddit } from './api/reddit';
import { Posts } from './components/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from './components/Select';
import { fetchPosts } from './features/subreddit/SubredditSliceAsync';
import rootReducer, { RootState } from './store/rootReducer';

function App() {
  const dispatch = useDispatch()
  const [selectedSubreddit, setSelectedSubreddit] = useState('turkey')
  const { items, loading, lastUpdated, error } = useSelector((state: RootState) => state.subreddit)
  const isEmpty = items.length === 0

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit))
  }, [selectedSubreddit])

  const handleChange = (selectedValue: string) => {
    setSelectedSubreddit(selectedValue)
  }

  const handleRefreshClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(fetchPosts(selectedSubreddit))
  }

  const test = useSelector((state: RootState) => state);

  return (
    <div className="wrapper">
      <header className="header">Redux Toolkit Example</header>
      <div className="container">
        <div className="selection">
          <Picker
            value={selectedSubreddit}
            onChange={handleChange}
            options={['turkey', 'frontend']}
          />
          <div>
            {lastUpdated && (
              <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}. </span>
            )}
            {!loading && <button onClick={handleRefreshClick}>Refresh</button>}
          </div>
        </div>
        <div className="content">
          {error && <span>Error:{error}</span>}
          {isEmpty && loading && <h2>Loading... </h2>}
          {isEmpty && !loading && <h2>Empty.</h2>}
          {!isEmpty && (
            <div style={{ opacity: loading ? 0.5 : 1 }}>
              <Posts posts={items} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App