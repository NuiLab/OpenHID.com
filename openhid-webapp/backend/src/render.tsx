import { Request, Response } from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from '../../frontend/src/app';
import { NotFound } from '../../frontend/src/views';

import { database } from './db';

/**
 * Prerenders a given page with React.
 */
export function renderPage(req: Request, res: Response) {

  // This context object contains the results of the render
  const context: any = {};

  let markup = renderToString(
     <StaticRouter location={req.url} context={context}>
      {App}
    </StaticRouter>
  );

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    res.end();
  } else {
    if (context.missed) {
      res.writeHead(404);
      markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          {App}
        </StaticRouter>
      );
    }
    res.write(page(markup));
    res.end();
  }
}

function page(markup: string) {
  return `<!--

        .:+syyssss+:.
    ./yyoo.  ....-:ohy/.   
  :ho:.- .  ..s-.. . ..-sh:  
 +d/. .--. . . :  . .....+d+ 
-N/  -+- . .  :   . .-+/ --m-
oh/.  .  . ..-o-. . . . ...-ho
oh- .. ..  . ..-o-. . . . ./ho
-m-- /+- . .  :   . .-+-  /N-
 +d+ . . . .. . . : ...../d+ 
  :hs-. . ...-s. . .-.:oh:  
     /yho:-... . .ooyy/
        :+ssssyys+:

 OpenHID Lab
 Built with <3 in React and TypeScript by Alain.xyz
-->
<!doctype html>
<html>

<head>
  <meta charset="UTF-8">
  <title>OpenHID</title>
  <!--Search Engines-->
  <meta name="author" content="Florida International University - OpenHID Lab"/>
  <meta name="description" content="The OpenHID Lab of Florida International University, dedicated to the research and development of 3D User Interfaces, Virtual Environments, among other topics."/>
  <meta name="keywords" content="florida, international, miami, university, research, lab, graphics, human interface device, IO, Computer Science (CS), FIU SCIS, FIU CS, computer graphics, mathematics, rendering, demo, 3D, realtime, shader, raytracing, glsl"/>
  <!-- Twitter-->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@OpenHID">
  <meta name="twitter:title" content="OpenHID Lab @ FIU CIS">
  <meta name="twitter:description" content="The OpenHID Lab of Florida International University, dedicated to the research and development of 3D User Interfaces, Virtual Environments, among other topics.">
  <meta name="twitter:image" content="http://openhid.com/assets/brand/cover.jpg">
  <!-- Facebook-->
  <meta property="og:title" content="OpenHID Lab @ FIU CIS">
  <meta name="og:description" content="The OpenHID Lab of Florida International University, dedicated to the research and development of 3D User Interfaces, Virtual Environments, among other topics.">
  <meta property="og:url" content="htt://OpenHID.com">
  <meta property="og:site_name" content="OpenHID Lab">
  <meta property="og:image" content="http://openhid.com/assets/brand/cover.jpg" itemprop="thumbnailUrl">
  <meta property="fb:app_id" content="1404536383143308"/>
  <!--Icons/Mobile-->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
  <link rel="shortcut icon" href="/assets/brand/icon.ico"/>
  <link rel="stylesheet" href="/assets/main.min.css"/>
</head>

<body>
  <div id="app">
    ${markup}
  </div>

  <!--Load App-->
  <script src="/assets/vendor.min.js"></script>
  <script src="/assets/main.min.js"></script>
</body>

</html>
`;
}
