const html_string = `
    <div class='container'>
        <div id='titlebox' class='headers'>
            <div id='title'></div>
            <div id='subtitle' class='subtitle'></div>
        </div>
        <div class='big-box'>
            <span class='currency' id='eur'></span>
            <div class='counter' id='total_eur_per_sec'></div>
        </div>
        <div class='row'>
            <div class='oc'>
                <div class='small-box'>
                    <div class='title' id='oil'><span></span></div>
                    <div class='o-number'><span class='currency' id='eur1'></span> <span id='oil_eur'> </span><span> M</span></div>
                </div>
            </div>
            <div class='oc'>
                <div class='small-box'>
                    <div class='title' id='gas'><span></span></div>
                    <div class='o-number'><span class='currency' id='eur2'></span> <span id='gas_eur'> </span><span> M</span></div>
                </div>
            </div>
            <div class='oc'>
                <div class='small-box'>
                    <div class='title' id='coal'><span></span></div>
                    <div class='o-number'><span class='currency' id='eur3'></span> <span id='coal_eur'> </span><span> M</span></div>
                </div>
            </div>
        </div>
        <div id='caption' class='caption'>
        </div>
    </div>`;


const get_url_params = () => {

    let url_params = {}
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let language = urlParams.get('language') || 'en'; 
    url_params['language'] = language

    let eu_only = urlParams.get('eu_only') || 'true';
    url_params['eu_only'] = (eu_only === 'true');
    
    let show_caption = urlParams.get('show_caption') || 'true';
    url_params['show_caption'] = (show_caption === 'true');
    
    let show_title = urlParams.get('show_title') || 'true';
    url_params['show_title'] = (show_title === 'true');

    return url_params;
}


const pull_data = async () => {
    
    const url_params = get_url_params()
    
    if (url_params.eu_only) {
        api_url = "https://api.russiafossiltracker.com/v0/counter_last?destination_region=EU&use_eu=True&aggregate_by=destination_region,commodity_group"
    } else {
        api_url = "https://api.russiafossiltracker.com/v0/counter_last?aggregate_by=commodity_group"
    }

    let response = await fetch(api_url);
    
    if (response.status != 200) {
        console.log("Error loading data")
    } else {
        let api_data = await response.json();
        let data = {}

        const total = api_data.data.find(x => (x.commodity_group == 'total'));
        data.total_eur_updated = total.total_eur
        data.total_eur_per_sec = total.eur_per_sec

        const oil = api_data.data.find(x => (x.commodity_group == 'oil'));
        data.oil_eur_updated = oil.total_eur
        data.oil_eur_per_sec = oil.eur_per_sec

        const gas = api_data.data.find(x => (x.commodity_group == 'gas'));
        data.gas_eur_updated = gas.total_eur
        data.gas_eur_per_sec = gas.eur_per_sec

        const coal = api_data.data.find(x => (x.commodity_group == 'coal'));
        data.coal_eur_updated = coal.total_eur
        data.coal_eur_per_sec = coal.eur_per_sec
        run_auto_counter(data);
    }
}

const run_auto_counter = async (data) => {
    update_ui(data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    data.total_eur_updated += data.total_eur_per_sec;
    data.oil_eur_updated += data.oil_eur_per_sec;
    data.gas_eur_updated += data.gas_eur_per_sec;
    data.coal_eur_updated += data.coal_eur_per_sec;
    run_auto_counter(data)
}

const update_ui = (data) => {
    document.getElementById('total_eur_per_sec').innerText = Math.floor(data.total_eur_updated).toLocaleString('en-US');
    document.getElementById('oil_eur').innerText = Math.floor(data.oil_eur_updated / 1000000).toLocaleString('en-US');
    document.getElementById('coal_eur').innerText = Math.floor(data.coal_eur_updated / 1000000).toLocaleString('en-US');
    document.getElementById('gas_eur').innerText = Math.floor(data.gas_eur_updated / 1000000).toLocaleString('en-US');
}

var language;

const get_language = (url_params) => {
    $.ajax({
        url: 'language/' + url_params['language'] + '.json', 
        dataType: 'json', async: false, dataType: 'json', 
        success: function (lang) { language = lang; } });
}

const ui_setup = (elem_id) => {
    let head = document.getElementById(elem_id);
    head.innerHTML = html_string;
    
    const url_params = get_url_params();

    // Set langugage content
    get_language(url_params);

    $(document).ready(function(){
        $('#title').html(language.title);
        $('#subtitle').html(language.subtitle);
        $('#eur').html(language.eur);
        $('#eur1').html(language.eur);
        $('#eur2').html(language.eur);
        $('#eur3').html(language.eur);
        $('#oil').html(language.oil);
        $('#gas').html(language.gas);
        $('#coal').html(language.coal);
        $('#caption').html(language.caption);
    });

    
    // show title
    var x = document.getElementById('title');
    x.style.display = url_params.show_title ? 'block' : 'none'
    
    // update subtitle if need be
    if (!url_params.eu_only) {
        var x = document.getElementById('subtitle');
        x.innerHTML = 'Globally since 24 February 2022'
    }

    // show caption
    var x = document.getElementById('caption');
    x.style.display = url_params.show_caption ? 'block' : 'none'
}

const set_counter = (elem_id) => {
    if (!document.getElementById(elem_id)) {
        console.log('define parent element')
        return;
    }
    ui_setup(elem_id);
    pull_data();
}

