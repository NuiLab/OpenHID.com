import { Request, Response } from 'express';
import * as React from 'react';
import * as serialize from 'serialize-javascript';
import { render, template } from 'rapscallion';
import { StaticRouter } from 'react-router';
import App from '../../frontend/src/app';
import { database } from './db';

/**
 * Prerenders a given page with React.
 */
export function renderPage(req: Request, res: Response) {

  // React Router
  const context: any = {};
  const state = {};
  const app =
    <StaticRouter location={req.url} context={context}>
      {App}
    </StaticRouter>

  const componentRenderer = render(app);

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    res.end();
  } else {
    const responseRenderer = template`<!--

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

 ⚪ OpenHID Lab
 Built with ❤️️ in Miami, Florida by @alainxyz
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
  <link rel="shortcut icon" href="/assets/brand/icon.ico"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
  <!--Chrome-->
  <meta name="theme-color" content="#21252b">
  <link rel="manifest" href="/assets/manifest.webmanifest">
  <!--Safari-->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="OpenHID">
  <link rel="apple-touch-icon-precomposed" href="assets/brand/icon/512.png">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/brand/icon/180.png">
  <link rel="apple-touch-icon" sizes="167x167" href="assets/brand/icon/167.png">
  <link rel="apple-touch-icon" sizes="152x152" href="assets/brand/icon/152.png">
  <link rel="apple-touch-icon" sizes="120x120" href="assets/brand/icon/120.png">
  <link rel="apple-touch-icon" sizes="80x80" href="assets/brand/icon/80.png">
  <!--Windows-->
  <meta name="application-name" content="OpenHID">
  <meta name="msapplication-square70x70logo" content="assets/brand/icon/70.png" />
  <meta name="msapplication-square150x150logo" content="assets/brand/icon/150.png" />
  <meta name="msapplication-wide310x150logo" content="assets/brand/icon/310x150.png">
  <meta name="msapplication-square310x310logo" content="assets/brand/icon/310.png">
  <meta name="msapplication-TileImage" content="assets/brand/icon/512.png">
  <meta name="msapplication-TileColor" content="#21252b">
  <meta name="msapplication-tap-highlight" content="no"/>
  <!--Styles-->
  <link rel="stylesheet" href="/assets/build/main.min.css"/>
  <style type="text/css"></style>
</head>

<body>
  <div id="app">
    ${() => componentRenderer}
  </div>

  <!--Load App-->
  <script>
    window._initialState=${serialize(state)};
    document.querySelector("#app").setAttribute("data-react-checksum", "${() => componentRenderer.checksum()}")
  </script>
  <script src="/assets/build/vendor.min.js"></script>
  <script src="/assets/build/main.min.js"></script>
</body>

</html>
`;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    responseRenderer.toStream().pipe(res);
  }
}

