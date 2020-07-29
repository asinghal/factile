import React, { useEffect } from 'react';
import { isLoggedIn } from '../../../authentication.js';
import RespondentFooter from '../../../components/respondent-footer';
import { useHistory } from 'react-router-dom';

export default function RespondentBase(props) {  

  if (props.secure === 'true' && !isLoggedIn()) {
    return 'Unauthorized access';
  }

  return (
      <>
        {props.children}
        <RespondentFooter />
      </>
    );
  };
