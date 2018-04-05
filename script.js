// Google Zero: Part 1
// Version 1.9
// ©2014 Matt Silver

/*jshint -W117 */
/*jshint -W041 */

// VARIABLES
var currentSequence = 1;
var currentDestination = 1;
var currentCharacter=1;
var slow=50;
var fast=20;
var typeSpeed=slow;
var typePause=1000;
var firstName;
var newDestination;
var textLine;
var text = [];
var sequence = [];

// HANDLERS
var $textDestination = [];
for (i = 1; i <= 5; i++) {
    $textDestination[i] = $("#textDestination"+i);
}
var $form = $("#form");
var $overlay = $("#overlay");
var $submitBtn = $("#submitBtn");
var $fullName = $("#fullName");

// SET THE TEXT
function setText() {
    text[1] = "Hacking Google mainframe. Anonymous user connection activated.";
    text[2] = "Who have we contacted? Please tell us your name.";
    text[3] = firstName+", we need your help, but this connection is not secure.";
    text[4] = "Copy and paste the following encrypted message into a text program.";
    text[5] = "Well done, "+firstName+". Thank you for accepting our call for help.";
    text[6] = "You have been assigned a contact at our agency. Use the secure email address below to inquire about your next step.";
    text[7] = "jduhm.lzqbtr@gmail.com";
}
setText();

// CALLED FUNCTIONS
function type() {
    if (currentCharacter==1) {
        textLine=text[currentSequence];
        newDestination=$textDestination[currentDestination];
    }
    newDestination.html(textLine.substr(0, currentCharacter));
    currentCharacter++;
    if (currentCharacter<=textLine.length) {
        setTimeout(function(){type();}, typeSpeed);
    } else {
        currentCharacter=1;
        currentDestination++;
        currentSequence++;
        sequence[currentSequence]();
    }
}
function resetParams() {
    currentDestination=1;
    for (i = 1; i <= 5; i++) {
        $textDestination[i].html("");
    }
    $form.css("display", "none");
}

// MAIN SEQUENCE
sequence[1] = function() {
    $overlay.fadeIn(typePause);
    setTimeout(function(){type();}, typePause);
};
sequence[2] = function() {
    setTimeout(function(){type();}, typePause);
};
sequence[3] = function() {
    $form.fadeIn(2000);
    $submitBtn.click(function() {
        var fullName = $fullName.val().split(' ');
        if (fullName != "") {
            firstName = fullName[0];
            resetParams();
            setText();
            setTimeout(function(){type();}, typePause);
        }
    });
    $fullName.keypress(function(event){
        if(event.keyCode == 13){
            $submitBtn.click();
        }
    });
};
sequence[4] = function() {
    setTimeout(function(){type();}, typePause);
};
sequence[5] = function() {
    typeSpeed=fast;
    setTimeout(function(){type();}, typePause);
};
sequence[6] = function() {
    type();
};
sequence[7] = function() {
    type();
};

// INITIALIZE THE DOM
$(document).ready(function() {
    window.onclick = function() {
        sequence[currentSequence]();
        window.onclick="";
    };
});