
function initApi(interpreter, globalObject) {
    // Add an API function for the alert() block.
    var wrapper = function (text) {
        return console.log(arguments.length ? text : '');
    };
    interpreter.setProperty(globalObject, 'alert', interpreter.createNativeFunction(wrapper));

    wrapper = function (delayTime) {
        pauseTime = Math.max(100, Math.min(10000, delayTime));
        return Math.max(100, Math.min(10000, delayTime));
    };
    interpreter.setProperty(globalObject, 'delay', interpreter.createNativeFunction(wrapper));

    var wrapper = function (gamepadNum, buttonId, controllerType) {
        if (navigator.getGamepads()[gamepadNum] != null && (controllerType == "Both" || navigator.getGamepads()[gamepadNum].id.startsWith(controllerType))) {
            if (buttonId == -1) {
                var atRest = true;
                for (var i = 0; i < navigator.getGamepads()[gamepadNum].buttons.length; i++)
                    if (navigator.getGamepads()[gamepadNum].buttons[i].pressed)
                        atRest = false;
                for (var i = 0; i < navigator.getGamepads()[gamepadNum].axes.length; i++)
                    if (Math.abs(navigator.getGamepads()[gamepadNum].axes[i]) > .2)
                        atRest = false;
                return atRest;
            }
            return navigator.getGamepads()[gamepadNum].buttons[buttonId].pressed;
        }
        return false;
    };
    interpreter.setProperty(globalObject, 'gamepadBool', interpreter.createNativeFunction(wrapper));

    var wrapper = function (gamepadNum, buttonAxis) {
        if (navigator.getGamepads()[gamepadNum] != null) {
            if (buttonAxis < 4)
                return navigator.getGamepads()[gamepadNum].axes[buttonAxis];
            else
                return navigator.getGamepads()[gamepadNum].buttons[buttonAxis].value;
        }
        return 0;
    };
    interpreter.setProperty(globalObject, 'gamepadFloat', interpreter.createNativeFunction(wrapper));

    wrapper = function (motorName, power) {
        power = Math.min(1, Math.max(power, -1));
        if (motorName == "frontLeft") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": power, "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motorName == "frontRight") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": power, "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motorName == "backLeft") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": power, "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motorName == "backRight") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": power, "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motorName == "ringCollection") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": power, "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motorName == "ringLoader") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": power, "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motorName == "ringShooter") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": power, "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motorName == "wobbleActuator") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": power };
        }
        return postMessage(JSON.stringify(motorPowers));
    };
    interpreter.setProperty(globalObject, 'setPower', interpreter.createNativeFunction(wrapper));

    wrapper = function (motor1Name, power, motor2Name, power2) {
        power = Math.min(1, Math.max(power, -1));
        power2 = Math.min(1, Math.max(power2, -1));
        if (motor1Name == "frontLeft") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": power, "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motor1Name == "frontRight") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": power, "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motor1Name == "backLeft") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": power, "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motor1Name == "backRight") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": power, "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motor1Name == "ringCollection") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": power, "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motor1Name == "ringLoader") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": power, "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motor1Name == "ringShooter") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": power, "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motor1Name == "wobbleActuator") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": power };
        }

        if (motor2Name == "frontLeft") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": power2, "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motor2Name == "frontRight") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": power2, "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motor2Name == "backLeft") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": power2, "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motor2Name == "backRight") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": power2, "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motor2Name == "ringCollection") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": power2, "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motor2Name == "ringLoader") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": power2, "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motor2Name == "ringShooter") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": power2, "motor8": motorPowers[Object.keys(motorPowers)[7]] };
        } else if (motor2Name == "wobbleActuator") {
            // power = power * motorReverseValues[Object.keys(motorPowers)[0]];
            motorPowers = { "motor1": motorPowers[Object.keys(motorPowers)[0]], "motor2": motorPowers[Object.keys(motorPowers)[1]], "motor3": motorPowers[Object.keys(motorPowers)[2]], "motor4": motorPowers[Object.keys(motorPowers)[3]], "motor5": motorPowers[Object.keys(motorPowers)[4]], "motor6": motorPowers[Object.keys(motorPowers)[5]], "motor7": motorPowers[Object.keys(motorPowers)[6]], "motor8": power2 };
        }
        return postMessage(JSON.stringify(motorPowers));
    };
    interpreter.setProperty(globalObject, 'setDualPower', interpreter.createNativeFunction(wrapper));

    wrapper = function (motorName, motorOption) {
        motorValue = 0;
        if (motorName == "frontLeft") {
            motorValue = motorValues[Object.keys(motorValues)[0]];// - motorEncoderBaseValues[Object.keys(motorEncoders)[0]];
        } else if (motorName == "frontRight") {
            motorValue = motorValues[Object.keys(motorValues)[1]];// - motorEncoderBaseValues[Object.keys(motorEncoders)[1]];
        } else if (motorName == "backLeft") {
            motorValue = motorValues[Object.keys(motorValues)[2]];// - motorEncoderBaseValues[Object.keys(motorEncoders)[2]];
        } else if (motorName == "backRight") {
            motorValue = motorValues[Object.keys(motorValues)[3]];// - motorEncoderBaseValues[Object.keys(motorEncoders)[3]];
        }
        console.log('enc; ' + motorValue);
        return motorValue;
    };
    interpreter.setProperty(globalObject, 'getMotorData', interpreter.createNativeFunction(wrapper));

    var wrapper = function (key, data) {
        return (telemetryData += key + ": " + data + "\n");
    };
    interpreter.setProperty(globalObject, 'addTelemetryData', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        // document.getElementById("telemetryText").innerText = telemetryData;
        telemetryData = "";
        return;
    };
    interpreter.setProperty(globalObject, 'updateTelemetryData', interpreter.createNativeFunction(wrapper));
}

var telemetryData = "";

var myInterpreter = null;
var runner;
var pauseTime = 0;
var motorPowers = { "m1": 0.0, "m2": 0.0, "m3": 0.0, "m4": 0.0, "m5": 0.0, "m6": 0.0, "m7": 0.0, "m8": 0.0 };
var motorValues = { "m1": 0.0, "m2": 0.0, "m3": 0.0, "m4": 0.0, "m5": 0.0, "m6": 0.0, "m7": 0.0, "m8": 0.0 };

function resetInterpreter() {
    motorPowers = { "m1": 0.0, "m2": 0.0, "m3": 0.0, "m4": 0.0, "m5": 0.0, "m6": 0.0, "m7": 0.0, "m8": 0.0 };
    myInterpreter = null;
    pauseTime = 0;
    if (runner) {
        clearTimeout(runner);
        runner = null;
    }
}

importScripts('./blocks/interpreter/acorn_interpreter.js');

onmessage = function (e) {
    if (e.data[0] == "data") {
        motorValues = JSON.parse(e.data[1]);
        nextStep();
    } else if (e.data[0] == "code") {
        resetInterpreter();
        delayStartProgram(e.data[1]);
    }
}

function delayStartProgram(code) {
    motorPowers = { "m1": 0.0, "m2": 0.0, "m3": 0.0, "m4": 0.0, "m5": 0.0, "m6": 0.0, "m7": 0.0, "m8": 0.0 };
    console.log(code);
    telemetryData = "";
    myInterpreter = new Interpreter(code, initApi);
    // myInterpreter.run();

    nextStep();
    return;
}

function nextStep() {
    if (myInterpreter.step()) {
        postMessage("request encoder");
    } else {
        resetInterpreter();
    }
}
