import React from 'react';
import ReactDOM from 'react-dom';

const Application = (): JSX.Element => <div>Application</div>;

ReactDOM.render(<Application />, document.getElementById(process.env.CLIENT__APP_CONTAINER));

if (module.hot) module.hot.accept();
