export default `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>p2p export</title>
    <style>
      body {
        font-size: 0;
        margin: 0;
        width: 100%;
        min-width: 1090px;
        position: relative;
      }
      .document {
        width: 100%;
        overflow: hidden;
        position: relative;
      }
      .document .img {
        position: relative;
        margin: auto;
        width: 1090px;
        overflow: visible;
      }
      .document .img > img {
        position: relative;
        width: 1920px;
        left: 50%;
        top: 0;
        margin-left: -960px;
        display: block;
      }
      .document .hot {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }
      .document .hot .item-container {
        position: relative;
        width: 1920px;
        left: 50%;
        margin-left: -960px;
      }
      .document .hot .item-container > * {
        display: block;
        position: absolute;
      }
    </style>
  </head>
  <body>
    <div class="document">
      <div class="img">
        <% for (var i = 0; i < imageSize; i++) { %>
          <img src="./image<%= i %>.jpg">
        <% } %>
      </div>
      <div class="hot">
        <div class="item-container">
          {{each data $value}}
            {{if $value.type == "video"}}
              <video src="{{$value.data.src}}" style="width: {{$value.width}}px; height: {{$value.height}}px; left: {{$value.x1}}px; top: {{$value.y1}}px;"></video>
            {{/if}}
            {{if $value.type == "link"}}
              <a href="{{$value.data.href}}" target="{{$value.data.target}}" style="width: {{$value.width}}px; height: {{$value.height}}px; left: {{$value.x1}}px; top: {{$value.y1}}px;"></a>
            {{/if}}
            {{if $value.type == "img"}}
              <img src="{{$value.data.src}}" style="width: {{$value.width}}px; height: {{$value.height}}px; left: {{$value.x1}}px; top: {{$value.y1}}px;"></img>
            {{/if}}
          {{/each}}
        </div>
      </div>
    </div>
  </body>
</html>
`