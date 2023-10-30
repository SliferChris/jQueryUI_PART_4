$(document).ready(function () {
    $("#btn_start").on("click", startGame);

    function startGame() {
        $(this).hide();
        let score = 0;
        let cleanTimer;
        let counter;
        startTimer();

        function startTimer() {
            counter = 5;
            cleanTimer = setInterval(function () {
                counter--;
                if (counter >= 0) {
                    let countdown = document.getElementById("timer");
                    countdown.innerHTML = " " + counter;
                }
                if (counter < 0) {
                    clearInterval(cleanTimer);
                    $(".circle").draggable({
                        disabled: true
                    }).css("opacity", 0.5);
                    alert("Sorry, Out of Time");
                }
            }, 1000);
        } //END TIMER

        function checkScore() {
            if (score === 3) {
                $(".scoremessage").fadeIn();
                $(".scoremessage").text("WELL DONE");
                stopTimer();
            }
        }

        function stopTimer() {
            clearInterval(cleanTimer);
        } //END STOP TIMER

        // Droppable zones defined within startGame scope
        $("#leftZone").droppable({
            accept: "#C1",
            hoverClass: "drop-hover",
            over: handleOverEvent,
            out: handleOutEvent,
            drop: handleDropEvent
        });

        $("#midZone").droppable({
            accept: "#C2",
            hoverClass: "drop-hover",
            over: handleOverEvent,
            out: handleOutEvent,
            drop: handleDropEvent
        });

        $("#rightZone").droppable({
            accept: "#C3",
            hoverClass: "drop-hover",
            over: handleOverEvent,
            out: handleOutEvent,
            drop: handleDropEvent
        });

        // Draggable elements made draggable again
        $(".circle").draggable({
            revert: "invalid",
            helper: "clone",
            containment: "#container",
        }).css("opacity", 1);

        // Handle functions defined within startGame scope
        function handleDropEvent(event, ui) {
            let elementID = $(ui.draggable).attr('id');
            let dropzoneID = $(this).attr("data-value");

            if (dropzoneID === elementID) {
                ui.draggable.draggable({
                    disabled: true
                }).css("opacity", 0.5);
                $(this).html(`<img src="images/thumb.png">`);
                score++;
                $('#score').text(score);
                checkScore();
            }
        }

        function handleOverEvent(event, ui) {
            $(this).css("opacity", .5).text("ACCEPT");
        }

        function handleOutEvent(event, ui) {
            $(this).css("opacity", 1).text("DROPZONE");
        }

        // ... (rest of your startGame function code)

        // Reload page Button
        let btn = $("#btn_reload").on("click", function () {
            location.reload(true);
        });
    }

    // Other functions and code can be defined here
});
