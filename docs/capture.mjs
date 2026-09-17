import { chromium } from '@playwright/test';
const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,args:['--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
page.on('pageerror',e=>console.log('PAGE ERROR',e.message));page.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text())});page.on('requestfailed',r=>console.log('REQUEST',r.url(),r.failure()));
await page.goto('http://127.0.0.1:5173');await page.getByRole('heading',{name:/MACHINA CÆLESTIS/}).waitFor({timeout:30000});await page.locator('canvas').waitFor({timeout:30000});await page.waitForTimeout(3000);await page.screenshot({path:'docs/preview-initial.png'});console.log('TITLE',await page.title());await browser.close();
