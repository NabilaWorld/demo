// load card Data
const loadData = () =>{
    document.getElementById('spinner').classList.remove('d-none')
  
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => {
      document.getElementById('spinner').classList.add('d-none');
      showData(data.data.tools.slice(0, 6))
    } )
  }
  
  
  // show card data
  const showData = (details) => {
    const container = document.getElementById('ai-container');
    container.innerHTML = "";
    details.forEach(detail => {
      const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
                  <div class="card h-100">
                      <img src="${detail.image ? detail.image : 'No Image Found'}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title mb-2"><b>Feasures</b></h5> 
                        <p class="card-text text-muted">
                        1. ${detail.features[0] ? detail.features[0] : 'No Data Found'} <br>
  
                        2. ${detail.features[1] ?  detail.features[1] : 'No Data Found'} <br>
  
                        3. ${detail.features[2] ? detail.features[2] : 'No Data Found'}
                        </p>
                        
                        <hr>
  
                         
                        <h5 class="card-title"><b>${detail.name ? detail.name: "No Data Found"}</b></h5>
                        
                        
                        <div class="d-flex">
                        <i id="myInput" class="fa-regular fa-calendar-days text-muted me-2"></i>
  
                        <p id="date" class="text-muted me-auto">${detail.published_in ? detail.published_in: 'No data Found'}</p>
  
                        <i onclick="loadModalData('${detail.id}')" class=" fa-solid fa-arrow-right text-danger "   href='#' class = 'btn btn-primary' data-bs-toggle="modal" data-bs-target="#universeModal"></i>
  
                        </div>
  
                      </div>
                    </div>
    `
    container.appendChild(div)
    })
  }
  
  
  // show all data
  const showAllDataTogether = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        showData(data.data.tools)
    })
  }
  
  const loadModalData =  (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
     fetch(url)
    .then(res => res.json())
    // displayModalDetails(data.data.tools);
    .then(data => {
      console.log(data);
      displayModalDetails(data)
    })
  }
  
  const displayModalDetails = details =>{
    const modalTitle = document.getElementById('universeModalLabel');
    // modalTitle.innerText = details.data;
    const universeDetails = document.getElementById('id-details');
    universeDetails.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col">
    <div class="card h-100 bg-danger-subtle border border-1 border-danger rounded-3">
      
      <div class="card-body ">
        <h6 class="card-title"><b>${details.data.description ? details.data.description : 'No Data Found'}</b></h6>
          <br>
        <div class="row">
        <div class="col-sm-4">
  
        <h6 class="card-text text-center bg-white h-100 p-3 w-100 me-2 rounded-3 " style="color: green;"><b>
      ${details.data.pricing.length ? details.data.pricing[0].price + '  ' + details.data.pricing[0].plan : 'No data found'}
  </b></h6>
  
    
        </div>
        
        <div class="col-sm-4">
  
          <h6 class="card-text text-center bg-white h-100 p-3 w-100 me-2 rounded-3 " style="color: orange;"><b>
        ${details.data.pricing.length ? details.data.pricing[1].price + ' ' + details.data.pricing[1].plan : 'No data found'}
    </b></h6>
        </div>
  
        <div class="col-sm-4">
        <p class="card-text text-center bg-white h-100 p-2 w-100 me-2 rounded-3 " style="color: red;">
        ${details.data.pricing.length ? details.data.pricing[2].price + ' ' + details.data.pricing[2].plan : 'No data found'}
    </p>
        </div>
  
      </div>
      
  <br>
        <div class="d-flex">
          <div>
            <h6><b>Features</b></h6>
            <ul class="text-muted">
                <li>${details.data.features[1] ? details.data.features[1].feature_name : 'No Data found'}</li>
  
               <li>${details.data.features[2] ? details.data.features[2].feature_name : 'No Data found'}</li>
  
              <li>${details.data.features[3] ? details.data.features[3].feature_name : 'No Data found'}</li>
          </ul>
          </div>
  
  
          <div>
            <h6><b>Integrations</b></h6>
            <ul class="text-muted">
              <li>${details.data.integrations ? details.data.integrations[0] : ''}</li>
  
              <li>${details.data.features ? details.data.features[1].feature_name : ''}</li>
  
              <li>${details.data.features ? details.data.features[2].feature_name : ''}</li>
  </ul>
  
          </div>
        </div>
        
  
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card h-100">
      <img src="${details.data.image_link[0] ? details.data.image_link[0] : 'no photo Found'}" class="card-img-top" alt="...">
  
      <p style="background:red; color:white; position:relative; top:-45%; left:50%" class="w-50 px-4 rounded-2">${details.data.accuracy.score ? details.data.accuracy.score*100 + '% accuracy' : ''}  </p>
  
      <div class="card-body">
        <h5 class="card-title"><b>${details.data.input_output_examples[0].input ? details.data.input_output_examples[0].input : "no data found" }</b></h5>
  
        <p class="card-text text-muted text-center">
            ${details.data.input_output_examples[0].output ? details.data.input_output_examples[0].output : "No! Not Yet! Take a break!!!"}
        </p>
  
  
      </div>
    </div>
  </div>
  
  </div>
    `
  }
  
  
  const sortByDate = (data) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      if(data.status === true){
        sortByDateTest(data.data.tools);
       
      }
  
      else{
        alert('Something went wrong')   
      }
    })
  
  }
    const dateSort = (a, b) => {
      const dateA = new Date(a.published_in);
      const dateB = new Date(b.published_in);
      if(dateA > dateB) return 1;
      else if (dateA < dateB) return -1;
      return 0;
    }
  
    const sortByDateTest = (myData) =>{
      const newDateSort = myData.sort(dateSort);
      showAllDataTogether(newDateSort);
    }
    
  
  
  loadData();