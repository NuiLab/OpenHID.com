import * as React from 'react';
import { Link } from 'react-router';

export class Footer extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Link to="/publications"/>
        <Link to="/about"/>
        <Link to="/blog"/>

      </div>
    );
  }
}