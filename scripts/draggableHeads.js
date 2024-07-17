document.addEventListener('DOMContentLoaded', () => {
    const svg = document.querySelector('svg');
    const minuteHand = document.querySelector('#minute_hand');
    const hourHand = document.querySelector('#hour_hand');
    // const secondHand = document.querySelector('#second_hand');

    const hands = [minuteHand, hourHand];

    hands.forEach(hand => {
        hand.addEventListener('mousedown', startDrag);
    });

    let selectedElement = null;
    let centerX, centerY;

    function startDrag(event) {
        selectedElement = event.target;
        centerX = 260;
        centerY = 260;

        svg.addEventListener('mousemove', drag);
        svg.addEventListener('mouseup', endDrag);
        svg.addEventListener('mouseleave', endDrag);
    }

    function drag(event) {
        if (selectedElement) {
            const mouseX = event.clientX - svg.getBoundingClientRect().left;
            const mouseY = event.clientY - svg.getBoundingClientRect().top;

            const dx = mouseX - centerX;
            const dy = mouseY - centerY;
            let angle = Math.atan2(dy, dx) * (180 / Math.PI);
            console.log(dx, dy, angle);
            if (selectedElement === minuteHand) {
                angle += sessionStorage.getItem('turnsOfMinute') * 360;
            }
            else if(selectedElement === hourHand){
                angle += sessionStorage.getItem('turnsOfHour') * 360;
            }
            else {
                angle += sessionStorage.getItem('turnsOfSecond') * 360;
            }
            angle+=90;
            selectedElement.style.setProperty('--degree', `${angle}deg`);
        }
    }

    function endDrag() {
        svg.removeEventListener('mousemove', drag);
        svg.removeEventListener('mouseup', endDrag);
        svg.removeEventListener('mouseleave', endDrag);
        selectedElement = null;
    }
});
