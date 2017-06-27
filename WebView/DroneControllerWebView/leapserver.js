function FrontMove() {
      console.log("Front. Move");
      $("#StickImg").attr("src", "./Image/Stick00.png");
    }

    function FrontRightMove() {
      console.log("Front Right. Move");
      $("#StickImg").attr("src", "./Image/Stick01.png");
    }

    function RightMove() {
      console.log("Right Move");
      $("#StickImg").attr("src", "./Image/Stick02.png");
    }

    function BackRightMove() {
      console.log("Back Right. Move");
      $("#StickImg").attr("src", "./Image/Stick03.png");
    }

    function BackMove() {
      console.log("Back. Move");
      $("#StickImg").attr("src", "./Image/Stick04.png");
    }

    function BackLeftMove() {
      console.log("Back Left. Move");
      $("#StickImg").attr("src", "./Image/Stick05.png");
    }

    function LeftMove() {
      console.log("Left Move");
      $("#StickImg").attr("src", "./Image/Stick06.png");
    }

    function FrontLeftMove() {
      console.log("Front Left Move");
      $("#StickImg").attr("src", "./Image/Stick07.png");
    }

    function Stop() {
      $("#StickImg").attr("src", "./Image/StickStop.png");
    }

    function UpMove() {
      console.log("Up Move");
    }

    function DownMove() {
      console.log("Down Move");
    }

    // Store frame for motion functions
    var previousFrame = null;
    var paused = false;

    // Setup Leap loop with frame callback function
    var controllerOptions = {};

    // to use HMD mode:
    // controllerOptions.optimizeHMD = true;

    Leap.loop(controllerOptions, function (frame) {
      window.scrollBy(0, document.body.scrollHeight);
      if (paused) {
        return; // Skip this update
      }

      // 현재 상태 추출.
      var curStateOutput = document.getElementById("curState");

      var curStateString = "";
      if (frame.hands.length > 0) {
        //curStateString = "감지됨"+ "<br />";
      } else {
        $("#StickImg").attr("src", "./Image/StickUnDectected.png");
      }
      if (frame.hands.length > 0) {
        for (var i = 0; i < frame.hands.length; i++) {
          var hand = frame.hands[i];
          curStateString += Math.round(hand.palmPosition[0], 0) + " " + Math.round(hand.palmPosition[2], 0) + " ";
          if (hand.grabStrength == 0) {

            // 0
            if (hand.palmPosition[2] < 0) {
              if (Math.abs(hand.palmPosition[0]) < Math.abs(hand.palmPosition[2])) {
                curStateString += "↑" + " ";
                FrontMove();
              }
            }

            // 1
            if (hand.palmPosition[0] > 0 && hand.palmPosition[2] < 0) {
              if ((Math.abs(hand.palmPosition[2]) > Math.abs(hand.palmPosition[0]) / 2) && (Math.abs(hand.palmPosition[
                  2]) < Math.abs(hand.palmPosition[0]) * Math.sqrt(3))) {
                curStateString += "→↑" + " ";
                FrontRightMove();
              }
            }

            // 2
            if (hand.palmPosition[0] > 0) {
              if (Math.abs(hand.palmPosition[2]) < Math.abs(hand.palmPosition[0]) / 2) {
                curStateString += "→" + " ";
                RightMove();
              }
            }

            // 3
            if (hand.palmPosition[0] > 0 && hand.palmPosition[2] > 0) {
              if ((Math.abs(hand.palmPosition[2]) > Math.abs(hand.palmPosition[0]) / 2) && (Math.abs(hand.palmPosition[
                  2]) < Math.abs(hand.palmPosition[0]) * Math.sqrt(3))) {
                curStateString += "→↓" + " ";
                BackRightMove();
              }
            }

            // 4
            if (hand.palmPosition[2] > 0) {
              if (Math.abs(hand.palmPosition[0]) < Math.abs(hand.palmPosition[2])) {
                curStateString += "↓" + " ";
                BackMove();
              }
            }

            // 5
            if (hand.palmPosition[0] < 0 && hand.palmPosition[2] > 0) {
              if ((Math.abs(hand.palmPosition[2]) > Math.abs(hand.palmPosition[0]) / 2) && (Math.abs(hand.palmPosition[
                  2]) < Math.abs(hand.palmPosition[0]) * Math.sqrt(3))) {
                curStateString += "←↓" + " ";
                BackLeftMove();
              }
            }

            // 6
            if (hand.palmPosition[0] < 0) {
              if (Math.abs(hand.palmPosition[2]) < Math.abs(hand.palmPosition[0]) / 2) {
                curStateString += "←" + " ";
                LeftMove();
              }
            }

            // 7
            if (hand.palmPosition[0] < 0 && hand.palmPosition[2] < 0) {
              if ((Math.abs(hand.palmPosition[2]) > Math.abs(hand.palmPosition[0]) / 2) && (Math.abs(hand.palmPosition[
                  2]) < Math.abs(hand.palmPosition[0]) * Math.sqrt(3))) {
                curStateString += "←↑" + " ";
                FrontLeftMove();
              }
            }

            // Down
            if (hand.palmPosition[1] < 150) {
              curStateString += "Down\n";
              DownMove();
            }

            // up
            if (hand.palmPosition[1] < 300) {
              curStateString += "Alt Staying\n";
            } else {
              curStateString += "Up\n";
              UpMove();
            }

            curStateOutput.innerHTML += curStateString;
            curStateOutput.scrollTop = curStateOutput.scrollHeight;

          }

          // Stop
          else if (hand.grabStrength == 1) {
            Stop();
          }

        }
      }


      // 오브젝트 프레임 데이터 추출.
      var frameOutput = document.getElementById("frameData");
      var frameString = "";

      frameOutput.innerHTML = "<div style='width:300px; float:left; padding:5px'>" + frameString + "</div>";

      // 오브젝트 핸드 데이터 추출.
      var handOutput = document.getElementById("handData");
      var handString = "";
      if (frame.hands.length > 0) {
        for (var i = 0; i < frame.hands.length; i++) {
          var hand = frame.hands[i];
          // IDs of pointables associated with this hand
          if (hand.pointables.length > 0) {
            var fingerIds = [];
            for (var j = 0; j < hand.pointables.length; j++) {
              var pointable = hand.pointables[j];
              fingerIds.push(pointable.id);
            }
            if (fingerIds.length > 0) {}
          }
          handString += "</div>";
        }
      } else {
        handString += "";
      }
      handOutput.innerHTML = handString;

      // 손가락 오브젝트 추출
      var pointableOutput = document.getElementById("pointableData");
      var pointableString = "";
      var Thumb, indexFinger, middleFinger, RingFinger, PinkyFinger;
      if (frame.pointables.length > 0) {
        var fingerTypeMap = ["Thumb", "Index finger", "Middle finger", "Ring finger", "Pinky finger"];
        var boneTypeMap = ["Metacarpal", "Proximal phalanx", "Intermediate phalanx", "Distal phalanx"];
        for (var i = 0; i < frame.pointables.length; i++) {
          var pointable = frame.pointables[i];
          pointable.bones.forEach(function (bone) {
            if (boneTypeMap[bone.type] == "Metacarpal") {
              // Thumb
              if (fingerTypeMap[pointable.type] == "Thumb") {
                Thumb = bone.center();
                //console.log("Thumb" + Thumb);
              }
              // index finger
              if (fingerTypeMap[pointable.type] == "Index finger") {
                indexFinger = bone.center();
                //console.log("Index" + indexFinger);
              }
              // middle finger
              if (fingerTypeMap[pointable.type] == "Middle finger") {
                middleFinger = bone.center();
                //console.log("Middle" + middleFinger);
              }
              // ring finger
              if (fingerTypeMap[pointable.type] == "Ring finger") {
                RingFinger = bone.center();
                //console.log("Ring" + RingFinger);
              }
              // middle finger
              if (fingerTypeMap[pointable.type] == "Pinky finger") {
                PinkyFinger = bone.center();
                //console.log("Pinky" + PinkyFinger);
              }
            }
          });
        }

        var Idx_Mid_Dst = 0;
        for (var i = 0; i < 3; i++) {
          Idx_Mid_Dst += Math.pow(indexFinger[i] - middleFinger[i], 2);
          console.log(Math.round(indexFinger[i]) + " " + Math.round(middleFinger[i]));
        }
        console.log(Idx_Mid_Dst);
        Idx_Mid_Dst = Math.sqrt(Idx_Mid_Dst);
        console.log(Idx_Mid_Dst);


        //console.log(Idx_Mid_Dst);
        // 동작을 만듬



      }

      // Store frame for motion functions
      previousFrame = frame;
    })

    // 현재 벡터 문자열로 변환
    function vectorToString(vector, digits) {
      if (typeof digits === "undefined") {
        digits = 1;
      }
      return "(" + vector[0].toFixed(digits) + ", " +
        vector[1].toFixed(digits) + ", " +
        vector[2].toFixed(digits) + ")";
    }
    // 버튼 토글 함수.
    function togglePause() {
      paused = !paused;

      if (paused) {
        document.getElementById("pause").innerText = "Resume";
      } else {
        document.getElementById("pause").innerText = "Pause";
      }
    }