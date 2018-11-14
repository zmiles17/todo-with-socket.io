const date = new Date();
const day = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
$("header").append(`<h1>${day[date.getDay()]}</h1><h4>${month[date.getMonth()]} ${date.getDate()} <span>${date.getFullYear()}</span></h4>`);

function renderChecklist() {
    $.get("/checklist").then(function (res) {
        $("ul").empty();
        res.forEach(e => $("ul").append(`<li data-id="${e._id}">${e.todo}<i class="far ${e.completed ? "fa-times-circle" : "fa-circle"}"></i></li>`));
        $(".fa-times-circle").parent().css("color", "lightsteelblue");
        $(".fa-times-circle").on("click", deleteItem);
        $("li").on("click", function (event) {
            if ($(event.target).attr("class") === "far fa-circle") {
                const id = $(event.target).parent().attr("data-id");
                $.ajax({ url: `/checklist/${id}`, method: "PUT", data: { completed: true } }).then(function (res) {
                    $(event.target).removeClass("far fa-circle").addClass("far fa-times-circle");
                    $(".fa-times-circle").parent().css("color", "lightsteelblue");
                    $(".fa-times-circle").on("click", deleteItem);
                })
            }
        })
    })
}

function deleteItem (event) {
    const id = $(event.target).parent().attr("data-id");
    $.ajax({ url: `/checklist/${id}`, method: "DELETE"}).then(function(res){
        $(event.target).parent().remove();
    })
}

$("form").on("submit", function (event) {
    event.preventDefault();
    const input = $("input").val().trim();
    $("input").val("");
    $.post("/checklist", { todo: input }).then(function (res) {
        renderChecklist();
    })
})

renderChecklist();


