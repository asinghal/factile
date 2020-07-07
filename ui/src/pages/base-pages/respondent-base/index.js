import React from 'react';
import RespondentFooter from '../../../components/respondent-footer';

export default function RespondentBase(props) {  
    return (
      <>
        {props.children}
        <RespondentFooter />
      </>
    );
  };
