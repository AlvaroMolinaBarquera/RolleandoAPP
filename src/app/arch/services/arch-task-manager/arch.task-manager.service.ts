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
    activeTaskName: string;
    constructor(
        private router: Router,
        private tracesService: ArchTracesService,
        private utilsService: ArchUtilsService,
        private eventsService: ArchEventsService,
    ) {}

    /** Elimina una ruta activa */
    removeTask(route?: Route) {
        let routes = this.router.config;
        // Obtiene el id de sesión.
        let idSession: string;
        if (route) {
            idSession = route.name.substring(0, route.name.indexOf('~'));
        } else {
            idSession = this.activeTaskName.substring(0, this.activeTaskName.indexOf('~'));    
        }
        // Localiza el indice de la tarea a eliminar
        let taskToDeleteIndex = _.findIndex(this.activeTasks, {name: route.name || this.activeTaskName});
        this.activeTasks.splice(taskToDeleteIndex, 1);
        // Recorre las rutas, y almacena todas las rutas que no tengan ese id de sesión
        let newRoutes = [];
        for (let rou of routes) {  
            if (rou.name.indexOf(idSession) === -1) {
                newRoutes.push(rou);
            }
        }
        this.router.resetConfig(newRoutes);
        /** 
         * @TODO
         * Comportamiento esperado, si estamos en la misma tarea que se cierra, navegamos a una
         * ventana en blanco. De lo contrario nos quedamos en el mismo estado que estamos.
         */
        this.go('TODO')
    }

    /**
     * Abre una nueva tarea, con su propio identificador.
     * @param taskName Nombre de la tarea abrir.
     */
    newTask = (taskName: string) => {
        try {
            if (this.taskNumber === this.MAX_TASK) { return }
            let routes = this.router.config;
            let route = _.find(routes, {name: taskName})
            if (!route) { 
                // @TODO Modal
                throw { message: 'No se ha encontrado la ruta' + taskName}
            }
            this.taskNumber++;
            // Clona la ruta actual
            let newRoute = _.cloneDeep(route);
            newRoute.name = route.name + '~' + this.utilsService.uuidv4();
            newRoute.path = route.path + '~' + this.utilsService.uuidv4();

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
            this.tracesService.writeError('newTask: Error en la apertura de tarea', taskName)
        }
    }

    /**
     * Realiza una navegación a una determinada ruta
     * @param stateName El nombre de la ruta en cuestión
     */
    go = (stateName: string)  => {
        let routes = this.router.config;
        let route = _.find(routes, {name: stateName});
        this.tracesService.writeDebug(`go: Navegando a "${route.name}" corresponde con url "${route.path}"`);
        this.activeTaskName = stateName;
        return this.router.navigate([route.path]);
    }

}