import {Component, OnInit,Injector, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import {UserService} from "../service/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import Speech from 'speak-tts';


import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
const configKey = makeStateKey('CONFIG');
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
  @ViewChild('vSearch') formSearch;
  @ViewChild('searchKey') hiddenSearchHandler;
  response;
  speech = new Speech();
  constructor(private userService: UserService,
              private _router: Router,
              private activatedRoute: ActivatedRoute,
              private injector: Injector,
              private state : TransferState,
              @Inject(PLATFORM_ID) private platformid: Object,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.initSpeech();
  }

  initSpeech() {
    this.speech.init().then((data) => {
      console.log("Speech is ready, voices are available", data)
    }).catch(e => {
      console.error("An error occured while initializing : ", e)
    });
  }

  public voiceSearch(){
    if('webkitSpeechRecognition' in window){
      const vSearch = new webkitSpeechRecognition();
      vSearch.continuous = false;
      vSearch.interimresults = false;
      vSearch.lang = 'en-US';
      vSearch.start();
      const voiceSearchForm = this.formSearch.nativeElement;
      const voiceHandler = this.hiddenSearchHandler.nativeElement;
      console.log(voiceSearchForm);
      var self = this;
      vSearch.onresult = function(e){
        console.log(voiceSearchForm);
        voiceHandler.value = e.results[0][0].transcript;
        vSearch.stop();
        console.log(voiceHandler.value);
        vSearch.passValue(voiceHandler.value);
        self.response = voiceHandler.value.toString();
        // this.response = voiceHandler.value.toString();
        self.respond(self.response);
        return voiceHandler.value.toString();
        // voiceSearchForm.submit();
      };
      vSearch.passValue = function(e){
        console.log(e);
        return e
      };
      vSearch.onerror = function(e){
        console.log(e);
        vSearch.stop();
      }
    } else {
      console.log(this.state.get(configKey, undefined as any));
    }
    return this.response;
  }

  respond(text: string) {
    if (text === 'compose') {
      this._router.navigate(['home/compose']);
    }
  }
}
