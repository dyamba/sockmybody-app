import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { HeroComponent } from "./components/hero/hero.component";
import { FeaturesComponent } from "./components/features/features.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { CtaComponent } from "./components/cta/cta.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    HeroComponent,
    FeaturesComponent,
    GalleryComponent,
    CtaComponent,
    FooterComponent
  ]
})
export class AppComponent {
  title = 'sockmybody-app';

  constructor(private route: ActivatedRoute) {}
}
