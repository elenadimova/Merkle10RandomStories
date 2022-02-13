import { useEffect, useState } from 'react';
import { newStoriesUrl } from '../services/api';
import { GlobalStyle, StoriesContainerWrapper } from "../styles/StoriesContainerStyles"
import { Stories } from '../components/Stories';



export const StoriesContainer = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch(newStoriesUrl)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response;
      }).then(data => setData(MAX_STORIES(data)))
      .catch(error => console.error(error))
  }, [])

  function MAX_STORIES(storyIds) {
    const randomData = []
    for (let i = 0; i < 10; i++) {
      let randomStory = Math.floor(Math.random() * 500)
      if (randomData.includes(storyIds[randomStory])) {
        i--
      } else {
        randomData.push(storyIds[randomStory])
      }
    }
    return randomData
  }

  

  return (
    <>
      <GlobalStyle />
      <StoriesContainerWrapper data-test-id="stories-container">
        <h1> Hacker 10 random stories</h1>
        <Stories storyIds={data}></Stories>
      </StoriesContainerWrapper>
    </>
  )
}