"use strict";
function validateRegistration(data){
 const events=["community-dinner","yoga-class","art-workshop","tech-talk","volunteer-day"];
 const name=String(data.fullName??"").trim(),email=String(data.email??"").trim(),phone=String(data.phone??"").trim(),event=String(data.event??""),comments=String(data.comments??"");
 const errors={};
 if(name.length<2||name.length>80)errors.fullName="Enter a display name between 2 and 80 characters.";
 if(email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))errors.email="Enter a valid example email address.";
 if(phone&&(!/^[+\d().\s-]+$/.test(phone)||phone.replace(/\D/g,"").length<7||phone.replace(/\D/g,"").length>15))errors.phone="Enter 7 to 15 digits, or leave the phone field blank.";
 if(!events.includes(event))errors.event="Choose an event from the list.";
 if(comments.length>500)errors.comments="Use no more than 500 characters.";
 return errors;
}
if(typeof module!=="undefined"&&module.exports)module.exports={validateRegistration};
if(typeof document!=="undefined")document.addEventListener("DOMContentLoaded",()=>{
 const get=id=>document.getElementById(id),form=get("registrationForm"),fields=get("fields"),confirmation=get("confirmation"),status=get("status"),names=["fullName","email","phone","event","comments"];
 const clearErrors=()=>{for(const id of names){get(id).removeAttribute("aria-invalid");get(id+"-error").textContent="";}};
 const updateCount=()=>{get("comment-count").textContent=get("comments").value.length+" / 500 characters";};
 form.addEventListener("submit",e=>{e.preventDefault();clearErrors();const data=Object.fromEntries(names.map(id=>[id,get(id).value]));const errors=validateRegistration(data);
 if(Object.keys(errors).length){for(const [id,message] of Object.entries(errors)){get(id).setAttribute("aria-invalid","true");get(id+"-error").textContent=message;}status.textContent="Check the highlighted fields.";get(Object.keys(errors)[0]).focus();return;}
 const eventName=get("event").selectedOptions[0].textContent;const count=form.querySelectorAll('input[name="preferences"]:checked').length;
 get("summary").textContent="You selected "+eventName+" with "+count+" optional preference"+(count===1?"":"s")+".";
 form.reset();form.hidden=true;confirmation.hidden=false;confirmation.focus();status.textContent="Demo preview complete. No information was stored or transmitted.";
 });
 form.addEventListener("reset",()=>{clearErrors();status.textContent="";queueMicrotask(updateCount);});
 for(const id of names)get(id).addEventListener("input",()=>{get(id).removeAttribute("aria-invalid");get(id+"-error").textContent="";if(id==="comments")updateCount();});
 get("another").addEventListener("click",()=>{confirmation.hidden=true;form.hidden=false;status.textContent="";get("fullName").focus();});
 fields.disabled=false;
});
