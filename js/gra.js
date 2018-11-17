$(function() {

  var container = $('.container');
  //Single or Multi Player menu===========
  var menuContainer = $("<div class='menuContainer'>");
  container.append(menuContainer);

  var gameTitle = $("<div class='gameTitle'>");
  menuContainer.append(gameTitle);
  gameTitle.text("The Links Adventures")

  var buttonsContainer = $("<div class='buttonsContainer'>");
  menuContainer.append(buttonsContainer);

  var singlePlayerBtn = $("<div class='singlePlayerBtn menuButton'>");
  singlePlayerBtn.text("Single Player");
  buttonsContainer.append(singlePlayerBtn);
  var multiPlayerBtn = $("<div class='multiPlayerBtn menuButton'>");
  multiPlayerBtn.text("Multi Player");
  buttonsContainer.append(multiPlayerBtn);

  singlePlayerBtn.on("click",function(){
    menuContainer.hide();
    singleInstructions.show();
  });
  multiPlayerBtn.on("click",function(){
    menuContainer.hide();
    multiInstructions.show();
  });

  //Intruction=============================
  var singleInstructions = $("<div class='singleInstructions instructions'>");
  container.append(singleInstructions);
  singleInstructions.hide();

  var multiInstructions = $("<div class='multiInstructions instructions'>");
  container.append(multiInstructions);
  multiInstructions.hide();

  var singlePlayBtn = $("<div class='singlePlayBtn menuButton'>");
  singlePlayBtn.text("Play");
  var singleInstructionText = $("<div class='singleInstructionText'>");
  singleInstructionText.text("Get the precious items from other side of the river and place them in to wooden chest. Use arrows to get there. Be awere of big spider!");
  singleInstructions.append(singleInstructionText)
  singleInstructions.append(singlePlayBtn);

  var multiPlayBtn = $("<div class='multiPlayBtn menuButton'>");
  multiPlayBtn.text("Play");
  var multiInstructionText = $("<div class='multiInstructionText'>");
  multiInstructionText.text("Just one can win. Get precious items from other side of the river and place them in to wooden chest. Player 1 use arrows, Player 2 WSAD. Be awere of big spider!");
  multiInstructions.append(multiInstructionText);
  multiInstructions.append(multiPlayBtn);

  //Play Buttons===========================
  singlePlayBtn.on("click",function(){
    singleInstructions.hide();
    singlePlayer();
  });
  multiPlayBtn.on("click",function(){
    multiInstructions.hide();
    multiPlayer();
  });

  //Back to MENU Button===================
  var backToMenuBtnSPmenu = $("<div class='backToMenuBtnSPmenu menuButton'>");
  backToMenuBtnSPmenu.text("Back To Menu");
  singleInstructions.append(backToMenuBtnSPmenu);
  backToMenuBtnSPmenu.on("click",function(){
    location.reload();
  })

  var backToMenuBtnMPmenu = $("<div class='backToMenuBtnMPmenu menuButton'>");
  backToMenuBtnMPmenu.text("Back To Menu");
  multiInstructions.append(backToMenuBtnMPmenu);
  backToMenuBtnMPmenu.on("click",function(){
    location.reload();
  })


  function singlePlayer() {

    var container = $('.container');
    var mainContainer = $('.mainContainer');
    var tableContainer = $('.tableContainer');
    var tableContainerTop = $('.tableContainerTop');
    var tableContainerDown = $('.tableContainerDown');

    //Trophies class=============
    class Trophies {
      constructor(name, PosX, PosY, id) {
        this.name = name;
        this.PosX = PosX;
        this.PosY = PosY;
        this.id = id;
        this.initPosX = PosX;
        this.initPosY = PosY;
        this.el = $("<div class='" + name + "'>");
        this.setPosition();
      }
      hide() {
        $(this.el).hide();
        this.PosX = -1;
        this.PosY = -1;
        player1.trophie = this.id;
        console.log(this.el);
      }
      show() {
        $(this.el).show();
        this.PosX = this.initPosX;
        this.PosY = this.initPosY;
      }
      setPosition(){
        this.el.css('left', this.PosX * 50);
        this.el.css('bottom', this.PosY * 50);
        container.append(this.el);
      }
    }

    var trophie_1 = new Trophies("trophie_1-1", 1, 10, 1);
    var trophie_2 = new Trophies("trophie_1-2", 5, 10, 2);
    var trophie_3 = new Trophies("trophie_1-3", 9, 10, 3);

    var trophiesTab = [
      trophie_1,
      trophie_2,
      trophie_3
    ]

    // ============================================================ Trophies END
    // Chests ==================================================================
    var chest1 = $("<div class='chest1'>");
    container.append(chest1);
    chest1.css('left', 255);
    chest1.css('bottom', 3);

    // =============================================================== Chest END

    var tresure1 = 0;

    class player {
      constructor(name, PosY) {
        this.name = name;
        this.PosX = 5;
        this.PosY = PosY;
        this.object = $('.' + name);
        this.speed = 0;
        this.direction = "";
        this.lifes = 3;
        this.items = 0;
        this.trophie = -1;
        this.el = $("<div class='" + name + "'>");
        this.setPosition();
      }

      setPosition(){
        this.el.css('left', this.PosX * 50);
        this.el.css('bottom', this.PosY * 50);
        container.append(this.el);
      }

      checkPosition(x, y) {
        for (var i = 0; i < raftsTab.length; i++) {
          if (x == raftsTab[i].PosX && y == raftsTab[i].PosY) {
            let thisRaft = raftsTab[i];
            console.log(x, y);
            console.log(thisRaft);
            clearInterval(MoveToPlayer);
            movePlayer(thisRaft);
            return;
          }
        }
        //player dead================
        var lvl0 = 0;
        var lvl5 = 5;
        var lvl10 = 10;

        for (var i = 0; i < raftsTab.length; i++) {
          if (x !== raftsTab[i].PosX && y !== raftsTab[i].PosY && y !== lvl0 && y !== lvl5 && y !== lvl10) {
            player1.lifes = player1.lifes - 1;
            $('.lifes').text("Player lifes: " + player1.lifes);

            for (var i = 0; i < trophiesTab.length; i++) {
              if (player1.trophie - 1 == i) {
                trophiesTab[i].show();
                player1.trophie = -1;
              }
            }
            player1.PosX = 5;
            player1.PosY = 0;
            clearInterval(MoveToPlayer);
            changePosition();
            return;
          }
        }

        for (var i = 0; i < trophiesTab.length; i++) {
          if (x == trophiesTab[i].PosX && y == trophiesTab[i].PosY && player1.trophie == -1) {
            trophiesTab[i].hide();
          }
        }

        if (x == lvl5 && y == lvl0 && player1.trophie !== -1) {
          tresure1 = tresure1 + player1.trophie;
          player1.items = player1.items + 1;
          $('.items').text("Gathered items: " + player1.items + "/3");
          player1.trophie = -1;
          console.log(tresure1);
        }
        clearInterval(MoveToPlayer);
      }

      // checkPosition2(x, y) {
      //   for (var i = 0; i < raftsTab.length; i++) {
      //     if (x == raftsTab[i].PosX && y == raftsTab[i].PosY) {
      //       let thisRaft = raftsTab[i];
      //       console.log(x, y);
      //       console.log(thisRaft);
      //       clearInterval(MoveToPlayer);
      //       movePlayer(thisRaft);
      //       return;
      //     }
      //   }
      //   //player dead================
      //   for (var i = 0; i < raftsTab.length; i++) {
      //     if (x !== raftsTab[i].PosX && y !== raftsTab[i].PosY && y !== lvl0 && y !== lvl5 && y !== lvl10) {
      //       player2.lifes = player2.lifes - 1;
      //       $('.lifes2').text("Player2 lifes: " + player2.lifes);
      //
      //       for (var i = 0; i < trophiesTab.length; i++) {
      //         if (player2.trophie - 1 == i) {
      //           trophiesTab[i].show();
      //           player2.trophie = -1;
      //         }
      //       }
      //       player2.PosX = 5;
      //       player2.PosY = 0;
      //       clearInterval(MoveToPlayer);
      //       changePosition();
      //       return;
      //     }
      //   }
      //
      //   for (var i = 0; i < trophiesTab.length; i++) {
      //     if (x == trophiesTab[i].PosX && y == trophiesTab[i].PosY && player2.trophie == -1) {
      //       trophiesTab[i].hide();
      //     }
      //   }
      //
      //   if (x == 5 && y == 0 && player2.trophie !== -1) {
      //     tresure2 = tresure2 + player2.trophie;
      //     player2.items = player2.items + 1;
      //     $('.items2').text("Gathered items: " + player2.items + "/3");
      //     player2.trophie = -1;
      //     console.log(tresure2);
      //   }
      //   clearInterval(MoveToPlayer);
      // }
    }



    var MoveToPlayer = "";

    function movePlayer(thisRaft) {
      clearInterval(MoveToPlayer);
      MoveToPlayer = setInterval(() => {
        player1.PosX = thisRaft.PosX;
        player1.PosY = thisRaft.PosY;
        $('.player1').css('left', thisRaft.PosX * 50);
        $('.player1').css('bottom', thisRaft.PosY * 50);
      }, 1)
    }

    var MoveToPlayer2 = "";

    function movePlayer2(thisRaft) {
      clearInterval(MoveToPlayer2);
      MoveToPlayer2 = setInterval(() => {
        player2.PosX = thisRaft.PosX;
        player2.PosY = thisRaft.PosY;
        $('.player2').css('left', thisRaft.PosX * 50);
        $('.player2').css('bottom', thisRaft.PosY * 50);
      }, 1)
    }

    let player1 = new player("player1", 0);

    let players = [
      player1,
    ]

    if(player1.lifes < 1){
      return;
    }


    //Rafts class ================

    class rafts {
      constructor(PosX, PosY, speed, name, MaxXLeft, MaxXRight) {
        this.PosX = PosX;
        this.PosY = PosY;
        this.object = name;
        this.on = false;
        this.speed = speed;
        this.direction = "";
        this.MaxXLeft = MaxXLeft;
        this.MaxXRight = MaxXRight;
        this.el = $("<div class='" + name + "'>");
        this.setPosition();
      }

      setPosition(){
        this.el.css('left', this.PosX * 50);
        this.el.css('bottom', this.PosY * 50);
        container.append(this.el);
      }
    }

    var RaftSpeed1 = 800;
    var RaftSpeed2 = 1000;

    //Each raft create and put in HTML========
    // Line 1=================
    var raft_1 = new rafts(6, 1, RaftSpeed1, "tratwa_1-1", 0, 4);
    var raft_2 = new rafts(10, 1, RaftSpeed1, "tratwa_1-2", 4, 10);
    // Line 2=================
    var raft_3 = new rafts(4, 2, RaftSpeed2, "tratwa_2-1", 0, 4);
    var raft_4 = new rafts(8, 2, RaftSpeed2, "tratwa_2-2", 4, 10);
    // Line 3=================
    var raft_5 = new rafts(6, 3, RaftSpeed1, "tratwa_3-1", 0, 4);
    var raft_6 = new rafts(10, 3, RaftSpeed1, "tratwa_3-2", 4, 10);
    // Line 4=================
    var raft_7 = new rafts(4, 4, RaftSpeed2, "tratwa_4-1", 0, 4);
    var raft_8 = new rafts(8, 4, RaftSpeed2, "tratwa_4-2", 4, 10);
    // Line 5=================
    var raft_9 = new rafts(6, 6, RaftSpeed1, "tratwa_5-1", 0, 4);
    var raft_10 = new rafts(10, 6, RaftSpeed1, "tratwa_5-2", 4, 10);
    // Line 6=================
    var raft_11 = new rafts(4, 7, RaftSpeed2, "tratwa_6-1", 0, 4);
    var raft_12 = new rafts(8, 7, RaftSpeed2, "tratwa_6-2", 4, 10);
    // Line 7=================
    var raft_13 = new rafts(6, 8, RaftSpeed1, "tratwa_7-1", 0, 4);
    var raft_14 = new rafts(10, 8, RaftSpeed1, "tratwa_7-2", 4, 10);
    // Line 8=================
    var raft_15 = new rafts(4, 9, RaftSpeed2, "tratwa_8-1", 0, 4);
    var raft_16 = new rafts(8, 9, RaftSpeed2, "tratwa_8-2", 4, 10);

    var raftsTab = [
      raft_1, raft_2,
      raft_3, raft_4,
      raft_5, raft_6,
      raft_7, raft_8,
      raft_9, raft_10,
      raft_11, raft_12,
      raft_13, raft_14,
      raft_15, raft_16
    ]

    Move = (speed, direction, element, MaxXLeft, MaxXRight) => {
      element.speed = speed;
      element.direction = direction;
      element.MaxXLeft = MaxXLeft;
      element.MaxXRight = MaxXRight;

      let MoveTo = setInterval(function() {
        if (element.direction == "left") {
          if (element.PosX !== MaxXLeft) {
            element.PosX = element.PosX - 1;
            $(element.el).css('left', element.PosX * 50);
          } else {
            element.direction = "right";
          }
        } else if (element.direction == "right") {
          if (element.PosX !== MaxXRight) {
            element.PosX = element.PosX + 1;
            $(element.el).css('left', element.PosX * 50);
          } else if (element.PosX == MaxXRight) {
            element.direction = "left";
          }
        }
      }, speed)
    }

    // Line 1 rafts===================
    Move(raftsTab[0].speed, "left", raftsTab[0], 0, 6);
    Move(raftsTab[1].speed, "left", raftsTab[1], 4, 10);

    // Line 3 rafts===================
    Move(raftsTab[2].speed, "right", raftsTab[2], 0, 6);
    Move(raftsTab[3].speed, "right", raftsTab[3], 4, 10);

    // Line 3 rafts===================
    Move(raftsTab[4].speed, "left", raftsTab[4], 0, 6);
    Move(raftsTab[5].speed, "left", raftsTab[5], 4, 10);

    // Line 4 rafts===================
    Move(raftsTab[6].speed, "right", raftsTab[6], 0, 6);
    Move(raftsTab[7].speed, "right", raftsTab[7], 4, 10);

    // Line 5 rafts===================
    Move(raftsTab[8].speed, "left", raftsTab[8], 0, 6);
    Move(raftsTab[9].speed, "left", raftsTab[9], 4, 10);

    // Line 6 rafts===================
    Move(raftsTab[10].speed, "right", raftsTab[10], 0, 6);
    Move(raftsTab[11].speed, "right", raftsTab[11], 4, 10);

    // Line 7 rafts===================
    Move(raftsTab[12].speed, "left", raftsTab[12], 0, 6);
    Move(raftsTab[13].speed, "left", raftsTab[13], 4, 10);

    // Line 8 rafts===================
    Move(raftsTab[14].speed, "right", raftsTab[14], 0, 6);
    Move(raftsTab[15].speed, "right", raftsTab[15], 4, 10);


    //SPIDER==================
    var monsterSpeed = 800;

    class monster {
      constructor(PosX, PosY, speed, name, MaxXLeft, MaxXRight) {
        this.PosX = PosX;
        this.PosY = PosY;
        this.object = name;
        this.speed = speed;
        this.direction = "";
        this.MaxXLeft = MaxXLeft;
        this.MaxXRight = MaxXRight;
        this.el = $("<div class='" + name + "'>")
        this.setPosition();
      }
      setPosition(){
        this.el.css('left', this.PosX * 50);
        this.el.css('top', this.PosY * 50);
        container.append(this.el)
      }
    }

    var spider = new monster(4, 5, monsterSpeed, "spider", 0, 10);

    Move(spider.speed, "right", spider, 0, 10);

    let MoveMonster = setInterval(function() {
      for(var i=0; i<players.length; i++){
        if(spider.PosX == players[i].PosX && spider.PosY == players[i].PosY){
          player1.lifes = player1.lifes - 1;
          $('.lifes').text("Player lifes: " + player1.lifes);

          for (var i = 0; i < trophiesTab.length; i++) {
            if (player1.trophie - 1 == i) {
              trophiesTab[i].show();
              player1.trophie = -1;
            }
          }
          player1.PosX = 5;
          player1.PosY = 0;
          clearInterval(MoveToPlayer);
          changePosition();
          return;
        }
      }

    }, 10)

    // =======================


    $("body").keydown(function(e) {
      switch (e.which) {
        case 39:
          changePosition('right');
          break;
        case 37:
          changePosition('left');
          break;
        case 38:
          changePosition('up');
          break;
        case 40:
          changePosition('down');
          break;
        default:
          console.log("use arrows");
      }
    });

    changePosition = (direction) => {
      if(player1.lifes < 1){
        player1.PosX = 5;
        player1.PosY = 0;
        $('.player1').css('left', player1.PosX * 50);
        $('.player1').css('bottom', player1.PosY * 50);

        var gameTitle = $("<div class='gameTitle'>");
        menuContainer.append(gameTitle);
        gameTitle.text("The Links Adventures")

        var buttonsContainer = $("<div class='buttonsContainer'>");
        menuContainer.append(buttonsContainer);

        $(".gameTitle").show();
        $(".buttonsContainer").show();
        // location.reload();
        //tutaj można dać warunek że jak player ma 0 żyć to gra się kończy.
      }else{
        if (direction == 'right') {
          if (player1.PosX < 10) {
            player1.PosX = player1.PosX + 1;
            $('.player1').css('left', player1.PosX * 50);
            $('.player1').css('bottom', player1.PosY * 50);
            player1.checkPosition(player1.PosX, player1.PosY);
          }
        } else if (direction == 'left') {
          if (player1.PosX > 0) {
            player1.PosX = player1.PosX - 1;
            $('.player1').css('left', player1.PosX * 50);
            $('.player1').css('bottom', player1.PosY * 50);
            player1.checkPosition(player1.PosX, player1.PosY);
          }
        } else if (direction == "up") {
          if (player1.PosY < 10) {
            player1.PosY = player1.PosY + 1;
            $('.player1').css('bottom', player1.PosX * 50);
            $('.player1').css('bottom', player1.PosY * 50);
            player1.checkPosition(player1.PosX, player1.PosY);
          }
        } else if (direction == "down") {
          if (player1.PosY > 0) {
            player1.PosY = player1.PosY - 1;
            $('.player1').css('bottom', player1.PosX * 50);
            $('.player1').css('bottom', player1.PosY * 50);
            player1.checkPosition(player1.PosX, player1.PosY);
          }
        } else {
          $('.player1').css('bottom', player1.PosY * 50);
          $('.player1').css('left', player1.PosX * 50);
        }
      }
    };

    //INFO TABLE===================
    var tableContainer = $("<div class='tableContainer'>");
    mainContainer.append(tableContainer);

    var lifes = $("<div class='lifes'>");
    tableContainer.append(lifes);
    $('.lifes').text("Player lifes: " + player1.lifes);

    var items = $("<div class='items'>");
    tableContainer.append(items);
    $('.items').text("Gathered items: " + player1.items + "/3");

    //Back To Menu Button===========
    var backToMenuBtnSPgame = $("<div class='backToMenuBtnSPgame menuButton'>");
    backToMenuBtnSPgame.text("Back To Menu");
    mainContainer.append(backToMenuBtnSPgame);

    backToMenuBtnSPgame.on("click",function(){
      location.reload();
    })
  }

//=============================================================================
//=============================================================================
//======================    MULTIPLAYER      ==================================
//=============================================================================
//=============================================================================

  function multiPlayer() {

    var container = $('.container');
    var mainContainer = $('.mainContainer');
    var tableContainer = $('.tableContainer');
    //Trophies class=============
    class Trophies {
      constructor(name, PosX, PosY, id) {
        this.name = name;
        this.PosX = PosX;
        this.PosY = PosY;
        this.id = id;
        this.initPosX = PosX;
        this.initPosY = PosY;
        this.el = $("<div class='" + name + "'>");
        this.setPosition();
      }
      hide(player) {
        $(this.el).hide();
        this.PosX = -1;
        this.PosY = -1;
        if(player == "player1"){
          player1.trophie = this.id;
        }
        if(player == "player2"){
          player2.trophie = this.id;
        }
      }
      show() {
        $(this.el).show();
        this.PosX = this.initPosX;
        this.PosY = this.initPosY;
      }
      setPosition(){
        this.el.css('left', this.PosX * 50);
        this.el.css('bottom', this.PosY * 50);
        container.append(this.el);
        console.log(this.el);
      }
    }

    var trophie_1 = new Trophies("trophie_1-1", 7, 10, 1);
    var trophie_2 = new Trophies("trophie_1-3", 9, 10, 2);
    var trophie_3 = new Trophies("trophie_1-2", 1, 0, 3);
    var trophie_4 = new Trophies("trophie_1-4", 3, 0, 4);

    var trophiesTab = [
      trophie_1,
      trophie_2,
      trophie_3,
      trophie_4
    ]

    // ============================================================ Trophies END
    // Chests ==================================================================
    var chest1 = $("<div class='chest1'>");
    container.append(chest1);
    chest1.css('left', 255);
    chest1.css('bottom', 3);

    var chest2 = $("<div class='chest2'>");
    container.append(chest2);
    chest2.css('left', 255);
    chest2.css('bottom', 510);

    // =============================================================== Chest END

    var tresure1 = 0;
    var tresure2 = 0;

    var lvl0 = 0;
    var lvl5 = 5;
    var lvl10 = 10;

    class player {
      constructor(name, PosY) {
        this.name = name;
        this.PosX = 5;
        this.PosY = PosY;
        this.object = $('.' + name);
        this.speed = 0;
        this.direction = "";
        this.lifes = 0;
        this.items = 0;
        this.trophie = -1
        this.el = $("<div class='" + name + "'>");
        this.setPosition();
      }

      setPosition(){
        this.el.css('left', this.PosX * 50);
        this.el.css('bottom', this.PosY * 50);
        container.append(this.el);
      }

      checkPosition(x, y) {
        for (var i = 0; i < raftsTab.length; i++) {
          if (x == raftsTab[i].PosX && y == raftsTab[i].PosY) {
            let thisRaft = raftsTab[i];
            console.log(x, y);
            console.log(thisRaft);
            clearInterval(MoveToPlayer);
            movePlayer(thisRaft);
            return;
          }
        }
        //player dead================


        for (var i = 0; i < raftsTab.length; i++) {
          if (x !== raftsTab[i].PosX && y !== raftsTab[i].PosY && y !== lvl0 && y !== lvl5 && y !== lvl10) {
            player1.lifes = player1.lifes + 1;
            $('.lifes').text("Player 1 Deaths: " + player1.lifes);

            for (var i = 0; i < trophiesTab.length; i++) {
              if (player1.trophie - 1 == i) {
                trophiesTab[i].show();
                player1.trophie = -1;
              }
            }
            player1.PosX = 5;
            player1.PosY = 0;
            clearInterval(MoveToPlayer);
            changePosition();
            return;
          }
        }

        for (var i = 0; i < trophiesTab.length; i++) {
          if (x == trophiesTab[i].PosX && y == trophiesTab[i].PosY && player1.trophie == -1) {
            if(trophiesTab[i].id == 1 || trophiesTab[i].id == 2){
              trophiesTab[i].hide("player1");
            }

          }
        }

        if (x == 5 && y == 0 && player1.trophie !== -1) {
          tresure1 = tresure1 + player1.trophie;
          player1.items = player1.items + 1;
          $('.items').text("Gathered items: " + player1.items + "/2");
          player1.trophie = -1;
          console.log(tresure1);
        }
        clearInterval(MoveToPlayer);
      }

      checkPosition2(x, y) {
        for (var i = 0; i < raftsTab.length; i++) {
          if (x == raftsTab[i].PosX && y == raftsTab[i].PosY) {
            let thisRaft = raftsTab[i];
            console.log(x, y);
            console.log(thisRaft);
            clearInterval(MoveToPlayer2);
            movePlayer2(thisRaft);
            return;
          }
        }
        //player dead================
        for (var i = 0; i < raftsTab.length; i++) {
          if (x !== raftsTab[i].PosX && y !== raftsTab[i].PosY && y !== lvl0 && y !== lvl5 && y !== lvl10) {
            player2.lifes = player2.lifes + 1;
            $('.lifes2').text("Player 2 Deaths: " + player2.lifes);

            for (var i = 0; i < trophiesTab.length; i++) {
              if (player2.trophie - 1 == i) {
                trophiesTab[i].show();
                player2.trophie = -1;
              }
            }
            player2.PosX = 5;
            player2.PosY = 10;
            clearInterval(MoveToPlayer2);
            changePosition2();
            return;
          }
        }

        for (var i = 0; i < trophiesTab.length; i++) {
          if (x == trophiesTab[i].PosX && y == trophiesTab[i].PosY && player2.trophie == -1) {
            if(trophiesTab[i].id == 3 || trophiesTab[i].id == 4){
              trophiesTab[i].hide("player2");
            }
          }
        }

        if (x == 5 && y == 10 && player2.trophie !== -1) {
          tresure2 = tresure2 + player2.trophie;
          player2.items = player2.items + 1;
          $('.items2').text("Gathered items: " + player2.items + "/2");
          player2.trophie = -1;
          console.log(tresure2);
        }
        clearInterval(MoveToPlayer2);
      }
    }



    var MoveToPlayer = "";

    function movePlayer(thisRaft) {
      clearInterval(MoveToPlayer);
      MoveToPlayer = setInterval(() => {
        player1.PosX = thisRaft.PosX;
        player1.PosY = thisRaft.PosY;
        $('.player1').css('left', thisRaft.PosX * 50);
        $('.player1').css('bottom', thisRaft.PosY * 50);
      }, 1)
    }

    var MoveToPlayer2 = "";

    function movePlayer2(thisRaft) {
      clearInterval(MoveToPlayer2);
      MoveToPlayer2 = setInterval(() => {
        player2.PosX = thisRaft.PosX;
        player2.PosY = thisRaft.PosY;
        $('.player2').css('left', thisRaft.PosX * 50);
        $('.player2').css('bottom', thisRaft.PosY * 50);
      }, 1)
    }

    let player1 = new player("player1", 0);
    let player2 = new player("player2", 10);

    let players = [
      player1,
      player2
    ]


    //Rafts class ================

    class rafts {
      constructor(PosX, PosY, speed, name, MaxXLeft, MaxXRight) {
        this.PosX = PosX;
        this.PosY = PosY;
        this.object = name;
        this.on = false;
        this.speed = speed;
        this.direction = "";
        this.MaxXLeft = MaxXLeft;
        this.MaxXRight = MaxXRight;
        this.el = $("<div class='" + name + "'>");
        this.setPosition();
      }

      setPosition(){
        this.el.css('left', this.PosX * 50);
        this.el.css('bottom', this.PosY * 50);
        container.append(this.el);
      }
    }

    var raftSpeed1 = 1000;
    var raftSpeed2 = 1000;

    //Each raft create and put in HTML========
    // Line 1=================
    var raft_1 = new rafts(6, 1, raftSpeed1, "tratwa_1-1", 0, 4);
    var raft_2 = new rafts(10, 1, raftSpeed1, "tratwa_1-2", 4, 10);
    // Line 2=================
    var raft_3 = new rafts(4, 2, raftSpeed2, "tratwa_2-1", 0, 4);
    var raft_4 = new rafts(8, 2, raftSpeed2, "tratwa_2-2", 4, 10);
    // Line 3=================
    var raft_5 = new rafts(6, 3, raftSpeed1, "tratwa_3-1", 0, 4);
    var raft_6 = new rafts(10, 3, raftSpeed1, "tratwa_3-2", 4, 10);
    // Line 4=================
    var raft_7 = new rafts(4, 4, raftSpeed2, "tratwa_4-1", 0, 4);
    var raft_8 = new rafts(8, 4, raftSpeed2, "tratwa_4-2", 4, 10);
    // Line 5=================
    var raft_9 = new rafts(6, 6, raftSpeed1, "tratwa_5-1", 0, 4);
    var raft_10 = new rafts(10, 6, raftSpeed1, "tratwa_5-2", 4, 10);
    // Line 6=================
    var raft_11 = new rafts(4, 7, raftSpeed2, "tratwa_6-1", 0, 4);
    var raft_12 = new rafts(8, 7, raftSpeed2, "tratwa_6-2", 4, 10);
    // Line 7=================
    var raft_13 = new rafts(6, 8, raftSpeed1, "tratwa_7-1", 0, 4);
    var raft_14 = new rafts(10, 8, raftSpeed1, "tratwa_7-2", 4, 10);
    // Line 8=================
    var raft_15 = new rafts(4, 9, raftSpeed2, "tratwa_8-1", 0, 4);
    var raft_16 = new rafts(8, 9, raftSpeed2, "tratwa_8-2", 4, 10);


    var raftsTab = [
      raft_1, raft_2,
      raft_3, raft_4,
      raft_5, raft_6,
      raft_7, raft_8,
      raft_9, raft_10,
      raft_11, raft_12,
      raft_13, raft_14,
      raft_15, raft_16
    ]

    Move = (speed, direction, element, MaxXLeft, MaxXRight) => {
      element.speed = speed;
      element.direction = direction;
      element.MaxXLeft = MaxXLeft;
      element.MaxXRight = MaxXRight;

      let MoveTo = setInterval(function() {
        if (element.direction == "left") {
          if (element.PosX !== MaxXLeft) {
            element.PosX = element.PosX - 1;
            $(element.el).css('left', element.PosX * 50);
          } else {
            element.direction = "right";
          }
        } else if (element.direction == "right") {
          if (element.PosX !== MaxXRight) {
            element.PosX = element.PosX + 1;
            $(element.el).css('left', element.PosX * 50);
          } else if (element.PosX == MaxXRight) {
            element.direction = "left";
          }
        }
      }, speed)
    }

    // Line 1 rafts===================
    Move(raftsTab[0].speed, "left", raftsTab[0], 0, 6);
    Move(raftsTab[1].speed, "left", raftsTab[1], 4, 10);

    // Line 3 rafts===================
    Move(raftsTab[2].speed, "right", raftsTab[2], 0, 6);
    Move(raftsTab[3].speed, "right", raftsTab[3], 4, 10);

    // Line 3 rafts===================
    Move(raftsTab[4].speed, "left", raftsTab[4], 0, 6);
    Move(raftsTab[5].speed, "left", raftsTab[5], 4, 10);

    // Line 4 rafts===================
    Move(raftsTab[6].speed, "right", raftsTab[6], 0, 6);
    Move(raftsTab[7].speed, "right", raftsTab[7], 4, 10);

    // Line 5 rafts===================
    Move(raftsTab[8].speed, "left", raftsTab[8], 0, 6);
    Move(raftsTab[9].speed, "left", raftsTab[9], 4, 10);

    // Line 6 rafts===================
    Move(raftsTab[10].speed, "right", raftsTab[10], 0, 6);
    Move(raftsTab[11].speed, "right", raftsTab[11], 4, 10);

    // Line 7 rafts===================
    Move(raftsTab[12].speed, "left", raftsTab[12], 0, 6);
    Move(raftsTab[13].speed, "left", raftsTab[13], 4, 10);

    // Line 8 rafts===================
    Move(raftsTab[14].speed, "right", raftsTab[14], 0, 6);
    Move(raftsTab[15].speed, "right", raftsTab[15], 4, 10);


    //SPIDER==================
    var monsterSpeed = 180;

    class monster {
      constructor(PosX, PosY, speed, name, MaxXLeft, MaxXRight) {
        this.PosX = PosX;
        this.PosY = PosY;
        this.object = name;
        this.speed = speed;
        this.direction = "";
        this.MaxXLeft = MaxXLeft;
        this.MaxXRight = MaxXRight;
        this.el = $("<div class='" + name + "'>")
        this.setPosition();
      }
      setPosition(){
        this.el.css('left', this.PosX * 50);
        this.el.css('top', this.PosY * 50);
        container.append(this.el)
      }
    }

    var spider = new monster(4, 5, monsterSpeed, "spider", 0, 10);

    Move(spider.speed, "right", spider, 0, 10);

    let MoveMonster = setInterval(function() {
      for(var i=0; i<players.length; i++){
        if(spider.PosX == players[0].PosX && spider.PosY == players[0].PosY){
          player1.lifes = player1.lifes - 1;
          $('.lifes1').text("Player 1 lifes: " + player1.lifes);

          for (var i = 0; i < trophiesTab.length; i++) {
            if (player1.trophie - 1 == i) {
              trophiesTab[i].show();
              player1.trophie = -1;
            }
          }
          player1.PosX = 5;
          player1.PosY = 0;
          clearInterval(MoveToPlayer);
          changePosition();
          return;
        }

        if(spider.PosX == players[1].PosX && spider.PosY == players[1].PosY){
          player2.lifes = player2.lifes - 1;
          $('.lifes2').text("Player 2 lifes: " + player2.lifes);

          for (var i = 0; i < trophiesTab.length; i++) {
            if (player2.trophie - 1 == i) {
              trophiesTab[i].show();
              player2.trophie = -1;
            }
          }
          player2.PosX = 5;
          player2.PosY = 10;
          clearInterval(MoveToPlayer2);
          changePosition2();
          return;
        }
      }

    }, 10)


  //First player move=====================

    $("body").keydown(function(e) {
      switch (e.which) {
        case 39:
          changePosition('right');
          break;
        case 37:
          changePosition('left');
          break;
        case 38:
          changePosition('up');
          break;
        case 40:
          changePosition('down');
          break;
        default:
          console.log("use arrows");
      }
    });

    //Second player move=====================

    $("body").keydown(function(e) {
      switch (e.which) {
        case 68:
          changePosition2('right');
          break;
        case 65:
          changePosition2('left');
          break;
        case 87:
          changePosition2('up');
          break;
        case 83:
          changePosition2('down');
          break;
        default:
          console.log("use arrows");
      }
    });

    //change position 1=============

    changePosition = (direction) => {
      if (direction == 'right') {
        if (player1.PosX < 10 && (player2.PosX !== player1.PosX + 1 || player2.PosY !==player1.PosY)) {
          player1.PosX = player1.PosX + 1;
          $('.player1').css('left', player1.PosX * 50);
          $('.player1').css('bottom', player1.PosY * 50);
          player1.checkPosition(player1.PosX, player1.PosY);
        }
      } else if (direction == 'left') {
        if (player1.PosX > 0 && (player2.PosX !== player1.PosX - 1 || player2.PosY !==player1.PosY)) {
          player1.PosX = player1.PosX - 1;
          $('.player1').css('left', player1.PosX * 50);
          $('.player1').css('bottom', player1.PosY * 50);
          player1.checkPosition(player1.PosX, player1.PosY);
        }
      } else if (direction == "up") {
        if (player1.PosY < 10 && (player2.PosY !== player1.PosY + 1 || player2.PosX !==player1.PosX)) {
          player1.PosY = player1.PosY + 1;
          $('.player1').css('bottom', player1.PosX * 50);
          $('.player1').css('bottom', player1.PosY * 50);
          player1.checkPosition(player1.PosX, player1.PosY);
        }
      } else if (direction == "down") {
        if (player1.PosY > 0 && (player2.PosY !== player1.PosY - 1 || player2.PosX !==player1.PosX)) {
          player1.PosY = player1.PosY - 1;
          $('.player1').css('bottom', player1.PosX * 50);
          $('.player1').css('bottom', player1.PosY * 50);
          player1.checkPosition(player1.PosX, player1.PosY);
        }
      } else {
        $('.player1').css('bottom', player1.PosY * 50);
        $('.player1').css('left', player1.PosX * 50);
      }
    };

    //change position 2=======

    changePosition2 = (direction) => {
      if (direction == 'right') {
        if (player2.PosX < 10 && (player1.PosX !== player2.PosX + 1 || player1.PosY !==player2.PosY)) {
          player2.PosX = player2.PosX + 1;
          $('.player2').css('left', player2.PosX * 50);
          $('.player2').css('bottom', player2.PosY * 50);
          player2.checkPosition2(player2.PosX, player2.PosY);
        }
      } else if (direction == 'left') {
        if (player2.PosX > 0 && (player1.PosX !== player2.PosX - 1 || player1.PosY !==player2.PosY)) {
          player2.PosX = player2.PosX - 1;
          $('.player2').css('left', player2.PosX * 50);
          $('.player2').css('bottom', player2.PosY * 50);
          player2.checkPosition2(player2.PosX, player2.PosY);
        }
      } else if (direction == "up") {
        if (player2.PosY < 10 && (player1.PosY !== player2.PosY + 1 || player1.PosX !==player2.PosX)) {
          player2.PosY = player2.PosY + 1;
          $('.player2').css('bottom', player2.PosX * 50);
          $('.player2').css('bottom', player2.PosY * 50);
          player2.checkPosition2(player2.PosX, player2.PosY);
        }
      } else if (direction == "down") {
        if (player2.PosY > 0 && (player1.PosY !== player2.PosY - 1 || player1.PosX !==player2.PosX)) {
          player2.PosY = player2.PosY - 1;
          $('.player2').css('bottom', player2.PosX * 50);
          $('.player2').css('bottom', player2.PosY * 50);
          player2.checkPosition2(player2.PosX, player2.PosY);
        }
      } else {
        $('.player2').css('bottom', player2.PosY * 50);
        $('.player2').css('left', player2.PosX * 50);
      }
    };

    //INFO TABLE===================
    var tableContainer = $("<div class='tableContainer'>");
    mainContainer.append(tableContainer);

    var tableContainerTop = $("<div class='tableContainerTop'>");
    tableContainer.append(tableContainerTop);
    var tableContainerDown = $("<div class='tableContainerDown'>");
    tableContainer.append(tableContainerDown);

    var lifes = $("<div class='lifes'>");
    tableContainerTop.append(lifes);
    $('.lifes').text("Player 1 Deaths: " + player1.lifes);
    var items = $("<div class='items'>");
    tableContainerDown.append(items);
    $('.items').text("Gathered items: " + player1.items + "/2");

    var lifes2 = $("<div class='lifes2'>");
    tableContainerTop.append(lifes2);
    $('.lifes2').text("Player 2 Deaths: " + player2.lifes);
    var items2 = $("<div class='items2'>");
    tableContainerDown.append(items2);
    $('.items2').text("Gathered items: " + player2.items + "/2");

    var backToMenuBtnMPgame = $("<div class='backToMenuBtnMPgame menuButton'>");
    backToMenuBtnMPgame.text("Back To Menu");
    mainContainer.append(backToMenuBtnMPgame);

    backToMenuBtnMPgame.on("click",function(){
      location.reload();
    })

  }
});
