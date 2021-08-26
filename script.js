    var canvas = document.getElementById("canvas");
    var brush = canvas.getContext("2d");

    document.getElementById("Button00").addEventListener("click", function() { tool = 0});
    document.getElementById("Button01").addEventListener("click", function() { tool = 1});
    document.getElementById("Button02").addEventListener("click", function() { tool = 2});
    document.getElementById("Button03").addEventListener("click", function() { tool = 3});

    var tool;
    var xfinal;
    var xinitial;
    var yinitial;
    var ximmediate;
    var yimmediate;
    var yfinal;
    var radius;
    var xcateto;
    var ycateto;
    var drawing = false;

    canvas.addEventListener('mousedown', logInitialPosition);
    canvas.addEventListener('mousedown', beginDrawing);
    canvas.addEventListener('mousemove', logImmediatePosition)
    canvas.addEventListener('mousemove', drawPixel)
    canvas.addEventListener('mouseup', logFinalPosition);
    document.addEventListener('mouseup', endDrawing);
    
    function logInitialPosition(event)
    {
        xinitial = event.pageX - canvas.offsetLeft -5;
        yinitial = event.pageY - canvas.offsetTop -5;
    }

    function logImmediatePosition(event)
    {
        ximmediate = event.pageX - canvas.offsetLeft -5;
        yimmediate = event.pageY - canvas.offsetTop -5;
    }

    function logFinalPosition(event)
    {
        xfinal = event.pageX - canvas.offsetLeft -5;
        yfinal = event.pageY - canvas.offsetTop -5;
    }

    function drawPixel()
    {
        if(drawing == true)
        brush.fillRect(ximmediate, yimmediate, 2, 2);
    }

    function calcCateto()
    {
        xcateto = Math.abs(xinitial - xfinal);
        ycateto = Math.abs(yinitial - yfinal);
    }

    function beginDrawing()
    {
        switch(tool)
        {
            case 0:
                // Começa a desenhar pixels
                canvas.addEventListener("mousemove", function(){drawing = true});
                break;
            case 1:
                // Começa uma linha reta
                brush.moveTo(xinitial, yinitial);
                break;
            case 2:
                // Começa o círculo
                brush.beginPath(xinitial, yinitial);
                break;
        }
    }


    function endDrawing()
    {
        switch(tool)
        {
            case 0:
            canvas.addEventListener("mousemove", function(){drawing = false});
                break;
            case 1:
                // Termina a linha
                brush.lineTo(xfinal, yfinal);
                brush.stroke();
                break;

            case 2:
                // Faz um círculo perfeito
                // A fazer: permitir a criação de círculos imperfeitos
                
                calcCateto();
                brush.arc(xinitial, yinitial, Math.hypot(xcateto, ycateto), 0, 2 * Math.PI);
                brush.stroke();
                break;

            case 3:
                // Faz o retângulo
                calcCateto()
                brush.fillRect(xinitial, yinitial, xcateto, ycateto)
        }
    }