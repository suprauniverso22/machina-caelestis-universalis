import {calculateModule} from '../modules/registry';
import {nextPhase} from '../astronomy/ephemeris';
import type {Settings} from '../core/state';
self.onmessage=(event:MessageEvent<{id:number;settings:Settings;eventDirection?:number}>)=>{const {id,settings,eventDirection}=event.data;try{self.postMessage({id,jd:settings.jd,module:settings.selected,result:eventDirection?nextPhase(settings.jd,eventDirection):calculateModule(settings),event:!!eventDirection});}catch(error){self.postMessage({id,error:error instanceof Error?error.message:String(error),event:!!eventDirection});}};
