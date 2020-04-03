declare const module: any

import React from 'react';
import ReactDOM from 'react-dom';

const Application = (): JSX.Element => <div>Application 12</div>;

ReactDOM.render(<Application />, document.getElementById('app'));

if (module.hot) module.hot.accept();