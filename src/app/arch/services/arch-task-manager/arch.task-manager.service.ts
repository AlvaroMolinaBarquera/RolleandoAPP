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
    activeTaskName: string = '';
    constructor(
        private router: Router,
        private tracesService: ArchTracesService,
        private utilsService: ArchUtilsService,
        private eventsService: ArchEventsService,
    ) {}

    /** Elimina una ruta activa */
    removeTask(route?: Route) {
        try {
            let routes = this.router.config;
            // Obtiene el id de sesión.
            let activeTaskIdSession: string = this.activeTaskName.substring(this.activeTaskName.indexOf('~'));    
            let routeIdSession: string = (route)? route.name.substring(route.name.indexOf('~')) : activeTaskIdSession;
              // Localiza el indice de la tarea a eliminar
            let taskToDeleteIndex = _.findIndex(this.activeTasks, {name: route.name || this.activeTaskName});
            this.activeTasks.splice(taskToDeleteIndex, 1);
            // Recorre las rutas, y almacena todas las rutas que no tengan ese id de sesión
            let newRoutes = [];
            let name: string = null;
            for (let rou of routes) {
                name = rou.name;
                if (!name || name.indexOf(routeIdSession) === -1) {
                    newRoutes.push(rou);
                }
            }
            this.router.resetConfig(newRoutes);
            /** 
             * Comportamiento esperado, si estamos en la misma tarea que se cierra, navegamos a una
             * ventana en blanco. De lo contrario nos quedamos en el mismo estado que estamos.
             */
            let destinateState = (activeTaskIdSession === routeIdSession)? 
                this.go('blank') :
                this.tracesService.writeDebug('La tarea eliminada es diferente de la tarea actual, no se navega') ;
        } catch (e) {
            this.tracesService.writeError('removeTask: Se ha producido un error al eliminar la tarea')
        }


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
            let newRoute = this.cloneRoute(route);
            // Y la añade las rutas actuales
            this.addToCurrentRoutes(newRoute, routes);

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
     * Realiza una navegación  a una ruta determinada. 
     * Existen dos comportamientos:
     *      * Si el nombre de estado incluye el id de sesión navega directamente a ese estado.
     *      * Si el nombre de estado no incluye el id de sesión. Clona el estado y lo añade a las rutas
     *          actuales, luego navega.
     * @param stateName El nombre de la ruta en cuestión, puede incluir en el nombre el id de sesión.
     */
    go = (stateName: string): Promise<any>  => {
        try {
            // Obtiene el nombre 'puro' es decir sin el id de sesión.
            let pureName = (stateName.indexOf('~') !== -1) ?  stateName.substring(0, stateName.indexOf('~')) : stateName;
            // Obtiene el id de sesión
            let idSession = (stateName.indexOf('~') !== -1) ? 
                stateName.substring(stateName.indexOf('~') + 1) : 
                this.activeTaskName.substring(this.activeTaskName.indexOf('~') + 1);
            // Recupera las rutas
            let routes = this.router.config;
            // Busca en las rutas actuales el nombre del estado con el id de sesión
            let route = _.find(routes, {name: pureName + '~' + idSession});
            // Si no lo encuentra a va a buscarlo por el nombre sin el id de sesión
            if (!route) {
                route = _.find(routes, { name: pureName} );
                // Si lo encuentra vuelve a llamar a la función de lo contrario suelta un error
                if (route) {
                    let newRoute = this.cloneRoute(route, idSession);
                    this.addToCurrentRoutes(newRoute);
                    return this.go(route.name)
                } else {
                    throw { message: `El estado "${stateName}" no está entre las rutas disponibles` }
                }
            }
            this.tracesService.writeDebug(`go: Navegando a "${route.name}" corresponde con url "${route.path}"`);
            // Añadimos la tarea
            this.activeTaskName = route.name;
            // Añadimos a la lista de tareas activas
            for (let t in this.activeTasks) {
                let task = this.activeTasks[t];
                if (task && task.name && task.name.endsWith(idSession)) {
                    this.activeTasks[t] = route;
                }
            }
            return this.router.navigate([route.path]);
        } catch (e) {
            this.tracesService.writeError(`go: Error `, e.message);
        }

    }
    /** 
     * Clona la ruta actual
     * @param route Ruta a clonar
     * @param idSessión Id de sesión, para añadir en caso de que no exista.
     * @return Ruta clonada (Identica a ruta original pero con el id de sesión en el nombre y la ruta)
     */
    cloneRoute(route: Route, idSession?: string): Route {
        let newRoute = _.cloneDeep(route);
        idSession = idSession || this.utilsService.uuidv4();
        newRoute.name = newRoute.name + '~' + idSession;
        newRoute.path = newRoute.path + '~' + idSession;
        return newRoute;
    }

    /**
     * Añañde a las rutas una nueva ruta
     * @param route Ruta a añadir
     * @param routes Rutas, si no vienen informadas las obtiene de las rutas activas.
     */
    addToCurrentRoutes(route: Route, routes?: Route[]) {
        routes = routes || this.router.config;
        routes.unshift(route);
        this.router.resetConfig(routes);
        this.tracesService.writeDebug('addToCurrentRoutes: Ruta añadida a la ', route);
    }

}