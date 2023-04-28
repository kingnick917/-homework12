const dashoardBtn = document.querySelector("#dashoard");
const inputvalueEL = document.querySelector('.inputvalue')


var tabTitle = $("#tab_title"),
  tabContent = $("#tab_content"),
  tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
  tabCounter = 2;

var tabs = $("#tabs").tabs();

// Modal dialog init: custom buttons and a "close" callback resetting the form inside
var dialog = $("#dialog").dialog({
  autoOpen: false,
  modal: true,
  buttons: {
    Add: function () {
      console.log(`bob`)
    newTab(`newTab`);
   

    },
    Cancel: function () {
    (this).dialog("close");
    }
  },
  close: function () {
    form[0].reset();
  }
});

// AddTab form: calls addTab function on submit and closes the dialog
var form = dialog.find("form").on("submit", function (event) {
  event.preventDefault();
  newTab();
  dialog.dialog("close");
});

// Actual addTab function: adds new tab using the input from the form above

function newTab() {
  console.log(`c`)
   const tab_title = document.querySelector('#tab_title').value; 
   const tab_content = document.querySelector('#tab_content').value; 
  fetch(`/api/tabs`, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "title":tab_title,
      "information": tab_content
    }),
  }).then(()=>{
    window.location.reload()
  })
  
  
  var label = tabTitle.val() || "Tab " + tabCounter,
    id = "tabs-" + tabCounter,
    li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label)),
    tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";

  tabs.find(".ui-tabs-nav").append(li);
  tabs.append("<div id='" + id + "'><p>" + tabContentHtml + "</p></div>");
  tabs.tabs("refresh");
  tabCounter++;
}

// AddTab button: just opens the dialog
$("#add_tab")
  .button()
  .on("click", function () {
    console.log(`no`)
    dialog.dialog("open");
  });

// Close icon: removing the tab on click
tabs.on("click", "span.ui-icon-close", function () {
  var panelId = $(this).closest("li").remove().attr("aria-controls");
  $("#" + panelId).remove();
  tabs.tabs("refresh");
});

tabs.on("keyup", function (event) {
  if (event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE) {
    var panelId = tabs.find(".ui-tabs-active").remove().attr("aria-controls");
    $("#" + panelId).remove();
    tabs.tabs("refresh");
  }
});



