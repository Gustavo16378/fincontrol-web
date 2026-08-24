import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  DOCUMENT,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';

import { TEXTOS } from '@data/textos';
import { AuthService } from '@core/services/auth.service';
import { BotaoComponent } from '@shared/components/botao/botao';
import { ModalComponent } from '@shared/components/modal/modal';
import { DirecaoScrollDirective } from '@shared/directives/direcao-scroll.directive';
import { BarraLateralComponent } from '@layout/barra-lateral/barra-lateral';
import { CabecalhoComponent } from '@layout/cabecalho/cabecalho';
import { MenuMobileComponent } from '@layout/menu-mobile/menu-mobile';

const LARGURA_DESKTOP = 1024;

/** Shell do app autenticado: barra lateral + cabeçalho + área de conteúdo. */
@Component({
  selector: 'app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    BotaoComponent,
    ModalComponent,
    DirecaoScrollDirective,
    BarraLateralComponent,
    CabecalhoComponent,
    MenuMobileComponent,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class ShellComponent {
  private readonly auth = inject(AuthService);
  private readonly documento = inject(DOCUMENT);

  protected readonly textos = TEXTOS.layout;
  protected readonly comum = TEXTOS.comum;
  protected readonly menuAberto = signal(false);
  protected readonly confirmandoSaida = signal(false);

  constructor() {
    // Revalida o token e completa o usuário com os dados de `GET /usuarios/me`.
    this.auth.carregarUsuario().pipe(takeUntilDestroyed()).subscribe();
  }

  /** Ao voltar para o desktop, a gaveta perde o sentido: fecha. */
  @HostListener('window:resize')
  protected aoRedimensionar(): void {
    const largura = this.documento.defaultView?.innerWidth ?? 0;
    if (largura >= LARGURA_DESKTOP && this.menuAberto()) {
      this.menuAberto.set(false);
    }
  }

  protected alternarMenu(): void {
    this.menuAberto.update((aberto) => !aberto);
  }

  protected pedirSaida(): void {
    this.menuAberto.set(false);
    this.confirmandoSaida.set(true);
  }

  protected confirmarSaida(): void {
    this.confirmandoSaida.set(false);
    this.auth.logout();
  }
}
