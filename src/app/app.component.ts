import { Component } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from "@angular/forms";

import {ConfigService} from "./config/config.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  infoPasswort: boolean;
  errorLength : boolean;
  suggestions = "";
  warning = "";
  guesses = 0;
  leaked: boolean;
  score = 0;
  color = "";

  constructor(
    formBuilder: FormBuilder,
    private configService: ConfigService
  ) {

  }

  testPassword(form) {
      //console.log(form.value);
      //console.log(form.value.password);
      this.configService.getPassWordCheck(form.value.password)
        .subscribe(
          (data) => {
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
}
