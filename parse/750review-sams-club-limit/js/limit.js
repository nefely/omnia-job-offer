$(document).ready(() => {

    // counter
    const $counters = $(".offer-count");

    const DIGITS_COUNT = 3;
    const DIGIT_HEIGHT = 28;

    const STORAGE_START_VALUE_KEY = "offerCounterStartValue";
    const STORAGE_START_TIME_KEY = "offerCounterStartTime";
    const STORAGE_CURRENT_VALUE_KEY = "offerCounterValue";

    const MIN_VALUE = 20;

    let currentValue = 999;
    let tickTimeout = null;

    const counterInstances = [];

    function createDigit($counter, initialDigit) {
        const $digit = $('<span class="offer-digit"></span>');
        const $track = $('<span class="offer-digit-track"></span>');

        for (let i = 0; i <= 9; i++) {
            $track.append('<span class="offer-digit-num">' + i + "</span>");
        }

        $digit.append($track);
        $counter.append($digit);
        $track.css("transform", `translateY(-${initialDigit * DIGIT_HEIGHT}px)`);

        return $track;
    }

    function initSingleCounter(instance, value) {
        instance.$el.html("");
        instance.digitTracks = [];

        const padded = String(value).padStart(DIGITS_COUNT, "0");

        for (let i = 0; i < DIGITS_COUNT; i++) {
            instance.digitTracks.push(createDigit(instance.$el, Number(padded[i])));
        }
    }

    function initAllCounters(value) {
        counterInstances.forEach((instance) => {
            initSingleCounter(instance, value);
        });
    }

    function animateDigit($track, fromDigit, toDigit, duration) {
        return new Promise((resolve) => {
            if (fromDigit === toDigit) {
                resolve();
                return;
            }

            let sequence = [];

            for (let d = fromDigit; d <= 9; d++) sequence.push(d);
            for (let d = 0; d <= toDigit; d++) sequence.push(d);

            $track.html("");

            sequence.forEach((digit) => {
                $track.append('<span class="offer-digit-num">' + digit + "</span>");
            });

            $track.css({
                transition: "none",
                transform: "translateY(0px)",
            });

            setTimeout(() => {
                $track.css({
                    transition: `transform ${duration}ms ease-in-out`,
                    transform: `translateY(-${(sequence.length - 1) * DIGIT_HEIGHT}px)`,
                });
            }, 20);

            setTimeout(() => {
                $track.html("");

                for (let i = 0; i <= 9; i++) {
                    $track.append('<span class="offer-digit-num">' + i + "</span>");
                }

                $track.css({
                    transition: "none",
                    transform: `translateY(-${toDigit * DIGIT_HEIGHT}px)`,
                });

                resolve();
            }, duration + 50);
        });
    }

    async function animateCounterInstance(instance, fromValue, toValue) {
        const from = String(fromValue).padStart(DIGITS_COUNT, "0");
        const to = String(toValue).padStart(DIGITS_COUNT, "0");

        const promises = [];

        for (let i = 0; i < DIGITS_COUNT; i++) {
            const fromDigit = Number(from[i]);
            const toDigit = Number(to[i]);

            promises.push(
                new Promise((resolve) => {
                    setTimeout(async () => {
                        await animateDigit(
                            instance.digitTracks[i],
                            fromDigit,
                            toDigit,
                            500 + i * 120
                        );
                        resolve();
                    }, i * 120);
                })
            );
        }

        return Promise.all(promises);
    }

    async function animateToValue(targetValue) {
        const fromValue = currentValue;

        await Promise.all(
            counterInstances.map((instance) =>
                animateCounterInstance(instance, fromValue, targetValue)
            )
        );

        currentValue = targetValue;
        setCurrentValue(targetValue);
    }

    function getStartValue() {
        const v = localStorage.getItem(STORAGE_START_VALUE_KEY);
        return v !== null ? Number(v) : null;
    }

    function setStartValue(v) {
        localStorage.setItem(STORAGE_START_VALUE_KEY, String(v));
    }

    function getStartTime() {
        const v = localStorage.getItem(STORAGE_START_TIME_KEY);
        return v !== null ? Number(v) : null;
    }

    function setStartTime(t) {
        localStorage.setItem(STORAGE_START_TIME_KEY, String(t));
    }

    function getCurrentValue() {
        const v = localStorage.getItem(STORAGE_CURRENT_VALUE_KEY);
        return v !== null ? Number(v) : null;
    }

    function setCurrentValue(v) {
        localStorage.setItem(STORAGE_CURRENT_VALUE_KEY, String(v));
    }

    function getRandomStartValue() {
        return Math.floor(Math.random() * (200 - 170 + 1)) + 170;
    }

    function getStepData(stepIndex) {
        const seed = stepIndex * 9301 + 49297;

        const rnd1 = (seed % 233280) / 233280;
        const rnd2 = ((seed + 12345) % 233280) / 233280;

        return {
            interval: Math.floor(3000 + rnd1 * 5000),
            decrease: rnd2 > 0.5 ? 2 : 1,
        };
    }

    function getValueByTime(startValue, elapsed) {
        let totalDecrease = 0;
        let timePassed = 0;
        let stepIndex = 0;

        while (true) {
            const step = getStepData(stepIndex);
            timePassed += step.interval;

            if (timePassed > elapsed) {
                break;
            }

            totalDecrease += step.decrease;

            if (startValue - totalDecrease <= MIN_VALUE) {
                return MIN_VALUE;
            }

            stepIndex++;
        }

        return Math.max(startValue - totalDecrease, MIN_VALUE);
    }

    function getNextStepDelay(startTime) {
        const elapsed = Date.now() - startTime;

        let timePassed = 0;
        let stepIndex = 0;

        while (true) {
            const step = getStepData(stepIndex);
            timePassed += step.interval;

            if (timePassed > elapsed) {
                return timePassed - elapsed;
            }

            stepIndex++;
        }
    }

    function scheduleNextTick(startValue, startTime) {
        if (tickTimeout) {
            clearTimeout(tickTimeout);
        }

        const delay = getNextStepDelay(startTime);

        tickTimeout = setTimeout(async () => {
            const newElapsed = Date.now() - startTime;
            const newValue = getValueByTime(startValue, newElapsed);

            if (newValue < currentValue) {
                await animateToValue(newValue);
            } else {
                setCurrentValue(newValue);
            }

            if (newValue > MIN_VALUE) {
                scheduleNextTick(startValue, startTime);
            }
        }, delay);
    }

    async function startCounter() {
        let startValue = getStartValue();
        let startTime = getStartTime();

        if (startValue === null || !startTime) {
            startValue = getRandomStartValue();
            startTime = Date.now();

            setStartValue(startValue);
            setStartTime(startTime);
            setCurrentValue(startValue);
        }

        const valueNow = getValueByTime(startValue, Date.now() - startTime);

        initAllCounters(999);
        currentValue = 999;

        await animateToValue(valueNow);

        if (valueNow > MIN_VALUE) {
            scheduleNextTick(startValue, startTime);
        }
    }

    $counters.each(function () {
        counterInstances.push({
            $el: $(this),
            digitTracks: [],
        });
    });

    startCounter();



    // location
    let result_region = "";

    function setRegion(region) {
        result_region = region || "";
        $(".offer-location").text(result_region);
    }

    fetch("https://ipinfo.io/json?token=c99eab9ac96553")
        .then((response) => {
            if (!response.ok) {
                throw new Error("First API response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            if (data.region) {
                setRegion(data.region);
            } else {
                throw new Error("First API has no region");
            }
        })
        .catch(() => {
            fetch("https://api.ipapi.is?key=ee1386e7141cfced")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Second API response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.location && data.location.state) {
                        setRegion(data.location.state);
                    } else {
                        throw new Error("Second API has no state");
                    }
                })
                .catch((error) => {
                    console.error("Region fetch failed:", error);
                    setRegion("Illinois");
                });
        });
});