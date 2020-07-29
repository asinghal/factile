import React, { useState, useEffect } from 'react';
import Header from '../../../components/header/index.js';
import Footer from '../../../components/footer/index.js';
import { isLoggedIn } from '../../../authentication.js';
import CookieConsent from "react-cookie-consent";
import { useHistory } from 'react-router-dom';

export default function EditorBase(props) {
    const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn());
    // we need to add these attributes to the child nodes
    const updatedChildrenWithProps = React.Children.map( props.children, child => React.cloneElement(child, { setUserLoggedIn }));
    const history = useHistory();

    useEffect(() => {
      if (props.secure === 'true' && !userLoggedIn && !isLoggedIn()) {
        return history.replace('/');
      }
    }, [props.secure, userLoggedIn]);

    return (
      <>
        <Header userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
        {updatedChildrenWithProps}
        <Footer />
        <CookieConsent style={{ background: "#2B373B" }}
  buttonStyle={{ backgroundColor: '#4CA9FD', color: "#FFFFFF" }}>This website uses cookies to enhance the user experience.</CookieConsent>
      </>
    );
  };
