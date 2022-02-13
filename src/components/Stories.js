import React, { useEffect, useState } from "react";
import { storyUrl } from "../services/api";
import { Story } from "./Story";


export const Stories = ({ storyIds }) => {
  const [stories, setStories] = useState([]);

  function sortByScore(data) {
    let newData = []
    while (data.length > 0) {
      let e = data[0]
      let index = 0
      for (let i = 0; i < data.length; i++) {
        if (data[i].score < e.score) {
          index = i
          e = data[i]
        }
      }
      data.splice(index, 1)
      newData.push(e)
    }

    return newData
  }

  useEffect(() => {
    let fetches = []

    storyIds?.forEach(storyId => {
      fetches.push(fetch(`${storyUrl + storyId}.json`))
    })
    Promise.all(fetches)
      .then(responses => {
        let results = []
        responses.forEach(response => {
          if (!response.ok) {
            throw response
          }
          results.push(response.json())
        })
        return Promise.all(results)
      })
      .then(datas => setStories(sortByScore(datas)))
      .catch(error => console.error(error))
  }, [storyIds])

  if (stories.length !== 0) {
    return (stories.map(story => <Story story={story} key={story.id} ></Story>))
  }
  return (<h1>Loading random stories</h1>);
};