_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

const div = document.createElement("div"),
  title = "Lodash template generator";

var itemTpl = _.template(
    '<div class="card"><div class="card-content"><label>title<span class="remove right">Remove</span></label><input class="form-control tplTitle tplData" type="text" value="new"><label>template</label><textarea class="tplContent tplData"></textarea></div></div>'
  ),
  exportTpl = _.template(
    '<textarea class="export"></textarea><button class="btn newTpl">new</button><button class="btn right saveTpl">save</button>'
  );

function init() {
  $(div)
    .clone()
    .addClass("app row")
    .append(
      $("<h3/>")
        .addClass("center")
        .text(title),
      $(div)
        .clone()
        .addClass("templateDiv col m6")
        .append(itemTpl()),
      $(div)
        .clone()
        .addClass("exportDiv col m6")
        .append(exportTpl())
    )
    .prependTo("body");

  $(".newTpl").click(function() {
    $(".templateDiv").append(itemTpl());
    getTplData();
  });
  getTplData();
  saveIt("templates.js")
}

function removeTpl() {
  $(".remove")
    .off()
    .click(function() {
      $(this)
        .parents(".card")
        .remove();
      console.log("removed");
    });
}

function getTplData() {
  _.forEach([".tplTitle", ".tplContent"], function(i) {
    $(i)
      .off()
      .keyup(function() {
        $(".export").empty();
        $(i).each(function() {
          $(".export").append(
            _.escape(
              "var " +
                $(this)
                  .parent(".card-content")
                  .find(".tplData")
                  .eq(0)
                  .val() +
                " = _.template(`" +
                $(this)
                  .parent(".card-content")
                  .find(".tplData")
                  .eq(1)
                  .val() +
                "`);\n"
            )
          );
        });
      });
  });
  removeTpl();
}

function saveIt(i){
  $(".saveTpl").click(function() {
    var text = $(".export").val(),
    blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, i);
  });
}

init();