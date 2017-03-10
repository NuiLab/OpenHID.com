import * as React from 'react';
import { Link } from 'react-router-dom';

export class NotFound extends React.Component<any, any> {
  render() {
    return (
      <div >
        <h1>Uh Oh...</h1>
        <p>Doesn't look we could find what you were looking for.</p>
        <Link to="/"> Go Home</Link>
      </div>
    );
  }
}

const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'soft-light',
    backgroundColor: '#202429'
  },
  source: {
    position: 'absolute',
    right: '1em',
    bottom: '.25em',
    fontSize: '.75em',
    color: 'rgba(255,255,255,.75)'
  },
  link: {
    padding: '1em',
    margin: '.5em',
    backgroundColor: '#4ea0e8'
  }
}