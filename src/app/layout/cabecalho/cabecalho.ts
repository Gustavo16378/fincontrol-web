import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ROTA_INICIAL } from '@data/navegacao';
import { ROTULO_PERFIL_FISCAL } from '@data/perfis-fiscais';
import { TEXTOS } from '@data/textos';
import { AuthService } from '@core/services/auth.service';
import { AlternadorTemaComponent } from '@shared/components/alternador-tema/alternador-tema';
import { IconeComponent } from '@shared/components/icone/icone';
import { LogotipoComponent } from '@shared/components/logotipo/logotipo';
import { SeloComponent } from '@shared/components/selo/selo';

/**
 * Cabeçalho do shell autenticado.
 *
 * O comportamento de esconder/reaparecer vem da diretiva `appDirecaoScroll`,
 * aplicada pelo shell. A borda inferior existe sempre no DOM: o que muda entre
 * os estados é apenas a cor dela — nunca a presença do elemento.
 */
@Component({
  selector: 'app-cabecalho',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AlternadorTemaComponent, IconeComponent, LogotipoComponent, SeloComponent],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.scss',
})
export class CabecalhoComponent {
  private readonly auth = inject(AuthService);

  readonly menuAberto = input(false);
  readonly alternarMenu = output<void>();
  readonly sairSolicitado = output<void>();

  protected readonly textos = TEXTOS.layout;
  protected readonly rotaInicial = ROTA_INICIAL;
  protected readonly primeiroNome = this.auth.primeiroNome;
  protected readonly rotuloPerfil = computed(() => {
    const perfil = this.auth.usuarioAtual()?.perfilFiscal;
    return perfil ? ROTULO_PERFIL_FISCAL[perfil] : null;
  });
}
