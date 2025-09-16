(function () {
    /* ===== Counter ===== */
    var root = document.querySelector(".money-counter");
    if (!root) return;

    var end = Number(root.getAttribute("data-end")) || 100;
    var duration = Number(root.getAttribute("data-duration")) || 1500;

    var valueWrap = root.querySelector(".money-counter__value");
    var valueText = root.querySelector(".money-counter__valtext");
    var shine = root.querySelector(".shine");
    var flashEl = root.querySelector(".screen-flash");
    var ringEl = root.querySelector(".burst-ring");
    var timerEl = root.querySelector(".offer-timer__value");
    var timerWrap = root.querySelector(".offer-timer");

    var mapBlock = document.querySelector(".pr-live-map");
    var start = performance.now(),
        fired = false;

    function animateNum(now) {
        var t = Math.min((now - start) / duration, 1);
        var val = Math.round(t * end);
        valueText.textContent = "$" + val;
        if (t < 1) requestAnimationFrame(animateNum);
        else if (!fired) {
            fired = true;
            valueText.textContent = "$" + Math.round(end);
            finale();
        }
    }

    function finale() {
        // Pop effects on hit
        valueWrap.classList.add("hit-pop");
        shine.classList.remove("run");
        void shine.offsetWidth;
        shine.classList.add("run");
        flashEl.classList.add("run");
        ringAtElement(valueWrap);

        // Dock header (map is already visible)
        setTimeout(function () {
            root.classList.add("docked");
        }, 620);
    }

    function ringAtElement(el) {
        var rect = el.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        ringEl.style.left = cx + "px";
        ringEl.style.top = cy + "px";
        ringEl.classList.remove("run");
        void ringEl.offsetWidth;
        ringEl.classList.add("run");
    }

    // Countdown 5:00 with urgency pulse in last 10s
    var totalMs = 5 * 60 * 1000,
        deadline = Date.now() + totalMs;
    function fmt(ms) {
        var s = Math.max(0, Math.ceil(ms / 1000)),
            m = (s / 60) | 0,
            ss = s % 60;
        return (m < 10 ? "0" + m : m) + ":" + (ss < 10 ? "0" + ss : ss);
    }
    function tick() {
        var r = deadline - Date.now();
        if (r <= 0) {
            timerEl.textContent = "00:00";
            timerWrap.classList.remove("offer-timer--urgent");
            clearInterval(iv);
            return;
        }
        timerEl.textContent = fmt(r);
        if (r <= 10000) timerWrap.classList.add("offer-timer--urgent");
    }
    requestAnimationFrame(animateNum);
    tick();
    var iv = setInterval(tick, 250);

    /* ===== Live map spawner (starts immediately) ===== */
    startMapSpawner(mapBlock);

    function startMapSpawner(container) {
        var layer = container.querySelector(".pr-map-layer");
        var minAmt = +container.getAttribute("data-min") || 100;
        var maxAmt = +container.getAttribute("data-max") || 200;
        var interval = +container.getAttribute("data-interval") || 3500;
        var maxVisible = +container.getAttribute("data-max-visible") || 12;

        // Tightened anchors for your PNG (lower-48 outline)
        var cities = [
            {
                n: "Seattle, WA",
                x: 13.5,
                y: 24,
            },
            {
                n: "Portland, OR",
                x: 16,
                y: 27,
            },
            {
                n: "San Francisco, CA",
                x: 19.8,
                y: 49,
            },
            {
                n: "San Jose, CA",
                x: 21,
                y: 52,
            },
            {
                n: "Los Angeles, CA",
                x: 23,
                y: 58,
            },
            {
                n: "San Diego, CA",
                x: 24,
                y: 62,
            },
            {
                n: "Las Vegas, NV",
                x: 27,
                y: 52,
            },
            {
                n: "Salt Lake City, UT",
                x: 33,
                y: 46,
            },
            {
                n: "Phoenix, AZ",
                x: 31,
                y: 61,
            },
            {
                n: "Denver, CO",
                x: 42.5,
                y: 46.5,
            },
            {
                n: "Albuquerque, NM",
                x: 37,
                y: 60,
            },
            {
                n: "Dallas, TX",
                x: 53,
                y: 60,
            },
            {
                n: "Austin, TX",
                x: 52,
                y: 62,
            },
            {
                n: "San Antonio, TX",
                x: 51,
                y: 65,
            },
            {
                n: "Houston, TX",
                x: 56,
                y: 66,
            },
            {
                n: "Oklahoma City, OK",
                x: 49,
                y: 53,
            },
            {
                n: "Kansas City, MO",
                x: 55,
                y: 47,
            },
            {
                n: "Minneapolis, MN",
                x: 54,
                y: 32,
            },
            {
                n: "Chicago, IL",
                x: 64,
                y: 38.5,
            },
            {
                n: "St. Louis, MO",
                x: 60,
                y: 45,
            },
            {
                n: "Nashville, TN",
                x: 65,
                y: 51,
            },
            {
                n: "Memphis, TN",
                x: 61,
                y: 54,
            },
            {
                n: "New Orleans, LA",
                x: 61,
                y: 67,
            },
            {
                n: "Atlanta, GA",
                x: 69.5,
                y: 60,
            },
            {
                n: "Charlotte, NC",
                x: 72,
                y: 55,
            },
            {
                n: "Raleigh, NC",
                x: 75,
                y: 53,
            },
            {
                n: "Washington, DC",
                x: 79,
                y: 49,
            },
            {
                n: "Philadelphia, PA",
                x: 81,
                y: 45,
            },
            {
                n: "New York, NY",
                x: 83,
                y: 41,
            },
            {
                n: "Boston, MA",
                x: 85,
                y: 38,
            },
            {
                n: "Tampa, FL",
                x: 74,
                y: 71,
            },
            {
                n: "Orlando, FL",
                x: 76,
                y: 73,
            },
            {
                n: "Miami, FL",
                x: 78.5,
                y: 77.5,
            },
        ];
        var firstNames = ["Maya", "Ethan", "Ava", "Noah", "Zoe", "Leo", "Sophia", "Kai", "Liam", "Mila", "Owen", "Chloe", "Isaac", "Nora", "Aiden", "Layla", "Jude", "Ruby", "Caleb", "Elena"];

        function pick(a) {
            return a[(Math.random() * a.length) | 0];
        }
        function amt() {
            return "$" + (Math.random() * (maxAmt - minAmt) + minAmt).toFixed(2);
        }

        function spawn() {
            while (layer.children.length >= maxVisible) layer.removeChild(layer.firstElementChild);
            var city = pick(cities),
                who = pick(firstNames);

            var claim = document.createElement("div");
            claim.className = "pr-claim";
            claim.style.left = city.x + "%";
            claim.style.top = city.y + "%";

            var dot = document.createElement("div");
            dot.className = "pr-dot";
            var ring = document.createElement("div");
            ring.className = "pr-pulse";
            var pill = document.createElement("div");
            pill.className = "pr-pill";
            pill.innerHTML = "<b>" + amt() + "</b> — " + who + " • " + city.n;

            claim.append(dot, ring, pill);
            layer.appendChild(claim);

            setTimeout(function () {
                pill.classList.add("pr-fade");
                ring.style.opacity = "0";
                dot.style.opacity = "0.85";
                setTimeout(function () {
                    claim.remove();
                }, 650);
            }, 4600);
        }

        spawn();
        setInterval(spawn, interval);
    }
})();

/* ===== Quick Start Guide logic (claimed today counter) ===== */
(function () {
    const wrap = document.querySelector(".pr-qsg .qsg-claimed");
    if (!wrap) return;
    const numEl = wrap.querySelector(".qsg-claimed__num");

    let val = 91;
    // start
    const max = 100;
    // cap
    const stepMs = 10000;
    // every 10 seconds

    function render() {
        numEl.textContent = String(val);
    }
    function bump() {
        wrap.classList.remove("bump");
        void wrap.offsetWidth;
        wrap.classList.add("bump");
    }
    function tick() {
        if (val >= max) {
            wrap.classList.add("maxed");
            clearInterval(iv);
            return;
        }
        val += 1;
        render();
        bump();
        if (val >= max) {
            wrap.classList.add("maxed");
            clearInterval(iv);
        }
    }

    render();
    const iv = setInterval(tick, stepMs);
})();


$(document).ready(function(){

    window.getURLParameter = (sUrl, sParam) => {
        let sPageURL = decodeURI(sUrl.substring(sUrl.indexOf('?') + 1));
        let sURLVariables = sPageURL.split('&');
        for (let i = 0; i < sURLVariables.length; i++) {
            let sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }


    const rtkcid = window.getURLParameter(window.location.href, 'rtkcid');
    const rtkcmpid = window.getURLParameter(window.location.href, 'rtkcmpid');


    $("#offer_link").click(function(e){
        e.preventDefault()
    //     fetch(`https://track.${window.location.host}/postback?type=CompleteRegistration&clickid=${rtkcid}`, { mode: 'no-cors'})
    //     .then(r => {
    //         console.log("successfully registered: " + rtkcid);
    //         setTimeout(()=>{
                window.location.href = `${$(this).attr("href")}${$(this).attr("href").includes("?") ? "&" : "?"}clickid=${rtkcid}`
    //         },300)
    //     })
        // .catch(e => console.log("error during registration lead: " + e));
    });

})