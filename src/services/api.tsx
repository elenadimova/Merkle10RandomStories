import axios from "axios"
import { selectFields } from "../selectors/SelectFields";

export const baseUrl = 'https://hacker-news.firebaseio.com/v0/';

export const newStoriesUrl = `${baseUrl}topstories.json`;
export const storyUrl = `${baseUrl}item/`;
export const storyUserUrl = `${baseUrl}user/`;

export const getStory = async (storyId: string) => {
  const result = await axios.get(`${storyUrl + storyId}.json`).then(({ data }) => data && selectFields(data));
  return result;
  
}


export const getStoryId = async () => {
  const result = await axios.get(newStoriesUrl).then(({data}) => data);
  return result;
}

export const getStoryUser = async (userBy: string) => {
  const result = await axios.get(`${storyUserUrl + userBy}.json`).then(({ data }) => data && selectFields(data));
  return result;
}