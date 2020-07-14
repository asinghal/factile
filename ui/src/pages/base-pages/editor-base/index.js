import React, { useState } from 'react';
import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';
import { isLoggedIn } from '../../../authentication.js';

export default function EditorBase(props) {
    const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn());
    // we need to add these attributes to the child nodes
    const updatedChildrenWithProps = React.Children.map( props.children, child => React.cloneElement(child, { setUserLoggedIn }));

    return (
      <>
        <Header userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
        {updatedChildrenWithProps}
        <Footer />
      </>
    );
  };
