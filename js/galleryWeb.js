let DEBUGLEVEL = 1

function debug(level, info) {
    if (level <= DEBUGLEVEL) {
        console.log(info)
    }
}

function carouselSnippet(path, intro, active) {
    return '\
    <div class="carousel-item ' + active + ' h-100">\
        <div class="row justify-content-center h-100">\
            <img class="" src="' + path + '">\
        </div>\
        <div class="carousel-caption d-none d-block">\
            <p>'+
        intro + '\
            </p>\
        </div>\
    </div>'
}

$(document).ready(function () {
    $("#album > div").load("./pic/pic.html", function (response, status, xhr) {
        // debug(1, response)
        debug(2, status)
        // debug(1, xhr)
        $(response).find(".card").each(function () {
            let filepath = $("img", this).attr("src")
            let intro = $("p", this).text()
            debug(2, filepath)
            debug(2, intro)
            let cnt = $("#gallery-carousel > div > div").length
            if (cnt == 0) {
                $("#gallery-carousel > div").append(carouselSnippet(filepath, intro, "active"))
            } else {
                $("#gallery-carousel > div").append(carouselSnippet(filepath, intro, ""))
            }
        })
        $(".card p").each(function(){
            $(this).attr("title", $(this).text())
        })
        $(".card img").on("click", function () {
            let idx = $(this).parent().parent().index()

            $(".carousel").carousel(idx)
            $(".carousel").carousel("pause")
            $("#gallery-modal").modal("toggle")
        })
    })
})