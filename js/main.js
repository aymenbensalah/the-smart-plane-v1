(function() {

  var posx_bg;
  var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    playerSp = document.getElementById("player"),
    playerctx = playerSp.getContext("2d"),
    ui = document.getElementById("ui"),
    uictx = ui.getContext("2d"),
    choises = document.getElementById("choises"),
    choisesctx = choises.getContext("2d"),
    imgs = {
      bg: new Image(),
      grass: new Image(),
      plane: new Image()
    },
    audio = {
      planeAudio: new Audio("audio/avion1.ogg"),
      successAudio: new Audio("audio/laser1.mp3"),
      flieldAudio: new Audio("audio/ALERT_Error.ogg")
    },
    audioposx_bg = 10,
    posy_personnage = 200,
    posx_personnage = 300,
    var_operation = {
      i: 0,
      x: 0,
      y: 0
    },
    formule,
    operateur = ["/", "*", "+", "-"],
    op_indice = 0,
    posx = 1,
    detect = false,
    personnage_width = 90,
    personnage_heigth = 64,
    maincv = document.getElementById("bgmainMenu"),
    ctxmain = maincv.getContext("2d"),
    menuImgs = {
      bg: new Image(),
      start: new Image(),
      options: new Image(),
      exit: new Image(),
      volume: new Image(),
      range: new Image(),
      btn: new Image()
    },
    gameOvercv = document.getElementById("gameOver"),
    ctxGameOver = gameOvercv.getContext("2d"),
    gameOverImgs = {
      gameOver: new Image(),
      restart: new Image()
    },
    gameOverVar = false,
    requestAnimationFrame = function(callback, d) {
      window.setTimeout(callback, 1000 / d);
    },
    draw_bg = function() {
      imgs.bg.onload = function() {
        ctx.drawImage(imgs.bg, posx_bg, 0, 1156, 600);
        ctx.drawImage(imgs.bg, posx_bg + imgs.bg.width - 2, 0, 1100, 600);

        requestAnimationFrame(imgs.bg.onload, 200);

        if (!gameOverVar) {
          posx_bg = (posx_bg - 1) % 250;
        } else {
          posx_bg = 0;
        }
      };

      requestAnimationFrame(imgs.bg.onload, 200);
    },
    drawPlane = function() {
      var animation = function() {
        if (!gameOverVar) {
          audio.planeAudio.play();
        } else {
          audio.planeAudio.pause();
        }

        playerctx.clearRect(posx_personnage - 5, posy_personnage - 5, 800, 800);

        playerctx.drawImage(imgs.plane, posx_personnage, posy_personnage);

        requestAnimationFrame(animation);
      };

      requestAnimationFrame(animation);

      document.onkeydown = function(evt) {
        console.log(evt.keyCode && gameOverVar == false);

        if (evt.keyCode == 40) {
          if (posy_personnage < imgs.bg.height - 200)
            posy_personnage = posy_personnage + 4;
        }

        if (evt.keyCode == 38) {
          if (posy_personnage > 40) posy_personnage = posy_personnage - 4;
        }

        if (gameOverVar) {
          playerctx.clearRect(0, 0, 1160, 600);
          posy_personnage = 100;
        }
      };
    },
    harderi = 0,
    harderj = 1,
    tab_choises = ["", "", ""],
    true_choise,
    false_choise,
    indice_true,
    i = 0,
    posy_choises = 100,
    posx_choises = 1000,
    iReturn = true,
    Score = 0,
    j = 0,
    xGameOver = 420,
    yGameOver = 100,
    xRestart = 500,
    yRestart = 380,
    optionscv = document.getElementById("optionsMenu"),
    ctxoption = optionscv.getContext("2d"),
    xVolume = 400,
    yVolume = 50,
    xRange = 375,
    yRange = 200,
    xBtn = 400,
    yBtn = 215;

  //src of imgs
  imgs.bg.src = "sprites/bg.png";
  imgs.plane.src = "sprites/plane.png";

  //Game Over zone
  gameOverImgs.gameOver.src = "sprites/GAME OVER.PNG";
  gameOverImgs.restart.src = "sprites/RESTRAT.PNG";

 var  c_operation = function(Score) {
    if (Score > harderj + 27 && j < 8) {
      harderi++;
      harderj++;
    } else {
      j = 0;
      i = 0;
    }

    var_operation.x = Math.round(Math.random() + harderi) * 10;
    var_operation.y = Math.round(Math.random() + harderj) * 10;

    var Operation = function() {
      var random = Math.random();

      if (random == 0) {
        op_indice = 0;
      } else {
        op_indice = Math.round(random + 1);
      }

      console.log(op_indice + " c indice ");
      //var_operation.x = Math.round(Math.random())*10;
      // var_operation.y = Math.round(Math.random())*10;

      formule =
        var_operation.x.toString() +
        operateur[op_indice] +
        var_operation.y.toString();

      uictx.save();
      uictx.fillStyle = "white";
      uictx.strokeStyle = "blue";
      uictx.fillRect(400, 500, 300, 100);
      uictx.fillStyle = "red";
      uictx.font = "64px Showcard Gothic";
      uictx.fillText(formule, 450, 570);

      console.log("le formule " + formule);
      //posx++;

      return formule;
      //requestAnimationFrame(Operation,60);
    };

    return Operation();
  };

  //score function
  var drawScore = function(score) {
    if (score == undefined) score = 0;

    uictx.clearRect(890, 540, 400, 450);
    uictx.fillStyle = "white";
    uictx.font = "40px Showcard Gothic ";
    uictx.fillText("Score : " + score, 900, 590);
  };

  //@todo: why encapsulate the 'draw_choises' into 'choises'?
  //any need for reuse?
  choises = function() {
    var draw_choises = function() {
      var x_bgChoise,
        y_bgChoise,
        widthBgChoise = 80,
        heightBgChoise = 80,
        random;
        var falseChoisesTab = [0,0,0];

      if (iReturn) {
        c_operation(Score);
        true_choise = eval(c_operation(Score));
        let false_choise1 = Math.round(Math.random() + 2) * 12;
        let false_choise2 = Math.round(Math.random() + 6) * 12;
        let false_choise3 = Math.round(Math.random() + 10) * 10;
        falseChoisesTab = [false_choise1, false_choise2, false_choise];
        random = Math.random();

        if (random == 0) {
          indice_true = Math.round(random);
        } else {
          indice_true = Math.round(random + j);
        }

        iReturn = false;

        //  console.log(indice_true);
        tab_choises[indice_true] = true_choise.toString();

        //console.log('form loop choises');
      }

      posy_choises = 100;
      choisesctx.clearRect(posx_choises - 50, posy_choises - 50, 900, 900);

      for (i = 0; i < tab_choises.length; i++) {
        if (i != indice_true) tab_choises[i] = falseChoisesTab[i];

        choisesctx.fillStyle = "yellow";
        choisesctx.strokeStyle = "blue";
        x_bgChoise = posx_choises - 10;
        y_bgChoise = posy_choises - 40;

        choisesctx.fillRect(
          x_bgChoise,
          y_bgChoise,
          widthBgChoise,
          heightBgChoise
        );

        choisesctx.fillStyle = "blue";
        choisesctx.font = "50px Showcard Gothic";
        choisesctx.fillText(tab_choises[i], posx_choises, posy_choises);

        posy_choises += 170;

        //detect  collusion

        if (
          posx_personnage < x_bgChoise + widthBgChoise &&
          posx_personnage + personnage_width > x_bgChoise &&
          posy_personnage < y_bgChoise + heightBgChoise &&
          posy_personnage + personnage_heigth > y_bgChoise &&
          tab_choises[i] == true_choise
        ) {
          tab_choises.splice(i, 1);
          audio.succesAudio.play();
          Score = Score + 10;
          drawScore(Score);
          posx_choises = posx_choises - 200;
        } else if (
          posx_personnage < x_bgChoise + widthBgChoise &&
          posx_personnage + personnage_width > x_bgChoise &&
          posy_personnage < y_bgChoise + heightBgChoise &&
          posy_personnage + personnage_heigth > y_bgChoise &&
          tab_choises[i] != true_choise
        ) {
          audio.flieldAudio.play();
          //Score = Score -10;
          drawScore(Score);
          choisesctx.clearRect(posx_choises - 50, posy_choises - 50, 900, 900);
          posx_choises = posx_choises - 200;
          gameOver();
          Score = 0;
        }
      }

      if (!gameOverVar) {
        posx_choises = posx_choises - 1;
      } else {
        posx_choises = 0;
      }

      //Ruturn on the first position
      if (posx_choises < -100) {
        posx_choises = 1200;
        console.log("i return");
        iReturn = true;
        j = (j + 1) % 2;
      }

      requestAnimationFrame(draw_choises, 200);
    };

    draw_choises();
  };

  var mainDraw = function() {
    drawScore();
    choises();
    draw_bg();
    drawPlane();
  };

  var gameOver = function() {
    gameOverVar = true;
    console.log("from gameOver");
    gameOvercv.style.zIndex = "7";
    gameOverImgs.gameOver.onload = function() {
      ctxGameOver.drawImage(
        gameOverImgs.gameOver,
        xGameOver,
        yGameOver,
        400,
        160
      );
    };

    gameOverImgs.restart.onload = function() {
      ctxGameOver.drawImage(gameOverImgs.restart, xRestart, yRestart, 200, 80);
    };

    gameOvercv.addEventListener(
      "click",
      function() {
        onmousedown = function(evt) {
          var xmouse = evt.pageX, ymouse = evt.pageY;
          if (
            xmouse < xRestart + 200 &&
            xmouse > xRestart &&
            ymouse < yRestart + 80 &&
            ymouse > yRestart
          ) {
            console.log("hellow from restart");
            ctxGameOver.clearRect(0, 0, 1150, 600);
            gameOverVar = false;
            posx_bg = 0;
            posx_choises = -100;
            posy_personnage = 200;
            ctx.clearRect(0, 0, 1160, 600);
            playerctx.clearRect(0, 0, 1160, 600);
            mainDraw();

            gameOvercv.style.zIndex = "7";
          }
        };
      },
      false
    );

    // pause();
    requestAnimationFrame(gameOverImgs.gameOver.onload);
    requestAnimationFrame(gameOverImgs.restart.onload);
  };

  // Src of imgs menu
  menuImgs.bg.src = "sprites/menubg.png";
  menuImgs.start.src = "sprites/START.png";
  menuImgs.options.src = "sprites/OPTIONS.png";
  menuImgs.exit.src = "sprites/EXIT.png";
  menuImgs.volume.src = "sprites/volume.png";
  menuImgs.range.src = "sprites/range.png";
  menuImgs.btn.src = "sprites/btn.png";

  var drawBg = function() {
    menuImgs.bg.onload = function() {
      ctxmain.drawImage(menuImgs.bg, 0, 0, 1200, 600);
    };
  };

  var drawOptions = function() {
    menuImgs.start.onload = function() {
      ctxoption.drawImage(menuImgs.start, 450, 100, 250, 80);
    };

    menuImgs.options.onload = function() {
      ctxoption.drawImage(menuImgs.options, 450, 200, 250, 80);
    };

    menuImgs.exit.onload = function() {
      ctxoption.drawImage(menuImgs.exit, 450, 300, 250, 80);
    };
  };

  var volumeInit = function() {
    menuImgs.range.onload = function() {};
    menuImgs.volume.onload = function() {};
    menuImgs.btn.onload = function() {};
  };

  var volumeDraw = function() {
    ctxoption.drawImage(menuImgs.range, xRange, yRange, 530, 80);
    ctxoption.drawImage(menuImgs.volume, xVolume, yVolume, 500, 80);
    ctxoption.drawImage(menuImgs.btn, xBtn, yBtn, 10, 50);
  };

  var controls = function() {
    optionscv.addEventListener(
      "click",
      function() {
        var xstartbn = 450,
          ystartbn = 100,
          startbnheight = 80,
          startbnwidth = 250,
          xexit = 450,
          yexit = 300,
          exitHeight = 80,
          exitWidth = 250,
          xOptions = 450,
          yOptions = 200,
          optionsHeight = 80,
          optionsWidth = 250;

        onmousedown = function(evt) {
          var xmouse = evt.pageX, ymouse = evt.pageY;

          //detect the position of the mouse if there's a start btn
          if (
            xmouse < xstartbn + startbnwidth &&
            xmouse > xstartbn &&
            ymouse < ystartbn + startbnheight &&
            ymouse > ystartbn
          ) {
            ctxoption.clearRect(0, 0, optionscv.width, optionscv.height);
            ctxmain.clearRect(0, 0, maincv.width, maincv.height);
            console.log("form controls");
            optionscv.style.zIndex = "6";
            mainDraw();
          }

          //detect the position of options button
          if (
            xmouse < xOptions + optionsWidth &&
            xmouse > xOptions &&
            ymouse < yOptions + optionsHeight &&
            ymouse > yOptions
          ) {
            ctxoption.clearRect(0, 0, 1150, 600);
            console.log("from options btn ");
            volumeDraw();
          }

          //detect the position of mouse if there's an exit btn
          if (
            xmouse < xexit + exitWidth &&
            xmouse > xexit &&
            ymouse < yexit + exitHeight &&
            ymouse > yexit
          ) {
            window.close();
          }
        };
      },
      false
    );
  };

  var mainMenu = function() {
    controls();
    drawBg();
    drawOptions();
    volumeInit();
  };

  mainMenu();
})();
