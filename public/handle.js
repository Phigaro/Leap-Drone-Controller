var Cylon = require('cylon');

Cylon.robot({
  connections: {

    keyboard: { adaptor: 'keyboard' },
    bebop: { adaptor: 'bebop'}
  },

  devices: {
    keyboard: { driver: 'keyboard' },
    bebop: { driver: 'bebop',connection: 'bebop'}
  },

  work: function(my) {

    my.keyboard.on('x', function(key) {
      console.log("x pressed");
      my.bebop.forward(5);
      my.bebop.left(5);
      my.bebop.clockwise(15);
    });

    my.keyboard.on('c', function(key) {
      console.log("c pressed");
      my.bebop.forward(5);
      my.bebop.right(5);
    });

    my.keyboard.on('p', function(key) {
      console.log("p pressed");
      my.bebop.land();
    });

    my.keyboard.on('o', function(key) {
      console.log("o pressed");
      my.bebop.takeOff();
    });

    my.keyboard.on('w', function(key) {
      console.log("w = forward");
      my.bebop.forward(5);
    });

    my.keyboard.on('e', function(key) {
      console.log("e = clockwise");
      my.bebop.clockwise(20);
    });


    my.keyboard.on('s', function(key) {
      console.log("s = back");
      my.bebop.backward(5);

    });


    my.keyboard.on('a', function(key) {
      console.log("a = left");
      my.bebop.left(5);
    });


    my.keyboard.on('d', function(key) {
      console.log("d = right");
      my.bebop.right(5);
    });

    my.keyboard.on('z', function(key) {
      console.log("z = stop");
      my.bebop.stop();
    });

    my.keyboard.on('u', function(key) {
      console.log("u = up");
      my.bebop.up(5);
    });


    my.keyboard.on('j', function(key) {
      console.log("j = down");
      my.bebop.down(5);
    });

 my.keyboard.on('f', function(key) {
      console.log("f = flip");
      my.bebop.rightFlip();
    });
  }
}).start();
