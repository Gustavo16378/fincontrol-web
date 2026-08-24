import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Injector,
  ViewContainerRef,
  effect,
  inject,
  input,
  model,
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

import { TEXTOS } from '@data/textos';
import { ServicoTravaDeScroll } from '@core/services/trava-scroll.service';
import { IconeComponent } from '@shared/components/icone/icone';

let sequencia = 0;

/**
 * Diálogo modal renderizado no nível do <body> pelo CDK Overlay, com trava de
 * rolagem estilo iOS enquanto está aberto.
 */
@Component({
  selector: 'app-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconeComponent],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class ModalComponent {
  private readonly injector = inject(Injector);
  private readonly containerDeViews = inject(ViewContainerRef);
  private readonly travaDeScroll = inject(ServicoTravaDeScroll);

  readonly aberto = model(false);
  readonly titulo = input('');
  readonly descricao = input<string | null>(null);

  protected readonly rotuloFechar = TEXTOS.comum.fechar;
  protected readonly idTitulo = `modal-titulo-${(sequencia += 1)}`;

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

  private abrirOverlay(): void {
    const template = this.conteudo();
    if (this.overlayRef || !template) {
      return;
    }

    this.overlayRef = createOverlayRef(this.injector, {
      hasBackdrop: true,
      backdropClass: 'overlay-fundo',
      panelClass: 'overlay-painel',
      scrollStrategy: createNoopScrollStrategy(),
      positionStrategy: createGlobalPositionStrategy(this.injector)
        .centerHorizontally()
        .centerVertically(),
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
