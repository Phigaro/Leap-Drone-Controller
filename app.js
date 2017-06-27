var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var flag = false; var keyflag = false;
var Leap = require('leapjs');
var Cylon = require('cylon');
var PitchSpeed = 5;
var CurView = 0;

Cylon.robot({
  connections: {
    keyboard: { adaptor: 'keyboard' },
    leapmotion: { adaptor: 'leapmotion' },
    bebop: { adaptor: 'bebop', port: '192.168.1.1' }
  },

  devices: {
    keyboard: { driver: 'keyboard' },
    leapmotion: { driver: 'leapmotion', connection: 'leapmotion' },
    drone: { driver: 'bebop', connection: 'bebop' },
  },

  work: function (my) {
    my.keyboard.on('z', function (key) {
      console.log("z takeoff pressed");
      my.drone.takeOff();
    });

    my.keyboard.on('x', function (key) {
      console.log("x up pressed");
      my.drone.up(20);
    });

    my.keyboard.on('c', function (key) {
      console.log("c down pressed");
      my.drone.down(20);
    });

    my.keyboard.on('v', function (key) {
      console.log("v land pressed");
      my.drone.land();
    });

    my.leapmotion.on('frame', function (frame) {
      if (frame.hands.length > 0) {
        my.drone.takeOff();
      } else {
        console.log("land");
        my.drone.land();
      }
    })

    function FrontMove() {
      my.drone.forward(PitchSpeed);
    }

    function FrontRightMove() {
      my.drone.forward(PitchSpeed);
      my.drone.right(PitchSpeed);
    }

    function RightMove() {
      my.drone.right(PitchSpeed);
    }

    function BackRightMove() {
      my.drone.backward(PitchSpeed);
      my.drone.right(PitchSpeed);
    }

    function BackMove() {
      my.drone.backward(PitchSpeed);
    }

    function BackLeftMove() {
      my.drone.backward(PitchSpeed);
      my.drone.left(PitchSpeed);
    }

    function LeftMove() {
      my.drone.left(PitchSpeed);
    }

    function FrontLeftMove() {
      my.drone.forward(PitchSpeed);
      my.drone.left(PitchSpeed);
    }

    function Stop() {
      my.drone.stop();
    }

    function UpMove() {
      my.drone.up(5);
    }

    function DownMove() {
      my.drone.down(5);
    }
    var CurMessage;
    my.leapmotion.on('hand', function (hand) {
      if (hand.palmZ < 0) {
        if (Math.abs(hand.palmX) < Math.abs(hand.palmZ)) {
          CurMessage += ("↑" + " ");
          FrontMove();
        }
      }
      if (hand.palmX > 0 && hand.palmZ < 0) {
        if ((Math.abs(hand.palmZ) > Math.abs(hand.palmX) / 2) && (Math.abs(hand.palmPosition[
          2]) < Math.abs(hand.palmX) * Math.sqrt(3))) {
          CurMessage += console.log("↗" + " ");
          FrontRightMove();
        }
      }

      // 2
      if (hand.palmX > 0) {
        if (Math.abs(hand.palmZ) < Math.abs(hand.palmX) / 2) {
          CurMessage += ("→" + " ");
          RightMove();
        }
      }

      // 3
      if (hand.palmX > 0 && hand.palmZ > 0) {
        if ((Math.abs(hand.palmZ) > Math.abs(hand.palmX) / 2) && (Math.abs(hand.palmPosition[
          2]) < Math.abs(hand.palmX) * Math.sqrt(3))) {
          CurMessage += ("↘" + " ");
          BackRightMove();
        }
      }

      // 4
      if (hand.palmZ > 0) {
        if (Math.abs(hand.palmX) < Math.abs(hand.palmZ)) {
          CurMessage += ("↓" + " ");
          BackMove();
        }
      }

      // 5
      if (hand.palmX < 0 && hand.palmZ > 0) {
        if ((Math.abs(hand.palmZ) > Math.abs(hand.palmX) / 2) && (Math.abs(hand.palmPosition[
          2]) < Math.abs(hand.palmX) * Math.sqrt(3))) {
          CurMessage += ("↙" + " ");
          BackLeftMove();
        }
      }

      // 6
      if (hand.palmX < 0) {
        if (Math.abs(hand.palmZ) < Math.abs(hand.palmX) / 2) {
          CurMessage += ("←" + " ");
          LeftMove();
        }
      }

      // 7
      if (hand.palmX < 0 && hand.palmZ < 0) {
        if ((Math.abs(hand.palmZ) > Math.abs(hand.palmX) / 2) && (Math.abs(hand.palmPosition[
          2]) < Math.abs(hand.palmX) * Math.sqrt(3))) {
          CurMessage += ("↖" + " ");
          FrontLeftMove();
        }
      }

      if (hand.grabStrength == 1) {
        CurMessage += ("Stop");
        Stop();
      }

      // Down
      if (hand.palmY < 150) {
        CurMessage += ("Down ");
        DownMove();
      }

      // up
      if (hand.palmY > 150 && hand.palmY < 400) {
        CurMessage += ("Alt Staying ");
      }

      if (hand.palmY > 400){
        CurMessage += ("Up ");
        UpMove();
      }

      console.log(CurMessage);
      CurMessage = "";

    });
  }
}).start();

module.exports = app;