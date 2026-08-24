import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Injector,
  ViewContainerRef,
  effect,
  inject,
  model,
  output,
  viewChild,
  type TemplateRef,
} from '@angular/core';
import {
  createGlobalPositionStrategy,
  createNoopScrollStrategy,
  createOverlayRef,
  type OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { NAVEGACAO_PRINCIPAL, NAVEGACAO_SECUNDARIA } from '@data/navegacao';
import { TEXTOS } from '@data/textos';
import { ServicoTravaDeScroll } from '@core/services/trava-scroll.service';
import { AlternadorTemaComponent } from '@shared/components/alternador-tema/alternador-tema';
import { IconeComponent } from '@shared/components/icone/icone';
import { LogotipoComponent } from '@shared/components/logotipo/logotipo';
import { ListaNavegacaoComponent } from '@layout/lista-navegacao/lista-navegacao';

/**
 * Menu de navegação mobile.
 *
 * Renderizado no nível do <body> pelo CDK Overlay (o equivalente Angular de um
 * portal React), fora da árvore do shell — assim nenhum `overflow` ou
 * `transform` de ancestral consegue recortar a gaveta.
 *
 * Enquanto aberto, a rolagem da página é travada no estilo iOS
 * (`position: fixed` no body + `top` negativo), e restaurada exatamente na
 * mesma posição ao fechar.
 */
@Component({
  selector: 'app-menu-mobile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AlternadorTemaComponent, IconeComponent, LogotipoComponent, ListaNavegacaoComponent],
  templateUrl: './menu-mobile.html',
  styleUrl: './menu-mobile.scss',
})
export class MenuMobileComponent {
  private readonly injector = inject(Injector);
  private readonly containerDeViews = inject(ViewContainerRef);
  private readonly travaDeScroll = inject(ServicoTravaDeScroll);

  readonly aberto = model(false);
  readonly sairSolicitado = output<void>();

  protected readonly principal = NAVEGACAO_PRINCIPAL;
  protected readonly secundaria = NAVEGACAO_SECUNDARIA;
  protected readonly textos = TEXTOS.layout;

  private readonly conteudo = viewChild<TemplateRef<unknown>>('conteudo');
  private overlayRef: OverlayRef | null = null;

  constructor() {
    effect(() => {
      if (this.aberto()) {
        this.abrirOverlay();
      } else {
        this.fecharOverlay();
      }
    });

    inject(DestroyRef).onDestroy(() => this.fecharOverlay());
  }

  protected fechar(): void {
    this.aberto.set(false);
  }

  protected sair(): void {
    this.fechar();
    this.sairSolicitado.emit();
  }

  private abrirOverlay(): void {
    const template = this.conteudo();
    if (this.overlayRef || !template) {
      return;
    }

    this.overlayRef = createOverlayRef(this.injector, {
      hasBackdrop: true,
      backdropClass: 'overlay-fundo',
      panelClass: ['overlay-painel', 'overlay-painel--gaveta'],
      scrollStrategy: createNoopScrollStrategy(),
      positionStrategy: createGlobalPositionStrategy(this.injector).right('0').top('0'),
    });

    this.overlayRef.attach(new TemplatePortal(template, this.containerDeViews));
    this.overlayRef.backdropClick().subscribe(() => this.fechar());
    this.overlayRef.keydownEvents().subscribe((evento) => {
      if (evento.key === 'Escape') {
        this.fechar();
      }
    });

    this.travaDeScroll.travar();
  }

  private fecharOverlay(): void {
    if (!this.overlayRef) {
      return;
    }

    this.overlayRef.dispose();
    this.overlayRef = null;
    this.travaDeScroll.destravar();
  }
}
