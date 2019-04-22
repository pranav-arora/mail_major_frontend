import {Component, OnInit,Injector, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import {UserService} from "../service/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import Speech from 'speak-tts';


import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
const configKey = makeStateKey('CONFIG');
declare var webkitSpeechRecognition: any;
// import {
//   RxSpeechRecognitionService,
//   resultList,
// } from '@kamiazya/ngx-speech-recognition';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('vSearch') formSearch;
  @ViewChild('searchKey') hiddenSearchHandler;
  public user: any;
  labels: any;
  mails: any;
  response;
  speech = new Speech();

  constructor(private userService: UserService,
              private _router: Router,
              private activatedRoute: ActivatedRoute,
              private injector: Injector,
              private state : TransferState,
              @Inject(PLATFORM_ID) private platformid: Object,
              private renderer: Renderer2
              // public service: RxSpeechRecognitionService
  ) {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      console.log(this.activatedRoute.snapshot.paramMap.get('id'));
      this.userService.getUser().subscribe(data => {
        this.user = data;
      }, error1 => console.log(error1));
      // this.userService.user().subscribe(data => {
      //   this.user = data;
      //   console.log(this.user);
      // },  err => {
      //   console.log(err);
      //   this._router.navigate(['/login']);
      // })
    }
    if(isPlatformServer(this.platformid)){
      const envJson = this.injector.get('CONFIG')? this.injector.get('CONFIG'): {};
      this.state.set(configKey, envJson as any);
    }
  }

  ngOnInit() {
    this.initSpeech();
    this.checkLoggedIn();
    this.getMails();
    this.getLabels();
  }

  checkLoggedIn() {

  }

  // listen() {
  //   this.service
  //     .listen()
  //     .pipe(resultList)
  //     .subscribe((list: any) => {
  //       this.message = list.item(0).item(0).transcript;
  //       console.log('RxComponent:onresult', this.message, list);
  //     });
  // }


  logout() {
    this.userService.logout().subscribe(data => {
      console.log('logout success');
      this._router.navigate(['/login']);
    }, err => {
      console.log(err);
    })
  }

  getMails() {
    this.userService.getMails().subscribe(data => {
      this.mails = data;
      var str = `welcome to v mail. you have ${this.mails.length} unread mail. Do you want to read?`;
      this.speech.speak({
        text: str,
      }).then(() => {
        console.log("Success !")
      }).catch(e => {
        console.error("An error occurred :", e)
      });
      this.voiceSearch();
      console.log(this.voiceSearch());
      console.log(data)
    })
  }

  initSpeech() {
    this.speech.init().then((data) => {
      console.log("Speech is ready, voices are available", data)
    }).catch(e => {
      console.error("An error occured while initializing : ", e)
    });
  }

  getLabels() {
    this.userService.getLabels().subscribe(data => {
      this.labels = data;
      this.labels.forEach(label => {
        // this.userService.getLabel().subscribe(data=>{
        //   console.log(data);
        // });
        // if (label.messageListVisibility !== 'hide') {
        //   console.log(label);
        //   this.speech.speak({
        //     text: label.name,
        //   }).then(() => {
        //     console.log("Success !")
        //   }).catch(e => {
        //     console.error("An error occurred :", e)
        //   });
        // }
      })
    })
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
  }

  respond(text: string) {
    if (text === 'compose') {
      this._router.navigate(['compose']);
    } else {
      this.userService.postQuery(text).subscribe(data=>{
        console.log(data);
      })
    }
  }

  returnText(text) {
    return text;
  }


}
