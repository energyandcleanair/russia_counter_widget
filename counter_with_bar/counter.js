var total_screen_width = 500;
const html_string = `
    <div class='rc-container' id='container'>
        <div class='headers'>
            <h1>Payments to Russia for fossil fuels</h1>
            <div class='subtitle'>Since 24 February 2022</div>
        </div>
        <div class='section'>
            <div id='GLB'>
                <div class='head'>
                    <h2>
                    <svg class="mr-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.99997 6.52705e-05C5.87826 6.52705e-05 3.84354 0.84291 2.34313 2.34319C0.842877 3.84358 0 5.87855 0 8.00003C0 10.1215 0.842844 12.1565 2.34313 13.6569C3.84351 15.1571 5.87849 16 7.99997 16C10.1214 16 12.1564 15.1572 13.6568 13.6569C15.1571 12.1565 15.9999 10.1215 15.9999 8.00003C15.9999 6.59568 15.6303 5.21622 14.9281 4.00002C14.226 2.78382 13.2161 1.77398 11.9999 1.07181C10.7837 0.369634 9.40425 0 7.9999 0L7.99997 6.52705e-05ZM14.2315 5.14294H11.5086C11.1104 3.7353 10.4191 2.42763 9.48007 1.30587C10.514 1.53661 11.4806 2.00308 12.3047 2.66848C13.1288 3.33405 13.7883 4.18085 14.2315 5.14298V5.14294ZM7.96862 14.5885C6.92078 13.5448 6.13802 12.2653 5.6857 10.8573H10.3143C9.8611 12.2657 9.07742 13.5451 8.02857 14.5885C8.01059 14.6014 7.98648 14.6014 7.96862 14.5885H7.96862ZM5.39718 9.71439C5.18761 8.5811 5.18761 7.4191 5.39718 6.28581H10.6028C10.8123 7.4191 10.8123 8.5811 10.6028 9.71439H5.39718ZM1.1428 8.0001C1.1419 7.42178 1.21486 6.84564 1.35989 6.28581H4.23706C4.05058 7.42103 4.05058 8.57917 4.23706 9.71439H1.35989C1.21486 9.15455 1.1419 8.57842 1.1428 8.0001ZM7.99997 1.40023C8.01004 1.39628 8.02127 1.39628 8.03134 1.40023C9.08072 2.44729 9.86361 3.73086 10.3143 5.14294H5.68567C6.13886 3.73451 6.92254 2.45506 7.97139 1.41166C7.97917 1.40439 7.98938 1.40031 7.99996 1.40018L7.99997 1.40023ZM11.7629 6.28581H14.6401C14.9296 7.41032 14.9296 8.58988 14.6401 9.71439H11.7629C11.9494 8.57917 11.9494 7.42103 11.7629 6.28581ZM6.52012 1.30587C5.5821 2.42832 4.89089 3.73572 4.49154 5.14294H1.76869C2.21193 4.18082 2.87139 3.33402 3.69549 2.66845C4.51959 2.00301 5.48619 1.53656 6.52012 1.30583V1.30587ZM1.76876 10.8573H4.49161C4.88982 12.2649 5.58115 13.5726 6.52019 14.6943C5.48626 14.4636 4.51966 13.9971 3.69556 13.3317C2.87146 12.6661 2.21199 11.8193 1.76876 10.8572V10.8573ZM9.48308 14.6943C10.4199 13.5716 11.1101 12.2642 11.5087 10.8573H14.2316C13.7883 11.8194 13.1289 12.6662 12.3048 13.3317C11.4807 13.9972 10.5141 14.4636 9.48014 14.6944L9.48308 14.6943Z" fill="#6E6D7A"></path></svg>
                    Global
                    </h2>
                </div>
                <div class='info'>
                    <div id='big_box' class='w-100 big-box'>
                        <div class='center'>
                            <span class='counter' id='GLB_total_eur'></span>
                            <span class='currency'>EUR</span>
                         </div>
                    </div>
                    <div class='row'>
                        <div class='oc'>
                            <div class='small-box oil'>
                                <div class='title'><span>Oil</span> (<span id='GLB_oil_percentage'></span>%)</div>
                                <div class='o-number'><span class='currency' id='eur1'></span> <span id='GLB_oil_eur'> </span><span> M</span></div>
                            </div>
                        </div>
                        <div class='oc'>
                            <div class='small-box gas'>
                                <div class='title'><span>Gas</span> (<span id='GLB_gas_percentage'></span>%)</div>
                                <div class='o-number'><span class='currency' id='eur2'></span> <span id='GLB_gas_eur'> </span><span> M</span></div>
                            </div>
                        </div>
                        <div class='oc'>
                            <div class='small-box coal'>
                                <div class='title'><span>Coal</span> (<span id='GLB_coal_percentage'></span>%)</div>
                                <div class='o-number'><span class='currency' id='eur3'></span> <span id='GLB_coal_eur'> </span><span> M</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='canvas_parent' class='center w-100'>
                     <canvas class='canvas oil' id="GLB_oil" width="0" height="30"></canvas><canvas class='canvas gas' id="GLB_gas" height="30"></canvas><canvas id="GLB_coal" class='canvas coal' width="0" height="30"></canvas>
                </div>
             </div>
        </div>
        <div class='section w-100' id='section'>
            <div id='EU'>
                <div class='head'>
                    <h2>
                    <img src="/icons/eu.png" class="mx-1" style="min-height: 16px; max-height: 16px; min-width: 16px; max-width: 16px;" width="16" height="16">
                    European Union
                    </h2>
                </div>
                <div class='info'>
                    <div class='big-box'>
                        <div class='center'>
                            <span class='counter' id='EU_total_eur'></span>
                            <span class='currency'>EUR</span>
                         </div>
                    </div>
                    <div class='row'>
                        <div class='oc'>
                            <div class='small-box oil'>
                                <div class='title'><span>Oil</span> (<span id='EU_oil_percentage'></span>%)</div>
                                <div class='o-number'><span class='currency' id='eur1'></span> <span id='EU_oil_eur'> </span><span> M</span></div>
                            </div>
                        </div>
                        <div class='oc'>
                            <div class='small-box gas'>
                                <div class='title'><span>Gas</span> (<span id='EU_gas_percentage'></span>%)</div>
                                <div class='o-number'><span class='currency' id='eur2'></span> <span id='EU_gas_eur'> </span><span> M</span></div>
                            </div>
                        </div>
                        <div class='oc'>
                            <div class='small-box coal'>
                                <div class='title'><span>Coal</span> (<span id='EU_coal_percentage'></span>%)</div>
                                <div class='o-number'><span class='currency' id='eur3'></span> <span id='EU_coal_eur'> </span><span> M</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='center w-100'>
                    <canvas class='canvas oil' id="EU_oil" width="0" height="30"></canvas><canvas class='canvas gas' id="EU_gas" height="30"></canvas><canvas id="EU_coal" class='canvas coal' width="0" height="30"></canvas>
                </div>
             </div>
        </div
        <div class='caption'>
            <p>Source: CREA analysis. See methodology <a href="https://crea.shinyapps.io/russia_counter/?tab=methodology" target='_blank'>here</a></p>
        </div>
    </div>`;

const parse_country_resp = (resp)=>{
    data = {}
    data.total_eur_updated = resp[3].total_eur
    data.total_eur_per_sec = resp[3].eur_per_sec
    data.oil_eur_updated = resp[2].total_eur
    data.oil_eur_per_sec = resp[2].eur_per_sec
    data.gas_eur_updated = resp[1].total_eur
    data.gas_eur_per_sec = resp[1].eur_per_sec
    data.coal_eur_updated = resp[0].total_eur
    data.coal_eur_per_sec = resp[0].eur_per_sec
    return data
}
const pull_data = async ()=>{
    let counter_data = {}
    let global_response = await fetch('https://api.russiafossiltracker.com/v0/counter_last?aggregate_by=commodity_group');
    if (global_response.status != 200) {
       console.log("Error loading global data")
    } else {
       let resp_data = await global_response.json();
       let parsed_data = parse_country_resp(resp_data.data)
       parsed_data.ui_identifier = 'GLB'
       counter_data.GLOBAL = parsed_data
    }

    // If more than one country needs to be displayed, this function can be modified with url that fetch different country data and modify counter_data as such
    let eur_response = await fetch('https://api.russiafossiltracker.com/v0/counter_last?destination_region=EU&use_eu=True&aggregate_by=destination_region,commodity_group');
    if (eur_response.status != 200) {
       console.log("Error loading EU data")
     } else {
       let resp_data = await eur_response.json();
       let parsed_data = parse_country_resp(resp_data.data)
       parsed_data.ui_identifier = 'EU'
       counter_data.EU= parsed_data
     }
     run_auto_counter(counter_data);
}

const run_auto_counter = async(counter_data)=>{
    update_ui(counter_data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    for (let data of Object.values(counter_data)) {
        data.total_eur_updated += data.total_eur_per_sec;
        data.oil_eur_updated += data.oil_eur_per_sec;
        data.gas_eur_updated += data.gas_eur_per_sec;
        data.coal_eur_updated += data.coal_eur_per_sec;
    }
    run_auto_counter(counter_data)
}

const update_ui = (counter_data)=>{

    for (let data of Object.values(counter_data)) {
        let coal_percentage = 100 * (data.coal_eur_updated / data.total_eur_updated)
        let gas_percentage = 100 * (data.gas_eur_updated / data.total_eur_updated )
        let oil_percentage = 100 * (data.oil_eur_updated / data.total_eur_updated )
        let coal_width = total_screen_width * coal_percentage /100
        let gas_width = total_screen_width * gas_percentage /100
        let oil_width = total_screen_width * oil_percentage /100

        let canvas_oil = document.getElementById(`${data.ui_identifier}_oil`);
        let canvas_gas = document.getElementById(`${data.ui_identifier}_gas`);
        let canvas_coal = document.getElementById(`${data.ui_identifier}_coal`);
        canvas_coal.width = coal_width
        canvas_oil.width = oil_width
        canvas_gas.width = gas_width

        let floor_oil = Math.floor(oil_percentage)
        let floor_gas = Math.floor(gas_percentage)
        let ceil_coal = 100-floor_oil-floor_gas
        document.getElementById(`${data.ui_identifier}_total_eur`).innerText = Math.floor(data.total_eur_updated).toLocaleString('en-US');
        document.getElementById(`${data.ui_identifier}_oil_eur`).innerText = Math.floor(data.oil_eur_updated / 1000000).toLocaleString('en-US');
        document.getElementById(`${data.ui_identifier}_coal_eur`).innerText = Math.floor(data.coal_eur_updated / 1000000).toLocaleString('en-US');
        document.getElementById(`${data.ui_identifier}_gas_eur`).innerText = Math.floor(data.gas_eur_updated / 1000000).toLocaleString('en-US');
        document.getElementById(`${data.ui_identifier}_oil_percentage`).innerText = floor_oil.toLocaleString('en-US');
        document.getElementById(`${data.ui_identifier}_gas_percentage`).innerText = floor_gas.toLocaleString('en-US');
        document.getElementById(`${data.ui_identifier}_coal_percentage`).innerText = ceil_coal.toLocaleString('en-US');
    }
}

const start_counter = (container)=>{
    let counter_container = document.getElementById(container)
    if(!counter_container){
        console.log('define container element')
        return;
    }
    counter_container.innerHTML = html_string; 
    total_screen_width = document.getElementById('canvas_parent').clientWidth

    pull_data();
}

//window.onresize = window.location.reload();
