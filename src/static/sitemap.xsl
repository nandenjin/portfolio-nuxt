<xsl:stylesheet version="1.0" 
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"> 
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap - Kazumi Inada Portfolio</title>
        <meta name="viewport" content="width=device-width" />
        <style>
          html, body {
            font: normal 14px Helvetica, 'Hiragino Kaku Gothic', Arial, YuGothic, sans-serif;
            line-height: 1.8em;
          }

          main {
            width: calc(100vw - 30px * 2);
            max-width: 800px;
            margin: auto
          }

          h1, h2, h3 {
            font-weight: normal;
          }

          h1 {
            margin: 30px auto;
          }

          a {
            color: #06f;
            text-decoration: none;
          }

          ul {
            margin: 30px auto
          }

          li {
            margin: auto;
          }
        </style>
      </head>
      <body>
        <main>
          <h1>
            <xsl:text>Sitemap - Kazumi Inada Portfolio</xsl:text>
          </h1>
          <p style="color: #888">
            <xsl:text>This is machine-readable sitemap for search engine, being automatically updated every time of the site update.</xsl:text>
          </p>
          <p style="color: #888">
            <xsl:text>Source of contents is available on </xsl:text>
            <a href="https://github.com/nandenjin/portfolio">
              <xsl:text>Github</xsl:text>
            </a>
            <xsl:text>.</xsl:text>
          </p>
          <xsl:apply-templates select="sitemap:urlset" />
        </main>
      </body>
    </html>
  </xsl:template>
  <xsl:template match="sitemap:urlset">
    <ul>
      <xsl:apply-templates select="./sitemap:url" />
    </ul>
  </xsl:template>
  <xsl:template match="sitemap:url">
    <li>
      <a>
        <xsl:attribute name="href">
          <xsl:value-of select="./sitemap:loc" />
        </xsl:attribute>
        <xsl:value-of select="./sitemap:loc" />
      </a>
    </li>
  </xsl:template>
</xsl:stylesheet>