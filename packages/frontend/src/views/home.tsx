import * as React from 'react';

export class Home extends React.Component<any, any> {
  render() {
    return (
      <div style={styles.root}>
        <video autoPlay loop className='fullscreen'>
          <source src='/assets/brand/back.mp4' type='video/mp4' poster='/assets/brand/about-video-frame.png' />
        </video>
        <figure style={styles.figure}>
          <h1 style={styles.h1}>Open Human Interface Devices</h1>
          <p style={styles.p}>We're a HCI Research Lab located in Florida International University in Miami, dedicated to the development of Open-Source Hardware, HCI Algorithms, and Computer Graphics.</p>
        </figure>
      </div>
    );
  }
}

const styles = {
  root: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    textAlign: 'left'
  },
  h1: {
    maxWidth: '6em',
    WebkitTextFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    fontWeight: 800,
    fontSize: '12vmin',
    textTransform: 'uppercase',
    lineHeight: 1,
    textAlign: 'left',
    backgroundImage: 'linear-gradient(32deg, rgb(83, 197, 251), rgb(136, 151, 255))',
    borderRight: '.5rem solid #8a8ae4'
  },
  p: {
    fontSize: '3vmin',
    maxWidth: '30vw',
    margin: '0 0 0 4vw',
    textAlign: 'left',
    fontWeight: 100,

  },
  figure: {
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(-32deg, rgba(14, 39, 132, 0.91), rgba(0, 83, 103, 0.65))',
    zIndex: 1000,
    mixBlendMode: 'color',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1em',
    flexDirection: 'row'
  }
}