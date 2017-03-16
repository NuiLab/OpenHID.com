import * as React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'glamor';


export class Navbar extends React.Component<any, any> {
  render() {
    return (
      <nav style={styles.root}>
        <Link style={styles.logo} to="/"><svg style={styles.img} viewBox="0 0 67 67">
          <path style={styles.path} d="M33.5,0C15.028,0,0,15.028,0,33.5S15.028,67,33.5,67S67,51.972,67,33.5S51.972,0,33.5,0z M63.859,30.602L36.398,3.141C50.907,4.515,62.485,16.093,63.859,30.602z M5.986,35h23.811c0.594,1.465,2.026,2.5,3.703,2.5s3.109-1.035,3.703-2.5h23.811L33.5,62.514L5.986,35z M61.014,32H37.203c-0.594-1.465-2.026-2.5-3.703-2.5s-3.109,1.035-3.703,2.5H5.986L33.5,4.486L61.014,32z M30.602,3.141L3.141,30.602C4.515,16.093,16.093,4.515,30.602,3.141z M3.141,36.398l27.461,27.461C16.093,62.485,4.515,50.907,3.141,36.398z M36.398,63.859l27.461-27.461C62.485,50.907,50.907,62.485,36.398,63.859z" />
        </svg>
          Open<span style={{ fontWeight: 800 }}>HID</span> Lab</Link>
        <Link style={styles.link} to="/publications">Publications</Link>
        <Link style={styles.link} to="/about">About</Link>
        <Link style={styles.link} to="/contact">Contact</Link>
      </nav>
    );
  }
}

const styles = {
  root: {
    alignItems: 'center',
    color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    height: 80,
    minHeight: 64,
    position: 'fixed',
    width: '100vw',
    zIndex: 10000000,
    backgroundImage: 'linear-gradient(rgba(6, 5, 74, 0.12), rgba(0, 0, 0, 0))'

  },
  img: {
    height: 32,
    padding: '0 .5em 0 1em',
    verticalAlign: "middle"
  },
  path: {
    fill: 'currentcolor'
  },
  link: {
    padding: '2em 1.5em'
  },
  logo: {
    padding: '.75em 1.25em',
    fontSize: '1.5em'
  }
};