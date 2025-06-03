import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import reactlogo from "./assets/react.png";
import vueLogo from "./assets/vue.png";
import angularLogo from "./assets/angular.png";
const cardData = [
  {
    imageSrc: reactlogo,
    title: "React",
    description: "A JavaScript library for building user interfaces.",
  },
  {
    imageSrc: vueLogo,
    title: "Vue",
    description: "The Progressive JavaScript Framework.",
  },
  {
    imageSrc: angularLogo,
    title: "Angular",
    description: "One framework. Mobile & desktop.",
  },
];
const App = () => {
  const handleCardClick = (title) => {
    alert(`You clicked on ${title} card!`);
  };
  return (
    <div>
      <Header
        title="My App"
        navLinks={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <main style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        {cardData.map(({ imageSrc, title, description }) => (
          <Card
            key={title}
            imageSrc={imageSrc}
            title={title}
            description={description}
            onClick={() => handleCardClick(title)}
          />
        ))}
      </main>
      <Footer text="All rights reserved." />
    </div>
  );
};
export default App;
