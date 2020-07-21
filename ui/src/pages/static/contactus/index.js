import React from "react";

import './contact-us.css';

export default function ContactUs() {
    return (
        <div className="container contact-us">
          
        <div className="row">
          <div className="col-12">
            <h1>How Can We Help?</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h4><i className="fas fa-chevron-circle-right blue" aria-hidden="true"></i>&nbsp;General Issues</h4>
            <p>If you want to report a problem, or seek guidance on the tool, or perhaps have a query, please visit <a href="http://groups.google.com/group/factile" target="_blank" rel="noopener noreferrer">our forum</a>.</p>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h4><i className="fas fa-chevron-circle-right blue" aria-hidden="true"></i>&nbsp;Bugs/ Feature Requests</h4>
            <p>If you would like to open a bug/ issue or request a new feature, please raise an issue on <a href="http://github.com/asinghal/factile/issues" target="_blank" rel="noopener noreferrer">github</a>.</p>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h4><i className="fas fa-chevron-circle-right blue" aria-hidden="true"></i>&nbsp;Anything Else</h4>
            <p>For anything else, please checkout our tutorials/ FAQs or drop us a note on <a href="http://groups.google.com/group/factile" target="_blank" rel="noopener noreferrer">our forum</a>, or leave your thoughts below. We will contact you if needed.</p>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-12">
            <div id="disqus_thread"></div>
            <script>
              {/**
              *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
              *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
              /*
              var disqus_config = function () {
              this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
              this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
              };
              */
              (function() { // DON'T EDIT BELOW THIS LINE
              var d = document, s = d.createElement('script');
              s.src = 'https://factile.disqus.com/embed.js';
              s.setAttribute('data-timestamp', +new Date());
              (d.head || d.body).appendChild(s);
              })()
            }
              </script>
              <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
          </div>
        </div>

      </div>
    );
};
