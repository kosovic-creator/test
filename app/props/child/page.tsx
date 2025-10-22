import React from 'react';

// Definisanje tipa za props
interface GreetingProps {
  name: string;
}

// Funkcionalna komponenta koja prima props
const Pozdrav: React.FC<GreetingProps> = ({ name }) => {

  return <h1>Zdravo, {name}!</h1>;
};
export default Pozdrav;