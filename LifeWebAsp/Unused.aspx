<%@ Page Language="C#" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head runat="server">
    <title>John Horton Conway's Game of Life</title>
    <WebSharper:ScriptManager runat="server" />
  </head>
  <body>
      <div>
        <ws:CanvasFrame runat="server"/>
      </div>
  </body>
</html>
