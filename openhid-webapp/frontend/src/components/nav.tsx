import * as React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'glamor';

const styles = {
  root: {
    width: '100vw',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    minHeight: 64,
    fontWeight: 400,
    zIndex: 10000000

  },
  img: {
    height: 32,
    padding: '0 .5em 0 1em',
    verticalAlign: "middle"
  },
  link: {
    padding: '.75em 1.25em'
  },
  logo: {
    padding: '.75em 1.25em',
    fontSize: '1.5em'
  }
};

export class Navbar extends React.Component<any, any> {
  render() {
    return (
      <nav style={styles.root}>
        <Link style={styles.logo} to="/"><img style={styles.img} src="/assets/brand/openhid-logo.svg" /> <span style={{ fontWeight: 800 }}>Open</span><span style={{ fontWeight: 300 }}>HID Lab</span></Link>
        <Link style={styles.link} to="/publications">Publications</Link>
        <Link style={styles.link} to="/about">About</Link>
        <Link style={styles.link} to="/blog">Blog</Link>
      </nav>
    );
  }
}