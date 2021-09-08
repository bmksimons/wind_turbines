'use strict'

/*This function gets called if the button "showDocumentation" is clicked.
Checks the CSS attribute 'display' in the HTML element with class=documentation.
If it equals to block, which indicates it's currently visible, the documentation will be hidden.
If it equals to none, the documentation will become visible*/
function toggleDocumentation() {
    let documentation = document.querySelector(".documentation");
    if (documentation.style.display == "block") {
        documentation.style.display = "none";
    }
    else {
        documentation.style.display = "block";
        documentation.style.opacity = 0.95;
    }
  }

//Uses the JQuery API for changing the color of the center of the turbine in the SVG.
$(document).ready(function() {
    $("ellipse").click(function() {
        if ($("ellipse").css("fill") == "rgb(205, 223, 244)") {
            $("ellipse").css("fill", "rgb(61, 66, 115)");
        } else {
            $("ellipse").css("fill", "rgb(205, 223, 244)");
        }
        });
    });
