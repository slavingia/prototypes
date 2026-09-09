// Install Playwright outside this repo, or set PLAYWRIGHT_MODULE to its package.
// node directpay-v4/tools/check.mjs [--shots]
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {resolve,dirname} from 'node:path';
import {mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1280,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const url=pathToFileURL(resolve(root,'directpay-v4/index.html')).href;
const fill=async values=>{for(const [key,value] of Object.entries(values)){const el=page.locator('#'+key);if(!await el.isVisible()||!await el.isEnabled())continue;const tag=await el.evaluate(el=>el.tagName);if(tag==='SELECT')await el.selectOption(value);else await el.fill(value);}};
const tax=async(form='1040',reason='balance')=>{await page.selectOption('#applyTo',form);await page.selectOption('#reason',reason);const first=await page.locator('#period option').nth(1).getAttribute('value');await page.selectOption('#period',first);};
const signin=async()=>{await page.click('#signinBtn');await page.click('#finishSignin');};
const verify=async()=>{await page.click('#verifyBtn');await page.waitForFunction(()=>verification.status!=='pending');};
const stateValue=()=>page.evaluate(()=>JSON.parse(JSON.stringify(state)));
const ready=async()=>{await tax();await signin();await page.click('#useIdentity');await page.waitForFunction(()=>verification.status==='verified');await page.click('#useBank');await fill({amount:'123.45',confirmAmount:'123.45'});};
try{
 await page.goto(url);await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('#applyTo option').count(),18);
 // Exhaustive catalog integrity and each selectable form/reason route.
 const catalog=await page.evaluate(()=>FORM_ORDER.map(form=>({form,reasons:Object.entries(REASONS).filter(([,r])=>r.forms.includes(form)).map(([id])=>id)})));
 for(const {form,reasons} of catalog){await page.selectOption('#applyTo',form);assert.equal(await page.locator('#reason option').count(),reasons.length+1);for(const reason of reasons){await page.selectOption('#reason',reason);const values=await page.locator('#period option').evaluateAll(o=>o.map(x=>x.value).filter(Boolean));assert.equal(new Set(values).size,values.length);if(values.length){await page.selectOption('#period',values[0]);assert.equal(await page.evaluate(()=>sectionFilled('tax')),true);}}}
 await tax('1040','estimated');const thisYear=String(new Date().getFullYear());assert.equal(await page.inputValue('#period'),thisYear);
 await tax();await page.selectOption('#applyTo','civil');assert.equal(await page.inputValue('#reason'),'');assert.equal(await page.inputValue('#period'),'');
 const periods=await page.evaluate(()=>({jan:taxPeriods('1040','estimated',new Date(2026,0,10)),feb:taxPeriods('1040','estimated',new Date(2026,1,10)),extension:taxPeriods('1040','extension',new Date(2026,2,10)),closed:taxPeriods('1040','extension',new Date(2026,8,9)),bba:taxPeriods('1040','bbaPushout',new Date(2026,8,9)),ct2:taxPeriods('CT2','balance',new Date(2026,8,9))}));
 assert.deepEqual(periods.jan.map(x=>x[0]),['2026','2025']);assert.deepEqual(periods.feb.map(x=>x[0]),['2026']);assert.deepEqual(periods.extension.map(x=>x[0]),['2025']);assert.deepEqual(periods.closed,[]);assert.equal(periods.bba[0][0],'2027');assert.equal(periods.ct2[0][0],'2026-Q3');
 // Every entry, including partial identity/bank/email data, survives sign-in/cancel/sign-out.
 await page.goto(url);await tax();await page.selectOption('#payFor','other');await fill({fname:'Casey',lname:'Morgan',ssn:'900001002',amount:'381.27',confirmAmount:'381.27',payerName:'Example Payer',routing:'071000013',account:'0000012345',confirmAccount:'0000012345',acctType:'savings'});await page.check('#emailOptIn');await fill({email:'payer@example.com',confirmEmail:'payer@example.com'});
 const before=await stateValue();await page.click('#signinBtn');await page.click('#cancelSignin');assert.deepEqual(await stateValue(),before);await signin();assert.deepEqual(await stateValue(),before);assert.equal(await page.locator('#idPrefill').isVisible(),false);assert.equal(await page.evaluate(()=>verification.status),'idle');await page.click('#signoutBtn');assert.deepEqual(await stateValue(),before);
 // Payer sign-in cannot satisfy verification for the person receiving credit.
 await fill(await page.evaluate(()=>OTHER_ID));await page.evaluate(()=>{const original=entityValidator.validateTaxpayer.bind(entityValidator);entityValidator.validateTaxpayer=async snapshot=>{window.validationKeys=Object.keys(snapshot);return original(snapshot);};});await verify();assert.equal(await page.evaluate(()=>validationKeys.some(k=>['account','routing','amount','email'].includes(k))),false);assert.equal(await page.evaluate(()=>verification.status),'verified');await signin();assert.deepEqual(await page.evaluate(()=>[state.fname,state.ssn,state.account]),['Casey','900001002','0000012345']);assert.equal(await page.locator('#payBtn').isEnabled(),true);
 await fill({fname:'Unmatched'});assert.equal(await page.locator('#payBtn').isEnabled(),false);await verify();assert.equal(await page.evaluate(()=>verification.status),'mismatch');
 await fill({ssn:'900009999'});await verify();assert.equal(await page.evaluate(()=>verification.status),'unavailable');
 await fill({ssn:'abc123'});assert.equal(await page.locator('#ssnError').isVisible(),true);assert.equal(await page.inputValue('#ssn'),'123');
 // An old in-flight match must not validate edited taxpayer details.
 await fill(await page.evaluate(()=>OTHER_ID));await page.click('#verifyBtn');await fill({lname:'Changed'});await page.waitForTimeout(400);assert.equal(await page.evaluate(()=>verification.status),'idle');
 await page.selectOption('#entityType','entity');await fill(await page.evaluate(()=>ESTATE_ID));await verify();assert.equal(await page.evaluate(()=>verification.status),'verified');
 // Strict amount, bank confirmation, and date boundaries; no lenient parseFloat.
 await page.goto(url);await ready();assert.equal(await page.locator('#payBtn').isEnabled(),true);
 for(const value of ['1.2.3','0','10000000','1.234','-1']){await fill({amount:value,confirmAmount:value});assert.equal(await page.locator('#payBtn').isEnabled(),false,value);}
 await fill({amount:'123.45',confirmAmount:'123.45',confirmAccount:'9999'});assert.equal(await page.locator('#payBtn').isEnabled(),false);await page.click('#useBank');
 await fill({routing:'111111111'});assert.equal(await page.locator('#payBtn').isEnabled(),false);await page.click('#useBank');
 await fill({paymentDate:'2020-01-01'});assert.equal(await page.locator('#payBtn').isEnabled(),false);await fill({paymentDate:await page.evaluate(()=>TODAY)});
 // Escaping, review/edit, consent gating, and same-day confirmation.
 await fill({payerName:'<img src=x onerror=alert(1)>'});assert.equal(await page.locator('#rBody img').count(),0);await fill({payerName:'Jordan Rivera'});
 await page.click('#payBtn');await page.click('#submitBtn');assert.equal(await page.locator('#reviewError').isVisible(),true);await page.click('#editBtn');assert.equal(await page.inputValue('#amount'),'123.45');await page.click('#payBtn');await page.fill('#signature','Jordan Rivera');await page.check('#authorize');await page.click('#submitBtn');assert.equal(await page.locator('#confirmation h1').textContent(),'Payment submitted');assert.equal(await page.locator('#cancelPayment').count(),0);
 // Scheduled edit/cancel stay within the same request and require reauthorization.
 await page.goto(url);await ready();await fill({paymentDate:await page.evaluate(()=>LAST_DATE)});await page.click('#payBtn');await page.fill('#signature','Jordan Rivera');await page.check('#authorize');await page.click('#submitBtn');const confirmation=await page.evaluate(()=>lastPayment.confirmation);await page.click('#changePayment');await fill({amount:'42.00',confirmAmount:'42.00'});await page.click('#payBtn');assert.equal(await page.isChecked('#authorize'),false);await page.fill('#signature','Jordan Rivera');await page.check('#authorize');await page.click('#submitBtn');assert.equal(await page.evaluate(()=>lastPayment.confirmation),confirmation);await page.click('#cancelPayment');assert.notEqual(await page.evaluate(()=>lastPayment.status),'canceled');await page.click('#cancelPayment');assert.equal(await page.evaluate(()=>lastPayment.status),'canceled');
 if(process.argv.includes('--shots')){
  const out=resolve(root,'.shots/32');await mkdir(out,{recursive:true});
  await page.goto(url);await tax();await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:resolve(out,'directpay-desktop.png'),fullPage:true});
  await ready();await page.screenshot({path:resolve(out,'directpay-verified.png'),fullPage:true});
  await page.click('#payBtn');await page.screenshot({path:resolve(out,'directpay-review.png')});await page.click('#editBtn');
  await page.emulateMedia({colorScheme:'dark'});await page.screenshot({path:resolve(out,'directpay-dark.png'),fullPage:true});
  await page.setViewportSize({width:390,height:844});await page.emulateMedia({colorScheme:'light'});await page.screenshot({path:resolve(out,'directpay-mobile.png'),fullPage:true});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'mobile overflow');
 }
 assert.deepEqual(errors,[]);console.log('PASS: catalog, periods, draft preservation, verification, race handling, validation, authorization, receipts, scheduling and cancellation.');
}finally{await browser.close();}
