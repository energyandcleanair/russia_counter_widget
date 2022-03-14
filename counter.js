const html_string = `
    <div class='container'>
        <div class='headers'>
            <h1>Payments to Russia for fossil fuels</h1>
            <div class='subtitle'>By European Union since 24 February 2022</div>
        </div>
        <div class='big-box'>
            <div><span class='currency'>EUR</span></div>
            <div class='counter' id='total_eur_per_sec'></div>
        </div>
        <div class='row'>
            <div class='oc'>
                <div class='small-box'>
                    <div class='title'><span>Oil</span></div>
                    <div class='o-number'><span class='currency'>EUR </span><span id='oil_eur'> </span><span> M</span></div>
                </div>
            </div>
            <div class='oc'>
                <div class='small-box'>
                    <div class='title'><span>Gas</span></div>
                    <div class='o-number'><span class='currency'>EUR</span><span id='gas_eur'> </span><span> M</span></div>
                </div>
            </div>
            <div class='oc'>
                <div class='small-box'>
                    <div class='title'><span>Coal</span></div>
                    <div class='o-number'><span class='currency'>EUR </span><span id='coal_eur'> </span><span> M</span></div>
                </div>
            </div>
        </div>
        <div class='caption'>
            <p>Source: CREA analysis. See methodology <a href="https://crea.shinyapps.io/russia_counter/?tab=methodology" target='_blank'>here</a></p>
        </div>
    </div>`;

const poll_data = async ()=>{
 let response = await fetch("https://api.energyandcleanair.org/v1/russia_counter");

  if (response.status == 502) {
    await poll_data();
  } else if (response.status != 200) {
    showMessage(response.statusText);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await poll_data();
  } else {
    let data = await response.json();
    update_ui(data)
    await poll_data();
  }
}

const update_ui = (data)=>{
    document.getElementById('total_eur_per_sec').innerText = Math.floor(data.total_eur).toLocaleString('en-US');
    document.getElementById('oil_eur').innerText = Math.floor(data.oil_eur/1000000).toLocaleString('en-US');
    document.getElementById('coal_eur').innerText = Math.floor(data.coal_eur/1000000).toLocaleString('en-US');
    document.getElementById('gas_eur').innerText = Math.floor(data.gas_eur/1000000).toLocaleString('en-US');
}

const ui_setup = (elem_id)=>{
    let head = document.getElementById(elem_id);
    head.innerHTML = html_string;
}

const set_counter = (elem_id)=>{
    if(!document.getElementById(elem_id)){
        console.log('define parent element')
    }
    ui_setup(elem_id);
    poll_data();
}

