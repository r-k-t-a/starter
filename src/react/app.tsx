import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any;

const Application = (): JSX.Element => <div>Application</div>;

ReactDOM.render(<Application />, document.getElementById('app'));

if (module.hot) module.hot.accept();
