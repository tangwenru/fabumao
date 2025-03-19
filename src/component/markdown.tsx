import React from 'react';
import MarkdownToJsx from "markdown-to-jsx";

interface Props{
  content: string;
}
const Markdown: React.FC<Props>
  = ({
       content= '',
     }) => {

  return (
    <MarkdownToJsx
      options={{
        disableParsingRawHTML: false,
        overrides: {
        },
      }}
      children={ content }
    />
  );
}

export default Markdown;