import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TEXTOS } from '@data/textos';
import { PaginaEmConstrucaoComponent } from '@shared/components/pagina-em-construcao/pagina-em-construcao';

/** Placeholder da Fase 1 — a feature em si chega nas próximas fases. */
@Component({
  selector: 'app-fiscal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PaginaEmConstrucaoComponent],
  template: `
    <app-pagina-em-construcao
      [titulo]="pagina.titulo"
      [resumo]="pagina.resumo"
      [icone]="'fiscal'"
    />
  `,
})
export class FiscalPage {
  protected readonly pagina = TEXTOS.paginas.fiscal;
}
