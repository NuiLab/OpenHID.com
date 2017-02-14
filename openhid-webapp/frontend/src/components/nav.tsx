import * as React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'glamor';

const styles = {
  root: {
    width: '100vw',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  img: {
    height: 32,
    padding: '0 1em 0 1em'
  },
  link: {
    padding: '.75em 1.25em'
  }
};

export class Navbar extends React.Component<any, any> {
  render() {
    return (
      <div style={styles.root}>
        <Link style={styles.link} to="/"><img style={styles.img} src="/assets/brand/openhid-logo.png"/></Link>
        <Link style={styles.link} to="/publications">Publications</Link>
        <Link style={styles.link} to="/about">About</Link>
        <Link style={styles.link} to="/blog">Blog</Link>
      </div>
    );
  }
}