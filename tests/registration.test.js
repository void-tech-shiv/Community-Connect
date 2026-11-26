const {test}=require("node:test");const assert=require("node:assert/strict");const {validateRegistration}=require("../registration.js");
const valid={fullName:"Demo Participant",email:"demo@example.com",phone:"",event:"tech-talk",comments:""};
test("valid data and optional phone",()=>assert.deepEqual(validateRegistration(valid),{}));
test("rejects blank name and malformed email",()=>{const e=validateRegistration({...valid,fullName:"  ",email:"bad"});assert.ok(e.fullName);assert.ok(e.email);});
test("checks phone format and length",()=>{assert.ok(validateRegistration({...valid,phone:"abc"}).phone);assert.ok(validateRegistration({...valid,phone:"123"}).phone);assert.equal(validateRegistration({...valid,phone:"+1 202 555 0100"}).phone,undefined);});
test("rejects unknown events and long comments",()=>{const e=validateRegistration({...valid,event:"unknown",comments:"a".repeat(501)});assert.ok(e.event);assert.ok(e.comments);});
