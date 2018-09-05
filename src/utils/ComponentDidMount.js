import React, { Component } from 'react';

import PropTypes from 'prop-types';

/*
* HOC that will listen the componentWillMount life cycle event and execute the handler() function passed in its props.
* It is necessary in unstated because of the way global state is accessed, that will not allow the global state objects to be seen outside
* of the render function.
* This is idiomatic for unstated.
* To use, put every rendered component as a child of this one, and pass the handler function as props. (will also work if no handler() function
* is specified)
* */

class ComponentDidMount extends Component {
  componentWillMount() {
    return this.props.handler && this.props.handler();
  }

  render() {
    return this.props.children;
  }
}

export default ComponentDidMount;