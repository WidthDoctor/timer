const inputs = document.querySelectorAll('input[type="text"]');

    inputs.forEach(function(input) {
            var defaultValue = input.value;
            input.addEventListener('focus', function() {
                input.value = '';
            });
            input.addEventListener('blur', function() {
                if (input.value === '') {
                    input.value = defaultValue;
                }
            });
        });

        const timer1 = document.getElementById('timer1');
        const hoursInput = document.getElementById('hoursInput');
        const minutesInput = document.getElementById('minutesInput');
        const startPauseButton = document.getElementById('pause');

        let timerInterval;
        let totalSeconds = 0;
        let isRunning = false;

        function updateTimer() {
            const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
            const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
            const ss = String(totalSeconds % 60).padStart(2, '0');
            timer1.textContent = `${hh}:${mm}:${ss}`;
            // Сохранение текущего значения таймера в локальное хранилище
            localStorage.setItem('timerValue', timer1.textContent);
        }

        function startTimer() {
            if (!isRunning) {
                const hours = parseInt(hoursInput.value) || 0;
                const minutes = parseInt(minutesInput.value) || 0;
                if (totalSeconds === 0) {
                    totalSeconds = hours * 3600 + minutes * 60;
                    // Обновление значения в локальном хранилище только если таймер начинается с нуля
                    localStorage.setItem('timerValue', timer1.textContent);
                }
                isRunning = true;
                startPauseButton.textContent = "Pause";
                timerInterval = setInterval(function () {
                    if (totalSeconds <= 0) {
                        clearInterval(timerInterval);
                        isRunning = false;
                        startPauseButton.textContent = "Start";
                    } else {
                        totalSeconds--;
                        updateTimer();
                    }
                }, 1000);
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                startPauseButton.textContent = "Resume";
            }
        }

        function resetTimer() {
            clearInterval(timerInterval);
            isRunning = false;
            startPauseButton.textContent = "Start";
            totalSeconds = 0;
            updateTimer();
        }

        startPauseButton.addEventListener('click', function () {
            if (totalSeconds === 0 || !isRunning) {
                // Попытка загрузить значение из локального хранилища
                const savedTimerValue = localStorage.getItem('timerValue');
                if (savedTimerValue) {
                    const [hh, mm, ss] = savedTimerValue.split(':');
                    totalSeconds = parseInt(hh) * 3600 + parseInt(mm) * 60 + parseInt(ss);
                    updateTimer(); // Обновить таймер с восстановленным значением
                }
                startTimer();
            } else {
                startTimer();
            }
        });

        // Загрузка значения таймера при загрузке страницы
        window.addEventListener('load', function () {
            const savedTimerValue = localStorage.getItem('timerValue');
            if (savedTimerValue) {
                const [hh, mm, ss] = savedTimerValue.split(':');
                totalSeconds = parseInt(hh) * 3600 + parseInt(mm) * 60 + parseInt(ss);
                updateTimer();
            }
        });0
        // Добавьте обработчики событий для сброса таймера
        hoursInput.addEventListener('input', resetTimer);
        minutesInput.addEventListener('input', resetTimer);

        const timer2 = document.getElementById('timer2');
        const hoursInput2 = document.getElementById('hoursInput2');
        const minutesInput2 = document.getElementById('minutesInput2');
        const startPauseButton2 = document.getElementById('pause2');

        let timerInterval2;
        let totalSeconds2 = 0;
        let isRunning2 = false;


        function updateTimer2() {
            const hh = String(Math.floor(totalSeconds2 / 3600)).padStart(2, '0');
            const mm = String(Math.floor((totalSeconds2 % 3600) / 60)).padStart(2, '0');
            const ss = String(totalSeconds2 % 60).padStart(2, '0');
            timer2.textContent = `${hh}:${mm}:${ss}`;
            // Сохранение текущего значения таймера в локальное хранилище
            localStorage.setItem('timerValue2', timer2.textContent);
        }

        function startTimer2() {
            if (!isRunning2) {
                const hours = parseInt(hoursInput2.value) || 0;
                const minutes = parseInt(minutesInput2.value) || 0;
                if (totalSeconds2 === 0) {
                    totalSeconds2 = hours * 3600 + minutes * 60;
                    // Обновление значения в локальном хранилище только если таймер начинается с нуля
                    localStorage.setItem('timerValue2', timer2.textContent);
                }
                isRunning2 = true;
                startPauseButton2.textContent = "Pause";
                timerInterval2 = setInterval(function () {
                    if (totalSeconds2 <= 0) {
                        clearInterval(timerInterval2);
                        isRunning2 = false;
                        startPauseButton2.textContent = "Start";
                    } else {
                        totalSeconds2--;
                        updateTimer2();
                    }
                }, 1000);
            } else {
                clearInterval(timerInterval2);
                isRunning2 = false;
                startPauseButton2.textContent = "Resume";
            }
        }

        function resetTimer2() {
            clearInterval(timerInterval2);
            isRunning2 = false;
            startPauseButton2.textContent = "Start";
            totalSeconds2 = 0;
            updateTimer2();
        }

        startPauseButton2.addEventListener('click', function () {
            if (totalSeconds2 === 0 || !isRunning2) {
                // Попытка загрузить значение из локального хранилища
                const savedTimerValue = localStorage.getItem('timerValue2');
                if (savedTimerValue) {
                    const [hh, mm, ss] = savedTimerValue.split(':');
                    totalSeconds2 = parseInt(hh) * 3600 + parseInt(mm) * 60 + parseInt(ss);
                    updateTimer2(); // Обновить таймер с восстановленным значением
                }
                startTimer2();
            } else {
                startTimer2();
            }
        });

        // Добавьте обработчики событий для сброса таймера
        hoursInput2.addEventListener('input', resetTimer2);
        minutesInput2.addEventListener('input', resetTimer2);

        // Загрузка значения таймера при загрузке страницы
        window.addEventListener('load', function () {
            const savedTimerValue = localStorage.getItem('timerValue2');
            if (savedTimerValue) {
                const [hh, mm, ss] = savedTimerValue.split(':');
                totalSeconds2 = parseInt(hh) * 3600 + parseInt(mm) * 60 + parseInt(ss);
                updateTimer2();
            }
        });