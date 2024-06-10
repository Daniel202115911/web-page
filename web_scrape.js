let TIME_OUT = 300;
let last_executed = 0;
let isRUNNING = false;

const CSS = {
    MP: '#MP-info',
    CV: '#CV-info',
    BR: '#BR-info'
}

const LINK = {
    MP: 'https://us-central1-omega-booster-425919-s7.cloudfunctions.net/scrape/?param=MP',
    CV: 'https://us-central1-omega-booster-425919-s7.cloudfunctions.net/scrape/?param=CV',
    BR: 'https://us-central1-omega-booster-425919-s7.cloudfunctions.net/scrape/?param=BR'
}

async function fetchScrapedData() {
    try {
        const response = await fetch('YOUR_CLOUD_FUNCTION_URL');
        const data = await response.json();
        document.getElementById('scrapedData').textContent = JSON.stringify(data);
    } catch (error) {
        console.error('Error fetching scraped data:', error);
    }
}


async function getLoc(loc){
    let css_address = CSS[loc];
    let link = LINK[loc];

    if(isRUNNING){return;}

    if(Date.now() - last_executed > TIME_OUT){
        isRUNNING = true;
        try{
            clearDisplay(css_address);
            const response = await fetch(link)
            const data = await response.json(); 
            setTimeout(()=>{
                displayList(data, css_address);
                last_executed = Date.now();
                isRUNNING = false;
            }, 100);
        } catch (error) {
            console.log(error);
            isRUNNING = false;
        }
    }
    
}



async function getALL(){

    if(isRUNNING){return;}

    if(Date.now() - last_executed > TIME_OUT){
        isRUNNING = true;
        clearAll();
        const response_br = await fetch('https://us-central1-omega-booster-425919-s7.cloudfunctions.net/scrape/?param=BR')
        const data_br = await response_br.json(); 
        const response_cv = await fetch('https://us-central1-omega-booster-425919-s7.cloudfunctions.net/scrape/?param=CV')
        const data_cv = await response_cv.json(); 
        const response_mp = await fetch('https://us-central1-omega-booster-425919-s7.cloudfunctions.net/scrape/?param=MP')
        const data_mp = await response_mp.json();
        setTimeout(()=>{
            displayList(data_mp, '#MP-info');
            displayList(data_cv, '#CV-info');
            displayList(data_br, '#BR-info');
            last_executed = Date.now();
            isRUNNING = false;
        }, 100); 
        
    }
    

}

function clearDisplay(div_locator){
    $(div_locator).empty();
}

function clearAll(){
    $('#MP-info').empty();
    $('#CV-info').empty();
    $('#BR-info').empty();
}

function displayList(list, div_locator){
    // If there are dates available 
    if(list.length > 0){
        let ul = $('<ul></ul>').css(
            {
                'font-size': '0.7rem',
                'text-align': 'left',
                'padding-left': '60px'
            }
        );
        list.forEach(i => {
            let li = document.createElement('li');
            li.textContent = i;
            ul.append(li);
        });
        $(div_locator).append(ul);
    } else {
        $(div_locator).text("NO DATES AVAILABLE");
    }
    
    
}
