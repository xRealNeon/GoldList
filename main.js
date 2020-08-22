AOS.init();
DarkReader.auto({
    brightness: 100,
    contrast: 90
});
var page = 1;

$(window).scroll(function () {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        appendPage();
        page++;
    }

    if ($(window).scrollTop() > 20 || $(window).scrollTop() > 20) {
        $('#toTop').css("display", "block");
    } else {
        $('#toTop').css("display", "none");
    }
});

appendPage();

function appendPage() {
    if (!$('#loader').length) {
        $('#content').append(`<div class="text-center">
        <div id="loader" class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
      <span class="sr-only">Loading...</span>
    </div></div>
        `);
    }

    $.ajax('https://api.github.com/users/xRealNeon/starred?per_page=50&page=' + page, {
        success: function (data, status, xhr) {
            $('#loader').remove();
            data.forEach(element => {
                $("#content").append(`
                <div class="card  w-75" style="width: 18rem;" data-aos="fade-up" data-aos-duration="300">
  <div class="card-body">
    <h5 class="card-title">${element.full_name}</h5>
    <p class="card-text">${htmlspecialchars(element.description)}</p>
    <a href="${element.html_url}" class="btn btn-primary" target="_blank">Open</a>
  </div>
</div><br>
                `);
            });
        },
        error: function (data, status, xhr) {
            $('#loader').remove();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: 'Something went wrong!<br>The ratelimit was probably reached.'
            }).then((result) => {
                location.reload();
            });
        }
    });
}