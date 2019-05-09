import React from 'react';

import { FormComponent } from "./components/Form";

const App: React.FC = () => {
  return (
      <FormComponent onSubmit={() => {
          console.log('DoNE')
      }}/>
  );
};

export default App;
