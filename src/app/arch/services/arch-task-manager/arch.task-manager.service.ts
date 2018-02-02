import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouteReuseStrategy, DetachedRouteHandle, Route} from '@angular/router';
import * as _ from 'lodash';
import { ArchUtilsService } from './../arch.utils.service';
import { ArchTracesService } from './../arch.traces.service';
import { ArchEventsService } from './../arch-events/arch.events.service';
/** Controla la forma en la que se realiza la navegación */
@Injectable()
export class ArchTaskManagerService {
    MAX_TASK: number = 5;
    taskNumber: number = 0;
    activeTasks: any[] = [];
    constructor(
        private router: Router,
        private tracesService: ArchTracesService,
        private utilsService: ArchUtilsService,
        private eventsService: ArchEventsService,
    ) {}

    removeTask(route?: Route) {
        let routes = this.router.config;
        if (route) {
            let idSession = route.name.substring(0, route.name.indexOf('~'));
            let newRoutes = [];
            for (let rou of routes) {  
                if (rou.name.indexOf(idSession) === -1) {
                    newRoutes.push(rou);
                }
            }
            this.go('XXX');
        } else {

        }
    }

    newTask = (taskRoute: string) => {
        try {
            if (this.taskNumber === this.MAX_TASK) { return }
            let routes = this.router.config;
            let route = _.find(routes, {name: taskRoute})
            if (!route) { 
                // @TODO Modal
                throw { message: 'No se ha encontrado la ruta' + taskRoute}
            }
            // Clona la ruta actual
            let newRoute = _.cloneDeep(route);
            newRoute.name = route.name + '~' + this.utilsService.uuidv4();
            // La añade a las rutas actuales
            routes.unshift(newRoute);
            this.router.resetConfig(routes);
            this.tracesService.writeDebug('Nueva tarea', newRoute);

            // Emite un evento para que sea recibido por las aplicaciones.
            this.activeTasks.push(newRoute);
            this.eventsService.broadcast('arch.activeTasks', this.activeTasks);
            
            // Navega
            return this.go(newRoute.name);
        } catch (e) {
            this.tracesService.writeError('newTask: Error en la apertura de tarea', taskRoute)
        }
    }

    go = (stateName: string)  => {
        let routes = this.router.config;
        let route = _.find(routes, {name: stateName});
        this.tracesService.writeDebug(`go: Navegando a "${route.name}" corresponde con url "${route.path}"`);
        return this.router.navigate([route.path]);
    }

}