import * as React from 'react';

export class Home extends React.Component<any, any> {
  render() {
    return (
      <div style={styles.root}>
        <video autoPlay loop className='fullscreen'>
          <source src='/assets/brand/back.mp4' type='video/mp4' />
        </video>
        <figure style={styles.figure}>
          <h1 style={styles.h1}>Open Human Interface Devices</h1>
          <p style={{ fontSize: '1.1em', maxWidth: '30em' }}>We're a HCI Research Lab located in Florida International University in Miami dedicated to the development of ❤️️ Open-Source Hardware, HCI Algorithms, and Computer Graphics.</p>
        </figure>
      </div>
    );
  }
}

const styles = {
  root: {
    width: '100%',
    height: 'calc(100% - 80px)',
    position: 'relative'
  },
  h1: {
    maxWidth: '12em'
  },
  figure: {
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(-45deg, rgba(40, 126, 214, 0.75), rgba(47, 114, 197, 0.65))',
    zIndex: 1000,
    mixBlendMode: 'color',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1em',
    textAlign: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  }
}