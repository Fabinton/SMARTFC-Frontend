'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">fc documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-a2684a2ca0d449703e0e22763f93f381"' : 'data-target="#xs-components-links-module-AppModule-a2684a2ca0d449703e0e22763f93f381"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a2684a2ca0d449703e0e22763f93f381"' :
                                            'id="xs-components-links-module-AppModule-a2684a2ca0d449703e0e22763f93f381"' }>
                                            <li class="link">
                                                <a href="components/AdministrarDocenteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdministrarDocenteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BorrarActividadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BorrarActividadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BorrarContenidoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BorrarContenidoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BusquedaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BusquedaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BusquedaVisitanteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BusquedaVisitanteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CrearActividadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CrearActividadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DudasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DudasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionarColegioAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GestionarColegioAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionarCompetenciasAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GestionarCompetenciasAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionarUsuariosAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GestionarUsuariosAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderVisitanteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderVisitanteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfromacionDocenteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfromacionDocenteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InicioAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InicioAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InicioProfesoresComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InicioProfesoresComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MetricasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MetricasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModificarActividadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModificarActividadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistroUsuarioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegistroUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubirContenidoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubirContenidoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-a2684a2ca0d449703e0e22763f93f381"' : 'data-target="#xs-injectables-links-module-AppModule-a2684a2ca0d449703e0e22763f93f381"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-a2684a2ca0d449703e0e22763f93f381"' :
                                        'id="xs-injectables-links-module-AppModule-a2684a2ca0d449703e0e22763f93f381"' }>
                                        <li class="link">
                                            <a href="injectables/ActividadService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ActividadService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthDService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthDService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ContentREAService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ContentREAService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-a2684a2ca0d449703e0e22763f93f381"' : 'data-target="#xs-pipes-links-module-AppModule-a2684a2ca0d449703e0e22763f93f381"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-a2684a2ca0d449703e0e22763f93f381"' :
                                            'id="xs-pipes-links-module-AppModule-a2684a2ca0d449703e0e22763f93f381"' }>
                                            <li class="link">
                                                <a href="pipes/FilterActividadDeletePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterActividadDeletePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterActividadPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterActividadPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterColegioAdminPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterColegioAdminPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterCompetenciaAdminPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterCompetenciaAdminPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterCompetenciaPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterCompetenciaPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterContentDeletePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterContentDeletePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterContentPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterContentPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterDocenteAdminPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterDocenteAdminPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterDudaPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterDudaPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterEstudianteMetricasPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterEstudianteMetricasPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterEstudiantesAdminPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterEstudiantesAdminPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterMateriaactivaAdminPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterMateriaactivaAdminPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterMiMateriaPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterMiMateriaPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterTableMateriaDocentePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterTableMateriaDocentePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/FilterTallerPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterTallerPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FCModule.html" data-type="entity-link">FCModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FCModule-4e4643ddf7682e18ed644ba03a9113bb"' : 'data-target="#xs-components-links-module-FCModule-4e4643ddf7682e18ed644ba03a9113bb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FCModule-4e4643ddf7682e18ed644ba03a9113bb"' :
                                            'id="xs-components-links-module-FCModule-4e4643ddf7682e18ed644ba03a9113bb"' }>
                                            <li class="link">
                                                <a href="components/AdministrarDocenteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdministrarDocenteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BorrarActividadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BorrarActividadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BorrarContenidoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BorrarContenidoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BusquedaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BusquedaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BusquedaVisitanteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BusquedaVisitanteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CrearActividadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CrearActividadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DudasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DudasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionarColegioAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GestionarColegioAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionarCompetenciasAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GestionarCompetenciasAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GestionarUsuariosAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GestionarUsuariosAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderVisitanteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderVisitanteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfromacionDocenteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfromacionDocenteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InicioAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InicioAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InicioProfesoresComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InicioProfesoresComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MetricasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MetricasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModificarActividadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModificarActividadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistroUsuarioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegistroUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubirContenidoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubirContenidoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FCModule-4e4643ddf7682e18ed644ba03a9113bb"' : 'data-target="#xs-injectables-links-module-FCModule-4e4643ddf7682e18ed644ba03a9113bb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FCModule-4e4643ddf7682e18ed644ba03a9113bb"' :
                                        'id="xs-injectables-links-module-FCModule-4e4643ddf7682e18ed644ba03a9113bb"' }>
                                        <li class="link">
                                            <a href="injectables/ActividadService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ActividadService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthDService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthDService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ContentREAService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ContentREAService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FCRoutingModule.html" data-type="entity-link">FCRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ActividadI.html" data-type="entity-link">ActividadI</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdminI.html" data-type="entity-link">AdminI</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/AreaMateriaI.html" data-type="entity-link">AreaMateriaI</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColegioI.html" data-type="entity-link">ColegioI</a>
                            </li>
                            <li class="link">
                                <a href="classes/CompetenciaI.html" data-type="entity-link">CompetenciaI</a>
                            </li>
                            <li class="link">
                                <a href="classes/contenidoREAI.html" data-type="entity-link">contenidoREAI</a>
                            </li>
                            <li class="link">
                                <a href="classes/DocenteI.html" data-type="entity-link">DocenteI</a>
                            </li>
                            <li class="link">
                                <a href="classes/DudaI.html" data-type="entity-link">DudaI</a>
                            </li>
                            <li class="link">
                                <a href="classes/EstuadianteI.html" data-type="entity-link">EstuadianteI</a>
                            </li>
                            <li class="link">
                                <a href="classes/GradoI.html" data-type="entity-link">GradoI</a>
                            </li>
                            <li class="link">
                                <a href="classes/MateriaActivaI.html" data-type="entity-link">MateriaActivaI</a>
                            </li>
                            <li class="link">
                                <a href="classes/MateriaI.html" data-type="entity-link">MateriaI</a>
                            </li>
                            <li class="link">
                                <a href="classes/MetricaActividadI.html" data-type="entity-link">MetricaActividadI</a>
                            </li>
                            <li class="link">
                                <a href="classes/MetricaI.html" data-type="entity-link">MetricaI</a>
                            </li>
                            <li class="link">
                                <a href="classes/MetricaVisualizarI.html" data-type="entity-link">MetricaVisualizarI</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActividadService.html" data-type="entity-link">ActividadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthAdminService.html" data-type="entity-link">AuthAdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthDService.html" data-type="entity-link">AuthDService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContentREAService.html" data-type="entity-link">ContentREAService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActividadVisualizaI.html" data-type="entity-link">ActividadVisualizaI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompetenciaVisualizarI.html" data-type="entity-link">CompetenciaVisualizarI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/contenidoREAVisualizarI.html" data-type="entity-link">contenidoREAVisualizarI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DocenteVisualizarI.html" data-type="entity-link">DocenteVisualizarI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DudaVisualizarI.html" data-type="entity-link">DudaVisualizarI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EstuadianteVisualizarI.html" data-type="entity-link">EstuadianteVisualizarI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventoI.html" data-type="entity-link">EventoI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtResponseI.html" data-type="entity-link">JwtResponseI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MateriaActivaVisualizarI.html" data-type="entity-link">MateriaActivaVisualizarI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MateriaVisualizarI.html" data-type="entity-link">MateriaVisualizarI</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TipoContenidoI.html" data-type="entity-link">TipoContenidoI</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});