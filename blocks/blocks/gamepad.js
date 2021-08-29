/**
 * @license
 * Copyright 2016 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview FTC robot blocks related to game pads.
 * @author lizlooney@google.com (Liz Looney)
 */

// The following are defined in vars.js:
// propertyColorGamepad

function createGamepadDropdown() {
  var CHOICES = [
      ['gamepad1', 'gamepad1'],
      ['gamepad2', 'gamepad2'],
      ];
  return new Blockly.FieldDropdown(CHOICES);
}

//VRS-Added switch cases for controllers to translate to javascript code
function getController(property) {
  var code;
  switch (property) {
    case 'gamepad1':                
      code = 0;  
      break; 
    case 'gamepad2':                
      code = 1;  
      break; 
    default:
      throw 'Unexpected property ' + property + ' (gamepad_getProperty).';
  }
  return code;
}

function getControlValues(property) {
  var code;
  switch (property) {
    case 'A':                
      code = '0, \'Xbox\'';  
      break;                 
    case 'AtRest':           
      code = '-1, \'Both\''; 
      break;                 
    case 'B':                
      code = '1, \'Xbox\'';  
      break;                 
    case 'Back':             
      code = '8, \'Xbox\'';  
      break;                 
    case 'Circle':           
      code = '1, \'P\'';     
      break;                 
    case 'Cross':            
      code = '0, \'P\'';     
      break;                 
    case 'DpadDown':         
      code = '13, \'Both\''; 
      break;                 
    case 'DpadLeft':         
      code = '14, \'Both\''; 
      break;                 
    case 'DpadRight':
      code = '15, \'Both\'';
      break;
    case 'DpadUp':
      code = '12, \'Both\'';
      break;
    case 'Guide':
      code = '16, \'Xbox\'';
      break;
    case 'LeftBumper':
      code = '4, \'Both\'';
      break;
    case 'LeftStickButton':
      code = '10, \'Both\'';
      break;
    case 'LeftStickX':
      code = '0';
      break;
    case 'LeftStickY':
      code = '1';
      break;
    case 'LeftTrigger':
      code = '6';
      break;
    case 'Options':
      code = '9, \'P\'';
      break;
    case 'PS':
      code = '16, \'P\'';
      break;
    case 'RightBumper':
      code = '5, \'Both\'';
      break;
    case 'RightStickButton':
      code = '11, \'Both\'';
      break;
    case 'RightStickX':
      code = '2';
      break;
    case 'RightStickY':
      code = '3';
      break;
    case 'RightTrigger':
      code = '7';
      break;
    case 'Share':
      code = '8, \'P\'';
      break;
    case 'Square':
      code = '2, \'P\'';
      break;
    case 'Start':
      code = '9, \'Xbox\'';
      break;
    case 'Touchpad':
      code = '17, \'P\'';
      break;
    case 'Triangle':
      code = '3, \'P\'';
      break;
    case 'X':
      code = '2, \'Xbox\'';
      break;
    case 'Y':
      code = '3, \'Xbox\'';
      break;
    default:
      throw 'Unexpected property ' + property + ' (gamepad_getProperty).';
  }
  return code;
}

//VRS-Removed gamepad_getProperty (seemed depreciated)

/*Blockly.FtcJava['gamepad_getProperty'] = function(block) {
  var identifier = block.getFieldValue('IDENTIFIER');
  var property = block.getFieldValue('PROP');
  var code;
  switch (property) {
    case 'A':
      code = 'a';
      break;
    case 'AtRest':
      code = 'atRest()';
      break;
    case 'B':
      code = 'b';
      break;
    case 'Back':
      code = 'back';
      break;
    case 'Circle':
      code = 'circle';
      break;
    case 'Cross':
      code = 'cross';
      break;
    case 'DpadDown':
      code = 'dpad_down';
      break;
    case 'DpadLeft':
      code = 'dpad_left';
      break;
    case 'DpadRight':
      code = 'dpad_right';
      break;
    case 'DpadUp':
      code = 'dpad_up';
      break;
    case 'Guide':
      code = 'guide';
      break;
    case 'LeftBumper':
      code = 'left_bumper';
      break;
    case 'LeftStickButton':
      code = 'left_stick_button';
      break;
    case 'LeftStickX':
      code = 'left_stick_x';
      break;
    case 'LeftStickY':
      code = 'left_stick_y';
      break;
    case 'LeftTrigger':
      code = 'left_trigger';
      break;
    case 'Options':
      code = 'options';
      break;
    case 'PS':
      code = 'ps';
      break;
    case 'RightBumper':
      code = 'right_bumper';
      break;
    case 'RightStickButton':
      code = 'right_stick_button';
      break;
    case 'RightStickX':
      code = 'right_stick_x';
      break;
    case 'RightStickY':
      code = 'right_stick_y';
      break;
    case 'RightTrigger':
      code = 'right_trigger';
      break;
    case 'Share':
      code = 'share';
      break;
    case 'Square':
      code = 'square';
      break;
    case 'Start':
      code = 'start';
      break;
    case 'Touchpad':
      code = 'touchpad';
      break;
    case 'Triangle':
      code = 'triangle';
      break;
    case 'X':
      code = 'x';
      break;
    case 'Y':
      code = 'y';
      break;
    default:
      throw 'Unexpected property ' + property + ' (gamepad_getProperty).';
  }
  var code = identifier + '.' + code;
  if (code.endsWith(')')) { // atRest() is a method.
    return [code, Blockly.FtcJava.ORDER_FUNCTION_CALL];
  }
  return [code, Blockly.FtcJava.ORDER_MEMBER];
};*/

Blockly.Blocks['gamepad_getProperty_Boolean'] = {
  init: function() {
    var PROPERTY_CHOICES = [
		['A', 'A'],
        ['AtRest', 'AtRest'],
        ['B', 'B'],
        ['Back', 'Back'],
        ['Circle', 'Circle'],
        ['Cross', 'Cross'],
        ['DpadDown', 'DpadDown'],
        ['DpadLeft', 'DpadLeft'],
        ['DpadRight', 'DpadRight'],
        ['DpadUp', 'DpadUp'],
        ['Guide', 'Guide'],
        ['LeftBumper', 'LeftBumper'],
        ['LeftStickButton', 'LeftStickButton'],
        ['Options', 'Options'],
        ['PS', 'PS'],
        ['RightBumper', 'RightBumper'],
        ['RightStickButton', 'RightStickButton'],
        ['Share', 'Share'],
        ['Square', 'Square'],
        ['Start', 'Start'],
        ['Touchpad', 'Touchpad'],
        ['Triangle', 'Triangle'],
        ['X', 'X'],
        ['Y', 'Y'],
    ];
    this.setOutput(true, 'Boolean');
    this.appendDummyInput()
        .appendField(createGamepadDropdown(), 'IDENTIFIER')
        .appendField('.')
        .appendField(new Blockly.FieldDropdown(PROPERTY_CHOICES), 'PROP');
    this.setColour(propertyColorGamepad);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    var TOOLTIPS = [
        ['A', 'Returns true if the A button is pressed.'],
        ['AtRest', 'Returns true if all analog sticks and triggers are in their rest position.'],
        ['B', 'Returns true if the B button is pressed.'],
        ['Back', 'Returns true if the Back button is pressed.'],
        ['Circle', 'Returns true if the Circle button is pressed.'],
        ['Cross', 'Returns true if the Cross button is pressed.'],
        ['DpadDown', 'Returns true if the dpad down button is pressed.'],
        ['DpadLeft', 'Returns true if the dpad left button is pressed.'],
        ['DpadRight', 'Returns true if the dpad right button is pressed.'],
        ['DpadUp', 'Returns true if the dpad up button is pressed.'],
        ['Guide', 'Returns true if the Guide button is pressed. The Guide button is often the large button in the middle of the controller.'],
        ['LeftBumper', 'Returns true if the left bumper is pressed.'],
        ['LeftStickButton', 'Returns true if the left stick button is pressed.'],
        ['Options', 'Returns true if the Options button is pressed.'],
        ['PS', 'Returns true if the PS button is pressed.'],
        ['RightBumper', 'Returns true if the right bumper is pressed.'],
        ['RightStickButton', 'Returns true if the right stick button is pressed.'],
        ['Share', 'Returns true if the Share button is pressed.'],
        ['Square', 'Returns true if the Square button is pressed.'],
        ['Start', 'Returns true if the Start button is pressed.'],
        ['Touchpad', 'Returns true if the Touchpad button is pressed.'],
        ['Triangle', 'Returns true if the Triangle button is pressed.'],
        ['X', 'Returns true if the X button is pressed.'],
        ['Y', 'Returns true if the Y button is pressed.'],
    ];
    this.setTooltip(function() {
      var key = thisBlock.getFieldValue('PROP');
      for (var i = 0; i < TOOLTIPS.length; i++) {
        if (TOOLTIPS[i][0] == key) {
          return TOOLTIPS[i][1];
        }
      }
      return '';
    });
  }
};

//VRS-Modified JavaScript Code
Blockly.JavaScript['gamepad_getProperty_Boolean'] = function(block) {
  code = 'gamepad.boolValue(' + getController(block.getFieldValue('IDENTIFIER')) + ', ' + getControlValues(block.getFieldValue('PROP')) + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/*Blockly.FtcJava['gamepad_getProperty_Boolean'] =
    Blockly.FtcJava['gamepad_getProperty'];*/


Blockly.Blocks['gamepad_getProperty_Number'] = {
  init: function() {
    var PROPERTY_CHOICES = [
        ['LeftStickX', 'LeftStickX'],
        ['LeftStickY', 'LeftStickY'],
        ['LeftTrigger', 'LeftTrigger'],
        ['RightStickX', 'RightStickX'],
        ['RightStickY', 'RightStickY'],
        ['RightTrigger', 'RightTrigger'],
    ];
    this.setOutput(true, 'Number');
    this.appendDummyInput()
        .appendField(createGamepadDropdown(), 'IDENTIFIER')
        .appendField('.')
        .appendField(new Blockly.FieldDropdown(PROPERTY_CHOICES), 'PROP');
    this.setColour(propertyColorGamepad);
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    var TOOLTIPS = [
        ['LeftStickX', 'Returns a numeric value between -1.0 and +1.0 representing the left analog stick horizontal axis value.'],
        ['LeftStickY', 'Returns a numeric value between -1.0 and +1.0 representing the left analog stick vertical axis value.'],
        ['LeftTrigger', 'Returns a numeric value between 0.0 and +1.0 representing the left trigger value.'],
        ['RightStickX', 'Returns a numeric value between -1.0 and +1.0 representing the right analog stick horizontal axis value.'],
        ['RightStickY', 'Returns a numeric value between -1.0 and +1.0 representing the right analog stick vertical axis value .'],
        ['RightTrigger', 'Returns a numeric value between 0.0 and +1.0 representing the right trigger value.'],
    ];
    this.setTooltip(function() {
      var key = thisBlock.getFieldValue('PROP');
      for (var i = 0; i < TOOLTIPS.length; i++) {
        if (TOOLTIPS[i][0] == key) {
          return TOOLTIPS[i][1];
        }
      }
      return '';
    });
    this.getFtcJavaOutputType = function() {
      var property = thisBlock.getFieldValue('PROP');
      switch (property) {
        case 'LeftStickX':
        case 'LeftStickY':
        case 'LeftTrigger':
        case 'RightStickX':
        case 'RightStickY':
        case 'RightTrigger':
          return 'float';
        default:
          throw 'Unexpected property ' + property + ' (gamepad_getProperty_Number getOutputType).';
      }
    };
  }
};
	
//VRS-Modified JavaScript Code
Blockly.JavaScript['gamepad_getProperty_Number'] = function(block) {
  code = 'gamepad.numberValue(' + getController(block.getFieldValue('IDENTIFIER')) + ', ' + getControlValues(block.getFieldValue('PROP')) + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

/*Blockly.FtcJava['gamepad_getProperty_Number'] =
    Blockly.FtcJava['gamepad_getProperty'];*/
