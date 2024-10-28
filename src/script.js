let historyButton = document.querySelectorAll('.dashboard_main_cont .main_dashboard .main_content .history_cont .transac_cont h2')

for (let i = 0; i < historyButton.length; i++) {
    historyButton[i].addEventListener('click', ()=> {
        for (let j = 0; j < historyButton.length; j++) {
            historyButton[j].classList.remove('active');
        }
        historyButton[i].classList.add('active');
    })   
}


let modelProductButton = document.querySelectorAll('.moneyin_modal .modal-body .add_items_cont .products h2')

for (let i = 0; i < modelProductButton.length; i++) {
    modelProductButton[i].addEventListener('click', ()=> {
        for (let j = 0; j < modelProductButton.length; j++) {
            modelProductButton[j].classList.remove('active');
        }
        modelProductButton[i].classList.add('active');
    })   
}




let select_date1 = document.querySelector('.select_date1');
let display_date1 = document.querySelector('.display_date1')


let select_date2 = document.querySelector('.select_date2');
let display_date2 = document.querySelector('.display_date2')


select_date1.addEventListener('change', (e)=> {
    var date = new Date(e.target.value);
    
    var formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    display_date1.textContent = formattedDate
})


select_date2.addEventListener('change', (e)=> {
    var date = new Date(e.target.value);
    
    var formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    display_date2.textContent = formattedDate
})