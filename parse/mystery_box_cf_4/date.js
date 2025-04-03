let date_element = document.getElementById('date');
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorror_day = tomorrow.getDate();
monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
],
tomorrow_month = tomorrow.getMonth() + 1;
tomorrow_year = tomorrow.getFullYear();
date_element.innerHTML = monthArr[tomorrow_month - 1] + ' ' + tomorror_day + ', ' + tomorrow_year;