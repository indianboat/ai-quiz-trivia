import React from 'react';

const SearchTopicQuizPage = ({ params }) => {

  const { topic } = params;

  return (
    <>
      <div>
        {topic.replaceAll("-", " ")}
      </div>
    </>
  )
}

export default SearchTopicQuizPage