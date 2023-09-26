// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Libreria
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatCardModule, MatToolbarModule],
  exports: [CommonModule, MatButtonModule, MatCardModule, MatToolbarModule],
})
export class AngularMaterialModule {}
