import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouteReuseStrategy, DetachedRouteHandle, Route} from '@angular/router';

/** Controla la forma en la que se realiza la navegación */
@Injectable()
export class ArchReuseStrategyService implements RouteReuseStrategy {

    handlers: {[key: string]: DetachedRouteHandle} = {};

     /** Determinan si esta ruta y sus subrutas van a poder tener sus propios estados */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return (route.routeConfig.sticky === true) ? true : false;
    }
    /** Almacena la ruta */
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.handlers[route.routeConfig.path] = handle;
    }
    /** Determina si la ruta y su subrutas deberian poder ser recuperadas */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    }
    /** Recupera una ruta previamente almacenada*/
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig) return null;
        return this.handlers[route.routeConfig.path];
    }
    /** Determina si la ruta debe ser reusada*/
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }

}