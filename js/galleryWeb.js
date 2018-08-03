let DEBUGLEVEL = 1
let PREVIDX, IDX, NEXTIDX

function debug(level, info) {
    if (level <= DEBUGLEVEL) {
        console.log(info)
    }
}

function locate(idx, cnt) {
    // idx is 0-base, cnt is 1-base
    let prevIdx = idx - 1, nextIdx = idx + 1
    if (prevIdx == -1) {
        prevIdx = cnt - 1
    }
    if (nextIdx == cnt) {
        nextIdx = 0
    }
    return { prevIdx, nextIdx }
    // return is 0-base
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

//abandoned
function setCarousel(prevIdx, idx, nextIdx) {
    let src = $("#album img").eq(prevIdx).attr("src")
    let txt = $("#album p").eq(prevIdx).text()
    $("#carousel1 img").attr("src", src)
    $("#carousel1 p").text(txt)
    console.log(txt)
    src = $("#album img").eq(idx).attr("src")
    txt = $("#album p").eq(idx).text()
    $("#carousel2 img").attr("src", src)
    $("#carousel2 p").text(txt)
    console.log(txt)

    src = $("#album img").eq(nextIdx).attr("src")
    txt = $("#album p").eq(nextIdx).text()
    $("#carousel3 img").attr("src", src)
    $("#carousel3 p").text(txt)
    console.log(txt)
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
            let img = $(this).attr("src")
            let txt = $(this).next(".card-body").find("p").text()
            let idx = $(this).parent().parent().index()
            let cnt = $("#album div.card").length
            let { prevIdx, nextIdx } = locate(idx, cnt)
            PREVIDX = prevIdx
            IDX = idx
            NEXTIDX = nextIdx
            // setCarousel(prevIdx, idx, nextIdx)
            debug(2, img)
            debug(2, txt)
            debug(2, idx)
            debug(2, cnt)
            debug(2, prevIdx)
            debug(2, nextIdx)
            $(".carousel").carousel("pause")
            $(".carousel").carousel(idx)
            $("#gallery-modal").modal("toggle")
            // $("#hiddenBtnForModal").click()
        })
    })
    // $(".carousel-control-prev").on("click", function(){
    //     let idx=PREVIDX
    //     let cnt = $("#album div.card").length
    //     let { prevIdx, nextIdx } = locate(idx, cnt)
    //     PREVIDX=prevIdx
    //     IDX=idx
    //     NEXTIDX=nextIdx
    //     $(".carousel").carousel("pause")
    //     $(".carousel").on("slid.bs.carousel", function(){
    //         setCarousel(prevIdx, idx, nextIdx)
    //         $(".carousel").carousel(0)
    //     })
    // })
    // $(".carousel-control-next").on("click", function(){
    //     let idx=NEXTIDX
    //     let cnt = $("#album div.card").length
    //     let { prevIdx, nextIdx } = locate(idx, cnt)
    //     PREVIDX=prevIdx
    //     IDX=idx
    //     NEXTIDX=nextIdx
    //     // setCarousel(prevIdx, idx, nextIdx)
    //     $(".carousel").carousel("pause")
    //     $(".carousel").on("slid.bs.carousel", function(){
    //         setCarousel(prevIdx, idx, nextIdx)
    //         $(".carousel").carousel(0)
    //     })
    // })
})