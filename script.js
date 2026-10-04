const tabs=document.querySelectorAll(".tab");
const message=document.getElementById("messageInput");
const upload=document.getElementById("uploadBox");
tabs.forEach(t=>t.onclick=()=>{
  tabs.forEach(x=>x.classList.remove("active"));t.classList.add("active");
  if(t.dataset.tab==="upload"){message.classList.add("hidden");upload.classList.remove("hidden")}
  else{upload.classList.add("hidden");message.classList.remove("hidden")}
});
document.getElementById("fileInput").addEventListener("change",e=>{
  const f=e.target.files[0]; if(f) upload.querySelector("strong").textContent=f.name;
});
const patterns=[
 ["Guaranteed returns","Promises of guaranteed or certain profit are a major risk signal."],
 ["Urgency / FOMO","Pressure such as “only 2 hours left” can push users to act without verification."],
 ["Authority claim","Claims of being a registered expert should be independently verified."],
 ["Payment request","Requests to transfer money immediately deserve extra scrutiny."]
];
function analyze(){
 let text=(message.value||"").toLowerCase();
 let flags=patterns.filter(p=>{
   const words=p[0]==="Guaranteed returns"?["guaranteed","sure return","certain profit"]:p[0]==="Urgency / FOMO"?["only","today","hours left","limited","urgent"]:p[0]==="Authority claim"?["sebi","registered","expert","advisor"]:["send","transfer","payment","₹"];
   return words.some(w=>text.includes(w));
 });
 if(!flags.length) flags=[["No obvious pattern detected","This demo cannot establish safety. Verify the sender, claims, source and risks independently."]];
 let score=Math.max(18,100-flags.length*18);
 document.getElementById("emptyResult").classList.add("hidden");
 document.getElementById("result").classList.remove("hidden");
 document.getElementById("score").textContent=score;
 document.getElementById("heroScore").textContent=score;
 document.getElementById("progress").style.width=score+"%";
 const badge=document.getElementById("riskBadge");
 badge.textContent=score<40?"HIGH RISK":score<65?"REVIEW":"LOWER CONCERN";
 badge.style.background=score<40?"#fff0ef":"#fff7df";
 badge.style.color=score<40?"#c7463f":"#946c00";
 document.getElementById("flags").innerHTML=flags.map(f=>`<div class="flag"><strong>⚠ ${f[0]}</strong><span>${f[1]}</span></div>`).join("");
}
document.getElementById("analyzeBtn").onclick=analyze;
function choice(el,correct){
 document.querySelectorAll(".choices button").forEach(b=>b.disabled=true);
 const out=document.getElementById("simResult");
 out.textContent=correct?"✓ Good choice — verify registration, claims and risks before acting. Awareness Score: 92/100":"✕ Risky response — this scenario uses urgency and guaranteed-return manipulation. Awareness Score: 28/100";
 out.style.color=correct?"#078e60":"#c7463f";
}
