import React from "react";

export default function ContactUs() {
    return (
        <div className="container">
          
        <div className="row">
          <h1>How Can We Help?</h1>
          
          <h3>General Issues</h3>
          <p>If you want to report a problem, or seek guidance on the tool, or perhaps have a query, please visit <a href="http://groups.google.com/group/factile" target="_blank" rel="noopener noreferrer">our forum</a>.</p>
          
          <h3>Bugs/ Feature Requests</h3>
          <p>If you would like to open a bug/ issue or request a new feature, please raise an issue on <a href="http://github.com/asinghal/factile/issues" target="_blank" rel="noopener noreferrer">github</a>.</p>
          
          <h3>Anything Else</h3>
          <p>For anything else, please checkout our tutorials/ FAQs or drop us a note on <a href="http://groups.google.com/group/factile" target="_blank" rel="noopener noreferrer">our forum</a>, or leave your thoughts below. We will contact you if needed.</p>
        </div>

        <div className="row"><div className="span12 clearfix">&nbsp;</div></div>
        <div className="row"><div className="span12 clearfix">&nbsp;</div></div>
        <div className="row">
          <div className="span3">&nbsp;</div>
          <div className="span6">
            <div id="disqus_thread"></div>
            <script type="text/javascript">
                
            </script>
            <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
            <a href="http://disqus.com" className="dsq-brlink">comments powered by <span className="logo-disqus">Disqus</span></a>
          </div>
          <div className="span3">&nbsp;</div>
        </div>

      </div>
    );
};
