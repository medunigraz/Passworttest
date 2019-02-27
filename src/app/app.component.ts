import { Component, ElementRef, OnInit, ViewChild, Renderer2} from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from "@angular/forms";

import {ConfigService} from "./config/config.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements onInit {
  infoPasswort: boolean;
  errorLength : boolean;
  leaked: boolean;
  suggestions = "";
  typePassWort = "password";
  typeInputGroup= "#typeText";
  warning = "";
  color = "";
  crackTime = "";
  guesses = 0;
  score = 0;
  private timeOut;

  @ViewChild('myPassword') password: ElementRef;

  constructor(
    formBuilder: FormBuilder,
    private configService: ConfigService,
    private renderer: Renderer2
  ) {

  }

  ngOnInit() {
    this.renderer
      .listen(
        this.password.nativeElement, 'keyup',
        (event) => {
          clearTimeout(this.timeOut);
          this.timeOut = setTimeout(
                  () => {
//console.log(this.password.nativeElement.value);
                    this.testPassword(this.password.nativeElement.value);
              }, 800
          );
      });
  }

//https://stackoverflow.com/questions/50275945/how-to-implement-a-debounce-time-in-keyup-event-in-angular-6/50276068
//https://stackoverflow.com/questions/42005068/keyup-event-not-caught-with-angular-2-hostlistener
  testPassword(password: String) {
  //testPassword(form) {
      let data;
      //console.log(form.value);
      //console.log(form.value.password);
      this.configService.getPassWordCheck(password)
        .subscribe(
          (dataReturn) => {
            data = dataReturn;
  //console.log(data);
/*
    Response:
    {
                    "leaked":true,
                    "score":1,
                    "guesses":47869,
                    "feedback": {
                                    "warning":"This is a very common password.",
                                    "suggestions":   [
                                                    "Add another word or two. Uncommon words are better.",
                                                    "Capitalization doesn't help very much."]
                    }
    }
*/
            if(data == null) {
              this.infoPasswort = false;
              this.errorLength = true;
            } else {
              this.infoPasswort = true;
              this.errorLength = false;

              this.suggestions = data.feedback.suggestions;
              this.warning = data.feedback.warning;
              this.guesses = data.guesses;
              this.leaked = data.leaked;
              this.score = data.score;
              this.crackTime = data.crack_time;

            }
          },
          (err) => {
            this.infoPasswort = false;
            console.log(err);
          }
        );
  }

  setClassForColor() {
    if(this.score <= 2) {
      return "bad";
    } else {
        return "good";
    }
  }

  changeInputType() {
    if(this.typePassWort == "text") {
      this.typePassWort = "password";
      this.typeInputGroup = "#typePassword";
    } else if(this.typePassWort == "password") {
      this.typePassWort = "text";
      this.typeInputGroup = "#typeText";
    }
//console.log(this.typePassWort);
    return this.typePassWort;
  }
}
