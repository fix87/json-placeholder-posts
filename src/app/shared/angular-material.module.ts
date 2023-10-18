// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Libreria
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatListModule,
    MatIconModule,
  ],
})
export class AngularMaterialModule {}
