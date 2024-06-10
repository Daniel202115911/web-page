async function fetchScrapedData() {
    try {
        const response = await fetch('YOUR_CLOUD_FUNCTION_URL');
        const data = await response.json();
        document.getElementById('scrapedData').textContent = JSON.stringify(data);
    } catch (error) {
        console.error('Error fetching scraped data:', error);
    }
}


async function getBR(){
    try{
        const response = await fetch('https://us-central1-omega-booster-425919-s7.cloudfunctions.net/scrape/?param=BR')
        const data = await response.json(); 
        displayList(data, '#BR-info');
    } catch (error) {
        console.log(error);
    }
}

async function getCV(){
    try{
        const response = await fetch('https://us-central1-omega-booster-425919-s7.cloudfunctions.net/scrape/?param=CV')
        const data = await response.json(); 
        displayList(data, '#CV-info');
    } catch (error) {
        console.error('Error fetching data:', error.message); 
    }
}

async function getMP(){
    try{
        const response = await fetch('https://us-central1-omega-booster-425919-s7.cloudfunctions.net/scrape/?param=MP')
        const data = await response.json(); 
        displayList(data, '#MP-info');
    } catch (error) {
        console.error('Error fetching data:', error.message); 
    }
}

async function getALL(){
    await getMP();
    await getCV();
    await getBR();
}

function displayList(list, div_locator){
    // Clear data div
    $(div_locator).empty();

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
