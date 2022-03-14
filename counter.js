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

const pull_data = async ()=>{
 let response = await fetch("https://api.energyandcleanair.org/v1/russia_counter");
 if (response.status != 200) {
    console.log("Error loading data")
  } else {
    let data = await response.json();
    data.total_eur_updated = data.total_eur
    data.oil_eur_updated = data.oil_eur
    data.gas_eur_updated = data.gas_eur
    data.coal_eur_updated = data.coal_eur
    run_auto_counter(data);
  }
}

const run_auto_counter = async(data)=>{
    update_ui(data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    data.total_eur_updated += data.total_eur_per_sec;
    data.oil_eur_updated += data.oil_eur_per_sec;
    data.gas_eur_updated += data.gas_eur_per_sec;
    data.coal_eur_updated += data.coal_eur_per_sec;
    run_auto_counter(data)
}

const update_ui = (data)=>{
    document.getElementById('total_eur_per_sec').innerText = Math.floor(data.total_eur_updated).toLocaleString('en-US');
    document.getElementById('oil_eur').innerText = Math.floor(data.oil_eur_updated/1000000).toLocaleString('en-US');
    document.getElementById('coal_eur').innerText = Math.floor(data.coal_eur_updated/1000000).toLocaleString('en-US');
    document.getElementById('gas_eur').innerText = Math.floor(data.gas_eur_updated/1000000).toLocaleString('en-US');
}

const ui_setup = (elem_id)=>{
    let head = document.getElementById(elem_id);
    head.innerHTML = html_string;
}

const set_counter = (elem_id)=>{
    if(!document.getElementById(elem_id)){
        console.log('define parent element')
        return;
    }
    ui_setup(elem_id);
    pull_data();
}
