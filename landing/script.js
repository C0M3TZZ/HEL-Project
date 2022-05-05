let getAllFullPage = document.querySelectorAll('.fullpage');

getAllFullPage.forEach(ele => {
    ele.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
})
