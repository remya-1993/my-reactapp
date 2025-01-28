import React, { useState } from 'react'

function Readmore() {
  const [data, setData] = useState(true);

  const fulltext = "Flowbite is an open-source library of UI components based on the utility-first Tailwind CSS framework featuring dark mode support, a Figma design system, templates, and more. It includes all of the commonly used components that a website requires, such as buttons, dropdowns, navigation bars, modals, but also some more advanced interactive elements such as datepickers. All of the elements are built using the utility classes from Tailwind CSS and vanilla JavaScript with support for TypeScript."

  const toggleReadMore = () => {
    setData(!data);
  };

  return (
    <div>
      <h1>Hello Everyone!</h1>
      <p>
        {data ? `${fulltext.slice(0,100)}` : fulltext}
      </p>
      <button onClick={toggleReadMore}>  {data ? "Read More" : "Read Less"} </button>
    </div>
  )
}

export default Readmore
