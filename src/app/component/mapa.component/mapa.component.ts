import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MapaService } from '../../service/mapa.service';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.sass'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class MapaComponent implements OnInit, AfterViewInit {

  private map: any;
  // --- VARIABLES DE ESTADO ---
  isDrawingMode = false;
  newRouteName = '';
  selectedStreets: any[] = [];
  rutasGuardadas: any[] = [];
  perfiles: any[] = [];

  // --- REFERENCIAS A CAPAS DE LEAFLET ---
  private allStreetLayers: Map<string, L.GeoJSON> = new Map();
  private savedRouteLayers: Map<string, L.GeoJSON> = new Map();
  private activeRouteLayer: L.GeoJSON | null = null;

  constructor(public apiService: MapaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // OnInit es para la lógica inicial: cargamos la lista de perfiles.
    this.cargarPerfiles();
  }

  ngAfterViewInit(): void {
    // AfterViewInit es para cuando la vista está lista: inicializamos el mapa y las calles.
    this.initMap();
    this.cargarCalles();
    // Se elimina la llamada a cargarRutasGuardadas() de aquí para evitar el error.
  }

  private initMap(): void {
    this.map = L.map('mapa').setView([3.89, -77.06], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> - <a href="http://www.gonzaloandreslucio.com">Gonzalo Andrés Lucio</a>'
    }).addTo(this.map);
  }

  private cargarCalles(): void {
    this.apiService.getCalles().subscribe((response: any) => {
      response.data.forEach((calle: any) => {
        if (calle.shape) {
          const geoJsonLayer = L.geoJSON(JSON.parse(calle.shape), {
            style: () => ({ color: 'gray', weight: 2, opacity: 0.7 })
          });
          geoJsonLayer.on('click', () => this.onStreetClick(calle, geoJsonLayer));
          geoJsonLayer.bindPopup(calle.nombre);
          geoJsonLayer.addTo(this.map);
          this.allStreetLayers.set(calle.id, geoJsonLayer);
        }
      });
    });
  }

  // --- LÓGICA DE PERFILES Y RUTAS ---

  cargarPerfiles(): void {
    this.apiService.getPerfiles().subscribe({
      next: (data) => this.perfiles = data,
      error: () => this.toastr.error('No se pudieron cargar los perfiles.', 'Error')
    });
  }

  // En mapa.component.ts

  onPerfilSelected(event: any): void {
    const perfilId = event.target.value;

    // CAMBIO: Reiniciamos la lista de rutas inmediatamente
    this.rutasGuardadas = [];
    this.limpiarMapaDeRutas();

    if (!perfilId) {
      this.apiService.activeProfileId = null;
      return;
    }

    this.apiService.activeProfileId = perfilId;
    this.cargarRutasGuardadas(); // Esto llenará la lista con las nuevas rutas
  }

  // En mapa.component.ts

  cargarRutasGuardadas(): void {
    this.apiService.getRutas().subscribe({
      next: (response) => {
        this.rutasGuardadas = response.data;
        this.limpiarMapaDeRutas(); // Limpia el mapa de rutas viejas
        this.savedRouteLayers.clear();

        this.rutasGuardadas.forEach(ruta => {
          // --- COMIENZA LA VALIDACIÓN ---
          // ANTES de parsear, verificamos que 'shape' sea un string y que parezca un JSON (que empiece con '{')
          if (ruta.shape && typeof ruta.shape === 'string' && ruta.shape.trim().startsWith('{')) {
            try {
              const routeLayer = L.geoJSON(JSON.parse(ruta.shape));
              routeLayer.bindPopup(`<b>${ruta.nombre_ruta}</b>`);
              this.savedRouteLayers.set(ruta.id, routeLayer);
            } catch (e) {
              console.error(`Error al parsear la geometría de la ruta "${ruta.nombre_ruta}":`, e);
            }
          } else {
            // Opcional: Notificamos en la consola si una ruta tiene datos corruptos
            console.warn(`La ruta "${ruta.nombre_ruta}" (ID: ${ruta.id}) tiene una geometría inválida y no se puede dibujar.`);
          }
          // --- TERMINA LA VALIDACIÓN ---
        });
      },
      error: (err) => this.toastr.error('No se pudieron cargar las rutas para este perfil.', 'Error de Carga')
    });
  }

  onRutaSelected(event: any): void {
  const rutaId = event.target.value;
  this.limpiarMapaDeRutas(); // Usaremos una función de ayuda para limpiar el mapa
  if (!rutaId) return;

  const rutaSeleccionada = this.rutasGuardadas.find(ruta => ruta.id === rutaId);

  // --- COMIENZA LA VALIDACIÓN ---
  // ANTES de parsear, verificamos que 'shape' sea un string y que parezca un JSON (que empiece con '{')
  if (rutaSeleccionada && rutaSeleccionada.shape && typeof rutaSeleccionada.shape === 'string' && rutaSeleccionada.shape.trim().startsWith('{')) {
    try {
      // Si todo está bien, dibujamos la ruta
      this.activeRouteLayer = L.geoJSON(JSON.parse(rutaSeleccionada.shape), {
        style: () => ({ color: '#2130d1ff', weight: 6, opacity: 1 })
      }).addTo(this.map);

      this.map.fitBounds(this.activeRouteLayer.getBounds());
      this.toastr.info(`Mostrando: ${rutaSeleccionada.nombre_ruta}`);
    } catch (e) {
      // Si el JSON es inválido, mostramos un error pero no rompemos la app
      this.toastr.error('La geometría de la ruta seleccionada es inválida.', 'Error de Datos');
      console.error(`Error al parsear la geometría de la ruta "${rutaSeleccionada.nombre_ruta}":`, e);
    }
  } else {
    // Si la geometría está corrupta (nula, un número, etc.), mostramos una advertencia
    this.toastr.warning(`La ruta "${rutaSeleccionada.nombre_ruta}" tiene datos de geometría corruptos y no se puede dibujar.`, 'Datos Inválidos');
  }
  // --- TERMINA LA VALIDACIÓN ---
}

  // --- LÓGICA DEL MODO DE DIBUJO ---

  startDrawingMode(): void {
    if (!this.apiService.activeProfileId) {
        this.toastr.warning('Por favor, seleccione un perfil antes de crear una ruta.');
        return;
    }
    this.isDrawingMode = true;
    this.limpiarMapaDeRutas();
    this.allStreetLayers.forEach(layer => {
      layer.setStyle({ color: '#89070f', opacity: 0.4, weight: 5 });
    });
  }

  onStreetClick(calle: any, layer: L.GeoJSON): void {
    if (!this.isDrawingMode) return;
    const index = this.selectedStreets.findIndex(c => c.id === calle.id);
    if (index === -1) {
      this.selectedStreets.push(calle);
      layer.setStyle({ color: '#28a745', weight: 6, opacity: 0.9 });
    } else {
      this.selectedStreets.splice(index, 1);
      layer.setStyle({ color: '#89070f', opacity: 0.4, weight: 5 });
    }
  }

  saveRoute(): void {
    if (!this.newRouteName || this.selectedStreets.length === 0) return;
    const calleIds = this.selectedStreets.map(c => c.id);
    this.apiService.createRuta({ nombre_ruta: this.newRouteName, calles: calleIds }).subscribe({
      next: () => {
        this.toastr.success('Ruta guardada correctamente.', '¡Éxito!');
        this.resetDrawingState();
        this.cargarRutasGuardadas(); // Recarga las rutas del perfil actual
      },
      error: (err) => this.toastr.error(err.error.message || 'No se pudo guardar la ruta.', 'Error')
    });
  }

  cancelDrawingMode(): void {
    this.resetDrawingState();
  }

  // --- FUNCIONES DE AYUDA ---

  private resetDrawingState(): void {
    this.isDrawingMode = false;
    this.selectedStreets = [];
    this.newRouteName = '';
    this.allStreetLayers.forEach(layer => {
      layer.setStyle({ color: 'gray', weight: 2, opacity: 0.7 });
    });
  }

  private limpiarMapaDeRutas(): void {
    if (this.activeRouteLayer) {
        this.map.removeLayer(this.activeRouteLayer);
        this.activeRouteLayer = null;
    }
}
}
