import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faPinterestP,
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcPaypal,
  faApplePay
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule]
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  // Social media icons
  faFacebook = faFacebookF;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faPinterest = faPinterestP;

  // Payment icons
  faVisa = faCcVisa;
  faMastercard = faCcMastercard;
  faAmex = faCcAmex;
  faPaypal = faCcPaypal;
  faApplePay = faApplePay;
}
