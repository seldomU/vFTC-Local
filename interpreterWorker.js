//Custom Block JavaScript
function initApi(interpreter, globalObject) {
    //LinearOpMode Blocks
    var linearOpMode = interpreter.nativeToPseudo({});
    interpreter.setProperty(globalObject, 'linearOpMode', linearOpMode);

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(linearOpMode, 'waitForStart', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(linearOpMode, 'idle', interpreter.createNativeFunction(wrapper));

    var wrapper = function (millis) {
        const end = Date.now() + Math.max(100, Math.min(10000, delayTime))
        while (Date.now() < end) {

        }
        return true;
    };
    interpreter.setProperty(linearOpMode, 'sleep', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return true; //NON FUNCTIONAL
    };
    interpreter.setProperty(linearOpMode, 'opModeIsActive', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return true; //NON FUNCTIONAL
    };
    interpreter.setProperty(linearOpMode, 'isStarted', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return false; //NON FUNCTIONAL
    };
    interpreter.setProperty(linearOpMode, 'isStopRequested', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return 0; //NON FUNCTIONAL
    };
    interpreter.setProperty(linearOpMode, 'getRuntime', interpreter.createNativeFunction(wrapper));

    //Gamepad Blocks
    var gamepad = interpreter.nativeToPseudo({});
    interpreter.setProperty(globalObject, 'gamepad', gamepad);

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
    interpreter.setProperty(gamepad, 'boolValue', interpreter.createNativeFunction(wrapper));

    var wrapper = function (gamepadNum, buttonAxis) {
        if (navigator.getGamepads()[gamepadNum] != null) {
            if (buttonAxis < 4)
                return navigator.getGamepads()[gamepadNum].axes[buttonAxis];
            else
                return navigator.getGamepads()[gamepadNum].buttons[buttonAxis].value;
        }
        return 0;
    };
    interpreter.setProperty(gamepad, 'numberValue', interpreter.createNativeFunction(wrapper));

    //Motor Blocks
    var motor = interpreter.nativeToPseudo({});
    interpreter.setProperty(globalObject, 'motor', motor);

    var wrapper = function (motorNums, property, values) {
        // var motorProperties = JSON.parse(localStorage.getItem('motor' + property + 's'));
        for (var i = 0; i < motorNums.g.length; i++) {
            //Translates Power to Velocity
            if (property == 'Power') {
                values.g[i] = Math.min(1, Math.max(values.g[i], -1));
                // var motorVel = JSON.parse(localStorage.getItem('motorVelocitys'));
                motorVel[Object.keys(motorProperties)[motorNums.g[i]]] = values.g[i] * 1;//JSON.parse(localStorage.getItem('motorMaxSpeeds'))[Object.keys(motorProperties)[motorNums.g[i]]];
                postMessage(['motorVelocitys', JSON.stringify(motorVel)]);
            }
            //Translates Velocity to Power
            if (property == 'Velocity') {
                // var motorPow = JSON.parse(localStorage.getItem('motorPowers'));
                motorPow[Object.keys(motorProperties)[motorNums.g[i]]] = Math.min(1, Math.max(values.g[i] / 1.0, -1));//JSON.parse(localStorage.getItem('motorMaxSpeeds'))[Object.keys(motorProperties)[motorNums.g[i]]], -1));
                postMessage(['motorPowers', JSON.stringify(motorPow)]);
                motorProperties[Object.keys(motorProperties)[motorNums.g[i]]] = Math.min(5760, Math.max(values.g[i], -5760)); //This value may change (1440 * 4)
            }
            else
                motorProperties[Object.keys(motorProperties)[motorNums.g[i]]] = values.g[i];
        }
        return postMessage(['motor' + property + 's', JSON.stringify(motorPowers)]);
    };
    interpreter.setProperty(motor, 'setProperty', interpreter.createNativeFunction(wrapper));

    var wrapper = function (motorNum, property) {
        var returnVar;
        if (property == 'PowerFloat') {
            // var motorPowers = JSON.parse(localStorage.getItem('motorPowers'));
            var motorPower = motorPowers[Object.keys(motorPowers)[motorNum]];
            returnVar = (Math.round(motorPower) != motorPower);
        }
        else if (property == 'Velocity') {
            // var motorProperties = JSON.parse(localStorage.getItem('motorReturnVelocitys'));
            returnVar = motorProperties[Object.keys(motorProperties)[motorNum]];
        }
        else {
            // var motorProperties = JSON.parse(localStorage.getItem('motor' + property + 's'));
            returnVar = motorProperties[Object.keys(motorProperties)[motorNum]];
        }
        return returnVar;
    };
    interpreter.setProperty(motor, 'getProperty', interpreter.createNativeFunction(wrapper));

    var wrapper = function (motorNum) {
        // var motorProp = JSON.parse(localStorage.getItem('motorCurrentPositions'));
        var motorPosition = 12;//motorProp[Object.keys(motorProp)[motorNum]];
        // motorProp = JSON.parse(localStorage.getItem('motorTargetPositions'));
        var motorTarget = 12;//motorProp[Object.keys(motorProp)[motorNum]];
        // motorProp = JSON.parse(localStorage.getItem('motorTargetPositionTolerances'));
        var motorTolerance = 1;//motorProp[Object.keys(motorProp)[motorNum]];
        return (Math.abs(motorPosition - motorTarget) > motorTolerance);
    };
    interpreter.setProperty(motor, 'isBusy', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'setMotorEnable', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'setMotorDisable', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return true; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'isMotorEnabled', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'setVelocity_withAngleUnit', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return 0; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'getVelocity_withAngleUnit', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'setPIDFCoefficients', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return 0; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'getPIDFCoefficients', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'setVelocityPIDFCoefficients', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'setPositionPIDFCoefficients', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return 0; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'getCurrent', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return 0; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'getCurrentAlert', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'setCurrentAlert', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return false; //NON FUNCTIONAL
    };
    interpreter.setProperty(motor, 'isOverCurrent', interpreter.createNativeFunction(wrapper));

    //Telemetry Blocks
    var telemetry = interpreter.nativeToPseudo({});
    interpreter.setProperty(globalObject, 'telemetry', telemetry);

    var wrapper = function (key, data) {
        return (telemetryData += key + ": " + data + "\n");
    };
    interpreter.setProperty(telemetry, 'addData', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        document.getElementById("telemetryText").innerText = telemetryData;
        telemetryData = "";
        return;
    };
    interpreter.setProperty(telemetry, 'update', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(telemetry, 'speak', interpreter.createNativeFunction(wrapper));

    var wrapper = function () {
        return; //NON FUNCTIONAL
    };
    interpreter.setProperty(telemetry, 'setDisplayFormat', interpreter.createNativeFunction(wrapper));

    //Miscellaneous Blocks
    var misc = interpreter.nativeToPseudo({});
    interpreter.setProperty(globalObject, 'misc', misc);

    var wrapper = function () {
        return null;
    };
    interpreter.setProperty(misc, 'getNull', interpreter.createNativeFunction(wrapper));

    var wrapper = function (value) {
        return null == value;
    };
    interpreter.setProperty(misc, 'isNull', interpreter.createNativeFunction(wrapper));

    var wrapper = function (value) {
        return null !== value;
    };
    interpreter.setProperty(misc, 'isNotNull', interpreter.createNativeFunction(wrapper));

    var wrapper = function (number, precision) {
        var string = "" + Math.round((number + Number.EPSILON) * (10 ** precision)) / (10 ** precision);
        if (precision > 0) {
            if (!string.includes('.'))
                string += '.';
            string += (10 ** (precision - string.split('.')[1].length)).toString().substring(1);
        }
        return string;
    };
    interpreter.setProperty(misc, 'formatNumber', interpreter.createNativeFunction(wrapper));

    var wrapper = function (number, precision) {
        return Math.round((number + Number.EPSILON) * (10 ** precision)) / (10 ** precision);
    };
    interpreter.setProperty(misc, 'roundDecimal', interpreter.createNativeFunction(wrapper));
}

var telemetryData = "";

var myInterpreter = null;
var motorPowers = { "m1": 0.0, "m2": 0.0, "m3": 0.0, "m4": 0.0, "m5": 0.0, "m6": 0.0, "m7": 0.0, "m8": 0.0 };
var motorValues = { "m1": 0.0, "m2": 0.0, "m3": 0.0, "m4": 0.0, "m5": 0.0, "m6": 0.0, "m7": 0.0, "m8": 0.0 };

function resetInterpreter() {
    myInterpreter = null;
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
    var finalCode = "runOpMode();\n";

    var inFunction = false;
    for (var line of code.split('\n')) {
        if (line.startsWith('function '))
            inFunction = true;
        if (inFunction || line == '' || line.startsWith('var ') || line.startsWith('// '))
            finalCode += line + '\n';
        else
            finalCode += '//' + line + '\n';
        if (line == '}')
            inFunction = false;
    }
    motorPowers = { "m1": 0.0, "m2": 0.0, "m3": 0.0, "m4": 0.0, "m5": 0.0, "m6": 0.0, "m7": 0.0, "m8": 0.0 };
    console.log(finalCode);
    telemetryData = "";
    myInterpreter = new Interpreter(finalCode, initApi);
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
