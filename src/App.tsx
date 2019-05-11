import React, { useState } from 'react';

import { FormComponent } from "./components/Form";
import { ThankYouComponent } from './components/ThankYouComponent';

const App = () => {
    const [showForm, setShowForm] = useState(true);
    return showForm ? <FormComponent onSubmit={() => setShowForm(false)}/> : <ThankYouComponent onBack={() => setShowForm(true)}/>
};

export default App;
