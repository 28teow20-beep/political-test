const axes = ["Economic", "Social", "Environmental", "Diplomatic"];
const axisColors = {
  Economic: '#FF6384',
  Social: '#36A2EB',
  Environmental: '#FFCE56',
  Diplomatic: '#4BC0C0'
};

// All 50 questions
const questions = [
  { text: "Taxes on the wealthy should be higher.", axis: "Economic" },
  { text: "Government should provide universal healthcare.", axis: "Economic" },
  { text: "Free markets are generally better than government regulation.", axis: "Economic" },
  { text: "Labor unions strengthen society.", axis: "Economic" },
  { text: "Corporations should have fewer regulations.", axis: "Economic" },
  { text: "Income equality is important for a healthy society.", axis: "Economic" },
  { text: "Private property rights are more important than redistribution.", axis: "Economic" },
  { text: "Progressive taxation is fair.", axis: "Economic" },
  { text: "Government should subsidize green energy.", axis: "Economic" },
  { text: "Economic freedom is more important than equality.", axis: "Economic" },
  { text: "Personal freedoms should never be restricted.", axis: "Social" },
  { text: "Censorship is sometimes necessary to protect society.", axis: "Social" },
  { text: "Freedom of speech should be absolute.", axis: "Social" },
  { text: "Drug use should be decriminalized.", axis: "Social" },
  { text: "Marriage laws should be strictly traditional.", axis: "Social" },
  { text: "Religion should influence public policy.", axis: "Social" },
  { text: "Government surveillance is acceptable for safety.", axis: "Social" },
  { text: "Society should protect minority rights strongly.", axis: "Social" },
  { text: "Voting should be mandatory.", axis: "Social" },
  { text: "People should have the right to own firearms.", axis: "Social" },
  { text: "Climate change is the most important global issue.", axis: "Environmental" },
  { text: "Industrial growth should take priority over environmental protection.", axis: "Environmental" },
  { text: "Renewable energy should replace fossil fuels.", axis: "Environmental" },
  { text: "Environmental regulations hurt the economy too much.", axis: "Environmental" },
  { text: "Protecting wildlife is a top societal priority.", axis: "Environmental" },
  { text: "Individual choice is more important than environmental laws.", axis: "Environmental" },
  { text: "Carbon emissions should be heavily taxed.", axis: "Environmental" },
  { text: "Climate change policies should be voluntary, not enforced.", axis: "Environmental" },
  { text: "Governments should lead global environmental agreements.", axis: "Environmental" },
  { text: "Economic growth is more important than environmental concerns.", axis: "Environmental" },
  { text: "International cooperation is essential for peace.", axis: "Diplomatic" },
  { text: "Countries should prioritize national interests over global issues.", axis: "Diplomatic" },
  { text: "Open borders are generally positive.", axis: "Diplomatic" },
  { text: "Military strength is necessary for national security.", axis: "Diplomatic" },
  { text: "Foreign aid is important to help developing countries.", axis: "Diplomatic" },
  { text: "Immigration should be highly restricted.", axis: "Diplomatic" },
  { text: "Trade agreements benefit society overall.", axis: "Diplomatic" },
  { text: "Nations should act independently of international organizations.", axis: "Diplomatic" },
  { text: "Diplomacy is more important than military power.", axis: "Diplomatic" },
  { text: "Globalization is generally positive.", axis: "Diplomatic" },
  { text: "Public education should be free and universal.", axis: "Economic" },
  { text: "Parents should have complete control over their children’s education.", axis: "Social" },
  { text: "Urban development should prioritize sustainability.", axis: "Environmental" },
  { text: "Refugees should always be welcomed.", axis: "Diplomatic" },
  { text: "Military intervention abroad is justified only as a last resort.", axis: "Diplomatic" },
  { text: "Workers should have strong collective bargaining rights.", axis: "Economic" },
  { text: "Marriage should be defined by traditional norms.", axis: "Social" },
  { text: "Protecting endangered species is vital.", axis: "Environmental" },
  { text: "International law should guide national policy decisions.", axis: "Diplomatic" },
  { text: "We should prioritize domestic issues over foreign policy.", axis: "Diplomatic" },
  { text: "Taxes should fund social welfare programs.", axis: "Economic" },
  { text: "Healthcare should be privatized.", axis: "Economic" },
  { text: "Wealth inequality is a major societal problem.", axis: "Economic" },
  { text: "Freedom of religion is crucial in society.", axis: "Social" },
  { text: "Government should regulate speech to prevent harm.", axis: "Social" },
  { text: "Protecting the environment is a moral duty.", axis: "Environmental" },
  { text: "Climate policy should be decided locally, not globally.", axis: "Environmental" },
  { text: "Countries should intervene to stop human rights abuses abroad.", axis: "Diplomatic" },
  { text: "National sovereignty is more important than international law.", axis: "Diplomatic" }
];

// Render questions
const questionsDiv = document.getElementById("questions");
questions.forEach((q,i)=>{
  const card=document.createElement('div');
  card.className='question-card';
  card.innerHTML=`
    <p class="question-text">${q.text}</p>
    <div class="options">
      <label style="color:${axisColors[q.axis]}"><input type="radio" name="q${i}" value="-2"> Strongly Disagree</label>
      <label style="color:${axisColors[q.axis]}"><input type="radio" name="q${i}" value="-1"> Disagree</label>
      <label style="color:${axisColors[q.axis]}"><input type="radio" name="q${i}" value="0"> Neutral</label>
      <label style="color:${axisColors[q.axis]}"><input type="radio" name="q${i}" value="1"> Agree</label>
      <label style="color:${axisColors[q.axis]}"><input type="radio" name="q${i}" value="2"> Strongly Agree</label>
    </div>
  `;
  questionsDiv.appendChild(card);
});

// Submit button
document.getElementById('submit-btn').addEventListener('click', ()=>{
  const scores={};
  axes.forEach(a=>scores[a]=0);
  questions.forEach((q,i)=>{
    const options=document.getElementsByName('q'+i);
    for(let opt of options){
      if(opt.checked){ scores[q.axis]+=parseInt(opt.value); break; }
    }
  });

  const ctx=document.getElementById('resultsChart').getContext('2d');
  new Chart(ctx,{
    type:'radar',
    data:{
      labels:axes,
      datasets:[{
        label:'Your Political Profile',
        data:axes.map(a=>scores[a]),
        backgroundColor:'rgba(75,192,192,0.2)',
        borderColor:'rgba(75,192,192,1)',
        pointBackgroundColor:axes.map(a=>axisColors[a]),
        borderWidth:2
      }]
    },
    options:{
      scales:{ r:{ beginAtZero:true, min:-20, max:20 } },
      plugins:{ legend:{ position:'top' } }
    }
  });
});
