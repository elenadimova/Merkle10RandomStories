import { useEffect, useState } from "react";
import { storyUserUrl } from "../services/api";
import { FaBeer } from 'react-icons/fa';
import {
  StoryWrapper,
  StoryTitle,
  StoryMeta,
  StoryMetaElement
} from "../styles/StoryStyles";
import { mapTime } from "../TimeMap/mapTime";


export const Story = ({ story }) => {
  const [storyUser, setStoryUser] = useState(null);

  useEffect(() => {
    fetch(`${storyUserUrl + story.by}.json`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(data => {
        setStoryUser(data)
      })
      .catch(error => console.error(error))
  }, [story])

  if (storyUser !== null) {
    return (
      <StoryWrapper data-testid="story">
        <StoryTitle>
          <a href={story.url}> {story.title}</a>
        </StoryTitle>
        <StoryMeta>
          <span data-testid="story-time">
            <StoryMetaElement color="#000">Posted:</StoryMetaElement>
            {mapTime(story.time)}
          </span>
          <span data-testid="story-score">
            <StoryMetaElement color="#000">Score:</StoryMetaElement>{story.score}{` `}
          </span>
          <span data-testid="story-authorId">
            <StoryMetaElement color="#000">Author Id:</StoryMetaElement>{storyUser.id}{` `}
          </span>
          <span data-testid="story-karma">
            <StoryMetaElement color="#000">Karma:</StoryMetaElement>{storyUser.karma}
          </span>
          <span >
            <StoryMetaElement >
              <FaBeer />
            </StoryMetaElement>
          </span>
        </StoryMeta>
      </StoryWrapper>
    )
  }else{
    return(<h2>Loading story</h2>)
  }
};